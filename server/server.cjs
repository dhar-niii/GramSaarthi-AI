const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PDFDocument = require("pdfkit");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing from .env");
} else {
  console.log("🔑 Gemini API key loaded");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// =====================================================
// SIMPLE BACKEND TEST
// =====================================================

app.get("/test", (req, res) => {
  console.log("🔥 TEST REQUEST RECEIVED");

  res.json({
    message: "Backend is working!",
  });
});

// =====================================================
// STAGE 7 — LOCAL INTELLIGENCE HELPERS
// =====================================================

// Convert location name into latitude / longitude
async function geocodeLocation(location) {
  if (!location) {
    return null;
  }

  try {
    const url =
      "https://nominatim.openstreetmap.org/search" +
      `?q=${encodeURIComponent(location)}` +
      "&format=json&limit=1";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "GramSaarthiAI/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Nominatim HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return {
      latitude: Number(data[0].lat),
      longitude: Number(data[0].lon),
      displayName: data[0].display_name || location,
    };
  } catch (error) {
    console.error("⚠️ GEOCODING ERROR:", error.message);
    return null;
  }
}

// Find nearby businesses using Overpass API
async function getNearbyBusinesses(latitude, longitude) {
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
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "GramSaarthiAI/1.0",
        },
        body: `data=${encodeURIComponent(query)}`,
      }
    );

    if (!response.ok) {
      throw new Error(`Overpass HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.elements)) {
      return [];
    }

    return data.elements;
  } catch (error) {
    console.error("⚠️ OVERPASS ERROR:", error.message);
    return [];
  }
}

// Calculate approximate distance between two coordinates
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

// Convert OSM result into a clean business object
function normalizeBusiness(element, centerLat, centerLon) {
  const tags = element.tags || {};

  let latitude = element.lat;
  let longitude = element.lon;

  if (
    element.center &&
    Number.isFinite(Number(element.center.lat)) &&
    Number.isFinite(Number(element.center.lon))
  ) {
    latitude = Number(element.center.lat);
    longitude = Number(element.center.lon);
  }

  if (
    !Number.isFinite(Number(latitude)) ||
    !Number.isFinite(Number(longitude))
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

  const distance = calculateDistanceKm(
    centerLat,
    centerLon,
    Number(latitude),
    Number(longitude)
  );

  return {
    name,
    category,
    distanceKm: Number(distance.toFixed(2)),
  };
}

// Determine whether an OSM business is likely a competitor
function isLikelyCompetitor(businessCategory, osmBusiness) {
  const business = String(businessCategory || "").toLowerCase();
  const category = String(osmBusiness.category || "").toLowerCase();
  const name = String(osmBusiness.name || "").toLowerCase();

  const keywordGroups = [
    {
      keywords: ["dairy", "milk", "milk shop", "milk products"],
      matches: ["dairy", "milk", "cheese", "ice_cream"],
    },
    {
      keywords: ["poultry", "chicken", "egg", "eggs"],
      matches: ["poultry", "butcher", "farm"],
    },
    {
      keywords: ["bakery", "baking"],
      matches: ["bakery", "pastry", "confectionery"],
    },
    {
      keywords: ["tailoring", "tailor", "clothing", "garment"],
      matches: ["tailor", "clothes", "clothing", "fabric"],
    },
    {
      keywords: ["restaurant", "food", "catering", "cafe"],
      matches: ["restaurant", "cafe", "fast_food", "food"],
    },
    {
      keywords: ["vegetable", "vegetables", "grocery"],
      matches: [
        "greengrocer",
        "supermarket",
        "convenience",
        "grocery",
      ],
    },
    {
      keywords: ["handicraft", "handicrafts", "craft"],
      matches: ["craft", "art", "gift"],
    },
    {
      keywords: [
        "farming",
        "farm",
        "agriculture",
        "organic farming",
      ],
      matches: ["farm", "agriculture", "garden_centre"],
    },
    {
      keywords: ["vermicompost", "compost", "organic"],
      matches: ["garden_centre", "farm", "agrarian"],
    },
  ];

  for (const group of keywordGroups) {
    const businessMatches = group.keywords.some((keyword) =>
      business.includes(keyword)
    );

    if (businessMatches) {
      const osmMatches =
        group.matches.some((keyword) =>
          category.includes(keyword)
        ) ||
        group.matches.some((keyword) =>
          name.includes(keyword)
        );

      if (osmMatches) {
        return true;
      }
    }
  }

  const words = business
    .split(/[\s,/&-]+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 4);

  return words.some(
    (word) =>
      category.includes(word) ||
      name.includes(word)
  );
}

// Calculate market heat
function calculateMarketHeat(
  competitorCount,
  totalBusinesses
) {
  if (totalBusinesses === 0) {
    return "Low Data";
  }

  if (competitorCount === 0) {
    return "Low Competition";
  }

  if (competitorCount <= 3) {
    return "Low to Moderate";
  }

  if (competitorCount <= 8) {
    return "Moderate";
  }

  return "High Competition";
}

// =====================================================
// SAFE JSON PARSER
// =====================================================

function cleanJSON(text) {
  if (!text) {
    throw new Error("AI returned an empty response.");
  }

  let cleaned = String(text).trim();

  cleaned = cleaned
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (
    firstBrace !== -1 &&
    lastBrace !== -1 &&
    lastBrace > firstBrace
  ) {
    cleaned = cleaned.slice(
      firstBrace,
      lastBrace + 1
    );
  }

  return JSON.parse(cleaned);
}

// =====================================================
// STAGE 10 — PDF HELPERS
// =====================================================

function formatPdfValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => formatPdfValue(item))
      .join("\n");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, val]) => {
        const readableKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (char) =>
            char.toUpperCase()
          );

        return `${readableKey}: ${formatPdfValue(val)}`;
      })
      .join("\n");
  }

  return String(value);
}

function addPdfSection(doc, title, value) {
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text(title);

  doc.moveDown(0.3);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(formatPdfValue(value));

  doc.moveDown(0.8);
}

function generateBusinessPDF(
  report,
  language = "English"
) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title:
            report.reportTitle ||
            "GramSaarthi AI Business Report",
          Author: "GramSaarthi AI",
          Subject: "Business Planning Report",
        },
      });

      const chunks = [];

      doc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on("error", reject);

      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .text(
          report.reportTitle ||
            "GramSaarthi AI Business Planning Report",
          {
            align: "center",
          }
        );

      doc.moveDown(0.5);

      doc
        .fontSize(10)
        .font("Helvetica")
        .text(`Language: ${language}`, {
          align: "center",
        });

      doc.moveDown(1.5);

      doc
        .fontSize(9)
        .font("Helvetica")
        .text(
          "This report contains AI-assisted planning estimates. " +
            "It is not a guarantee of business success, profit, " +
            "funding approval, or loan approval."
        );

      doc.moveDown(1.2);

      addPdfSection(
        doc,
        "1. Business Summary",
        report.businessSummary
      );

      addPdfSection(
        doc,
        "2. Market Opportunity",
        report.marketOpportunity
      );

      addPdfSection(
        doc,
        "3. Local Competition",
        report.localCompetition
      );

      addPdfSection(
        doc,
        "4. Business Model",
        report.businessModel
      );

      addPdfSection(
        doc,
        "5. Investment Plan",
        report.investmentPlan
      );

      addPdfSection(
        doc,
        "6. Financial Projection",
        report.financialProjection
      );

      addPdfSection(
        doc,
        "7. Funding Requirement",
        report.fundingRequirement
      );

      addPdfSection(
        doc,
        "8. SWOT Analysis",
        report.swotAnalysis
      );

      addPdfSection(
        doc,
        "9. Risk Management",
        report.riskManagement
      );

      addPdfSection(
        doc,
        "10. Implementation Plan",
        report.implementationPlan
      );

      addPdfSection(
        doc,
        "11. Bank Readiness",
        report.bankReadiness
      );

      addPdfSection(
        doc,
        "12. Final Recommendation",
        report.finalRecommendation
      );

      doc.moveDown(1);

      doc
        .fontSize(8)
        .font("Helvetica")
        .text("Generated by GramSaarthi AI", {
          align: "center",
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

// =====================================================
// STAGE 11 — PCM TO WAV
// =====================================================

function pcmToWavBuffer(
  pcmBuffer,
  sampleRate = 24000,
  channels = 1,
  bitsPerSample = 16
) {
  const byteRate =
    (sampleRate * channels * bitsPerSample) / 8;

  const blockAlign =
    (channels * bitsPerSample) / 8;

  const wavHeader = Buffer.alloc(44);

  wavHeader.write("RIFF", 0);

  wavHeader.writeUInt32LE(
    36 + pcmBuffer.length,
    4
  );

  wavHeader.write("WAVE", 8);

  wavHeader.write("fmt ", 12);

  wavHeader.writeUInt32LE(16, 16);

  wavHeader.writeUInt16LE(1, 20);

  wavHeader.writeUInt16LE(
    channels,
    22
  );

  wavHeader.writeUInt32LE(
    sampleRate,
    24
  );

  wavHeader.writeUInt32LE(
    byteRate,
    28
  );

  wavHeader.writeUInt16LE(
    blockAlign,
    32
  );

  wavHeader.writeUInt16LE(
    bitsPerSample,
    34
  );

  wavHeader.write("data", 36);

  wavHeader.writeUInt32LE(
    pcmBuffer.length,
    40
  );

  return Buffer.concat([
    wavHeader,
    pcmBuffer,
  ]);
}

// =====================================================
// MAIN AI ENDPOINT
// =====================================================

app.post("/api/analyze", async (req, res) => {
  console.log(
    "🔥 MULTI-AGENT AI REQUEST RECEIVED"
  );

  console.log("User data:", req.body);

  try {
    if (!ai) {
      return res.status(500).json({
        success: false,
        error:
          "GEMINI_API_KEY is missing from .env",
      });
    }

    const {
      location,
      capital,
      business,
      skills,
      resources,
      language,
    } = req.body;

    const selectedLanguage =
      language || "English";

    console.log(
      "🌐 SELECTED LANGUAGE:",
      selectedLanguage
    );

    const userProfile = `
Location: ${location || "Not provided"}
Available Capital: ₹${capital || "Not provided"}
Business Category: ${business || "Not provided"}
Skills: ${skills || "Not provided"}
Resources: ${resources || "Not provided"}
Language: ${selectedLanguage}
`;

    // =================================================
    // AGENT 1 — MARKET RESEARCH
    // =================================================

    const marketPrompt = `
You are the Market Research Agent of GramSaarthi AI.

Analyze ONLY this selected business category:

"${business}"

Entrepreneur information:

${userProfile}

Focus on:

1. Estimated market reach in a rural/semi-urban area.
2. Likely primary customers.
3. Practical distribution channels.
4. Local opportunity.
5. Possible competitors and competitive advantage.

IMPORTANT:

- This is an estimate, NOT live GPS data.
- Do not claim verified local market data.
- Do not invent exact competitor counts.
- Clearly distinguish estimates from verified facts.
- Keep advice practical for a small entrepreneur.
- Do not change the selected business category.

Return ONLY valid JSON.

Use exactly this structure:

{
  "marketReach": {
    "summary": "",
    "primaryCustomers": "",
    "distributionChannels": ""
  },
  "opportunity": {
    "summary": "",
    "underservedNeeds": []
  },
  "competitors": {
    "summary": "",
    "mainCompetitors": [],
    "competitiveAdvantage": ""
  }
}
`;

    const marketResponse =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: marketPrompt,
        config: {
          systemInstruction:
            `Always answer in ${selectedLanguage}. ` +
            `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
            `Keep JSON keys in English.`,
        },
      });

    console.log(
      "✅ MARKET AGENT COMPLETED"
    );

    // =================================================
    // AGENT 2 — FINANCIAL PLANNER
    // =================================================

    const financePrompt = `
You are the Financial Planning Agent of GramSaarthi AI.

Analyze ONLY this selected business category:

"${business}"

Entrepreneur information:

${userProfile}

Focus on:

1. Whether the available capital appears suitable as a starting point.
2. Practical pricing strategy.
3. Basic financial planning.
4. How the entrepreneur can control expenses.
5. Whether starting small would be sensible.

IMPORTANT:

- Do not invent government scheme rules.
- Do not invent exact loan amounts, interest rates, EMI values, or guaranteed profits.
- Do not present uncertain financial figures as facts.
- Give practical guidance suitable for a small rural/semi-urban entrepreneur.
- Do not change the selected business category.

Return ONLY valid JSON.

Use exactly this structure:

{
  "pricing": {
    "strategy": "",
    "suggestion": "",
    "reason": ""
  },
  "financialAssessment": {
    "summary": "",
    "capitalFit": "",
    "costControl": []
  }
}
`;

    const financeResponse =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: financePrompt,
        config: {
          systemInstruction:
            `Always answer in ${selectedLanguage}. ` +
            `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
            `Keep JSON keys in English.`,
        },
      });

    console.log(
      "✅ FINANCIAL AGENT COMPLETED"
    );

    // =================================================
    // AGENT 3 — RISK ASSESSOR
    // =================================================

    const riskPrompt = `
You are the Risk Assessment Agent of GramSaarthi AI.

Analyze ONLY this selected business category:

"${business}"

Entrepreneur information:

${userProfile}

Identify:

1. Strengths.
2. Weaknesses.
3. Opportunities.
4. Threats.
5. Local business risks.
6. Practical ways to reduce those risks.

IMPORTANT:

- Do not invent verified local facts.
- Do not claim exact competitor numbers.
- Keep risks realistic and practical.
- Advice must be suitable for a small rural/semi-urban entrepreneur.
- Do not change the selected business category.

Return ONLY valid JSON.

Use exactly this structure:

{
  "swot": {
    "strengths": [],
    "weaknesses": [],
    "opportunities": [],
    "threats": []
  },
  "localThreats": []
}
`;

    const riskResponse =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: riskPrompt,
        config: {
          systemInstruction:
            `Always answer in ${selectedLanguage}. ` +
            `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
            `Keep JSON keys in English.`,
        },
      });

    console.log(
      "✅ RISK AGENT COMPLETED"
    );

    // =================================================
    // PARSE AGENT RESPONSES
    // =================================================

    let marketAgent;
    let financeAgent;
    let riskAgent;

    try {
      marketAgent = cleanJSON(
        marketResponse.text
      );

      financeAgent = cleanJSON(
        financeResponse.text
      );

      riskAgent = cleanJSON(
        riskResponse.text
      );
    } catch (parseError) {
      console.error(
        "❌ AGENT JSON PARSE ERROR:",
        parseError
      );

      return res.status(500).json({
        success: false,
        error:
          "AI agents returned invalid JSON.",
      });
    }

    console.log(
      "🧠 ALL 3 AGENTS PARSED SUCCESSFULLY"
    );

    // =================================================
    // STAGE 5 — BUSINESS SIMULATION
    // =================================================

    const simulationPrompt = `
You are the Business Simulation Agent of GramSaarthi AI.

Simulate ONLY this selected business category:

"${business}"

Entrepreneur information:

${userProfile}

Existing AI analysis:

MARKET AGENT:
${JSON.stringify(marketAgent)}

FINANCIAL AGENT:
${JSON.stringify(financeAgent)}

RISK AGENT:
${JSON.stringify(riskAgent)}

Create a practical business simulation.

This is a planning estimate, NOT a prediction or guarantee.

Analyze:

1. Whether to start very small, at a moderate scale, or reconsider the timing.
2. The 3-month, 6-month, and 12-month outlook.
3. Best-case, expected-case, and challenging-case scenarios.
4. Revenue and expense direction.
5. Break-even timing when it can reasonably be estimated.
6. Key assumptions.
7. Actions that could improve the expected outcome.
8. Warning signs that require adjustment.

IMPORTANT:

- Do NOT guarantee profit, revenue, customers, or success.
- Do NOT invent exact local market statistics.
- Do NOT invent government scheme rules.
- Do NOT invent exact loan amounts, interest rates, EMI values, or guaranteed returns.
- If exact figures cannot be justified, use qualitative levels or clearly labelled estimates/ranges.
- Keep advice practical for a small rural/semi-urban entrepreneur.
- Analyze ONLY "${business}".

Return ONLY valid JSON.

Use exactly this structure:

{
  "startingStrategy": {
    "recommendation": "",
    "reason": ""
  },
  "timeline": {
    "month3": {
      "outlook": "",
      "revenueDirection": "",
      "expenseDirection": "",
      "priority": ""
    },
    "month6": {
      "outlook": "",
      "revenueDirection": "",
      "expenseDirection": "",
      "priority": ""
    },
    "month12": {
      "outlook": "",
      "revenueDirection": "",
      "expenseDirection": "",
      "priority": ""
    }
  },
  "scenarios": {
    "bestCase": {
      "outcome": "",
      "conditions": []
    },
    "expectedCase": {
      "outcome": "",
      "conditions": []
    },
    "challengingCase": {
      "outcome": "",
      "conditions": []
    }
  },
  "breakEven": {
    "estimate": "",
    "explanation": ""
  },
  "assumptions": [],
  "improvementActions": [],
  "warningSigns": []
}
`;

    console.log(
      "🎮 RUNNING STAGE 5 BUSINESS SIMULATION..."
    );

    const simulationResponse =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: simulationPrompt,
        config: {
          systemInstruction:
            `Always answer in ${selectedLanguage}. ` +
            `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
            `Keep JSON keys in English.`,
        },
      });

    let simulationAgent;

    try {
      simulationAgent = cleanJSON(
        simulationResponse.text
      );
    } catch (parseError) {
      console.error(
        "❌ SIMULATION JSON PARSE ERROR:",
        parseError
      );

      return res.status(500).json({
        success: false,
        error:
          "Business simulation agent returned invalid JSON.",
      });
    }

    console.log(
      "🧠 STAGE 5 SIMULATION PARSED SUCCESSFULLY"
    );

    // =================================================
    // STAGE 6 — FINANCIAL ENGINE
    // =================================================

    const numericCapital = Number(
      String(capital || "").replace(
        /[^0-9.]/g,
        ""
      )
    );

    const financialEnginePrompt = `
You are the Financial Engine of GramSaarthi AI.

Build a practical financial planning model ONLY for this selected business category:

"${business}"

Entrepreneur information:

${userProfile}

Previous financial analysis:

${JSON.stringify(financeAgent)}

Stage 5 business simulation:

${JSON.stringify(simulationAgent)}

This is an ESTIMATE for planning, not a promise of income or profit.

Calculate or estimate:

1. Recommended allocation of available starting capital.
2. One-time setup costs.
3. Initial working-capital requirement.
4. Emergency/cash reserve.
5. Expected monthly fixed costs.
6. Expected monthly variable-cost level.
7. Practical pricing/unit-economics approach.
8. Approximate monthly sales needed to cover operating costs.
9. Approximate break-even period when enough information exists.
10. Simple monthly cash-management plan.
11. Financial warning signals.
12. Actions to improve cash flow.

IMPORTANT:

- Analyze ONLY "${business}".
- Do not invent government scheme rules.
- Do not claim guaranteed profit.
- Financial values are estimates.
- Use reasonable ranges where appropriate.
- Never assume all available capital should be spent immediately.
- Keep a safety reserve.
- Use Indian Rupees.
- All human-readable values must be written in ${selectedLanguage}.

Return ONLY valid JSON.

Use exactly this structure:

{
  "capitalPlan": {
    "availableCapital": 0,
    "capitalStatus": "",
    "recommendedAllocation": {
      "setup": "",
      "inventoryOrInputs": "",
      "workingCapital": "",
      "reserve": ""
    },
    "reason": ""
  },
  "startupCosts": {
    "estimatedRange": "",
    "majorCosts": []
  },
  "monthlyCosts": {
    "fixedCosts": "",
    "variableCosts": "",
    "costControl": []
  },
  "unitEconomics": {
    "pricingApproach": "",
    "costPerUnit": "",
    "sellingPricePerUnit": "",
    "estimatedMargin": "",
    "importantNote": ""
  },
  "breakEven": {
    "salesNeeded": "",
    "timeEstimate": "",
    "calculationBasis": ""
  },
  "cashFlowPlan": {
    "month1": "",
    "month2": "",
    "month3": "",
    "ongoingRule": ""
  },
  "warningSignals": [],
  "financialActions": []
}
`;

    console.log(
      "💰 RUNNING STAGE 6 FINANCIAL ENGINE..."
    );

    const financialEngineResponse =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: financialEnginePrompt,
        config: {
          systemInstruction:
            `Always answer in ${selectedLanguage}. ` +
            `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
            `Keep JSON keys in English.`,
        },
      });

    let financialEngine;

    try {
      financialEngine = cleanJSON(
        financialEngineResponse.text
      );
    } catch (parseError) {
      console.error(
        "❌ FINANCIAL ENGINE JSON PARSE ERROR:",
        parseError
      );

      return res.status(500).json({
        success: false,
        error:
          "Financial engine returned invalid JSON.",
      });
    }

    if (
      Number.isFinite(numericCapital) &&
      numericCapital > 0
    ) {
      financialEngine.capitalPlan =
        financialEngine.capitalPlan || {};

      financialEngine.capitalPlan.availableCapital =
        numericCapital;
    }

    console.log(
      "🧠 STAGE 6 FINANCIAL ENGINE PARSED SUCCESSFULLY"
    );

    // =================================================
    // STAGE 7 — LOCAL INTELLIGENCE
    // =================================================

    console.log(
      "📍 RUNNING STAGE 7 LOCAL INTELLIGENCE..."
    );

    let localIntelligence = {
      status: "dataUnavailable",

      location: {
        query: location || "Not provided",
        displayName: "",
        latitude: null,
        longitude: null,
      },

      nearbyBusinesses: [],
      competitors: [],
      competitorCount: 0,
      totalNearbyBusinesses: 0,
      searchRadiusKm: 5,
      businessDensity: "Unavailable",
      marketHeat: "Unavailable",
      opportunities: [],
      risks: [],
      dataSource:
        "OpenStreetMap / Overpass",
    };

    try {
      if (location) {
        const coordinates =
          await geocodeLocation(location);

        if (coordinates) {
          console.log(
            `📍 LOCATION FOUND: ${coordinates.latitude}, ${coordinates.longitude}`
          );

          const osmBusinesses =
            await getNearbyBusinesses(
              coordinates.latitude,
              coordinates.longitude
            );

          console.log(
            `🏪 OSM BUSINESSES FOUND: ${osmBusinesses.length}`
          );

          const normalizedBusinesses =
            osmBusinesses
              .map((item) =>
                normalizeBusiness(
                  item,
                  coordinates.latitude,
                  coordinates.longitude
                )
              )
              .filter(Boolean)
              .sort(
                (a, b) =>
                  a.distanceKm - b.distanceKm
              );

          const competitors =
            normalizedBusinesses.filter(
              (item) =>
                isLikelyCompetitor(
                  business,
                  item
                )
            );

          let density = "Low";

          if (
            normalizedBusinesses.length > 100
          ) {
            density = "Very High";
          } else if (
            normalizedBusinesses.length > 50
          ) {
            density = "High";
          } else if (
            normalizedBusinesses.length > 20
          ) {
            density = "Moderate";
          }

          const marketHeat =
            calculateMarketHeat(
              competitors.length,
              normalizedBusinesses.length
            );

          localIntelligence = {
            status: "success",

            location: {
              query: location,
              displayName:
                coordinates.displayName,
              latitude:
                coordinates.latitude,
              longitude:
                coordinates.longitude,
            },

            nearbyBusinesses:
              normalizedBusinesses
                .slice(0, 30)
                .map((item) => ({
                  name: item.name,
                  category: item.category,
                  distanceKm:
                    item.distanceKm,
                })),

            competitors: competitors
              .slice(0, 20)
              .map((item) => ({
                name: item.name,
                category: item.category,
                distanceKm:
                  item.distanceKm,
              })),

            competitorCount:
              competitors.length,

            totalNearbyBusinesses:
              normalizedBusinesses.length,

            searchRadiusKm: 5,
            businessDensity: density,
            marketHeat,

            opportunities: [],
            risks: [],

            dataSource:
              "OpenStreetMap / Overpass",
          };

          console.log(
            `🥊 COMPETITORS DETECTED: ${competitors.length}`
          );

          console.log(
            `🔥 MARKET HEAT: ${marketHeat}`
          );
        } else {
          console.log(
            "⚠️ LOCATION COULD NOT BE GEOCODED"
          );
        }
      } else {
        console.log(
          "⚠️ LOCATION NOT PROVIDED"
        );
      }
    } catch (mapError) {
      console.error(
        "⚠️ STAGE 7 MAP ANALYSIS ERROR:",
        mapError.message
      );
    }

    // =================================================
    // STAGE 7 — AI INTERPRETATION
    // =================================================

    const localInterpretationPrompt = `
You are the Local Intelligence Agent of GramSaarthi AI.

Analyze ONLY this selected business category:

"${business}"

Entrepreneur location:

"${location || "Not provided"}"

Actual OpenStreetMap/Overpass data:

${JSON.stringify(localIntelligence)}

Interpret the available local data.

IMPORTANT:

- Do NOT invent businesses.
- Do NOT invent competitor counts.
- Use ONLY the supplied map data for factual local claims.
- If status is "dataUnavailable", clearly say that live local map data was unavailable.
- Nearby businesses are not automatically direct competitors.
- Keep interpretation practical.
- All human-readable values must be written in ${selectedLanguage}.
- Keep JSON keys in English.

Return ONLY valid JSON.

Use exactly this structure:

{
  "summary": "",
  "competitionAssessment": "",
  "marketHeatExplanation": "",
  "opportunities": [],
  "risks": [],
  "locationAdvice": ""
}
`;

    try {
      const localInterpretationResponse =
        await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents:
            localInterpretationPrompt,
          config: {
            systemInstruction:
              `Always answer in ${selectedLanguage}. ` +
              `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
              `Keep JSON keys in English.`,
          },
        });

      const localInterpretation =
        cleanJSON(
          localInterpretationResponse.text
        );

      localIntelligence.aiInterpretation =
        localInterpretation;

      console.log(
        "✅ STAGE 7 LOCAL INTERPRETATION COMPLETED"
      );
    } catch (localAIError) {
      console.error(
        "⚠️ LOCAL INTERPRETATION ERROR:",
        localAIError.message
      );

      localIntelligence.aiInterpretation = {
        summary:
          localIntelligence.status ===
          "success"
            ? "Local map data was collected, but AI interpretation was unavailable."
            : "Local map data was unavailable.",

        competitionAssessment: "",
        marketHeatExplanation: "",
        opportunities: [],
        risks: [],
        locationAdvice: "",
      };
    }

    console.log(
      "🧠 STAGE 7 LOCAL INTELLIGENCE COMPLETE"
    );

    // =================================================
    // STAGE 8 — ADVANCED BUSINESS SIMULATION
    // =================================================

    console.log(
      "🚀 STAGE 8: RUNNING ADVANCED BUSINESS SIMULATION..."
    );

    const advancedSimulationPrompt = `
You are the Advanced Business Simulation Agent for GramSaarthi AI.

Simulate how the user's proposed business could perform under different realistic operating conditions.

USER PROFILE:

${userProfile}

EXISTING BUSINESS SIMULATION:

${JSON.stringify(
  simulationAgent,
  null,
  2
)}

FINANCIAL ENGINE:

${JSON.stringify(
  financialEngine,
  null,
  2
)}

LOCAL INTELLIGENCE:

${JSON.stringify(
  localIntelligence,
  null,
  2
)}

Create a realistic business simulation.

IMPORTANT:

- Do NOT invent highly precise facts when input data is uncertain.
- Use reasonable estimates and clearly label them as estimates.
- Consider available capital.
- Consider nearby competitors and market heat.
- Consider startup costs and monthly expenses.
- Consider realistic customer growth.
- Consider pricing and expected sales volume.
- Do not guarantee profit.
- If information is insufficient, say so clearly.
- All human-readable values MUST be written in ${selectedLanguage}.
- JSON keys MUST remain in English.

Return ONLY valid JSON.

Use exactly this structure:

{
  "businessModel": {
    "startingScale": "",
    "targetCustomers": "",
    "mainRevenueSource": "",
    "pricingStrategy": ""
  },

  "assumptions": [
    "",
    "",
    ""
  ],

  "scenarios": {
    "conservative": {
      "monthlyCustomers": "",
      "averageOrderValue": "",
      "monthlyRevenue": "",
      "monthlyExpenses": "",
      "monthlyProfit": "",
      "breakEvenEstimate": "",
      "riskLevel": ""
    },

    "expected": {
      "monthlyCustomers": "",
      "averageOrderValue": "",
      "monthlyRevenue": "",
      "monthlyExpenses": "",
      "monthlyProfit": "",
      "breakEvenEstimate": "",
      "riskLevel": ""
    },

    "optimistic": {
      "monthlyCustomers": "",
      "averageOrderValue": "",
      "monthlyRevenue": "",
      "monthlyExpenses": "",
      "monthlyProfit": "",
      "breakEvenEstimate": "",
      "riskLevel": ""
    }
  },

  "capitalImpact": {
    "availableCapital": "",
    "recommendedStartingInvestment": "",
    "remainingReserve": "",
    "capitalAdequacy": "",
    "reason": ""
  },

  "competitionImpact": {
    "competitionLevel": "",
    "effectOnPricing": "",
    "effectOnCustomers": "",
    "recommendedStrategy": ""
  },

  "growthPlan": {
    "month1": "",
    "month2": "",
    "month3": "",
    "months4to6": "",
    "longTerm": ""
  },

  "warningSignals": [
    "",
    "",
    ""
  ],

  "decision": {
    "viability": "",
    "recommendedAction": "",
    "startingAdvice": ""
  }
}
`;

    let advancedSimulation;

    try {
      const advancedSimulationResponse =
        await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents:
            advancedSimulationPrompt,
          config: {
            systemInstruction:
              `Always answer in ${selectedLanguage}. ` +
              `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
              `Keep JSON keys in English.`,
          },
        });

      advancedSimulation =
        cleanJSON(
          advancedSimulationResponse.text
        );

      console.log(
        "✅ STAGE 8 ADVANCED SIMULATION COMPLETED"
      );
    } catch (advancedSimulationError) {
      console.error(
        "❌ STAGE 8 ADVANCED SIMULATION ERROR:",
        advancedSimulationError
      );

      advancedSimulation = {
        businessModel: {
          startingScale: "",
          targetCustomers: "",
          mainRevenueSource: "",
          pricingStrategy: "",
        },

        assumptions: [],

        scenarios: {
          conservative: {},
          expected: {},
          optimistic: {},
        },

        capitalImpact: {
          availableCapital:
            numericCapital || 0,
          recommendedStartingInvestment:
            "",
          remainingReserve: "",
          capitalAdequacy: "",
          reason: "",
        },

        competitionImpact: {
          competitionLevel: "",
          effectOnPricing: "",
          effectOnCustomers: "",
          recommendedStrategy: "",
        },

        growthPlan: {
          month1: "",
          month2: "",
          month3: "",
          months4to6: "",
          longTerm: "",
        },

        warningSignals: [],

        decision: {
          viability: "",
          recommendedAction: "",
          startingAdvice: "",
        },
      };
    }

    // =================================================
    // STAGE 9 — BANK-READY BUSINESS REPORT
    // =================================================

    console.log(
      "🏦 STAGE 9: GENERATING BANK-READY REPORT..."
    );

    const bankReportPrompt = `
You are the Bank-Ready Business Report Agent for GramSaarthi AI.

Prepare a professional business report using ALL available analysis below.

USER PROFILE:
${userProfile}

MARKET RESEARCH:
${JSON.stringify(marketAgent, null, 2)}

FINANCIAL PLANNER:
${JSON.stringify(financeAgent, null, 2)}

RISK ANALYSIS:
${JSON.stringify(riskAgent, null, 2)}

BUSINESS SIMULATION:
${JSON.stringify(simulationAgent, null, 2)}

FINANCIAL ENGINE:
${JSON.stringify(financialEngine, null, 2)}

LOCAL INTELLIGENCE:
${JSON.stringify(localIntelligence, null, 2)}

ADVANCED BUSINESS SIMULATION:
${JSON.stringify(advancedSimulation, null, 2)}

Create a clear, realistic and professional report.

IMPORTANT:

- This is a planning report, NOT a guarantee of loan approval.
- Do not claim that a bank will definitely approve funding.
- Clearly distinguish estimates from confirmed information.
- Do not invent government schemes or bank policies.
- Consider local competition.
- Consider available capital.
- Consider risks.
- Make the recommendation practical.
- All human-readable values MUST be written in ${selectedLanguage}.
- JSON keys MUST remain in English.

Return ONLY valid JSON.

Use exactly this structure:

{
  "reportTitle": "",

  "businessSummary": {
    "businessNameOrType": "",
    "location": "",
    "businessDescription": "",
    "entrepreneurProfile": "",
    "businessObjective": ""
  },

  "marketOpportunity": {
    "marketSummary": "",
    "targetCustomers": "",
    "customerNeed": "",
    "demandPotential": "",
    "localMarketCondition": ""
  },

  "localCompetition": {
    "competitionLevel": "",
    "nearbyCompetitors": "",
    "competitiveAdvantages": [],
    "recommendedPositioning": ""
  },

  "businessModel": {
    "productsOrServices": [],
    "revenueSource": "",
    "pricingStrategy": "",
    "salesStrategy": ""
  },

  "investmentPlan": {
    "availableCapital": "",
    "estimatedStartupCost": "",
    "workingCapital": "",
    "emergencyReserve": "",
    "fundingGap": "",
    "recommendedInvestment": ""
  },

  "financialProjection": {
    "monthlyRevenue": "",
    "monthlyExpenses": "",
    "expectedMonthlyProfit": "",
    "conservativeScenario": "",
    "expectedScenario": "",
    "optimisticScenario": "",
    "breakEven": ""
  },

  "fundingRequirement": {
    "fundingRequired": "",
    "purposeOfFunding": [],
    "ownContribution": "",
    "externalFundingNeed": "",
    "repaymentConsideration": ""
  },

  "swotAnalysis": {
    "strengths": [],
    "weaknesses": [],
    "opportunities": [],
    "threats": []
  },

  "riskManagement": {
    "majorRisks": [],
    "riskMitigation": [],
    "earlyWarningSignals": []
  },

  "implementationPlan": {
    "first30Days": [],
    "days31to90": [],
    "months4to6": [],
    "longTerm": []
  },

  "bankReadiness": {
    "financialDocumentationNeeded": [],
    "businessInformationNeeded": [],
    "readinessLevel": "",
    "importantNote": ""
  },

  "finalRecommendation": {
    "viability": "",
    "recommendation": "",
    "recommendedStartingScale": "",
    "nextStep": ""
  }
}
`;

    let bankReadyReport;

    try {
      const bankReportResponse =
        await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: bankReportPrompt,
          config: {
            systemInstruction:
              `Always answer in ${selectedLanguage}. ` +
              `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
              `Keep JSON keys in English.`,
          },
        });

      bankReadyReport =
        cleanJSON(
          bankReportResponse.text
        );

      console.log(
        "✅ STAGE 9 BANK-READY REPORT COMPLETED"
      );
    } catch (bankReportError) {
      console.error(
        "❌ STAGE 9 BANK-READY REPORT ERROR:",
        bankReportError
      );

      bankReadyReport = {
        reportTitle: "",

        businessSummary: {},
        marketOpportunity: {},
        localCompetition: {},
        businessModel: {},
        investmentPlan: {},
        financialProjection: {},
        fundingRequirement: {},

        swotAnalysis: {
          strengths: [],
          weaknesses: [],
          opportunities: [],
          threats: [],
        },

        riskManagement: {
          majorRisks: [],
          riskMitigation: [],
          earlyWarningSignals: [],
        },

        implementationPlan: {
          first30Days: [],
          days31to90: [],
          months4to6: [],
          longTerm: [],
        },

        bankReadiness: {
          financialDocumentationNeeded: [],
          businessInformationNeeded: [],
          readinessLevel: "",
          importantNote: "",
        },

        finalRecommendation: {
          viability: "",
          recommendation: "",
          recommendedStartingScale: "",
          nextStep: "",
        },
      };
    }

    // =================================================
    // SENIOR DECISION / COMBINER
    // =================================================

    const combinerPrompt = `
You are the Senior Decision Agent of GramSaarthi AI.

The entrepreneur selected this business category:

"${business}"

Entrepreneur information:

${userProfile}

MARKET AGENT:
${JSON.stringify(marketAgent, null, 2)}

FINANCIAL AGENT:
${JSON.stringify(financeAgent, null, 2)}

RISK AGENT:
${JSON.stringify(riskAgent, null, 2)}

STAGE 5 — BUSINESS SIMULATION:
${JSON.stringify(simulationAgent, null, 2)}

STAGE 6 — FINANCIAL ENGINE:
${JSON.stringify(financialEngine, null, 2)}

STAGE 7 — LOCAL INTELLIGENCE:
${JSON.stringify(localIntelligence, null, 2)}

STAGE 8 — ADVANCED BUSINESS SIMULATION:
${JSON.stringify(advancedSimulation, null, 2)}

STAGE 9 — BANK-READY REPORT:
${JSON.stringify(bankReadyReport, null, 2)}

Combine all findings into one final practical recommendation.

IMPORTANT BUSINESS RULE:

The selected Business Category is the user's actual business idea.

You MUST analyze ONLY:

"${business}"

Never replace it with another business.

Consider:

- market opportunity
- available capital
- skills
- resources
- risks
- pricing
- business simulation
- financial planning
- local competition
- local business density
- location-based opportunities and risks
- advanced simulation scenarios
- bank-ready report

IMPORTANT:

- Do not invent exact competitor counts.
- Use Stage 7 map data when discussing local competition.
- If Stage 7 data is unavailable, clearly say so.
- Do not assume every nearby business is a direct competitor.
- Do not invent government scheme rules.
- Do not invent exact financial figures.
- Clearly distinguish estimates from verified facts.
- Do not guarantee profit or loan approval.
- Keep the recommendation practical.
- All human-readable values MUST be written in ${selectedLanguage}.
- JSON keys MUST remain in English.

Return ONLY valid JSON.

Use exactly this structure:

{
  "marketReach": {
    "summary": "",
    "primaryCustomers": "",
    "distributionChannels": ""
  },

  "opportunity": {
    "summary": "",
    "underservedNeeds": []
  },

  "swot": {
    "strengths": [],
    "weaknesses": [],
    "opportunities": [],
    "threats": []
  },

  "localThreats": [],

  "competitors": {
    "summary": "",
    "mainCompetitors": [],
    "competitiveAdvantage": ""
  },

  "pricing": {
    "strategy": "",
    "suggestion": "",
    "reason": ""
  },

  "businessSimulation": {},

  "financialEngine": {},

  "localIntelligence": {},

  "advancedSimulation": {},

  "bankReadyReport": {},

  "recommendation": {
    "verdict": "",
    "reason": "",
    "steps": []
  }
}
`;

    console.log(
      "🚀 COMBINING ALL AGENTS + STAGES 5 + 6 + 7 + 8 + 9..."
    );

    const finalResponse =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: combinerPrompt,
        config: {
          systemInstruction:
            `Always answer in ${selectedLanguage}. ` +
            `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
            `Keep JSON keys in English.`,
        },
      });

    console.log(
      "✅ FINAL AI DECISION RECEIVED"
    );

    let finalResult;

    try {
      finalResult = cleanJSON(
        finalResponse.text
      );
    } catch (parseError) {
      console.error(
        "❌ FINAL JSON PARSE ERROR:",
        parseError
      );

      return res.status(500).json({
        success: false,
        error:
          "Final AI response was not valid JSON.",
      });
    }

    // =================================================
    // STAGE 10 — GENERATE PDF
    // =================================================

    console.log(
      "📄 STAGE 10: GENERATING PDF REPORT..."
    );

    let pdfBase64 = null;

    try {
      const pdfBuffer =
        await generateBusinessPDF(
          bankReadyReport,
          selectedLanguage
        );

      pdfBase64 =
        pdfBuffer.toString("base64");

      console.log(
        "✅ STAGE 10 PDF GENERATED"
      );
    } catch (pdfError) {
      console.error(
        "❌ STAGE 10 PDF ERROR:",
        pdfError.message
      );
    }

    console.log(
      "🎯 MULTI-AGENT ANALYSIS COMPLETE"
    );

    // =================================================
    // FINAL RESPONSE
    // =================================================

    return res.json({
      success: true,

      result: finalResult,

      bankReadyReport,

      pdf: {
        available: Boolean(pdfBase64),
        mimeType: "application/pdf",
        fileName:
          "GramSaarthi-Business-Report.pdf",
        data: pdfBase64,
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
        pdfReport: Boolean(pdfBase64),
        combiner: true,
        voiceOutput: true,
      },
    });
  } catch (error) {
    console.error(
      "❌ MULTI-AGENT GEMINI ERROR:"
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      error:
        error.message || String(error),
    });
  }
});

