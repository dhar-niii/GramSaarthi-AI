const express = require("express");
const cors = require("cors");
require("dotenv").config();

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

// Simple backend test
app.get("/test", (req, res) => {
  console.log("🔥 TEST REQUEST RECEIVED");
  res.json({ message: "Backend is working!" });
});

// Gemini AI endpoint
app.post("/api/analyze", async (req, res) => {
  console.log("🔥 AI REQUEST RECEIVED");
  console.log("User data:", req.body);

  try {
    if (!ai) {
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY is missing from .env",
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

    const selectedLanguage = language || "English";

    console.log("🌐 SELECTED LANGUAGE:", selectedLanguage);

    const prompt = `
You are GramSaarthi AI, an AI-powered hyper-local business advisory assistant for rural and semi-urban entrepreneurs.

Analyze the entrepreneur's information below:

Location: ${location || "Not provided"}
Available Capital: ₹${capital || "Not provided"}
Business Category: ${business || "Not provided"}
Skills: ${skills || "Not provided"}
Resources: ${resources || "Not provided"}

IMPORTANT BUSINESS-CATEGORY RULE:

The selected Business Category is the user's actual business idea.

You MUST analyze ONLY this business category:
"${business}"

Never replace it with another business unless the selected category explicitly says so.

Every section must be relevant to "${business}".

Skills and resources may influence the advice, but MUST NOT change the selected Business Category.

IMPORTANT LANGUAGE RULE:

Write EVERY human-readable value in ${selectedLanguage}.

Keep all JSON keys exactly in English.

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not write anything before or after the JSON.

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
  "recommendation": {
    "verdict": "",
    "reason": "",
    "steps": []
  }
}

Rules:

- Give practical advice suitable for a small rural/semi-urban entrepreneur.
- Market reach must be an estimate, not claimed live GPS data.
- Do not invent exact competitor counts.
- Clearly distinguish estimates from verified facts.
- Keep language simple and actionable.
- Tailor the entire analysis primarily to the selected Business Category.
- Do not make up government scheme rules or financial figures.
`;

    console.log("🚀 SENDING TO GEMINI...");

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction:
          `Always answer in ${selectedLanguage}. ` +
          `Every human-readable value in the JSON must be written in ${selectedLanguage}. ` +
          `Keep JSON keys in English.`,
      },
    });

    console.log("✅ GEMINI RESPONDED");

    res.json({
      success: true,
      result: response.text,
    });
  } catch (error) {
    console.error("❌ GEMINI ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message || String(error),
    });
  }
});

app.listen(5000, () => {
  console.log("🌱 GramSaarthi backend running on http://localhost:5000");
});