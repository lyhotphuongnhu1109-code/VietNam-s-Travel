import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { synthesizeTailoredItinerary, extractWishFromRequest } from "../data/itinerarySynthesizer";

dotenv.config();

export const apiApp = express();

apiApp.use(express.json({ limit: "50mb" }));
apiApp.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Lazy initialization of Gemini client (supports both GEMINI_API_KEY and VITE_GEMINI_API_KEY in Vercel)
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Router for all API routes (can be mounted on both /api and / for Vercel rewrite compatibility)
const router = express.Router();

// Health check endpoint
router.get("/health", (_req, res) => {
  res.json({ status: "ok", app: "VIETNAM'S TRAVEL", platform: process.env.VERCEL ? "vercel" : "server" });
});

// Travel Q&A Assistant API
router.post("/gemini/assistant", async (req, res) => {
  const language = req.body?.language || "vi";
  try {
    const { question } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Missing or invalid question parameter" });
    }

    const ai = getGemini();
    if (!ai) {
      return res.json({
        answer: language === "ko"
          ? "베트남은 치안이 우수하고 친절한 나라입니다. 54개 민족의 유구한 문화와 하롱베이, 후에, 호이안 등 유네스코 세계유산, 쌀국수(Pho)와 반미(Banh Mi) 등 다채로운 미식이 가득합니다."
          : language === "en"
          ? "Vietnam is a welcoming country shaped like the letter S, renowned for its 54 ethnic groups, rich history, breathtaking landscapes (Ha Long Bay, Phong Nha, Hoi An), and world-famous cuisine (Pho, Banh Mi)."
          : "Việt Nam là đất nước hình chữ S tươi đẹp với 54 dân tộc anh em đoàn kết, nền văn hiến ngàn năm, cảnh quan kỳ vĩ (Vịnh Hạ Long, Tràng An, Cố đô Huế) và ẩm thực trứ danh thế giới.",
        fallback: true,
      });
    }

    const systemInstruction = `You are the cultural and travel ambassador expert for "VIETNAM'S TRAVEL" app.
Your mission is to promote the beauty, rich history, 54 ethnic groups, authentic cuisine, travel costs, and heritage of Vietnam.
Keep answers warm, hospitable, accurate, culturally respectful, and concise (under 200 words).
Respond in ${language === "ko" ? "natural, polite honorific Korean" : language === "en" ? "English" : "Vietnamese"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ answer: response.text || "", fallback: false });
  } catch (error: any) {
    console.warn("Gemini assistant fallback invoked:", error?.message || error);
    return res.json({
      answer: language === "ko"
        ? "베트남은 치안이 우수하고 친절한 나라입니다. 54개 민족의 유구한 문화와 하롱베이, 후에, 호이안 등 유네스코 세계유산, 쌀국수(Pho)와 반미(Banh Mi) 등 다채로운 미식이 가득합니다."
        : language === "en"
        ? "Vietnam is a welcoming country shaped like the letter S, renowned for its 54 ethnic groups, rich history, breathtaking landscapes (Ha Long Bay, Phong Nha, Hoi An), and world-famous cuisine (Pho, Banh Mi)."
        : "Việt Nam là đất nước hình chữ S tươi đẹp với 54 dân tộc anh em đoàn kết, nền văn hiến ngàn năm, cảnh quan kỳ vĩ (Vịnh Hạ Long, Tràng An, Cố đô Huế) và ẩm thực trứ danh thế giới.",
      fallback: true,
    });
  }
});

// Translation & Travel Assistant API
router.post("/gemini/translate", async (req, res) => {
  try {
    const { text, targetLang = "vi", userLang = "en" } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing or invalid text parameter" });
    }

    const ai = getGemini();
    if (!ai) {
      return res.json({
        translatedText: targetLang === "vi" ? `[Bản dịch cho: "${text}"]` : `[Translation for: "${text}"]`,
        pronunciation: userLang === "ko" ? "신 짜오 / 깜 ơn" : "Xin chào / Cam on",
        culturalTip: userLang === "ko"
          ? "베트남에서는 미소와 정중한 태도로 인사하면 현지인들과 더욱 따뜻하게 소통할 수 있습니다."
          : "Ở Việt Nam, hãy mỉm cười và chào hỏi lịch sự với người lớn tuổi.",
        fallback: true,
      });
    }

    const userLanguageName = userLang === "ko" ? "Korean" : userLang === "vi" ? "Vietnamese" : "English";
    const prompt = `Translate the following text for a tourist in Vietnam into Vietnamese.
The user speaks ${userLanguageName}.
Also provide:
1. Phonetic pronunciation guide (written so a native ${userLanguageName} speaker can easily read and say it correctly in Vietnamese)
2. A brief 1-sentence cultural tip or local context in ${userLanguageName}.

Original text: "${text}"

Output JSON format strictly with keys:
"translatedText": string,
"pronunciation": string,
"culturalTip": string`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let result = {
      translatedText: text,
      pronunciation: "",
      culturalTip: "",
    };

    try {
      if (response.text) {
        result = JSON.parse(response.text.trim());
      }
    } catch {
      result.translatedText = response.text || text;
    }

    return res.json(result);
  } catch (error: any) {
    console.warn("Gemini translate fallback invoked:", error?.message || error);
    return res.json({
      translatedText: req.body?.targetLang === "vi" ? `[Dịch]: ${req.body?.text || ""}` : `[Translation]: ${req.body?.text || ""}`,
      pronunciation: req.body?.userLang === "ko" ? "신 짜오 (Xin chào)" : "Xin chao",
      culturalTip: req.body?.userLang === "ko"
        ? "베트남 현지에서는 미소와 정중한 태도로 인사하면 환영받습니다."
        : "Ở Việt Nam, mỉm cười và thân thiện là chìa khóa kết nối văn hóa tuyệt vời.",
      fallback: true,
    });
  }
});

// AI Custom Itinerary Generator API - Rock-Solid & Tailored to User Wishes (Vercel-Optimized)
router.post("/gemini/itinerary", async (req, res) => {
  const wish = extractWishFromRequest(req.body);
  const language = req.body.language || "vi";

  const ai = getGemini();
  if (!ai) {
    const tailoredPlan = synthesizeTailoredItinerary(wish);
    return res.json({ itinerary: tailoredPlan, fallback: true, source: "ai_synthesizer" });
  }

  try {
    const targetLangName =
      language === "ko" ? "Korean (한국어)" : language === "en" ? "English" : "Vietnamese (Tiếng Việt)";

    const systemInstruction = `You are the Senior Master Travel Planner and Cultural Ambassador for "VIETNAM'S TRAVEL" platform.
Your mission is to generate a realistic, tailored, and inspiring day-by-day travel itinerary in Vietnam matching the user's exact travel wishes:
- Destination: ${wish.destination}
- Departure City: ${wish.departureCity}
- Duration: ${wish.durationDays} Days (${wish.durationDays - 1} Nights)
- Traveling with: ${wish.companion}
- Travel Interests: ${wish.interests?.join(", ") || "Authentic sightseeing and dining"}
- Budget tier: ${wish.budgetTier}
- User's special prompt/notes: "${wish.specialNotes}"

Strict Output Requirements:
1. Return valid JSON only, strictly conforming to the requested schema. Do not enclose in markdown code fences if possible.
2. All descriptions, sightseeing spots, meals, and advice must be written in natural, engaging ${targetLangName}.
3. Create EXACTLY ${wish.durationDays} days in the "days" array.
4. Day 1 starts with journey from ${wish.departureCity} to ${wish.destination}.
5. Day ${wish.durationDays} ends with departure back to ${wish.departureCity}.
6. For every single day, provide authentic Vietnamese culinary specialties, exact sights, realistic transport, and accommodation style.
7. Provide realistic budget estimates in VNĐ for each day and total trip spend.`;

    const promptText = `Generate a tailored ${wish.durationDays}-day itinerary for ${wish.destination} departing from ${wish.departureCity}.
Output strictly valid JSON with this exact schema:
{
  "id": "gemini-${Date.now()}",
  "title": "Inspiring and catchy title for this trip",
  "durationLabel": "${wish.durationDays} Ngày ${wish.durationDays - 1} Đêm",
  "overview": "2-3 sentences overview describing this custom journey tailored to the user",
  "budgetLevel": "${wish.budgetTier === 'budget' ? 'Tiết kiệm' : wish.budgetTier === 'luxury' ? 'Cao cấp' : 'Tiêu chuẩn'}",
  "estimatedCostTotal": "Total spend estimate in VNĐ, e.g. 4.500.000 VNĐ - 6.000.000 VNĐ / người",
  "bestTime": "Best time of year to visit ${wish.destination}",
  "specialTip": "Practical insider tip for this route",
  "days": [
    {
      "dayNumber": 1,
      "destination": "Day 1 destination name",
      "budgetEstimate": "Daily budget in VNĐ",
      "highlights": ["highlight 1", "highlight 2", "highlight 3"],
      "morning": "Detailed morning activity + breakfast",
      "afternoon": "Detailed afternoon sightseeing + lunch",
      "evening": "Detailed evening activity + dinner",
      "transport": "Specific transport mode (máy bay, xe đưa đón, taxi...)",
      "stay": "Recommended hotel / resort area"
    }
  ]
}`;

    // Fast Dual-model cascade with Vercel serverless friendly timeouts (8s -> 4s -> synthesizer)
    let response: any = null;
    try {
      const geminiCall = ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });
      const timeoutCall = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini 3.8 timeout")), 8000)
      );
      response = await Promise.race([geminiCall, timeoutCall]);
    } catch (primaryErr: any) {
      console.warn("Primary gemini-3.8-flash busy/timeout, trying gemini-3.1-flash-lite:", primaryErr?.message);
      try {
        const fallbackCall = ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: promptText,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });
        const timeoutCall2 = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Gemini 3.1 timeout")), 4000)
        );
        response = await Promise.race([fallbackCall, timeoutCall2]);
      } catch (secErr: any) {
        console.warn("Secondary model also busy, using high-precision synthesizer:", secErr?.message);
      }
    }

    let itineraryData = null;
    if (response && response.text) {
      let rawText = response.text.trim();
      if (rawText.startsWith("```json")) {
        rawText = rawText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }
      try {
        itineraryData = JSON.parse(rawText);
      } catch (jsonErr) {
        console.warn("JSON parse error:", jsonErr);
      }
    }

    if (!itineraryData || !Array.isArray(itineraryData.days) || itineraryData.days.length === 0) {
      const tailoredPlan = synthesizeTailoredItinerary(wish);
      return res.json({ itinerary: tailoredPlan, fallback: true, source: "ai_synthesizer" });
    }

    return res.json({ itinerary: itineraryData, fallback: false, source: "gemini" });
  } catch (error: any) {
    console.warn("Gemini call fell back to tailored synthesizer:", error?.message || error);
    const tailoredPlan = synthesizeTailoredItinerary(wish);
    return res.json({ itinerary: tailoredPlan, fallback: true, source: "ai_synthesizer", error: error.message });
  }
});

