const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PDFDocument = require("pdfkit");
const { GoogleGenAI } = require("@google/genai");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// ======================================================
// API KEYS
// ======================================================

const geminiApiKey = process.env.GEMINI_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;

const GROQ_MODEL = "openai/gpt-oss-120b";

const ai = geminiApiKey
  ? new GoogleGenAI({ apiKey: geminiApiKey })
  : null;

console.log(
  geminiApiKey
    ? "🔑 Gemini API key loaded for voice"
    : "❌ GEMINI_API_KEY missing (voice unavailable)"
);

console.log(
  groqApiKey
    ? "🔑 Groq API key loaded"
    : "❌ GROQ_API_KEY missing"
);

// ======================================================
// TEST
// ======================================================

app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// ======================================================
// JSON CLEANER
// ======================================================

function cleanJSON(text) {
  if (!text) {
    throw new Error("AI returned an empty response.");
  }

  let s = String(text)
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const a = s.indexOf("{");
  const b = s.lastIndexOf("}");

  if (a >= 0 && b > a) {
    s = s.slice(a, b + 1);
  }

  try {
    return JSON.parse(s);
  } catch (e) {
    console.error("❌ INVALID AI JSON:", s.slice(0, 4000));
    throw new Error("AI returned invalid JSON.");
  }
}

// ======================================================
// COMPACT AI DATA
// ======================================================

function compactAIData(
  value,
  maxStringLength = 180,
  maxArrayItems = 3
) {
  if (value == null) return value;

  if (typeof value === "string") {
    return value.length > maxStringLength
      ? value.slice(0, maxStringLength) + "..."
      : value;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .slice(0, maxArrayItems)
      .map((v) =>
        compactAIData(v, maxStringLength, maxArrayItems)
      );
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [
        k,
        compactAIData(v, maxStringLength, maxArrayItems)
      ])
    );
  }

  return String(value);
}

// ======================================================
// GROQ AI
// ======================================================

async function generateAIContent(
  prompt,
  selectedLanguage,
  maxTokens = 3000
) {
  if (!groqApiKey) {
    throw new Error("GROQ_API_KEY is missing from .env");
  }

  const systemInstruction = `
You are GramSaarthi AI, a practical business advisor.

Answer in ${selectedLanguage}.

Return ONLY one valid JSON object.
No markdown.
No code fences.

JSON keys remain English.

Human-readable values must be in ${selectedLanguage}.

Keep strings concise.
Arrays maximum 3 items.

Use estimates when exact data is unavailable.

Never guarantee profit, success, or loan approval.

Never invent government scheme rules or exact local statistics.
`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: GROQ_MODEL,

        messages: [
          {
            role: "system",
            content: systemInstruction
          },
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0.1,
        reasoning_effort: "low",
        include_reasoning: false,
        max_tokens: maxTokens,

        response_format: {
          type: "json_object"
        }
      })
    }
  );

  const raw = await response.text();

  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(
      `Groq returned invalid HTTP response: ${raw.slice(
        0,
        500
      )}`
    );
  }

  if (!response.ok) {
    const err = new Error(
      data?.error?.message ||
        `Groq request failed with status ${response.status}`
    );

    err.status = response.status;
    err.failed_generation =
      data?.error?.failed_generation;

    throw err;
  }

  const text =
    data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty response.");
  }

  return { text };
}

// ======================================================
// GEOCODING
// ======================================================

async function geocodeLocation(location) {
  if (!location) return null;

  try {
    const url =
      "https://nominatim.openstreetmap.org/search" +
      `?q=${encodeURIComponent(location)}` +
      `&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "GramSaarthiAI/1.0"
      }
    });

    if (!response.ok) {
      throw new Error(
        `Nominatim HTTP ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data) || !data.length) {
      return null;
    }

    return {
      latitude: Number(data[0].lat),
      longitude: Number(data[0].lon),
      displayName:
        data[0].display_name || location
    };
  } catch (e) {
    console.error(
      "⚠️ GEOCODING ERROR:",
      e.message
    );

    return null;
  }
}

// ======================================================
// NEARBY BUSINESSES
// ======================================================

async function getNearbyBusinesses(
  latitude,
  longitude
) {
  const radius = 5000;

  const query = `
[out:json][timeout:25];

(
  node["shop"](around:${radius},${latitude},${longitude});
  way["shop"](around:${radius},${latitude},${longitude});

  node["amenity"="restaurant"](around:${radius},${latitude},${longitude});
  way["amenity"="restaurant"](around:${radius},${latitude},${longitude});

  node["craft"](around:${radius},${latitude},${longitude});
  way["craft"](around:${radius},${latitude},${longitude});
);

out center tags;
`;

  try {
    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          "User-Agent": "GramSaarthiAI/1.0"
        },
        body: `data=${encodeURIComponent(query)}`
      }
    );

    if (!response.ok) {
      throw new Error(
        `Overpass HTTP ${response.status}`
      );
    }

    const data = await response.json();

    return Array.isArray(data?.elements)
      ? data.elements
      : [];
  } catch (e) {
    console.error(
      "⚠️ OVERPASS ERROR:",
      e.message
    );

    return [];
  }
}

// ======================================================
// DISTANCE
// ======================================================

function calculateDistanceKm(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (
    R *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );
}

// ======================================================
// NORMALIZE BUSINESS
// ======================================================

function normalizeBusiness(
  element,
  centerLat,
  centerLon
) {
  const tags = element.tags || {};

  let lat = element.lat;
  let lon = element.lon;

  if (
    element.center &&
    Number.isFinite(
      Number(element.center.lat)
    ) &&
    Number.isFinite(
      Number(element.center.lon)
    )
  ) {
    lat = Number(element.center.lat);
    lon = Number(element.center.lon);
  }

  if (
    !Number.isFinite(Number(lat)) ||
    !Number.isFinite(Number(lon))
  ) {
    return null;
  }

  const name =
    tags.name ||
    tags.brand ||
    tags.operator ||
    "Unnamed business";

  const category =
    tags.shop ||
    tags.amenity ||
    tags.craft ||
    tags.office ||
    "business";

  return {
    name,
    category,
    distanceKm: Number(
      calculateDistanceKm(
        centerLat,
        centerLon,
        Number(lat),
        Number(lon)
      ).toFixed(2)
    )
  };
}

// ======================================================
// COMPETITOR DETECTION
// ======================================================

function isLikelyCompetitor(
  businessCategory,
  osmBusiness
) {
  const b = String(
    businessCategory || ""
  ).toLowerCase();

  const c = String(
    osmBusiness.category || ""
  ).toLowerCase();

  const n = String(
    osmBusiness.name || ""
  ).toLowerCase();

  const groups = [
    [
      ["dairy", "milk", "milk shop"],
      [
        "dairy",
        "milk",
        "cheese",
        "ice_cream"
      ]
    ],

    [
      ["poultry", "chicken", "egg", "eggs"],
      ["poultry", "butcher", "farm"]
    ],

    [
      ["bakery", "baking"],
      [
        "bakery",
        "pastry",
        "confectionery"
      ]
    ],

    [
      [
        "tailoring",
        "tailor",
        "clothing",
        "garment"
      ],
      [
        "tailor",
        "clothes",
        "clothing",
        "fabric"
      ]
    ],

    [
      [
        "restaurant",
        "food",
        "catering",
        "cafe"
      ],
      [
        "restaurant",
        "cafe",
        "fast_food",
        "food"
      ]
    ],

    [
      [
        "vegetable",
        "vegetables",
        "grocery"
      ],
      [
        "greengrocer",
        "supermarket",
        "convenience",
        "grocery"
      ]
    ],

    [
      [
        "handicraft",
        "handicrafts",
        "craft"
      ],
      ["craft", "art", "gift"]
    ],

    [
      [
        "farming",
        "farm",
        "agriculture",
        "organic farming"
      ],
      [
        "farm",
        "agriculture",
        "garden_centre"
      ]
    ],

    [
      [
        "vermicompost",
        "compost",
        "organic"
      ],
      [
        "garden_centre",
        "farm",
        "agrarian"
      ]
    ]
  ];

  for (const [keys, matches] of groups) {
    if (
      keys.some((k) => b.includes(k)) &&
      (
        matches.some((k) => c.includes(k)) ||
        matches.some((k) => n.includes(k))
      )
    ) {
      return true;
    }
  }

  return b
    .split(/[\s,/&-]+/)
    .filter((w) => w.length >= 4)
    .some(
      (w) =>
        c.includes(w) ||
        n.includes(w)
    );
}

// ======================================================
// MARKET HEAT
// ======================================================

function calculateMarketHeat(
  count,
  total
) {
  if (!total) return "Low Data";

  if (!count) return "Low Competition";

  if (count <= 3) {
    return "Low to Moderate";
  }

  if (count <= 8) {
    return "Moderate";
  }

  return "High Competition";
}

// ======================================================
// MONEY
// ======================================================

function parseMoney(value) {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (value == null) return 0;

  let s = String(value)
    .toLowerCase()
    .replace(/Rs.|rs\.?|inr/g, "")
    .trim();

  const lakh =
    /([\d,.]+)\s*lakh/.exec(s);

  if (lakh) {
    return (
      Number(
        lakh[1].replace(/,/g, "")
      ) * 100000
    );
  }

  const crore =
    /([\d,.]+)\s*crore/.exec(s);

  if (crore) {
    return (
      Number(
        crore[1].replace(/,/g, "")
      ) * 10000000
    );
  }

  const nums = s
    .replace(/,/g, "")
    .match(/[\d]+(?:\.\d+)?/g);

  return nums
    ? Number(nums.join("")) || 0
    : 0;
}

