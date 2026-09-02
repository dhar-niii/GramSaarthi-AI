require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

async function testGemini() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Say hello to GramSaarthi in one short sentence.",
    });

    console.log("GEMINI WORKING ✅");
    console.log(response.text);
  } catch (error) {
    console.error("GEMINI FAILED ❌");
    console.error(error);
  }
}

testGemini();