// AI Itinerary Tweak with Gemini
router.post("/gemini/itinerary-tweak", async (req, res) => {
  try {
    const { currentPlan, tweakInstruction, language = "vi" } = req.body;
    if (!currentPlan || !tweakInstruction) {
      return res.status(400).json({ error: "Missing currentPlan or tweakInstruction" });
    }

    const ai = getGemini();
    if (!ai) {
      return res.json({ itinerary: currentPlan, fallback: true });
    }

    const targetLangName =
      language === "ko" ? "Korean (한국어)" : language === "en" ? "English" : "Vietnamese (Tiếng Việt)";

    const systemInstruction = `You are the Google Gemini Travel Assistant for "VIETNAM'S TRAVEL".
You are given an existing travel itinerary and an adjustment instruction from the user.
Modify the itinerary accurately according to their request while keeping the rest of the plan cohesive, realistic, and written in natural ${targetLangName}.
Return strictly valid JSON with the exact same itinerary structure.`;

    const promptText = `Current itinerary:
${JSON.stringify(currentPlan, null, 2)}

User's requested adjustment:
"${tweakInstruction}"

Please update the itinerary accordingly. Return strictly valid JSON with this exact schema:
{
  "id": "${currentPlan.id || 'itinerary'}-tweak-${Date.now()}",
  "title": "Updated title",
  "durationLabel": "${currentPlan.durationLabel || ''}",
  "overview": "Updated overview reflecting the change",
  "budgetLevel": "Tiết kiệm / Tiêu chuẩn / Cao cấp",
  "estimatedCostTotal": "Updated total spend estimate",
  "bestTime": "Best time to visit",
  "specialTip": "Updated tip for this route",
  "days": [
    {
      "dayNumber": 1,
      "destination": "City name",
      "budgetEstimate": "Daily budget",
      "highlights": ["h1", "h2", "h3"],
      "morning": "Morning activity",
      "afternoon": "Afternoon activity",
      "evening": "Evening activity",
      "transport": "Transport mode",
      "stay": "Hotel style"
    }
  ]
}`;

    let response: any = null;
    try {
      const geminiCall = ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });
      const timeoutCall = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout 7s")), 7000)
      );
      response = await Promise.race([geminiCall, timeoutCall]);
    } catch (primaryErr: any) {
      console.warn("Tweak primary model busy, trying gemini-3.1-flash-lite:", primaryErr?.message);
      try {
        const fallbackCall = ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: promptText,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });
        const timeoutCall2 = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout 4s")), 4000)
        );
        response = await Promise.race([fallbackCall, timeoutCall2]);
      } catch (secErr) {
        console.warn("Secondary tweak also busy:", secErr);
      }
    }

    let updatedPlan = null;
    if (response && response.text) {
      let rawText = response.text.trim();
      if (rawText.startsWith("```json")) {
        rawText = rawText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }
      try {
        updatedPlan = JSON.parse(rawText);
      } catch (e) {
        console.warn("Parse error in itinerary-tweak:", e);
      }
    }

    if (!updatedPlan || !Array.isArray(updatedPlan.days)) {
      const patchedPlan = {
        ...currentPlan,
        overview: `${currentPlan.overview || ''} (Đã tinh chỉnh theo mong muốn: "${tweakInstruction}")`,
        specialTip: `💡 Lưu ý theo yêu cầu của bạn: ${tweakInstruction}.`,
      };
      return res.json({ itinerary: patchedPlan, fallback: true, source: "smart_patch" });
    }

    return res.json({ itinerary: updatedPlan, fallback: false });
  } catch (error: any) {
    console.warn("Itinerary tweak fallback to patch:", error?.message || error);
    const patchedPlan = {
      ...req.body.currentPlan,
      overview: `${req.body.currentPlan?.overview || ''} (Đã tinh chỉnh theo mong muốn: "${req.body.tweakInstruction || ''}")`,
    };
    return res.json({ itinerary: patchedPlan, fallback: true });
  }
});