function money(value) {
  const n = parseMoney(value);

  return n > 0
    ? `Rs.${Math.round(n).toLocaleString(
        "en-IN"
      )}`
    : "Not provided";
}

// ======================================================
// EMI
// ======================================================

function calculateEMI(
  principal,
  annualRate,
  months
) {
  principal = Number(principal) || 0;
  annualRate = Number(annualRate) || 0;
  months = Number(months) || 0;

  if (
    principal <= 0 ||
    months <= 0
  ) {
    return 0;
  }

  if (annualRate <= 0) {
    return principal / months;
  }

  const r =
    annualRate / 12 / 100;

  return (
    (principal *
      r *
      Math.pow(1 + r, months)) /
    (Math.pow(1 + r, months) - 1)
  );
}

// ======================================================
// NUMERIC PROJECTION
// ======================================================

function numericProjection(
  projection,
  advanced,
  fallbackRevenue = 0
) {
  const get = (obj, keys) => {
    for (const k of keys) {
      const n = parseMoney(obj?.[k]);

      if (n > 0) return n;
    }

    return 0;
  };

  const scenarios =
    advanced?.scenarios || {};

  const make = (name, base) => {
    const revenue =
      get(base, [
        "monthlyRevenue",
        "revenue"
      ]) ||
      get(projection, [
        `${name}Revenue`
      ]) ||
      0;

    const expenses =
      get(base, [
        "monthlyExpenses",
        "expenses"
      ]) ||
      get(projection, [
        `${name}Expenses`
      ]) ||
      0;

    const profit =
      get(base, [
        "monthlyProfit",
        "profit"
      ]) ||
      (
        revenue > 0 &&
        expenses >= 0
          ? revenue - expenses
          : 0
      );

    return {
      monthlyRevenue: revenue,
      monthlyExpenses: expenses,
      monthlyProfit: profit
    };
  };

  let conservative = make(
    "conservative",
    scenarios.conservative
  );

  let expected = make(
    "expected",
    scenarios.expected
  );

  let optimistic = make(
    "optimistic",
    scenarios.optimistic
  );

  if (!expected.monthlyRevenue) {
    expected.monthlyRevenue =
      parseMoney(
        projection.monthlyRevenue
      ) || fallbackRevenue;
  }

  if (!expected.monthlyExpenses) {
    expected.monthlyExpenses =
      parseMoney(
        projection.monthlyExpenses
      );
  }

  if (!expected.monthlyProfit) {
    expected.monthlyProfit =
      parseMoney(
        projection.expectedMonthlyProfit
      ) ||
      Math.max(
        0,
        expected.monthlyRevenue -
          expected.monthlyExpenses
      );
  }

  if (
    !conservative.monthlyRevenue &&
    expected.monthlyRevenue
  ) {
    conservative.monthlyRevenue =
      Math.round(
        expected.monthlyRevenue * 0.75
      );
  }

  if (
    !optimistic.monthlyRevenue &&
    expected.monthlyRevenue
  ) {
    optimistic.monthlyRevenue =
      Math.round(
        expected.monthlyRevenue * 1.25
      );
  }

  if (
    !conservative.monthlyExpenses &&
    expected.monthlyExpenses
  ) {
    conservative.monthlyExpenses =
      Math.round(
        expected.monthlyExpenses * 0.95
      );
  }

  if (
    !optimistic.monthlyExpenses &&
    expected.monthlyExpenses
  ) {
    optimistic.monthlyExpenses =
      Math.round(
        expected.monthlyExpenses * 1.05
      );
  }

  conservative.monthlyProfit =
    conservative.monthlyRevenue -
    conservative.monthlyExpenses;

  optimistic.monthlyProfit =
    optimistic.monthlyRevenue -
    optimistic.monthlyExpenses;

  expected.monthlyProfit =
    expected.monthlyRevenue -
      expected.monthlyExpenses ||
    expected.monthlyProfit;

  return {
    conservative,
    expected,
    optimistic
  };
}

// ======================================================
// FALLBACK REPORT
// ======================================================

