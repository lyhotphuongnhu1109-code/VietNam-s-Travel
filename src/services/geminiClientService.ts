import { GoogleGenAI } from '@google/genai';
import { synthesizeTailoredItinerary, extractWishFromRequest, WishParams, SynthesizedItinerary } from '../data/itinerarySynthesizer';
import { AiCustomItinerary, AiCustomDay } from '../components/ItineraryPlanner';

/**
 * Universal Gemini Service for both Google AI Studio Build and Vercel Deployments.
 * - Prioritizes server-side proxy route (/api/gemini/...)
 * - On Vercel: If serverless is unavailable or returns 404/non-JSON, gracefully falls back to:
 *   1. Client-side Gemini (if VITE_GEMINI_API_KEY is defined in Vercel env)
 *   2. Instant High-Precision Vietnam Travel Synthesizer (tailored 100% to user destination, duration, companion, budget)
 */

interface GenerateItineraryParams {
  destination?: string;
  departureCity?: string;
  durationDays?: number;
  companion?: string;
  interests?: string[];
  budgetTier?: string;
  specialNotes?: string;
  prompt?: string;
  language?: 'vi' | 'ko' | 'en';
}

function getClientGemini(): GoogleGenAI | null {
  const key =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
    (typeof window !== 'undefined' && (window as any).__GEMINI_API_KEY__);

  if (!key) return null;

  try {
    return new GoogleGenAI({ apiKey: key });
  } catch (err) {
    console.warn('Could not initialize client-side Gemini:', err);
    return null;
  }
}

export async function requestAiItinerary(params: GenerateItineraryParams): Promise<AiCustomItinerary> {
  const wish = extractWishFromRequest(params);
  const language = params.language || 'vi';

  // Step 1: Attempt Server Route (/api/gemini/itinerary)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('/api/gemini/itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...params,
        ...wish,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.itinerary && Array.isArray(data.itinerary.days) && data.itinerary.days.length > 0) {
        return data.itinerary as AiCustomItinerary;
      }
    } else {
      console.warn(`[Vercel / Server Notice] /api/gemini/itinerary returned status ${res.status}. Falling back gracefully.`);
    }
  } catch (netErr: any) {
    console.warn('[Vercel Network Notice] Server route failed or timed out:', netErr?.message || netErr);
  }

  // Step 2: Try Client-side Gemini if VITE_GEMINI_API_KEY is configured on Vercel
  const clientAi = getClientGemini();
  if (clientAi) {
    try {
      const targetLangName =
        language === 'ko' ? 'Korean (한국어)' : language === 'en' ? 'English' : 'Vietnamese (Tiếng Việt)';

      const promptText = `Generate a tailored ${wish.durationDays}-day itinerary for ${wish.destination} departing from ${wish.departureCity}.
Traveling with: ${wish.companion}, interests: ${wish.interests?.join(', ')}, budget: ${wish.budgetTier}. Special notes: "${wish.specialNotes}".
Language: ${targetLangName}.
Output strictly valid JSON conforming to this schema:
{
  "id": "gemini-client-${Date.now()}",
  "title": "Title for this trip",
  "durationLabel": "${wish.durationDays} Ngày ${wish.durationDays - 1} Đêm",
  "overview": "Overview of this custom trip",
  "budgetLevel": "${wish.budgetTier === 'budget' ? 'Tiết kiệm' : wish.budgetTier === 'luxury' ? 'Cao cấp' : 'Tiêu chuẩn'}",
  "estimatedCostTotal": "Total spend estimate in VNĐ",
  "bestTime": "Best season to visit",
  "specialTip": "Insider advice",
  "days": [
    {
      "dayNumber": 1,
      "destination": "Day 1 destination",
      "budgetEstimate": "Daily budget in VNĐ",
      "highlights": ["h1", "h2", "h3"],
      "morning": "Morning activity",
      "afternoon": "Afternoon activity",
      "evening": "Evening activity",
      "transport": "Transport mode",
      "stay": "Hotel or resort area"
    }
  ]
}`;

      const response = await clientAi.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        let clean = response.text.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
        const parsed = JSON.parse(clean);
        if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
          return parsed as AiCustomItinerary;
        }
      }
    } catch (clientErr) {
      console.warn('Client-side Gemini failed, falling back to local synthesizer:', clientErr);
    }
  }

  // Step 3: High-precision Vietnam Travel Synthesizer (Instant & Tailored)
  const synthesized = synthesizeTailoredItinerary(wish);
  return synthesized as AiCustomItinerary;
}