// Quick Gemini Day Advice
router.post("/gemini/day-advice", async (req, res) => {
  try {
    const { day, destination, question, language = "vi" } = req.body;
    const ai = getGemini();
    if (!ai) {
      return res.json({
        advice:
          language === "vi"
            ? "💡 Lời khuyên: Chuẩn bị trang phục thoáng mát, mang theo sạc dự phòng, kem chống nắng và đừng quên thưởng thức đặc sản đường phố địa phương vào buổi tối!"
            : "💡 Tip: Wear comfortable shoes, carry sunscreen, and make sure to explore authentic local food spots in the evening!"
      });
    }

    const targetLangName =
      language === "ko" ? "Korean (한국어)" : language === "en" ? "English" : "Vietnamese (Tiếng Việt)";

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Destination: ${destination || "Vietnam"}. Day details: ${JSON.stringify(day)}. User question: ${question || "Gợi ý mẹo du lịch, trang phục, góc check-in và lưu ý an toàn cho ngày này."}`,
      config: {
        systemInstruction: `You are Google Gemini, the official expert AI travel companion for "VIETNAM'S TRAVEL". Provide 3-4 concise, highly practical, insider tips (outfit recommendation, best photography angle/time, must-try local dish, and safety/transport tip) for this travel day in natural ${targetLangName}. Keep it inspiring, clear with bullet points and friendly emojis.`,
        temperature: 0.7,
      },
    });

    return res.json({ advice: response.text || "" });
  } catch (error: any) {
    console.error("Gemini day-advice error:", error);
    return res.status(500).json({ error: error.message || "Advice failed" });
  }
});

// AI Voice Narration for Itinerary using Gemini TTS
router.post("/gemini/itinerary-audio", async (req, res) => {
  try {
    const { title, overview, language = "vi" } = req.body;
    const ai = getGemini();
    if (!ai) {
      return res.status(503).json({ error: "Gemini AI not initialized" });
    }

    const narrationScript =
      language === "ko"
        ? `안녕하세요! VIETNAM'S TRAVEL AI 가이드입니다. 오늘 소개해 드릴 맞춤 여정은 "${title || '베트남 맞춤 여행'}"입니다. ${overview || '아름다운 베트남 여행을 함께 떠나보세요.'} 각 일자별 코스와 로컬 미식이 준비되어 있으니 베트남에서 잊지 못할 추억을 만들어보세요!`
        : language === "en"
        ? `Welcome to VIETNAM'S TRAVEL! Here is your tailored route: "${title || 'Vietnam Journey'}". ${overview || 'Explore the incredible beauty and heritage of Vietnam.'} Enjoy authentic dining, scenic highlights, and cultural discoveries!`
        : `Chào mừng bạn đến với VIETNAM'S TRAVEL! Dưới đây là lộ trình du lịch do Google Gemini thiết kế: "${title || 'Hành Trình Du Lịch Việt Nam'}". ${overview || 'Khám phá trọn vẹn cảnh sắc kỳ vĩ và ẩm thực bản địa.'} Chúc bạn có một kỳ nghỉ thật tuyệt vời và nhiều kỷ niệm đáng nhớ!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-lite-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: narrationScript,
              speechMetadata: {
                style: "Warm, engaging, hospitable Vietnamese tour guide ambassador",
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: "No audio generated" });
    }

    return res.json({ audio: base64Audio });
  } catch (error: any) {
    console.error("Gemini itinerary-audio error:", error);
    return res.status(500).json({ error: error.message || "Audio generation failed" });
  }
});

// AI Smart Search & Synthesis API
router.post("/gemini/smart-search", async (req, res) => {
  try {
    const { query, language = "vi" } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Missing or invalid query parameter" });
    }

    const ai = getGemini();
    const isKo = language === "ko";
    const isEn = language === "en";

    const systemInstruction = `You are the Advanced AI Travel Search Engine for "VIETNAM'S TRAVEL" (Ứng dụng Du Lịch & Bản Sắc Việt Nam).
Provide the most comprehensive, accurate, and up-to-date answer synthesizing destinations, cuisines, 54 ethnic groups, and travel styles in Vietnam.
FORMAT YOUR RESPONSE IN NATURAL ${isKo ? "KOREAN" : isEn ? "ENGLISH" : "VIETNAMESE"}.
Output strictly valid JSON with this format:
{
  "summary": "Direct, engaging answer synthesizing in-app and external real-world travel facts",
  "recommendedPlaces": ["place 1", "place 2"],
  "recommendedFoods": ["food 1", "food 2"],
  "insiderTips": ["tip 1", "tip 2"],
  "matchedEntityNames": ["matched item in app"]
}`;

    if (!ai) {
      const fallbackSummary = isKo
        ? `"${query}"에 대한 종합 안내입니다: 베트남 63개 성·시의 주요 명소, 전국 추천 맛집, 54개 민족의 고유한 전통 문화 및 맞춤형 여행 코스를 바탕으로 정확한 정보를 안내해 드립니다.`
        : isEn
        ? `Comprehensive guide for "${query}": Synthesizing Vietnam's iconic destinations, regional cuisines, 54 ethnic groups heritage, and tailored itineraries.`
        : `Tổng hợp thông tin cho "${query}": Dựa trên cơ sở dữ liệu 63 tỉnh thành, các danh lam thắng cảnh 3 miền, danh sách quán ăn ngon nổi tiếng trên toàn quốc và bản sắc 54 dân tộc anh em.`;

      return res.json({
        answer: fallbackSummary,
        summary: fallbackSummary,
        recommendedPlaces: [],
        recommendedFoods: [],
        insiderTips: [
          isKo ? "여행 전 계절별 날씨와 현지 축제 일정을 확인하세요." : "Nên kiểm tra thời tiết và mùa đẹp nhất trước khi khởi hành.",
          isKo ? "현지 대중교통 및 로컬 미식 지도를 활용해 보세요." : "Tham khảo danh sách quán ăn uy tín và phương tiện di chuyển tối ưu trên app."
        ],
        webSources: [],
        fallback: true
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Search query from tourist: "${query}"\nProvide the best synthesized answer in JSON format as specified.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.6,
      },
    });

    const responseText = response.text || "";
    let parsedResult: any = null;
    if (responseText) {
      try {
        const cleanJson = responseText.replace(/```json\s*|\s*```/g, "").trim();
        parsedResult = JSON.parse(cleanJson);
      } catch {
        parsedResult = {
          summary: responseText,
          recommendedPlaces: [],
          recommendedFoods: [],
          insiderTips: [],
          matchedEntityNames: [],
        };
      }
    }

    if (!parsedResult || !parsedResult.summary) {
      parsedResult = {
        summary: `Tổng hợp thông tin cho "${query}": Dựa trên dữ liệu 63 tỉnh thành và trải nghiệm văn hóa ẩm thực Việt Nam.`,
        recommendedPlaces: [],
        recommendedFoods: [],
        insiderTips: ["Nên kiểm tra thời tiết và đặt vé sớm."],
        matchedEntityNames: [],
      };
    }

    return res.json({
      answer: parsedResult.summary,
      summary: parsedResult.summary,
      recommendedPlaces: parsedResult.recommendedPlaces || [],
      recommendedFoods: parsedResult.recommendedFoods || [],
      insiderTips: parsedResult.insiderTips || [],
      matchedEntityNames: parsedResult.matchedEntityNames || [],
      fallback: false,
    });
  } catch (error: any) {
    console.error("Gemini smart search unexpected error:", error);
    return res.json({
      answer: `Tổng hợp thông tin cho "${req.body?.query || ''}": Hệ thống đang kết nối dữ liệu địa phương và quốc tế.`,
      summary: `Tổng hợp thông tin cho "${req.body?.query || ''}": Hệ thống đang kết nối dữ liệu địa phương và quốc tế.`,
      recommendedPlaces: [],
      recommendedFoods: [],
      insiderTips: ["Tham khảo danh sách địa điểm và quán ăn uy tín trên app."],
      webSources: [],
      fallback: true,
    });
  }
});

// Mount router on BOTH /api and / to handle all Vercel and local Express routing styles
apiApp.use("/api", router);
apiApp.use("/", router);

export default apiApp;