function buildFallbackReport({
  location,
  capital,
  business,
  skills,
  resources,
  localIntelligence
}) {
  const name =
    business || "Small Business";

  const cap = Number(capital) || 0;

  const reserve =
    Math.round(cap * 0.2);

  const recommended =
    Math.round(cap * 0.8);

  const competitors =
    (
      localIntelligence.competitors ||
      []
    )
      .slice(0, 3)
      .map((x) => x.name);

  const heat =
    localIntelligence.marketHeat ||
    "Unavailable";

  const available = cap || 0;

  const startup = cap
    ? Math.round(cap * 0.4)
    : 0;

  const working = cap
    ? Math.round(cap * 0.15)
    : 0;

  const fundingGap = 0;

  const rev = cap
    ? Math.round(cap * 0.35)
    : 0;

  const exp = cap
    ? Math.round(cap * 0.25)
    : 0;

  const profit = Math.max(
    0,
    rev - exp
  );

  return {
    marketReach: {
      summary:
        `${name} can initially focus on nearby customers and expand after validating demand.`,
      primaryCustomers:
        "Local households and nearby customers",
      distributionChannels:
        "Direct sales, local delivery, WhatsApp and community networks"
    },

    opportunity: {
      summary:
        `The opportunity for ${name} should be validated through a small-scale launch.`,
      underservedNeeds: [
        "Convenient local service",
        "Reliable quality",
        "Reasonable pricing"
      ]
    },

    swot: {
      strengths: [
        "Local customer focus",
        "Controlled starting scale",
        "Repeat-customer opportunity"
      ],

      weaknesses: [
        "Limited capital may restrict expansion",
        "Demand needs validation",
        "Competition may affect pricing"
      ],

      opportunities: [
        "Local demand",
        "Digital promotion",
        "Gradual expansion"
      ],

      threats: [
        "Local competition",
        "Input-cost changes",
        "Seasonal demand"
      ]
    },

    localThreats: [
      `Local competition level: ${heat}`,
      "Price competition",
      "Changing demand"
    ],

    competitors: {
      summary:
        `${
          localIntelligence.competitorCount ||
          0
        } potential competitors were identified from available map data.`,

      mainCompetitors:
        competitors.length
          ? competitors
          : [
              "No direct competitor data available"
            ],

      competitiveAdvantage:
        "Quality, reliability, service and local convenience."
    },

    pricing: {
      strategy:
        "Use competitive, cost-aware pricing.",

      suggestion:
        "Cover variable costs and contribute to fixed costs.",

      reason:
        "Validate actual local prices before finalizing."
    },

    businessSimulation: {
      startingStrategy: {
        recommendation:
          "Start small and validate demand.",

        reason:
          "A controlled start reduces financial risk."
      },

      timeline: {
        month3: {
          outlook:
            "Validate demand",
          revenueDirection:
            "Potential gradual increase",
          expenseDirection:
            "Monitor closely",
          priority:
            "Customer acquisition"
        },

        month6: {
          outlook:
            "Strengthen repeat customers",
          revenueDirection:
            "Potential improvement",
          expenseDirection:
            "Optimize costs",
          priority:
            "Retention"
        },

        month12: {
          outlook:
            "Consider expansion if stable",
          revenueDirection:
            "Potential growth",
          expenseDirection:
            "Scale carefully",
          priority:
            "Sustainable growth"
        }
      },

      scenarios: {
        bestCase: {
          outcome:
            "Strong adoption and controlled costs may support growth.",
          conditions: [
            "Demand grows",
            "Costs controlled",
            "Customers return"
          ]
        },

        expectedCase: {
          outcome:
            "Gradual growth after validation.",
          conditions: [
            "Steady acquisition",
            "Stable operations",
            "Cost monitoring"
          ]
        },

        challengingCase: {
          outcome:
            "Slow demand or high costs may require smaller scale.",
          conditions: [
            "Low sales",
            "High costs",
            "Strong competition"
          ]
        }
      },

      breakEven: {
        estimate:
          "Depends on fixed costs and contribution per sale.",
        explanation:
          "Track actual revenue and costs before increasing investment."
      },

      assumptions: [
        "Demand validated locally",
        "Costs may vary",
        "Actual results may differ"
      ],

      improvementActions: [
        "Collect feedback",
        "Track expenses",
        "Build repeat customers"
      ],

      warningSigns: [
        "Sales below plan",
        "Costs rising",
        "Low repeat customers"
      ]
    },

    financialEngine: {
      capitalPlan: {
        availableCapital: available,

        capitalStatus:
          cap
            ? "Available capital should be allocated carefully."
            : "Capital unavailable",

        recommendedAllocation: {
          setup: cap
            ? `Rs.${startup}`
            : "To be determined",

          inventoryOrInputs: cap
            ? `Rs.${Math.round(
                cap * 0.25
              )}`
            : "To be determined",

          workingCapital: cap
            ? `Rs.${working}`
            : "To be determined",

          reserve: cap
            ? `Rs.${reserve}`
            : "To be determined"
        },

        reason:
          "Keep a reserve while validating demand."
      },

      startupCosts: {
        estimatedRange: cap
          ? `About ${money(
              startup
            )} for initial setup, subject to quotations.`
          : "Obtain supplier quotations.",

        majorCosts: [
          "Equipment/setup",
          "Initial inventory or inputs",
          "Working capital"
        ]
      },

      monthlyCosts: {
        fixedCosts:
          "Rent, utilities and recurring costs",

        variableCosts:
          "Inputs, packaging and delivery",

        costControl: [
          "Compare suppliers",
          "Avoid excess inventory",
          "Track daily expenses"
        ]
      },

      unitEconomics: {
        pricingApproach:
          "Calculate unit cost before setting price.",

        costPerUnit:
          "To be calculated from actual costs.",

        sellingPricePerUnit:
          "To be validated locally.",

        estimatedMargin:
          "To be calculated.",

        importantNote:
          "Planning estimate only."
      },

      breakEven: {
        salesNeeded:
          "Depends on unit economics.",

        timeEstimate:
          "Depends on monthly sales.",

        calculationBasis:
          "Fixed costs divided by contribution per unit."
      },

      cashFlowPlan: {
        month1:
          "Control spending and record transactions.",

        month2:
          "Review sales and costs.",

        month3:
          "Increase spending only after validation.",

        ongoingRule:
          "Maintain reserve and review expenses monthly."
      },

      warningSignals: [
        "Sales below plan",
        "Costs rising",
        "Low repeat customers"
      ],

      financialActions: [
        "Maintain cash-flow records",
        "Separate business/personal expenses",
        "Review costs monthly"
      ]
    },

    localIntelligence: {
      summary:
        localIntelligence.status === "success"
          ? `OpenStreetMap data was found for ${
              location || "the selected location"
            }.`
          : "Local map data was unavailable.",

      competitionAssessment:
        `${
          localIntelligence.competitorCount ||
          0
        } potential competitors were identified.`,

      marketHeatExplanation:
        `Market heat: ${heat}.`,

      opportunities: [
        "Serve nearby customers",
        "Build repeat customers",
        "Use practical local delivery"
      ],

      risks: [
        "Map data may be incomplete",
        "Not every mapped business is a direct competitor",
        "Conditions can change"
      ],

      locationAdvice:
        "Validate demand locally before major investment."
    },

    advancedSimulation: {
      businessModel: {
        startingScale:
          "Small-scale launch",

        targetCustomers:
          "Nearby households and local customers",

        mainRevenueSource:
          "Direct customer sales",

        pricingStrategy:
          "Competitive and cost-aware pricing"
      },

      assumptions: [
        "Demand validated locally",
        "Costs manageable",
        "Retention improves"
      ],

      scenarios: {
        conservative: {
          monthlyCustomers:
            "Low initial volume",

          averageOrderValue:
            "To be validated",

          monthlyRevenue: rev
            ? `Rs.${Math.round(
                rev * 0.75
              )}`
            : "To be determined",

          monthlyExpenses: exp
            ? `Rs.${Math.round(
                exp * 0.95
              )}`
            : "To be determined",

          monthlyProfit: rev
            ? `Rs.${Math.round(
                rev * 0.75 -
                  exp * 0.95
              )}`
            : "To be determined",

          breakEvenEstimate:
            "Depends on unit economics",

          riskLevel: "High"
        },

        expected: {
          monthlyCustomers:
            "Moderate growth",

          averageOrderValue:
            "To be validated",

          monthlyRevenue: rev
            ? `Rs.${rev}`
            : "To be determined",

          monthlyExpenses: exp
            ? `Rs.${exp}`
            : "To be determined",

          monthlyProfit: profit
            ? `Rs.${profit}`
            : "To be determined",

          breakEvenEstimate:
            "Depends on unit economics",

          riskLevel: "Moderate"
        },

        optimistic: {
          monthlyCustomers:
            "Strong adoption",

          averageOrderValue:
            "Improved through repeat sales",

          monthlyRevenue: rev
            ? `Rs.${Math.round(
                rev * 1.25
              )}`
            : "To be determined",

          monthlyExpenses: exp
            ? `Rs.${Math.round(
                exp * 1.05
              )}`
            : "To be determined",

          monthlyProfit: rev
            ? `Rs.${Math.round(
                rev * 1.25 -
                  exp * 1.05
              )}`
            : "To be determined",

          breakEvenEstimate:
            "Could be reached sooner if demand is strong",

          riskLevel: "Moderate"
        }
      },

      capitalImpact: {
        availableCapital: cap
          ? `Rs.${cap}`
          : "Not provided",

        recommendedStartingInvestment:
          cap
            ? `Rs.${recommended}`
            : "To be determined",

        remainingReserve: cap
          ? `Rs.${reserve}`
          : "To be determined",

        capitalAdequacy: cap
          ? "Validate against actual startup costs"
          : "Insufficient information",

        reason:
          "Do not invest all capital before validation."
      },

      competitionImpact: {
        competitionLevel: heat,

        effectOnPricing:
          "Competition may limit price increases.",

        effectOnCustomers:
          "Customers compare price, quality and convenience.",

        recommendedStrategy:
          "Differentiate through quality and service."
      },

      growthPlan: {
        month1:
          "Validate demand and operations.",

        month2:
          "Improve acquisition and cost control.",

        month3:
          "Review actual sales.",

        months4to6:
          "Scale only if demand and cash flow are stable.",

        longTerm:
          "Expand gradually."
      },

      warningSignals: [
        "Sales below plan",
        "Costs rising",
        "Low repeat customers"
      ],

      decision: {
        viability:
          "Potentially viable subject to validation.",

        recommendedAction:
          "Start with a controlled pilot.",

        startingAdvice:
          "Validate customers before major investment."
      }
    },

    bankReadyReport: {
      reportTitle:
        "GramSaarthi AI Business Report",

      businessSummary: {
        businessNameOrType: name,
        location:
          location || "Not provided",

        businessDescription:
          `A proposed ${name} business serving local customers.`,

        entrepreneurProfile:
          skills ||
          "Skills not provided",

        businessObjective:
          "Build a sustainable local business through controlled growth."
      },

      marketOpportunity: {
        marketSummary:
          `Begin with local demand validation for ${name}.`,

        targetCustomers:
          "Nearby households and local customers",

        customerNeed:
          "Convenient, reliable and reasonably priced products or services",

        demandPotential:
          "Requires local validation",

        localMarketCondition:
          heat
      },

      localCompetition: {
        competitionLevel: heat,

        nearbyCompetitors:
          competitors.length
            ? competitors.join(", ")
            : "No direct competitor data available",

        competitiveAdvantages: [
          "Local service",
          "Convenience",
          "Quality and reliability"
        ],

        recommendedPositioning:
          "Affordable, reliable and customer-focused."
      },

      businessModel: {
        productsOrServices: [
          name
        ],

        revenueSource:
          "Direct customer sales",

        pricingStrategy:
          "Cost-aware competitive pricing",

        salesStrategy:
          "Local sales, referrals, repeat customers and digital communication"
      },

      investmentPlan: {
        availableCapital: cap
          ? `Rs.${cap}`
          : "Not provided",

        estimatedStartupCost: cap
          ? `Rs.${startup}`
          : "To be finalized from quotations",

        workingCapital: cap
          ? `Rs.${working}`
          : "To be determined",

        emergencyReserve: cap
          ? `Rs.${reserve}`
          : "To be determined",

        fundingGap: cap
          ? `Rs.${fundingGap}`
          : "To be determined",

        recommendedInvestment: cap
          ? `Rs.${recommended}`
          : "To be determined"
      },

      financialProjection: {
        monthlyRevenue: rev
          ? `Rs.${rev}`
          : "To be determined",

        monthlyExpenses: exp
          ? `Rs.${exp}`
          : "To be determined",

        expectedMonthlyProfit: profit
          ? `Rs.${profit}`
          : "To be determined",

        conservativeScenario:
          "Planning estimate",

        expectedScenario:
          "Planning estimate",

        optimisticScenario:
          "Planning estimate",

        breakEven:
          "Depends on fixed costs and contribution per sale"
      },

      fundingRequirement: {
        fundingRequired: fundingGap
          ? `Rs.${fundingGap}`
          : "To be determined",

        purposeOfFunding: [
          "Business setup",
          "Initial inventory or inputs",
          "Working capital"
        ],

        ownContribution: cap
          ? `Rs.${cap}`
          : "Not provided",

        externalFundingNeed:
          fundingGap
            ? `Rs.${fundingGap}`
            : "To be determined",

        repaymentConsideration:
          "Borrowing should be evaluated against realistic cash flow."
      },

      swotAnalysis: {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
      },

      riskManagement: {
        majorRisks: [
          "Demand uncertainty",
          "Competition",
          "Cost increases"
        ],

        riskMitigation: [
          "Start small",
          "Monitor costs",
          "Build repeat customers"
        ],

        earlyWarningSignals: [
          "Sales below plan",
          "Costs rising",
          "Low repeat customers"
        ]
      },

      implementationPlan: {
        first30Days: [
          "Validate local demand",
          "Identify suppliers",
          "Prepare pilot"
        ],

        days31to90: [
          "Acquire customers",
          "Track revenue and costs",
          "Improve operations"
        ],

        months4to6: [
          "Review profitability",
          "Improve retention",
          "Scale carefully"
        ],

        longTerm: [
          "Expand after stable demand",
          "Add suitable offerings",
          "Maintain financial discipline"
        ]
      },

      bankReadiness: {
        financialDocumentationNeeded: [
          "Income and expense records",
          "Startup cost estimates",
          "Supplier quotations"
        ],

        businessInformationNeeded: [
          "Business description",
          "Location details",
          "Customer and market information"
        ],

        readinessLevel:
          "Preliminary planning stage",

        importantNote:
          "Approval depends on lender, scheme and submitted documentation."
      },

      finalRecommendation: {
        viability:
          "Potentially viable subject to validation",

        recommendation:
          "Run a small pilot before major investment.",

        recommendedStartingScale:
          "Small scale",

        nextStep:
          "Validate customers and actual startup costs."
      }
    },

    recommendation: {
      verdict:
        "Start with a small controlled pilot",

      reason:
        `The ${name} opportunity should be validated using real customer demand, actual costs and local competition.`,

      steps: [
        "Validate local demand",
        "Calculate actual startup costs",
        "Start small and track results"
      ]
    }
  };
}