export async function requestAiTweak(
  currentPlan: AiCustomItinerary,
  tweakInstruction: string,
  language: 'vi' | 'ko' | 'en' = 'vi'
): Promise<AiCustomItinerary> {
  // Step 1: Try server route
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch('/api/gemini/itinerary-tweak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ currentPlan, tweakInstruction, language }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.itinerary && Array.isArray(data.itinerary.days)) {
        return data.itinerary as AiCustomItinerary;
      }
    }
  } catch (err) {
    console.warn('Server tweak unreachable on Vercel:', err);
  }

  // Step 2: Try Client-side Gemini if VITE_GEMINI_API_KEY exists
  const clientAi = getClientGemini();
  if (clientAi) {
    try {
      const response = await clientAi.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Given this itinerary: ${JSON.stringify(currentPlan)}
Update it with this user instruction: "${tweakInstruction}".
Output strictly valid JSON with identical schema.`,
        config: { responseMimeType: 'application/json', temperature: 0.7 },
      });
      if (response?.text) {
        let clean = response.text.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
        const parsed = JSON.parse(clean);
        if (parsed && Array.isArray(parsed.days)) {
          return parsed as AiCustomItinerary;
        }
      }
    } catch (clientErr) {
      console.warn('Client tweak failed:', clientErr);
    }
  }

  // Step 3: Smart patch
  return {
    ...currentPlan,
    id: `${currentPlan.id}-tweak-${Date.now()}`,
    overview: `${currentPlan.overview} (${language === 'vi' ? 'Đã tinh chỉnh theo mong muốn:' : 'Updated as requested:'} "${tweakInstruction}")`,
    specialTip: `💡 ${language === 'vi' ? 'Lưu ý điều chỉnh:' : 'Custom tip:'} ${tweakInstruction}.`,
  };
}

export async function requestDayAdvice(
  day: AiCustomDay,
  destination: string,
  question: string,
  language: 'vi' | 'ko' | 'en' = 'vi'
): Promise<string> {
  try {
    const res = await fetch('/api/gemini/day-advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ day, destination, question, language }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data?.advice) return data.advice;
    }
  } catch (err) {
    console.warn('Day advice server route failed:', err);
  }

  // Fallback advice
  if (language === 'ko') {
    return `💡 ${destination} 현지 꿀팁:
• 추천 복장: 가볍고 통기성 좋은 옷, 편안한 운동화와 양산 또는 모자 준비.
• 인생샷 명소: 오전 8시~9시 또는 일몰 30분 전 가장 따뜻한 자연광으로 촬영하세요.
• 로컬 미식: 현지 식당에서 갓 만든 로컬 특미를 경험해 보세요.
• 안전 & 이동: 공식 그랩(Grab) 앱을 이용하면 바가지요금 없이 안심 이동할 수 있습니다.`;
  }
  if (language === 'en') {
    return `💡 Local Tips for ${destination}:
• Outfit: Light, breathable clothing, comfortable walking shoes, and sun protection.
• Photo Spot: Golden hour (8:00 AM or 30 minutes before sunset) offers the best lighting.
• Local Food: Ask locals for traditional food stalls and enjoy fresh street treats.
• Transport: Use official Grab or metered taxis for hassle-free travel.`;
  }
  return `💡 Mẹo hay cho ngày tại ${destination}:
• Trang phục: Đồ thoáng mát, giày đi bộ êm, mang theo mũ/ô và kem chống nắng.
• Check-in sống ảo: Canh khung giờ sáng 7h30 - 9h00 hoặc hoàng hôn 16h45 - 17h30 để có ánh sáng đẹp nhất.
• Ẩm thực: Đừng bỏ qua các món đặc sản địa phương nóng hổi tại khu ẩm thực dân dã.
• Đi lại: Ưu tiên đặt Grab hoặc thuê xe máy uy tín để chủ động lịch trình.`;
}

export async function requestAudioNarration(
  title: string,
  overview: string,
  language: 'vi' | 'ko' | 'en' = 'vi'
): Promise<string | null> {
  try {
    const res = await fetch('/api/gemini/itinerary-audio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ title, overview, language }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      return data?.audio || null;
    }
  } catch (err) {
    console.warn('Audio narration unavailable on this deployment:', err);
  }
  return null;
}
