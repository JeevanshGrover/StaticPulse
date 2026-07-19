import { GoogleGenAI } from "@google/genai"
import { analysisPrompt } from "./prompt.js"
import { ApiError } from "../../utils/ApiError.js"

const GEMINI_TIMEOUT = 15000;
function getClient() {
    return new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });
}

const ai = getClient()

async function getAIAnalysis(metrics){
    const prompt = analysisPrompt(metrics);
    console.log("prompt generated: ", prompt)

    const reqPromise = ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    })

    console.log("promise text: ",reqPromise.text)

    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("GEMINI_TIMEOUT")), GEMINI_TIMEOUT)
    })

    let response;
    try{
        response = await Promise.race([reqPromise, timeoutPromise])
        console.log("response from ai: ", response)
    } catch(err){
        console.error("gemini error", err)
        return buildFallbackAnalysis()
    }

    try {
        console.log(response)
        const text = response.text.trim();
        const cleanedText = text.replace(/^```json\s*|\s*```$/g, "")
        const result = JSON.parse(cleanedText);
        return result;
    } catch {
        return buildFallbackAnalysis()
    }
}

function buildFallbackAnalysis() {
  return {
    score: null,
    issues: ["AI analysis unavailable — showing static metrics only"],
    suggestions: [],
    strengths: [],
    weaknesses: [],
    aiUnavailable: true,
  };
}

export { getAIAnalysis }