// ======================================================
// NORMALIZE BANK REPORT
// ======================================================

function normalizeBankReport(
  finalResult,
  profile,
  local
) {
  const b =
    finalResult.bankReadyReport &&
    typeof finalResult.bankReadyReport ===
      "object"
      ? finalResult.bankReadyReport
      : {};

  const fe =
    finalResult.financialEngine || {};

  const adv =
    finalResult.advancedSimulation || {};

  const fp =
    b.financialProjection || {};

  const inv =
    b.investmentPlan || {};

  const fr =
    b.fundingRequirement || {};

  const sw =
    b.swotAnalysis ||
    finalResult.swot ||
    {};

  const rb =
    b.riskManagement || {};

  const imp =
    b.implementationPlan || {};

  const br =
    b.bankReadiness || {};

  const rec =
    b.finalRecommendation ||
    finalResult.recommendation ||
    {};

  const capital =
    profile.availableCapital;

  if (!b.reportTitle) {
    b.reportTitle =
      "GramSaarthi AI Business Report";
  }

  b.businessSummary = {
    businessNameOrType:
      profile.business,

    location:
      profile.location,

    businessDescription:
      b.businessSummary
        ?.businessDescription ||
      `A proposed ${profile.business} business serving local customers.`,

    entrepreneurProfile:
      b.businessSummary
        ?.entrepreneurProfile ||
      profile.skills,

    businessObjective:
      b.businessSummary
        ?.businessObjective ||
      "Build a sustainable local business through controlled growth."
  };

  b.marketOpportunity = {
    marketSummary:
      b.marketOpportunity?.marketSummary ||
      finalResult.opportunity?.summary ||
      "Validate local demand before major investment.",

    targetCustomers:
      b.marketOpportunity?.targetCustomers ||
      finalResult.marketReach
        ?.primaryCustomers ||
      "Local customers",

    customerNeed:
      b.marketOpportunity?.customerNeed ||
      "Convenient and reliable offering",

    demandPotential:
      b.marketOpportunity
        ?.demandPotential ||
      "Requires local validation",

    localMarketCondition:
      local.marketHeat ||
      b.marketOpportunity
        ?.localMarketCondition ||
      "Unavailable"
  };

  b.localCompetition = {
    competitionLevel:
      local.marketHeat ||
      b.localCompetition
        ?.competitionLevel ||
      "Unavailable",

    nearbyCompetitors:
      (
        local.competitors || []
      )
        .slice(0, 5)
        .map((x) => x.name)
        .join(", ") ||
      b.localCompetition
        ?.nearbyCompetitors ||
      "No direct competitor data available",

    competitiveAdvantages:
      b.localCompetition
        ?.competitiveAdvantages ||
      finalResult.competitors
        ?.competitiveAdvantage ||
      [],

    recommendedPositioning:
      b.localCompetition
        ?.recommendedPositioning ||
      "Reliable, cost-aware and customer-focused."
  };

  b.businessModel =
    b.businessModel || {
      productsOrServices: [
        profile.business
      ],

      revenueSource:
        "Direct customer sales",

      pricingStrategy:
        finalResult.pricing?.strategy ||
        "Cost-aware competitive pricing",

      salesStrategy:
        finalResult.marketReach
          ?.distributionChannels ||
        "Local sales and repeat customers"
    };

  const scenarios =
    numericProjection(
      fp,
      adv,
      0
    );

  const totalProject =
    parseMoney(
      inv.estimatedStartupCost
    ) +
    parseMoney(
      inv.workingCapital
    ) +
    parseMoney(
      inv.emergencyReserve
    );

  let fundingGap =
    parseMoney(
      inv.fundingGap
    ) ||
    parseMoney(
      fr.externalFundingNeed
    );

  if (
    !fundingGap &&
    totalProject > capital
  ) {
    fundingGap =
      totalProject - capital;
  }

  b.investmentPlan = {
    availableCapital:
      capital
        ? `Rs.${capital}`
        : inv.availableCapital ||
          "Not provided",

    estimatedStartupCost:
      inv.estimatedStartupCost ||
      "To be finalized from quotations",

    workingCapital:
      inv.workingCapital ||
      "To be determined",

    emergencyReserve:
      inv.emergencyReserve ||
      "To be determined",

    fundingGap:
      fundingGap
        ? `Rs.${Math.round(
            fundingGap
          )}`
        : inv.fundingGap ||
          "To be determined",

    recommendedInvestment:
      inv.recommendedInvestment ||
      "To be determined"
  };

  b.financialProjection = {
    monthlyRevenue:
      fp.monthlyRevenue ||
      (
        scenarios.expected
          .monthlyRevenue
          ? money(
              scenarios.expected
                .monthlyRevenue
            )
          : "To be determined"
      ),

    monthlyExpenses:
      fp.monthlyExpenses ||
      (
        scenarios.expected
          .monthlyExpenses
          ? money(
              scenarios.expected
                .monthlyExpenses
            )
          : "To be determined"
      ),

    expectedMonthlyProfit:
      fp.expectedMonthlyProfit ||
      (
        scenarios.expected
          .monthlyProfit
          ? money(
              scenarios.expected
                .monthlyProfit
            )
          : "To be determined"
      ),

    conservativeScenario:
      scenarios.conservative
        .monthlyRevenue
        ? `Revenue ${money(
            scenarios.conservative
              .monthlyRevenue
          )} | Expenses ${money(
            scenarios.conservative
              .monthlyExpenses
          )} | Profit ${money(
            scenarios.conservative
              .monthlyProfit
          )}`
        : fp.conservativeScenario ||
          "To be determined",

    expectedScenario:
      scenarios.expected
        .monthlyRevenue
        ? `Revenue ${money(
            scenarios.expected
              .monthlyRevenue
          )} | Expenses ${money(
            scenarios.expected
              .monthlyExpenses
          )} | Profit ${money(
            scenarios.expected
              .monthlyProfit
          )}`
        : fp.expectedScenario ||
          "To be determined",

    optimisticScenario:
      scenarios.optimistic
        .monthlyRevenue
        ? `Revenue ${money(
            scenarios.optimistic
              .monthlyRevenue
          )} | Expenses ${money(
            scenarios.optimistic
              .monthlyExpenses
          )} | Profit ${money(
            scenarios.optimistic
              .monthlyProfit
          )}`
        : fp.optimisticScenario ||
          "To be determined",

    breakEven:
      fp.breakEven ||
      adv.scenarios?.expected
        ?.breakEvenEstimate ||
      "Depends on unit economics"
  };

  b.fundingRequirement = {
    fundingRequired:
      fundingGap
        ? `Rs.${Math.round(
            fundingGap
          )}`
        : fr.fundingRequired ||
          "To be determined",

    purposeOfFunding:
      fr.purposeOfFunding || [
        "Business setup",
        "Initial inventory or inputs",
        "Working capital"
      ],

    ownContribution:
      fr.ownContribution ||
      (
        capital
          ? `Rs.${capital}`
          : "Not provided"
      ),

    externalFundingNeed:
      fundingGap
        ? `Rs.${Math.round(
            fundingGap
          )}`
        : fr.externalFundingNeed ||
          "To be determined",

    repaymentConsideration:
      fr.repaymentConsideration ||
      "Evaluate repayment against realistic cash flow."
  };

  b.swotAnalysis = {
    strengths:
      sw.strengths || [],

    weaknesses:
      sw.weaknesses || [],

    opportunities:
      sw.opportunities || [],

    threats:
      sw.threats || []
  };

  b.riskManagement = {
    majorRisks:
      rb.majorRisks ||
      finalResult.localThreats ||
      [],

    riskMitigation:
      rb.riskMitigation || [
        "Start small",
        "Monitor costs",
        "Build repeat customers"
      ],

    earlyWarningSignals:
      rb.earlyWarningSignals ||
      finalResult.businessSimulation
        ?.warningSigns ||
      []
  };

  b.implementationPlan = {
    first30Days:
      imp.first30Days || [],

    days31to90:
      imp.days31to90 || [],

    months4to6:
      imp.months4to6 || [],

    longTerm:
      imp.longTerm || []
  };

  b.bankReadiness = {
    financialDocumentationNeeded:
      br.financialDocumentationNeeded || [
        "Income and expense records",
        "Startup cost estimates",
        "Supplier quotations"
      ],

    businessInformationNeeded:
      br.businessInformationNeeded || [
        "Business description",
        "Location details",
        "Customer and market information"
      ],

    readinessLevel:
      br.readinessLevel ||
      "Preliminary planning stage",

    importantNote:
      br.importantNote ||
      "Loan approval depends on lender/scheme eligibility and documentation."
  };

  b.finalRecommendation = {
    viability:
      rec.viability ||
      finalResult.recommendation
        ?.verdict ||
      "Potentially viable subject to validation",

    recommendation:
      rec.recommendation ||
      finalResult.recommendation
        ?.reason ||
      "Start with a controlled pilot.",

    recommendedStartingScale:
      rec.recommendedStartingScale ||
      adv.businessModel
        ?.startingScale ||
      "Small scale",

    nextStep:
      rec.nextStep ||
      finalResult.recommendation
        ?.steps?.[0] ||
      "Validate local demand and actual costs."
  };

  return b;
}