// =====================================================
// STAGE 11 — VOICE OUTPUT / GEMINI TEXT-TO-SPEECH
// =====================================================

app.post("/api/voice", async (req, res) => {
  console.log(
    "🔊 STAGE 11 VOICE OUTPUT REQUEST RECEIVED"
  );

  try {
    if (!ai) {
      return res.status(500).json({
        success: false,
        error:
          "GEMINI_API_KEY is missing from .env",
      });
    }

    const {
      text,
      language,
    } = req.body;

    const selectedLanguage =
      language || "English";

    if (
      !text ||
      !String(text).trim()
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Text is required for voice output.",
      });
    }

    console.log(
      "🌐 VOICE LANGUAGE:",
      selectedLanguage
    );

    const voicePrompt = `
Read the following business guidance naturally and clearly.

Language:
${selectedLanguage}

Text:
${String(text)}

IMPORTANT:

- Speak ONLY the provided text.
- Do not add extra information.
- Do not translate unless the provided text is already in the requested language.
- Use a clear, friendly and helpful speaking style.
`;

    const voiceResponse =
      await ai.models.generateContent({
        model:
          "gemini-3.1-flash-tts-preview",

        contents: [
          {
            parts: [
              {
                text: voicePrompt,
              },
            ],
          },
        ],

        config: {
          responseModalities: [
            "AUDIO",
          ],

          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Kore",
              },
            },
          },
        },
      });

    const audioData =
      voiceResponse
        .candidates?.[0]
        ?.content?.parts
        ?.find(
          (part) => part.inlineData
        )
        ?.inlineData?.data;

    if (!audioData) {
      throw new Error(
        "Gemini did not return audio data."
      );
    }

    // Gemini returns PCM audio.
    // Convert PCM to a proper WAV file.
    const pcmBuffer =
      Buffer.from(
        audioData,
        "base64"
      );

    const wavBuffer =
      pcmToWavBuffer(
        pcmBuffer,
        24000,
        1,
        16
      );

    const wavBase64 =
      wavBuffer.toString("base64");

    console.log(
      "✅ STAGE 11 VOICE OUTPUT GENERATED"
    );

    return res.json({
      success: true,
      language: selectedLanguage,
      mimeType: "audio/wav",
      audio: wavBase64,
    });
  } catch (error) {
    console.error(
      "❌ STAGE 11 VOICE OUTPUT ERROR:"
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      error:
        error.message || String(error),
    });
  }
});

// =====================================================
// START SERVER
// =====================================================

app.listen(5000, () => {
  console.log(
    "🌱 GramSaarthi backend running on http://localhost:5000"
  );
});