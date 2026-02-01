
import { BioFormData, GeneratedBio, AnalyzerFormData } from "../types.ts";

// --- OpenRouter Configuration ---
// STRICTLY USING USER PROVIDED KEY
const API_KEY = "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";
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const SITE_URL = "https://instagen.ai"; 
const SITE_NAME = "InstaGen";

// --- Model Strategy ---
// We use different models for different tasks to maximize quality and variety.
const MODELS = {
  CREATIVE: "meta-llama/llama-3.3-70b-instruct", // Best for creative writing & bios
  SMART: "deepseek/deepseek-chat", // DeepSeek V3 is excellent for witty analysis & reasoning
  VISION: "openai/gpt-4o-mini", // Cost-effective and high-quality vision
  SEARCH: "google/gemini-2.0-flash-001", // Fast and reliable for grounding/context
  FAST: "google/gemini-2.0-flash-001" // Fallback / Universal
};

// Helper to clean markdown from responses
const cleanText = (text: string): string => {
  if (!text) return "";
  return text.replace(/\*/g, '').trim();
};

const cleanJsonBlock = (text: string): string => {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

// --- Universal OpenRouter Fetcher ---
async function callOpenRouter(
  messages: any[], 
  model: string = MODELS.FAST,
  temperature: number = 0.7
): Promise<string> {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
      })
    });

    if (!response.ok) {
       const errorText = await response.text();
       console.error(`OpenRouter API Error (${model}):`, errorText);
       throw new Error(`OpenRouter Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("Request Failed:", error);
    throw error;
  }
}

// --- Bio Generator (Using Llama 3.3) ---
export const generateBios = async (data: BioFormData): Promise<GeneratedBio[]> => {
  const systemPrompt = "You are a world-class social media copywriter. You MUST return a strictly valid JSON array of objects. Each object must have 'content' and 'style' keys.";
  const userPrompt = `
    Create exactly 6 distinct Instagram bio variations based on:
    Name: ${data.name}
    Description: ${data.description}
    Region: ${data.region}
    Tone: ${data.tone}
    Keywords: ${data.keywords}
    CTA: ${data.cta}
    Emojis: ${data.includeEmojis ? "Yes" : "No"}

    Constraints:
    - Keep under 150 chars.
    - No markdown formatting in the output, just raw JSON.
    - Be creative, human, and non-robotic.
    
    Example output format:
    [{"content": "Bio text here", "style": "Minimalist"}, {"content": "Another bio", "style": "Funny"}]
  `;

  try {
    // Llama 3.3 is excellent for creative variation
    const response = await callOpenRouter([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ], MODELS.CREATIVE, 0.8);

    const bios = JSON.parse(cleanJsonBlock(response));
    
    if (Array.isArray(bios)) {
      return bios.map((bio: any) => ({
        content: cleanText(bio.content),
        style: bio.style || "Creative"
      }));
    }
    return [];
  } catch (error) {
    console.error("Bio Generation Error:", error);
    return [];
  }
};

// --- Analyzer (Using DeepSeek V3) ---
export const generateAnalysis = async (data: AnalyzerFormData): Promise<string> => {
  const prompt = `
    Roast this person playfully based on their profile:
    Name: ${data.name}, Age: ${data.age}, Job: ${data.occupation}
    Traits: ${data.traits}, Hobbies: ${data.hobbies}
    Social Style: ${data.socialMediaStyle}, Worst Habit: ${data.worstHabit}
    
    Keep it punchy, around 6 lines. Be witty, fun, and slightly judgmental (in a friendly way).
    Do not include any thinking chain or internal monologue, just the final roast.
  `;
  
  // DeepSeek is great for wit and "smart" humor
  return callOpenRouter([
    { role: "system", content: "You are a witty cultural critic and internet personality." },
    { role: "user", content: prompt }
  ], MODELS.SMART, 0.8);
};

// --- Generic Text Generator (Defaults to Llama 3.3) ---
export const generateGenericText = async (
  prompt: string, 
  systemRole: string = "You are a creative expert.",
  model: string = MODELS.CREATIVE,
  useSearch: boolean = false
): Promise<string> => {
  
  const finalPrompt = prompt + " (Return clear text, or JSON if specifically asked).";
  
  const response = await callOpenRouter([
    { role: "system", content: systemRole },
    { role: "user", content: finalPrompt }
  ], model);

  return cleanText(response);
};

// --- Image Analysis / Roast (Using GPT-4o Mini) ---
export const generateRoast = async (imageBase64: string): Promise<string> => {
  // GPT-4o Mini has excellent vision capabilities and is fast
  return callOpenRouter([
    { role: "system", content: "You are an elite aesthetic critic. Roast this feed brutally but playfully." },
    { 
      role: "user", 
      content: [
        { type: "text", text: "Roast this Instagram feed screenshot. 6 lines max. Give a 'Vibe Rating' / 10 at the end." },
        { type: "image_url", image_url: { url: imageBase64 } }
      ]
    }
  ], MODELS.VISION, 0.7);
};

// --- Trending Songs (Using Gemini 2.0 Flash) ---
export const getDailyTrendingSongs = async (): Promise<{ title: string; artist: string }[]> => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const prompt = `
    Context: Today is ${today}.
    List 20 currently trending songs on Instagram Reels and TikTok as of today.
    Return strictly a JSON array of objects with 'title' and 'artist'.
    Do NOT include markdown. Do NOT include images.
    
    Example:
    [{"title": "Song A", "artist": "Artist A"}, {"title": "Song B", "artist": "Artist B"}]
  `;
  
  try {
    // Gemini 2.0 Flash is reliable and fast for context
    const response = await callOpenRouter([
      { role: "system", content: "You are a music trend expert. Output only valid JSON." },
      { role: "user", content: prompt }
    ], MODELS.SEARCH, 0.5);

    const data = JSON.parse(cleanJsonBlock(response));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching trending songs:", error);
    return [];
  }
};