// ======================================================
// FONT SYSTEM
// ======================================================

const FONT_DIR =
  path.join(__dirname, "fonts");

const FONTS = {
  regular: path.join(
    FONT_DIR,
    "NotoSans-Regular.ttf"
  ),

  bold: path.join(
    FONT_DIR,
    "NotoSans-Bold.ttf"
  ),

  GujaratiRegular: path.join(
    FONT_DIR,
    "NotoSansGujarati-Regular.ttf"
  ),

  GujaratiBold: path.join(
    FONT_DIR,
    "NotoSansGujarati-Bold.ttf"
  ),

  DevanagariRegular: path.join(
    FONT_DIR,
    "NotoSansDevanagari-Regular.ttf"
  ),

  DevanagariBold: path.join(
    FONT_DIR,
    "NotoSansDevanagari-Bold.ttf"
  ),

  BengaliRegular: path.join(
    FONT_DIR,
    "NotoSansBengali-Regular.ttf"
  ),

  BengaliBold: path.join(
    FONT_DIR,
    "NotoSansBengali-Bold.ttf"
  ),

  TamilRegular: path.join(
    FONT_DIR,
    "NotoSansTamil-Regular.ttf"
  ),

  TamilBold: path.join(
    FONT_DIR,
    "NotoSansTamil-Bold.ttf"
  ),

  TeluguRegular: path.join(
    FONT_DIR,
    "NotoSansTelugu-Regular.ttf"
  ),

  TeluguBold: path.join(
    FONT_DIR,
    "NotoSansTelugu-Bold.ttf"
  ),

  KannadaRegular: path.join(
    FONT_DIR,
    "NotoSansKannada-Regular.ttf"
  ),

  KannadaBold: path.join(
    FONT_DIR,
    "NotoSansKannada-Bold.ttf"
  ),

  MalayalamRegular: path.join(
    FONT_DIR,
    "NotoSansMalayalam-Regular.ttf"
  ),

  MalayalamBold: path.join(
    FONT_DIR,
    "NotoSansMalayalam-Bold.ttf"
  ),

  GurmukhiRegular: path.join(
    FONT_DIR,
    "NotoSansGurmukhi-Regular.ttf"
  ),

  GurmukhiBold: path.join(
    FONT_DIR,
    "NotoSansGurmukhi-Bold.ttf"
  ),

  ArabicRegular: path.join(
    FONT_DIR,
    "NotoNaskhArabic-Regular.ttf"
  ),

  ArabicBold: path.join(
    FONT_DIR,
    "NotoNaskhArabic-Bold.ttf"
  )
};

// ======================================================
// FONT CHECK
// ======================================================

function checkFonts() {
  console.log("🔤 Checking GramSaarthi fonts...");

  for (const [name, file] of Object.entries(
    FONTS
  )) {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${name}`);
    } else {
      console.log(
        `   ❌ Missing ${name}: ${file}`
      );
    }
  }
}

checkFonts();

// ======================================================
// LANGUAGE FONT
// ======================================================
function applyFont(bold = false) {
  doc.font(bold ? "GS-Bold" : "GS-Regular");
}

// ======================================================
// SCRIPT DETECTION
// ======================================================
// ======================================================
// SCRIPT DETECTION
// ======================================================

function detectScript(s) {
  s = String(s || "");

  if (/[\u0A80-\u0AFF]/.test(s)) {
    return "gujarati";
  }

  if (/[\u0900-\u097F]/.test(s)) {
    return "devanagari";
  }

  if (/[\u0980-\u09FF]/.test(s)) {
    return "bengali";
  }

  if (/[\u0B80-\u0BFF]/.test(s)) {
    return "tamil";
  }

  if (/[\u0C00-\u0C7F]/.test(s)) {
    return "telugu";
  }

  if (/[\u0C80-\u0CFF]/.test(s)) {
    return "kannada";
  }

  if (/[\u0D00-\u0D7F]/.test(s)) {
    return "malayalam";
  }

  if (/[\u0A00-\u0A7F]/.test(s)) {
    return "punjabi";
  }

  if (/[\u0600-\u06FF]/.test(s)) {
    return "arabic";
  }

  return "latin";
}

// ======================================================
// SCRIPT FONT
// ======================================================

function applyFont(bold = false) {
  doc.font(bold ? "GS-Bold" : "GS-Regular");
} 

// ======================================================
// PDF GENERATOR
// ======================================================
// ======================================================
// PDF GENERATOR - COMPACT BANK REPORT
// ======================================================

// ======================================================
// PDF GENERATOR - SIMPLE BANK READY REPORT
// ======================================================

function generateBusinessPDF(
  report,
  language = "English",
  loan = {}
) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 38,
        autoFirstPage: true
      });
      const FONT_DIR = path.join(__dirname, "fonts");

const REGULAR_FONT = path.join(FONT_DIR, "NotoSans-Regular.ttf");
const BOLD_FONT = path.join(FONT_DIR, "NotoSans-Bold.ttf");

doc.registerFont("GS-Regular", REGULAR_FONT);
doc.registerFont("GS-Bold", BOLD_FONT);

doc.font("GS-Regular");
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));

      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on("error", reject);
      // --------------------------------------------------
      // COLORS
      // --------------------------------------------------

      const BLUE = "#174EA6";
      const LIGHT_BLUE = "#EAF2FF";
      const BORDER_BLUE = "#6B9FE8";
      const DARK = "#111111";
      const GREY = "#555555";
      const WHITE = "#FFFFFF";
      const LIGHT_GREY = "#F5F7FA";

      const LEFT = 38;
      const RIGHT = 557;
      const WIDTH = 519;

      // --------------------------------------------------
      // FONTS
      // --------------------------------------------------
      // --------------------------------------------------
      // LANGUAGE FONT
      // --------------------------------------------------

      function selectedFont(bold = false) {
        const lang = String(
          language || "English"
        )
          .toLowerCase()
          .trim();

        if (lang.includes("gujar")) {
          return bold
            ? F.gujaratiBold
            : F.gujarati;
        }

        if (
          lang.includes("hindi") ||
          lang.includes("marathi")
        ) {
          return bold
            ? F.devanagariBold
            : F.devanagari;
        }

        if (lang.includes("bengali")) {
          return bold
            ? F.bengaliBold
            : F.bengali;
        }

        if (lang.includes("tamil")) {
          return bold
            ? F.tamilBold
            : F.tamil;
        }

        if (lang.includes("telugu")) {
          return bold
            ? F.teluguBold
            : F.telugu;
        }

        if (lang.includes("kannada")) {
          return bold
            ? F.kannadaBold
            : F.kannada;
        }

        if (lang.includes("malayalam")) {
          return bold
            ? F.malayalamBold
            : F.malayalam;
        }

        if (lang.includes("punjabi")) {
          return bold
            ? F.gurmukhiBold
            : F.gurmukhi;
        }

        if (
          lang.includes("arabic") ||
          lang.includes("urdu")
        ) {
          return bold
            ? F.arabicBold
            : F.arabic;
        }

        return bold
          ? F.bold
          : F.regular;
      }

      // --------------------------------------------------
      // FONT SETTER
      // --------------------------------------------------

      function setFont(bold = false) {
  doc.font(bold ? "GS-Bold" : "GS-Regular");
}
function drawText(text, x, y, options = {}) {
  const {
    width = 500,
    size = 9,
    bold = false,
    align = "left",
    color = "#000000",
    lineGap = 1
  } = options;

  doc
    .font(bold ? "GS-Bold" : "GS-Regular")
    .fontSize(size)
    .fillColor(color)
    .text(String(text ?? ""), x, y, {
      width,
      align,
      lineGap
    });
}
      // --------------------------------------------------
      // SAFE VALUE
      // --------------------------------------------------

      function safe(value) {
        if (
          value === undefined ||
          value === null ||
          value === ""
        ) {
          return "Not provided";
        }

        if (Array.isArray(value)) {
          return value
            .slice(0, 3)
            .map((x) => String(x))
            .filter(Boolean)
            .join(" - ") ||
            "Not provided";
        }

        if (typeof value === "object") {
          return Object.entries(value)
            .slice(0, 3)
            .map(
              ([key, val]) =>
                `${key}: ${String(val)}`
            )
            .join(" - ");
        }

        return String(value);
      }

      // --------------------------------------------------
      // SHORT SUMMARY
      // --------------------------------------------------

      function summary(value) {
        let s = safe(value)
          .replace(/\s+/g, " ")
          .trim();

        if (
          s === "Not provided" ||
          !s
        ) {
          return "Information not available.";
        }

        // Maximum roughly 2 short lines
        if (s.length > 150) {
          s =
            s.slice(0, 147).trim() +
            "...";
        }

        return s;
      }

      // --------------------------------------------------
      // HEADER
      // --------------------------------------------------

      function drawHeader(
        page,
        title
      ) {
        doc
          .rect(
            0,
            0,
            595,
            7
          )
          .fill(BLUE);

        setFont(true);

        doc
          .fontSize(8)
          .fillColor(BLUE)
          .text(
            "GRAMSAARTHI AI",
            LEFT,
            15,
            {
              width: 200
            }
          );

        setFont(true);

        doc
          .fontSize(8)
          .fillColor(GREY)
          .text(
            title,
            250,
            15,
            {
              width: 307,
              align: "right"
            }
          );

        doc
          .moveTo(
            LEFT,
            30
          )
          .lineTo(
            RIGHT,
            30
          )
          .strokeColor(
            BORDER_BLUE
          )
          .lineWidth(0.7)
          .stroke();

        setFont(false);

        doc
          .fontSize(6)
          .fillColor(GREY)
          .text(
            `Page ${page}`,
            LEFT,
            804,
            {
              width: WIDTH,
              align: "center"
            }
          );
      }

      // --------------------------------------------------
      // TITLE
      // --------------------------------------------------

      function drawTitle(y) {
        setFont(true);

        doc
          .fontSize(19)
          .fillColor(BLUE)
          .text(
            "GRAMSAARTHI AI",
            LEFT,
            y,
            {
              width: WIDTH,
              align: "center"
            }
          );

        y += 23;

        setFont(true);

        doc
          .fontSize(10)
          .fillColor(DARK)
          .text(
            "Bank-Ready Business & Financial Report",
            LEFT,
            y,
            {
              width: WIDTH,
              align: "center"
            }
          );

        y += 17;

        setFont(false);

        doc
          .fontSize(6.5)
          .fillColor(GREY)
          .text(
            `Language: ${language} - AI-assisted planning`,
            LEFT,
            y,
            {
              width: WIDTH,
              align: "center"
            }
          );

        return y + 20;
      }

      // --------------------------------------------------
      // SECTION TABLE
      // --------------------------------------------------

      function overviewTable(
        rows,
        startY
      ) {
        const labelWidth = 170;
        const valueWidth =
          WIDTH - labelWidth;

        const padding = 7;
        const rowHeight = 48;

        let y = startY;

        // Header
        doc
          .rect(
            LEFT,
            y,
            labelWidth,
            25
          )
          .fillAndStroke(
            LIGHT_BLUE,
            BORDER_BLUE
          );

        doc
          .rect(
            LEFT + labelWidth,
            y,
            valueWidth,
            25
          )
          .fillAndStroke(
            LIGHT_BLUE,
            BORDER_BLUE
          );

        setFont(true);

        doc
          .fontSize(7.5)
          .fillColor(BLUE)
          .text(
            "Business Area",
            LEFT + padding,
            y + 8,
            {
              width:
                labelWidth -
                padding * 2
            }
          );

        doc
          .fontSize(7.5)
          .text(
            "Short Summary",
            LEFT +
              labelWidth +
              padding,
            y + 8,
            {
              width:
                valueWidth -
                padding * 2
            }
          );

        y += 25;

        rows.forEach(
          (row, index) => {
            const fill =
              index % 2 === 0
                ? WHITE
                : LIGHT_GREY;

            doc
              .rect(
                LEFT,
                y,
                labelWidth,
                rowHeight
              )
              .fillAndStroke(
                fill,
                BORDER_BLUE
              );

            doc
              .rect(
                LEFT +
                  labelWidth,
                y,
                valueWidth,
                rowHeight
              )
              .fillAndStroke(
                fill,
                BORDER_BLUE
              );

            setFont(true);

            doc
              .fontSize(7.2)
              .fillColor(BLUE)
              .text(
                row[0],
                LEFT + padding,
                y + 8,
                {
                  width:
                    labelWidth -
                    padding * 2,
                  height: 32
                }
              );

            // IMPORTANT:
            // Human-readable selected-language
            // text always uses selected language font.
            setFont(false, true);

            doc
              .fontSize(7.2)
              .fillColor(DARK)
              .text(
                row[1],
                LEFT +
                  labelWidth +
                  padding,
                y + 8,
                {
                  width:
                    valueWidth -
                    padding * 2,
                  height: 34,
                  lineGap: 1
                }
              );

            y += rowHeight;
          }
        );

        return y;
      }

      // --------------------------------------------------
      // FINANCIAL TABLE
      // --------------------------------------------------

      function financialTable(
        rows,
        startY
      ) {
        const labelWidth = 220;
        const valueWidth =
          WIDTH - labelWidth;

        const padding = 7;
        const rowHeight = 25;
        let y = startY;

        // Header
        doc
          .rect(
            LEFT,
            y,
            labelWidth,
            25
          )
          .fillAndStroke(
            LIGHT_BLUE,
            BORDER_BLUE
          );

        doc
          .rect(
            LEFT + labelWidth,
            y,
            valueWidth,
            25
          )
          .fillAndStroke(
            LIGHT_BLUE,
            BORDER_BLUE
          );

        setFont(true);

        doc
          .fontSize(7.5)
          .fillColor(BLUE)
          .text(
            "Financial / Bank Item",
            LEFT + padding,
            y + 8,
            {
              width:
                labelWidth -
                padding * 2
            }
          );

        doc
          .fontSize(7.5)
          .text(
            "Amount / Plan",
            LEFT +
              labelWidth +
              padding,
            y + 8,
            {
              width:
                valueWidth -
                padding * 2,
              align: "center"
            }
          );

        y += 25;

        rows.forEach(
          (row, index) => {
            const fill =
              index % 2 === 0
                ? WHITE
                : LIGHT_GREY;

            doc
              .rect(
                LEFT,
                y,
                labelWidth,
                rowHeight
              )
              .fillAndStroke(
                fill,
                BORDER_BLUE
              );

            doc
              .rect(
                LEFT +
                  labelWidth,
                y,
                valueWidth,
                rowHeight
              )
              .fillAndStroke(
                fill,
                BORDER_BLUE
              );

            setFont(true);

            doc
              .fontSize(6.9)
              .fillColor(BLUE)
              .text(
                row[0],
                LEFT + padding,
                y + 8,
                {
                  width:
                    labelWidth -
                    padding * 2,
                  height: 15
                }
              );

            // Values can contain selected-language text.
            setFont(false, true);

            doc
              .fontSize(7)
              .fillColor(DARK)
              .text(
                safe(row[1]),
                LEFT +
                  labelWidth +
                  padding,
                y + 8,
                {
                  width:
                    valueWidth -
                    padding * 2,
                  height: 15,
                  align: "center"
                }
              );

            y += rowHeight;
          }
        );

        return y;
      }

      // --------------------------------------------------
      // REPORT DATA
      // --------------------------------------------------

      const b = report || {};

      const bs =
        b.businessSummary || {};

      const m =
        b.marketOpportunity || {};

      const c =
        b.localCompetition || {};

      const inv =
        b.investmentPlan || {};

      const fp =
        b.financialProjection || {};

      const fr =
        b.fundingRequirement || {};

      const sw =
        b.swotAnalysis || {};

      const risk =
        b.riskManagement || {};

      const br =
        b.bankReadiness || {};

      const rec =
        b.finalRecommendation || {};

      // --------------------------------------------------
      // LOAN CALCULATIONS
      // --------------------------------------------------

      const projectCost =
        parseMoney(
          inv.estimatedStartupCost
        ) +
        parseMoney(
          inv.workingCapital
        ) +
        parseMoney(
          inv.emergencyReserve
        );

      const loanAmount =
        Number(loan.amount) > 0
          ? Number(loan.amount)
          : parseMoney(
              fr.externalFundingNeed
            );

      const ownContribution =
        parseMoney(
          fr.ownContribution
        ) ||
        parseMoney(
          inv.availableCapital
        );

      const interestRate =
        Number(loan.rate) > 0
          ? Number(loan.rate)
          : 12;

      const tenure =
        Number(loan.tenure) > 0
          ? Number(loan.tenure)
          : 60;

      const emi =
        Number(loan.emi) > 0
          ? Number(loan.emi)
          : calculateEMI(
              loanAmount,
              interestRate,
              tenure
            );

      const totalRepayment =
        Number(loan.total) > 0
          ? Number(loan.total)
          : emi * tenure;

      const totalInterest =
        Number(loan.interest) > 0
          ? Number(loan.interest)
          : Math.max(
              0,
              totalRepayment -
                loanAmount
            );

      // --------------------------------------------------
      // PAGE 1
      // --------------------------------------------------

      drawHeader(
        1,
        "Business Overview"
      );

      let y = 45;

      y = drawTitle(y);

      // Small business identity box
      const identityHeight = 48;
      const half =
        (WIDTH - 10) / 2;

      doc
        .roundedRect(
          LEFT,
          y,
          half,
          identityHeight,
          3
        )
        .fillAndStroke(
          LIGHT_BLUE,
          BORDER_BLUE
        );

      doc
        .roundedRect(
          LEFT + half + 10,
          y,
          half,
          identityHeight,
          3
        )
        .fillAndStroke(
          LIGHT_BLUE,
          BORDER_BLUE
        );

      setFont(true);

      doc
        .fontSize(6.5)
        .fillColor(BLUE)
        .text(
          "BUSINESS",
          LEFT + 8,
          y + 7,
          {
            width: half - 16
          }
        );

      setFont(false, true);

      doc
        .fontSize(8)
        .fillColor(DARK)
        .text(
          summary(
            bs.businessNameOrType
          ),
          LEFT + 8,
          y + 19,
          {
            width: half - 16,
            height: 20
          }
        );

      const rx =
        LEFT + half + 10;

      setFont(true);

      doc
        .fontSize(6.5)
        .fillColor(BLUE)
        .text(
          "LOCATION",
          rx + 8,
          y + 7,
          {
            width: half - 16
          }
        );

      setFont(false, true);

      doc
        .fontSize(8)
        .fillColor(DARK)
        .text(
          summary(
            bs.location
          ),
          rx + 8,
          y + 19,
          {
            width: half - 16,
            height: 20
          }
        );

      y += 61;

      // --------------------------------------------------
      // ONE BUSINESS OVERVIEW TABLE
      // --------------------------------------------------

      const overviewRows = [
        [
          "Business Summary",
          summary(
            bs.businessDescription ||
              bs.businessObjective
          )
        ],

        [
          "Market Opportunity",
          summary(
            [
              m.marketSummary,
              m.targetCustomers,
              m.demandPotential
            ]
              .filter(Boolean)
              .join(" - ")
          )
        ],

        [
          "Local Competition",
          summary(
            [
              c.competitionLevel,
              c.nearbyCompetitors,
              c.recommendedPositioning
            ]
              .filter(Boolean)
              .join(" - ")
          )
        ],

        [
          "SWOT",
          summary(
            [
              sw.strengths,
              sw.weaknesses,
              sw.opportunities,
              sw.threats
            ]
              .filter(Boolean)
              .join(" - ")
          )
        ],

        [
          "Risk Management",
          summary(
            [
              risk.majorRisks,
              risk.riskMitigation
            ]
              .filter(Boolean)
              .join(" - ")
          )
        ],

        [
          "Final Recommendation",
          summary(
            [
              rec.viability,
              rec.recommendation,
              rec.nextStep
            ]
              .filter(Boolean)
              .join(" - ")
          )
        ]
      ];

      y = overviewTable(
        overviewRows,
        y
      );

      // --------------------------------------------------
      // PAGE 2
      // --------------------------------------------------

      doc.addPage();

      drawHeader(
        2,
        "Loan & Monthly Financial Planner"
      );

      y = 45;

      setFont(true);

      doc
        .fontSize(13)
        .fillColor(BLUE)
        .text(
          "Loan & Monthly Financial Planner",
          LEFT,
          y,
          {
            width: WIDTH,
            align: "center"
          }
        );

      y += 27;

      // --------------------------------------------------
      // BANK / LOAN TABLE
      // --------------------------------------------------

      const bankRows = [
        [
          "Total Project Cost",
          projectCost > 0
            ? money(projectCost)
            : "To be determined"
        ],

        [
          "Promoter / Own Contribution",
          ownContribution > 0
            ? money(
                ownContribution
              )
            : "To be determined"
        ],

        [
          "Bank Loan Required",
          loanAmount > 0
            ? money(loanAmount)
            : "To be determined"
        ],

        [
          "Interest Rate",
          `${interestRate}% p.a.`
        ],

        [
          "Loan Tenure",
          `${tenure} months`
        ],

        [
          "Monthly EMI",
          emi > 0
            ? money(
                Math.round(emi)
              )
            : "To be calculated"
        ],

        [
          "Total Interest",
          totalInterest >= 0
            ? money(
                Math.round(
                  totalInterest
                )
              )
            : "To be calculated"
        ],

        [
          "Total Repayment",
          totalRepayment > 0
            ? money(
                Math.round(
                  totalRepayment
                )
              )
            : "To be calculated"
        ],

        [
          "Funding Purpose",
          safe(
            fr.purposeOfFunding
          )
        ],

        [
          "Repayment Approach",
          safe(
            fr.repaymentConsideration
          )
        ]
      ];

      y = financialTable(
        bankRows,
        y
      );

      y += 8;

      // --------------------------------------------------
      // MONTHLY P&L / FINANCIAL PLANNER
      // --------------------------------------------------

      setFont(true);

      doc
        .fontSize(11)
        .fillColor(BLUE)
        .text(
          "Monthly Financial Planner",
          LEFT,
          y,
          {
            width: WIDTH
          }
        );

      y += 18;

      const monthlyRows = [
        [
          "Expected Monthly Revenue",
          safe(
            fp.monthlyRevenue
          )
        ],

        [
          "Expected Monthly Expenses",
          safe(
            fp.monthlyExpenses
          )
        ],

        [
          "Expected Monthly Profit",
          safe(
            fp.expectedMonthlyProfit
          )
        ],

        [
          "Conservative Scenario",
          safe(
            fp.conservativeScenario
          )
        ],

        [
          "Expected Scenario",
          safe(
            fp.expectedScenario
          )
        ],

        [
          "Optimistic Scenario",
          safe(
            fp.optimisticScenario
          )
        ],

        [
          "Break-even",
          safe(
            fp.breakEven,
            "Depends on actual costs and sales"
          )
        ]
      ];

      y = financialTable(
        monthlyRows,
        y
      );

      y += 8;

      // --------------------------------------------------
      // BANK SCHEME ROUTE
      // --------------------------------------------------

      setFont(true);

      doc
        .fontSize(10)
        .fillColor(BLUE)
        .text(
          "Bank Loan / Scheme Route",
          LEFT,
          y,
          {
            width: WIDTH
          }
        );

      y += 16;

      setFont(false, true);

      doc
        .fontSize(7.2)
        .fillColor(DARK)
        .text(
          "Possible routes: MUDRA / PMMY, PMEGP, Stand-Up India where eligible, or a regular Bank MSME loan. Eligibility, subsidy, interest rate, fees, tenure and approval depend on the applicable lender, scheme and submitted documents.",
          LEFT,
          y,
          {
            width: WIDTH,
            lineGap: 1
          }
        );

      y += 34;

      // --------------------------------------------------
      // BANK READINESS
      // --------------------------------------------------

      setFont(true);

      doc
        .fontSize(10)
        .fillColor(BLUE)
        .text(
          "Bank Readiness",
          LEFT,
          y,
          {
            width: WIDTH
          }
        );

      y += 16;

      const readinessRows = [
        [
          "Documents",
          safe(
            br.financialDocumentationNeeded
          )
        ],

        [
          "Business Information",
          safe(
            br.businessInformationNeeded
          )
        ],

        [
          "Readiness Level",
          safe(
            br.readinessLevel
          )
        ]
      ];

      y = financialTable(
        readinessRows,
        y
      );

      // --------------------------------------------------
      // FOOTER
      // --------------------------------------------------

      setFont(false);

      doc
        .fontSize(6.2)
        .fillColor(GREY)
        .text(
          "GramSaarthi AI - Indicative planning report - Verify loan terms and scheme eligibility with the lender.",
          LEFT,
          817,
          {
            width: WIDTH,
            align: "center"
          }
        );

      // --------------------------------------------------
      // END
      // --------------------------------------------------

      doc.end();

    } catch (error) {
      console.error(
        "❌ PDF GENERATION ERROR:",
        error
      );

      reject(error);
    }
  });
}
// ======================================================
// PCM TO WAV
// ======================================================

function pcmToWavBuffer(
  pcmBuffer,
  sampleRate = 24000,
  channels = 1,
  bitsPerSample = 16
) {
  const byteRate =
    (sampleRate *
      channels *
      bitsPerSample) /
    8;

  const blockAlign =
    (channels *
      bitsPerSample) /
    8;

  const h = Buffer.alloc(44);

  h.write(
    "RIFF",
    0
  );

  h.writeUInt32LE(
    36 + pcmBuffer.length,
    4
  );

  h.write(
    "WAVE",
    8
  );

  h.write(
    "fmt ",
    12
  );

  h.writeUInt32LE(
    16,
    16
  );

  h.writeUInt16LE(
    1,
    20
  );

  h.writeUInt16LE(
    channels,
    22
  );

  h.writeUInt32LE(
    sampleRate,
    24
  );

  h.writeUInt32LE(
    byteRate,
    28
  );

  h.writeUInt16LE(
    blockAlign,
    32
  );

  h.writeUInt16LE(
    bitsPerSample,
    34
  );

  h.write(
    "data",
    36
  );

  h.writeUInt32LE(
    pcmBuffer.length,
    40
  );

  return Buffer.concat([
    h,
    pcmBuffer
  ]);
}

// ======================================================
// ANALYZE API
// ======================================================

app.post(
  "/api/analyze",
  async (req, res) => {
    console.log(
      "🔥 GRAMSAARTHI AI REQUEST RECEIVED"
    );

    try {
      if (!groqApiKey) {
        return res.status(500).json({
          success: false,
          error:
            "GROQ_API_KEY is missing from .env"
        });
      }

      const {
        location,
        capital,
        business,
        skills,
        resources,
        language
      } = req.body || {};

      const selectedLanguage =
        language || "English";

      const numericCapital =
        parseMoney(capital);
      // --------------------------------------------
      // LOCAL DATA
      // --------------------------------------------
      let local = {
        status: "dataUnavailable",
        location: {
          query:
            location || "Not provided",
          displayName: "",
          latitude: null,
          longitude: null
        },
        nearbyBusinesses: [],
        competitors: [],
        competitorCount: 0,
        totalNearbyBusinesses: 0,
        searchRadiusKm: 5,
        businessDensity: "Unavailable",
        marketHeat: "Unavailable",
        dataSource:
          "OpenStreetMap / Overpass"
      };
      try {
        if (location) {
          const coords =
            await geocodeLocation(
              location
            );
          if (coords) {
            const raw =
              await getNearbyBusinesses(
                coords.latitude,
                coords.longitude
              );
            const normalized =
              raw
                .map((x) =>
                  normalizeBusiness(
                    x,
                    coords.latitude,
                    coords.longitude
                  )
                )
                .filter(Boolean)
                .sort(
                  (a, b) =>
                    a.distanceKm -
                    b.distanceKm
                );
            const competitors =
              normalized.filter((x) =>
                isLikelyCompetitor(
                  business,
                  x
                )
              );
            let density = "Low";
            if (
              normalized.length > 100
            ) {
              density = "Very High";
            } else if (
              normalized.length > 50
            ) {
              density = "High";
            } else if (
              normalized.length > 20
            ) {
              density = "Moderate";
            }
            local = {
              status: "success",
              location: {
                query: location,
                displayName:
                  coords.displayName,
                latitude:
                  coords.latitude,
                longitude:
                  coords.longitude
              },
              nearbyBusinesses:
                normalized.slice(
                  0,
                  20
                ),
              competitors:
                competitors.slice(
                  0,
                  10
                ),
              competitorCount:
                competitors.length,
              totalNearbyBusinesses:
                normalized.length,
              searchRadiusKm: 5,
              businessDensity:
                density,
              marketHeat:
                calculateMarketHeat(
                  competitors.length,
                  normalized.length
                ),
              dataSource:
                "OpenStreetMap / Overpass"
            };
          }
        }
      } catch (e) {
        console.error(
          "⚠️ LOCAL DATA ERROR:",
          e.message
        );
      }
      // --------------------------------------------
      // PROFILE
      // --------------------------------------------
      const profile = {
        location:
          location || "Not provided",
        availableCapital:
          numericCapital,
        business:
          business || "Not provided",
        skills:
          skills || "Not provided",
        resources:
          resources || "Not provided",
        language:
          selectedLanguage
      };
      // --------------------------------------------
      // AI PROMPT
      // --------------------------------------------
      const prompt = `
Create one complete practical business plan for the selected business "${business}".
USER PROFILE:
${JSON.stringify(profile)}
REAL LOCAL DATA:
${JSON.stringify({
  status: local.status,
  location: local.location,
  competitorCount:
    local.competitorCount,
  totalNearbyBusinesses:
    local.totalNearbyBusinesses,
  searchRadiusKm: 5,
  businessDensity:
    local.businessDensity,
  marketHeat:
    local.marketHeat,
  competitors:
    local.competitors.slice(0, 5)
})}
Return JSON with these top-level keys:
marketReach
opportunity
swot
localThreats
competitors
pricing
businessSimulation
financialEngine
localIntelligence
advancedSimulation
bankReadyReport
recommendation
For bankReadyReport use:
businessSummary
marketOpportunity
localCompetition
businessModel
investmentPlan
financialProjection
fundingRequirement
swotAnalysis
riskManagement
implementationPlan
bankReadiness
finalRecommendation
CRITICAL FINANCIAL RULES:
Provide numeric financial estimates wherever reasonable.
In advancedSimulation.scenarios.conservative/expected/optimistic provide:
monthlyCustomers
averageOrderValue
monthlyRevenue
monthlyExpenses
monthlyProfit
Use numeric INR values for financial fields whenever possible.
In bankReadyReport.investmentPlan provide numeric INR values for:
availableCapital
estimatedStartupCost
workingCapital
emergencyReserve
fundingGap
recommendedInvestment
In bankReadyReport.financialProjection provide:
monthlyRevenue
monthlyExpenses
expectedMonthlyProfit
Keep scenario summaries concise.
In fundingRequirement provide numeric:
externalFundingNeed
fundingRequired
Keep the selected business unchanged.
Use only supplied map data for competitors.
Use estimates, never guarantees.
Arrays maximum 3.
All human-readable text must be in ${selectedLanguage}.
JSON keys remain English.
Do not invent government scheme rules or exact local statistics.
Return ONLY valid JSON.
`;
      // --------------------------------------------
      // AI GENERATION
      // --------------------------------------------
      let finalResult;
      let aiGenerated = true;
      try {
        const aiResponse =
          await generateAIContent(
            prompt,
            selectedLanguage,
            3000
          );
        finalResult =
          cleanJSON(
            aiResponse.text
          );
      } catch (e) {
        console.error(
          "⚠️ GROQ FAILED - USING SAFE FALLBACK:",
          e.message
        );
        aiGenerated = false;
        finalResult =
          buildFallbackReport({
            location,
            capital:
              numericCapital,
            business,
            skills,
            resources,
            localIntelligence:
              local
          });
      }
      finalResult =
        finalResult &&
        typeof finalResult ===
          "object"
          ? finalResult
          : {};
      // --------------------------------------------
      // LOCAL DATA INTO RESULT
      // --------------------------------------------
      finalResult.localIntelligence =
        {
          ...(finalResult.localIntelligence ||
            {}),
          status:
            local.status,
          location:
            local.location,
          competitorCount:
            local.competitorCount,
          totalNearbyBusinesses:
            local.totalNearbyBusinesses,
          marketHeat:
            local.marketHeat,
          businessDensity:
            local.businessDensity,
          competitors:
            local.competitors,
          dataSource:
            local.dataSource
        };
      // --------------------------------------------
      // FINANCIAL ENGINE
      // --------------------------------------------
      finalResult.financialEngine =
        finalResult.financialEngine ||
        {};
      finalResult.financialEngine.capitalPlan =
        finalResult.financialEngine
          .capitalPlan || {};
      finalResult.financialEngine
        .capitalPlan.availableCapital =
        numericCapital;
      // --------------------------------------------
      // BANK REPORT
      // --------------------------------------------
      const bankReadyReport =
        normalizeBankReport(
          finalResult,
          {
            ...profile,
            availableCapital:
              numericCapital
          },
          local
        );
      // --------------------------------------------
      // SCENARIOS
      // --------------------------------------------
      const scenarios =
        numericProjection(
          bankReadyReport
            .financialProjection,
          finalResult
            .advancedSimulation,
          numericCapital
            ? Math.round(
                numericCapital * 0.35
              )
            : 0
        );
      // --------------------------------------------
      // LOAN
      // --------------------------------------------
      let loanAmount =
        parseMoney(
          bankReadyReport
            .fundingRequirement
            .externalFundingNeed
        ) ||
        parseMoney(
          bankReadyReport
            .investmentPlan
            .fundingGap
        );
      const rate =
        Number(
          finalResult.interestRate ||
            bankReadyReport
              .fundingRequirement
              .interestRate ||
            12
        ) || 12;
      const tenure =
        Number(
          finalResult.loanTenureMonths ||
            bankReadyReport
              .fundingRequirement
              .loanTenureMonths ||
            60
        ) || 60;
      const emi =
        calculateEMI(
          loanAmount,
          rate,
          tenure
        );
      const total =
        emi * tenure;
      const interest =
        total - loanAmount;
      // --------------------------------------------
      // PDF
      // --------------------------------------------
      const pdfBuffer =
        await generateBusinessPDF(
          bankReadyReport,
          selectedLanguage,
          {
            amount: loanAmount,
            rate,
            tenure,
            emi,
            total,
            interest,
            scenarios
          }
        );
      // --------------------------------------------
      // RESPONSE
      // --------------------------------------------
      return res.json({
        success: true,
        result:
          JSON.stringify(
            finalResult
          ),
        bankReadyReport,
        aiGenerated,
        pdf: {
          available: true,
          mimeType:
            "application/pdf",
          fileName:
            "GramSaarthi-Business-Report.pdf",
          data:
            pdfBuffer.toString(
              "base64"
            )
        },
        agents: {
          market: true,
          finance: true,
          risk: true,
          simulation: true,
          financialEngine: true,
          localIntelligence: true,
          advancedSimulation: true,
          bankReadyReport: true,
          pdfReport: true,
          combiner: true,
          voiceOutput: true
        }
      });
    } catch (e) {
      console.error(
        "❌ COMPLETE AI ERROR:",
        e
      );
      return res.status(500).json({
        success: false,
        error:
          e?.message ||
          "Business analysis failed. Please try again."
      });
    }
  }
);
// ======================================================
// VOICE API
// ======================================================
app.post(
  "/api/voice",
  async (req, res) => {
    console.log(
      "🔊 VOICE OUTPUT REQUEST RECEIVED"
    );
    try {
      if (!ai) {
        return res.status(500).json({
          success: false,
          error:
            "GEMINI_API_KEY is missing from .env"
        });
      }
      const {
        text,
        language
      } = req.body || {};
      const selectedLanguage =
        language || "English";
      if (
        !text ||
        !String(text).trim()
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Text is required for voice output."
        });
      }
      const voiceResponse =
        await ai.models.generateContent({
          model:
            "gemini-3.1-flash-tts-preview",
          contents: [
            {
              parts: [
                {
                  text: `
Read the following business guidance naturally and clearly.
Language: ${selectedLanguage}.
Speak ONLY the provided text.
Do not add information or translate.
Text:
${String(text)}
`
                }
              ]
            }
          ],
          config: {
            responseModalities: [
              "AUDIO"
            ],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Kore"
                }
              }
            }
          }
        });
      const audioData =
        voiceResponse
          .candidates?.[0]
          ?.content?.parts
          ?.find(
            (p) =>
              p.inlineData
          )
          ?.inlineData?.data;
      if (!audioData) {
        throw new Error(
          "Gemini did not return audio data."
        );
      }
      const wav =
        pcmToWavBuffer(
          Buffer.from(
            audioData,
            "base64"
          ),
          24000,
          1,
          16
        );
      return res.json({
        success: true,
        language:
          selectedLanguage,

        mimeType:
          "audio/wav",

        audio:
          wav.toString(
            "base64"
          )
      });
    } catch (e) {
      console.error(
        "❌ VOICE ERROR:",
        e
      );

      return res.status(500).json({
        success: false,
        error:
          e?.message ||
          String(e)
      });
    }
  }
);
// ======================================================
// SERVER
// ======================================================
const PORT =
  process.env.PORT || 5000;
app.listen(
  PORT,
  () =>
    console.log(
      `🌱 GramSaarthi backend running on http://localhost:${PORT}`
    )
);