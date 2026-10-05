import React, { useState } from 'react';
import {
  Route,
  Calendar,
  DollarSign,
  Bus,
  Home,
  Sparkles,
  Loader2,
  Bot,
  Plane,
  Compass,
  Copy,
  Check,
  Lightbulb,
  RefreshCw,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { useAuth } from '../context/AuthContext';

export interface AiCustomDay {
  dayNumber: number;
  destination: string;
  budgetEstimate: string;
  highlights: string[];
  morning: string;
  afternoon: string;
  evening: string;
  transport: string;
  stay: string;
}

export interface AiCustomItinerary {
  id: string;
  title: string;
  durationLabel: string;
  overview: string;
  budgetLevel: string;
  estimatedCostTotal: string;
  bestTime?: string;
  specialTip?: string;
  days: AiCustomDay[];
}

interface ItineraryPlannerProps {
  currentLang: Language;
}

interface PresetSuggestion {
  icon: string;
  titleVi: string;
  titleEn: string;
  titleKo: string;
  promptVi: string;
  promptEn: string;
  promptKo: string;
  duration: '1-3' | '4-7' | '10-14';
  style: string;
}

const ITINERARY_PRESETS: PresetSuggestion[] = [
  {
    icon: '🏖️',
    titleVi: 'Đà Nẵng - Hội An (Gia đình)',
    titleEn: 'Da Nang - Hoi An (Family)',
    titleKo: '다낭 - 호이안 (가족 힐링)',
    promptVi: 'Gia đình 4 người có trẻ nhỏ muốn đi Đà Nẵng - Hội An 4 ngày 3 đêm, thích tắm biển Mỹ Khê, ăn hải sản và dạo phố cổ',
    promptEn: 'Family of 4 with kids visiting Da Nang & Hoi An for 4 days 3 nights, love beaches, local seafood and lanterns',
    promptKo: '아이 동반 4인 가족 다낭·호이안 4박 5일 일정, 해변 수영과 미식, 야경 위주',
    duration: '4-7',
    style: 'family',
  },
  {
    icon: '🏍️',
    titleVi: 'Phượt Hà Giang (Xe máy)',
    titleEn: 'Ha Giang Loop (Motorbike)',
    titleKo: '하장 모터바이크 루프',
    promptVi: 'Phượt xe máy Hà Giang 3 ngày 2 đêm, chinh phục đèo Mã Pí Lèng, chèo thuyền sông Nho Quế và ngắm hoa tam giác mạch',
    promptEn: 'Motorbike loop in Ha Giang for 3 days 2 nights, conquer Ma Pi Leng Pass, Nho Que River and ethnic villages',
    promptKo: '하장 3박 4일 모터바이크 루프 투어, 마피렝 고개, 뇨꿰강 보트 투어',
    duration: '1-3',
    style: 'adventure',
  },
  {
    icon: '🏝️',
    titleVi: 'Phú Quốc (Biển & Hoàng hôn)',
    titleEn: 'Phu Quoc (Beaches & Sunset)',
    titleKo: '푸꾸옥 (리조트 & 선셋)',
    promptVi: 'Nghỉ dưỡng đảo ngọc Phú Quốc 4 ngày 3 đêm: lặn ngắm san hô 4 đảo, cáp treo Hòn Thơm và ăn hải sản chợ đêm Dương Đông',
    promptEn: 'Phu Quoc island getaway 4 days 3 nights: 4-island coral tour, Hon Thom cable car and night market seafood',
    promptKo: '푸꾸옥 3박 4일 리조트 힐링, 4개 섬 호핑투어, 혼똔 케이블카, 야시장 해산물',
    duration: '4-7',
    style: 'resort',
  },
  {
    icon: '☕',
    titleVi: 'Đà Lạt (Săn mây & Cafe)',
    titleEn: 'Da Lat (Clouds & Cafes)',
    titleKo: '달랏 (구름 사냥 & 카페)',
    promptVi: 'Du lịch Đà Lạt 3 ngày 2 đêm cho đôi bạn trẻ: săn mây đồi chè Cầu Đất, cafe view thung lũng lãng mạn và ăn lẩu gà lá é',
    promptEn: 'Da Lat romantic getaway 3 days 2 nights: Cau Dat tea hill cloud hunting, valley view cafes and night market',
    promptKo: '달랏 2박 3일 낭만 여행, 구름 사냥, 계곡 뷰 카페 투어, 야시장 로컬 미식',
    duration: '1-3',
    style: 'nature',
  },
  {
    icon: '🚣',
    titleVi: 'Miền Tây (Chợ nổi & Miệt vườn)',
    titleEn: 'Mekong Delta (River & Orchards)',
    titleKo: '메콩 델타 (수상시장 & 과수원)',
    promptVi: 'Khám phá sông nước Miền Tây 2 ngày 1 đêm: chợ nổi Cái Răng Cần Thơ, vườn trái cây Bến Tre và nghe đờn ca tài tử',
    promptEn: 'Mekong Delta exploration 2 days 1 night: Cai Rang floating market, Ben Tre coconut canals and folk music',
    promptKo: '메콩 델타 1박 2일 투어, 까이랑 수상시장, 벤째 코코넛 운하, 남부 민속 음악',
    duration: '1-3',
    style: 'culture',
  },
  {
    icon: '🏮',
    titleVi: 'Cố Đô Huế - Hội An (Di sản)',
    titleEn: 'Hue - Hoi An (World Heritage)',
    titleKo: '후에 - 호이안 (유네스코 세계유산)',
    promptVi: 'Hành trình di sản Cố đô Huế và Phố cổ Hội An 4 ngày 3 đêm, mặc cổ phục chụp ảnh Đại Nội, nghe ca Huế trên sông Hương và ăn ẩm thực cung đình',
    promptEn: 'Heritage route Hue Imperial Citadel & Hoi An Ancient Town 4 days 3 nights: antique costumes, dragon boat & royal food',
    promptKo: '후에 황궁 & 호이안 3박 4일 유네스코 세계유산 코스, 전통 의상 체험 및 궁중 미식',
    duration: '4-7',
    style: 'heritage',
  },
];

// Initial default AI-tailored itineraries to display immediately on first view
const INITIAL_PLANS: Record<Language, AiCustomItinerary> = {
  vi: {
    id: 'initial-heritage-central-vi',
    title: 'Hành Trình Di Sản Miền Trung: Đà Nẵng - Phố Cổ Hội An - Cố Đô Huế',
    durationLabel: '4 Ngày 3 Đêm',
    overview: 'Hành trình được AI thiết kế tối ưu kết hợp giữa thư giãn tại bãi biển Mỹ Khê Đà Nẵng, nét trầm mặc lung linh đèn lồng Hội An và vẻ thâm nghiêm của Cố đô Huế ngàn năm văn hiến.',
    budgetLevel: 'Tiêu chuẩn (~5.2tr/người)',
    estimatedCostTotal: '4.800.000 VNĐ - 6.200.000 VNĐ / người',
    bestTime: 'Tháng 2 - Tháng 8 (Trời trong xanh, biển êm, phố cổ rực rỡ)',
    specialTip: 'Nên ghé Hội An vào khoảng 16h30 để đón cả khoảnh khắc hoàng hôn sông Hoài và ánh đèn lồng rực sáng khi đêm về.',
    days: [
      {
        dayNumber: 1,
        destination: 'Đà Nẵng (Bán Đảo Sơn Trà & Biển Mỹ Khê)',
        budgetEstimate: '1.200.000 VNĐ',
        highlights: ['Chùa Linh Ứng Bãi Bụt', 'Biển Mỹ Khê', 'Cầu Rồng Phun Lửa'],
        morning: 'Đáp sân bay Đà Nẵng, xe đưa về khách sạn nhận phòng. Khởi hành viếng Chùa Linh Ứng trên Bán đảo Sơn Trà, chiêm bái tượng Phật Bà Quan Âm 67m hướng biển.',
        afternoon: 'Tắm biển Mỹ Khê - một trong những bãi biển đẹp nhất hành tinh, thưởng thức nước dừa tươi và hải sản ven biển.',
        evening: 'Ăn tối bánh tráng cuốn thịt heo hai đầu da, dạo phố Bạch Đằng và ngắm Cầu Rồng phun lửa, phun nước rực rỡ vào lúc 21h00.',
        transport: 'Xe đưa đón sân bay & Taxi / Grab',
        stay: 'Khách sạn 4 sao ven biển Mỹ Khê',
      },
      {
        dayNumber: 2,
        destination: 'Bà Nà Hills - Phố Cổ Hội An',
        budgetEstimate: '1.800.000 VNĐ',
        highlights: ['Cầu Vàng Bàn Tay Khổng Lồ', 'Làng Pháp Mộng Mơ', 'Thả Đèn Hoa Đăng Sông Hoài'],
        morning: 'Lên đỉnh Bà Nà Hills bằng cáp treo đạt kỷ lục thế giới, check-in Cầu Vàng sương mây bồng bềnh và Vườn hoa Le Jardin D\'Amour.',
        afternoon: 'Di chuyển về Phố cổ Hội An. Nhận phòng resort boutique, dạo bước qua Chùa Cầu Nhật Bản và các hội quán cổ kính.',
        evening: 'Đi thuyền gỗ thả hoa đăng cầu may mắn trên dòng sông Hoài, thưởng thức Cao Lầu, bánh bao bánh vạc và chè bắp Hội An.',
        transport: 'Cáp treo Bà Nà & Xe du lịch riêng',
        stay: 'Resort boutique phong cách Indochine ven sông Hoài',
      },
      {
        dayNumber: 3,
        destination: 'Hội An - Rừng Dừa Bảy Mẫu - Huế',
        budgetEstimate: '1.300.000 VNĐ',
        highlights: ['Múa Thuyền Thúng Rừng Dừa', 'Đèo Hải Vân Hùng Vĩ', 'Ca Huế Sông Hương'],
        morning: 'Tham quan Rừng dừa Bảy Mẫu Cẩm Thanh, trải nghiệm đi thuyền thúng tròn và xem các nghệ nhân biểu diễn quay thúng điêu luyện.',
        afternoon: 'Vượt Đèo Hải Vân - Đệ nhất hùng quan ngắm vịnh Lăng Cô trong xanh, sang Cố đô Huế nhận phòng khách sạn.',
        evening: 'Thưởng thức Bún Bò Huế chuẩn vị cay nồng, lên thuyền rồng thả hoa đăng và nghe biểu diễn Ca Huế di sản trên sông Hương.',
        transport: 'Thuyền thúng & Xe Limousine qua Đèo Hải Vân',
        stay: 'Khách sạn phong cách Hoàng gia ven sông Hương',
      },
      {
        dayNumber: 4,
        destination: 'Đại Nội Huế - Lăng Khải Định - Tạm Biệt',
        budgetEstimate: '900.000 VNĐ',
        highlights: ['Đại Nội Hoàng Thành Huế', 'Lăng Khải Định Đỉnh Cao Kiến Trúc', 'Chợ Đông Ba'],
        morning: 'Khám phá Đại Nội Huế: Ngọ Môn, Điện Thái Hòa, Tử Cấm Thành, thuê cổ phục Việt chụp ảnh lưu niệm trang trọng.',
        afternoon: 'Chiêm ngưỡng Lăng Khải Định với nghệ thuật ghép sành sứ tinh xảo, ghé Chợ Đông Ba mua mè xửng và trà sen cung đình làm quà.',
        evening: 'Xe tiễn đoàn ra sân bay Phú Bài (Huế) đáp chuyến bay về, kết thúc hành trình khám phá di sản trọn vẹn cảm xúc.',
        transport: 'Xe ô tô du lịch & Chuyến bay nội địa',
        stay: 'Kết thúc lịch trình / Về nhà ấm áp',
      },
    ],
  },
  en: {
    id: 'initial-heritage-central-en',
    title: 'Central Vietnam Heritage Trail: Da Nang - Hoi An Lanterns - Hue Citadel',
    durationLabel: '4 Days 3 Nights',
    overview: 'An AI-optimized journey combining the golden sands of My Khe Beach, the romantic lantern alleys of UNESCO Hoi An, and the imperial splendor of the ancient capital Hue.',
    budgetLevel: 'Standard (~$220/person)',
    estimatedCostTotal: '4,800,000 VNĐ - 6,200,000 VNĐ / person',
    bestTime: 'Feb - Aug (Sunny days, calm azure ocean, breezy nights)',
    specialTip: 'Arrive in Hoi An Ancient Town by 4:30 PM to catch both the sunset over Hoai River and the magical glow of lanterns lighting up.',
    days: [
      {
        dayNumber: 1,
        destination: 'Da Nang (Son Tra Peninsula & My Khe Beach)',
        budgetEstimate: '1,200,000 VNĐ',
        highlights: ['Lady Buddha at Linh Ung Pagoda', 'My Khe Beach', 'Dragon Bridge Fire Show'],
        morning: 'Arrive at Da Nang International Airport, transfer to beachside hotel. Visit Linh Ung Pagoda on Son Tra Peninsula, admiring the 67m Lady Buddha.',
        afternoon: 'Relax and swim at My Khe Beach, sip fresh coconut water, and taste fresh grilled squid and scallops.',
        evening: 'Dine on Da Nang sliced pork rice rolls, stroll Bach Dang promenade, and witness Dragon Bridge breathing fire and water at 9 PM.',
        transport: 'Airport pickup & Grab / Taxi',
        stay: '4-star beachfront hotel at My Khe Beach',
      },
      {
        dayNumber: 2,
        destination: 'Ba Na Hills - Hoi An Ancient Town',
        budgetEstimate: '1,800,000 VNĐ',
        highlights: ['Golden Bridge Giant Hands', 'French Medieval Village', 'Floating Lanterns on Hoai River'],
        morning: 'Ascend Ba Na Hills via world-record cable car, capture stunning photos at the iconic Golden Bridge and Le Jardin D\'Amour flower gardens.',
        afternoon: 'Transfer to Hoi An Ancient Town, check into boutique resort, wander past the Japanese Covered Bridge and historic merchant houses.',
        evening: 'Board a traditional wooden boat to release glowing paper lanterns on Hoai River; savor Cao Lau noodles and white rose dumplings.',
        transport: 'Ba Na Cable Car & Private Shuttle',
        stay: 'Indochine-style riverside boutique resort',
      },
      {
        dayNumber: 3,
        destination: 'Hoi An - Coconut Forest - Hue Imperial City',
        budgetEstimate: '1,300,000 VNĐ',
        highlights: ['Basket Boat Spinning', 'Scenic Hai Van Pass Drive', 'Perfume River Dragon Boat'],
        morning: 'Visit Cam Thanh coconut forest, take a ride in traditional round bamboo basket boats with local fishermen spinning shows.',
        afternoon: 'Drive over scenic Hai Van Pass with panoramic bay views, arrive in the Imperial City of Hue and check in.',
        evening: 'Savor authentic Bun Bo Hue (spicy beef noodle soup), board an evening dragon boat listening to royal folk singing on Perfume River.',
        transport: 'Round basket boat & Scenic coastal limousine',
        stay: 'Colonial heritage hotel near Perfume River',
      },
      {
        dayNumber: 4,
        destination: 'Hue Citadel - Khai Dinh Tomb - Departure',
        budgetEstimate: '900,000 VNĐ',
        highlights: ['Imperial Citadel Forbidden City', 'Khai Dinh Mosaic Tomb', 'Dong Ba Market Souvenirs'],
        morning: 'Tour the UNESCO Imperial Citadel: Ngo Mon Gate, Thai Hoa Palace, and try royal costume photography in the palace.',
        afternoon: 'Marvel at Khai Dinh Tomb’s intricate porcelain mosaic art; visit Dong Ba Market for royal lotus seed tea and sesame candies.',
        evening: 'Transfer to Phu Bai Airport (Hue) for return flight, concluding an unforgettable cultural immersion.',
        transport: 'Private vehicle & Domestic return flight',
        stay: 'Home sweet home',
      },
    ],
  },
  ko: {
    id: 'initial-heritage-central-ko',
    title: '베트남 중부 황금빛 유산: 다낭 미케비치 - 호이안 등불 - 후에 왕궁',
    durationLabel: '4박 5일 코스',
    overview: '다낭의 에메랄드빛 미케 비치 휴양, 유네스코 세계유산 호이안의 로맨틱한 등불 야경, 천년 왕조 후에의 장엄한 역사를 아우르는 AI 맞춤 추천 코스입니다.',
    budgetLevel: '표준 안심 코스 (~30만원/인)',
    estimatedCostTotal: '4,800,000 VNĐ - 6,200,000 VNĐ / 1인',
    bestTime: '2월 ~ 8월 (파도가 잔잔하고 맑은 건기, 야외 활동 최적)',
    specialTip: '호이안 구시가지는 오후 4시 30분경 도착하면 투본강 노을과 어둠 속에서 등불이 켜지는 장관을 모두 감상할 수 있습니다.',
    days: [
      {
        dayNumber: 1,
        destination: '다낭 (손짜 반도 & 미케 비치)',
        budgetEstimate: '1,200,000 VNĐ',
        highlights: ['린응사 해수관음상', '미케비치 해변 힐링', '용다리 불쇼'],
        morning: '다낭 국제공항 도착 후 호텔 체크인. 손짜 반도 린응사(Linh Ung)를 방문하여 67m 높이의 웅장한 해수관음상을 관람합니다.',
        afternoon: '포브스지 선정 세계 6대 해변 미케비치에서 모닝 수영과 시원한 코코넛 커피 한 잔의 여유를 즐깁니다.',
        evening: '다낭 특미 bánh tráng cuốn thịt heo(돼지고기 라이스페이퍼 롤)를 맛보고, 밤 9시 용다리의 화려한 불·물 분출 쇼를 관람합니다.',
        transport: '공항 픽업 차량 & 그랩 택시',
        stay: '미케비치 오션뷰 4성급 호텔',
      },
      {
        dayNumber: 2,
        destination: '바나힐 골든브릿지 - 호이안 구시가지',
        budgetEstimate: '1,800,000 VNĐ',
        highlights: ['골든브릿지 거대 손 조형물', '프랑스 중세 마을 테마파크', '투본강 소원배 등불 띄우기'],
        morning: '세계 최장 바나힐 케이블카를 타고 해발 1,487m에 위치한 구름 속 골든브릿지에서 환상적인 인생 사진을 남깁니다.',
        afternoon: '유네스코 고도 호이안으로 이동하여 체크인 후 일본 다리(내원교)와 떤키 고택을 걸으며 고풍스러운 분위기를 만끽합니다.',
        evening: '전통 목선 소원배를 타고 강물 위에 소원 등불을 띄우며, 호이안 전통 까오러우(Cao Lau) 국수와 화이트로즈 만두를 즐깁니다.',
        transport: '바나힐 케이블카 & 프라이빗 전용차량',
        stay: '호이안 투본강변 인도차이나 부티크 리조트',
      },
      {
        dayNumber: 3,
        destination: '호이안 - 바구니배 코코넛 숲 - 후에',
        budgetEstimate: '1,300,000 VNĐ',
        highlights: ['바구니배(Thuyền Thúng) 쇼', '하이반 고개 파노라마 전망', '향강 황실 용선 음악 감상'],
        morning: '깜탄 코코넛 수로에서 둥근 대나무 바구니배를 타고 사공들의 익살스러운 회전 묘기와 전통 그물 던지기를 체험합니다.',
        afternoon: '내셔널지오그래픽 추천 하이반 고개를 넘어 랑코만을 조망하며 천년 고도 후에(Hue)로 이동합니다.',
        evening: '깊고 얼큰한 국물의 원조 분보후에(Bun Bo Hue)를 맛보고, 향강 유람선에서 후에 황실 전통 음악(Ca Huế)을 감상합니다.',
        transport: '바구니배 & 하이반 고개 관광 리무진',
        stay: '후에 향강변 콜로니얼 스타일 호텔',
      },
      {
        dayNumber: 4,
        destination: '후에 황궁 - 카이딘 황제릉 - 귀국/종료',
        budgetEstimate: '900,000 VNĐ',
        highlights: ['후에 황궁 자금성', '카이딘 릉 도자기 모자이크 예술', '동바 시장 기념품 쇼핑'],
        morning: '응우옌 왕조의 심장부인 후에 황궁(Đại Nội) 오문과 태화전을 둘러보며 전통 황실 의상을 입고 특별한 기념 촬영을 진행합니다.',
        afternoon: '유럽과 동양 건축이 결합된 화려한 카이딘 황제릉을 관람하고, 동바 재래시장에서 연꽃씨앗 차와 깨과자를 구입합니다.',
        evening: '후에 푸바이 공항으로 이동하여 귀국 항공편 탑승, 잊지 못할 베트남 문화 유산 일정을 완성합니다.',
        transport: '전용 차량 & 귀국 항공편',
        stay: '일정 종료 / 안전한 귀가',
      },
    ],
  },
};

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ currentLang }) => {
  const { openTravelokaModal } = useAuth();

  // AI Itinerary Generator State
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<'1-3' | '4-7' | '10-14'>('4-7');
  const [selectedStyle, setSelectedStyle] = useState<string>('balanced');
  const [selectedBudget, setSelectedBudget] = useState<string>('standard');
  const [showFilters, setShowFilters] = useState(false);

  // Active AI Plan state initialized with localized default plan
  const [aiCustomPlan, setAiCustomPlan] = useState<AiCustomItinerary>(
    INITIAL_PLANS[currentLang] || INITIAL_PLANS.vi
  );
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [hasGeneratedCustom, setHasGeneratedCustom] = useState(false);

  // Keep initial plan synced if language changes and user hasn't generated a custom plan yet
  React.useEffect(() => {
    if (!hasGeneratedCustom) {
      setAiCustomPlan(INITIAL_PLANS[currentLang] || INITIAL_PLANS.vi);
    }
  }, [currentLang, hasGeneratedCustom]);

  // Handle AI generation when user enters prompt
  const handleAskAiPlanner = async (
    promptToUse?: string,
    overrideDuration?: '1-3' | '4-7' | '10-14',
    overrideStyle?: string
  ) => {
    const textPrompt = (promptToUse !== undefined ? promptToUse : customPrompt).trim();
    if (!textPrompt) return;

    if (promptToUse) {
      setCustomPrompt(promptToUse);
    }
    if (overrideDuration) {
      setSelectedDuration(overrideDuration);
    }
    if (overrideStyle) {
      setSelectedStyle(overrideStyle);
    }

    setIsAiLoading(true);
    try {
      const res = await fetch('/api/gemini/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textPrompt,
          language: currentLang,
          duration: overrideDuration || selectedDuration,
          travelStyle: overrideStyle || selectedStyle,
          budget: selectedBudget,
        }),
      });
      const data = await res.json();
      if (data.itinerary) {
        setAiCustomPlan(data.itinerary);
        setHasGeneratedCustom(true);
        setTimeout(() => {
          const el = document.getElementById('ai-itinerary-result-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    } catch (err) {
      console.error('Failed to generate AI itinerary:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCopyItinerary = (plan: AiCustomItinerary) => {
    const text = `🇻🇳 VIETNAM'S TRAVEL - ${plan.title}
⏱️ Thời lượng: ${plan.durationLabel}
💰 Ngân sách dự tính: ${plan.estimatedCostTotal} (${plan.budgetLevel})
📖 Tổng quan: ${plan.overview}
${plan.bestTime ? `📅 Thời điểm lý tưởng: ${plan.bestTime}` : ''}
${plan.specialTip ? `💡 Lưu ý vàng: ${plan.specialTip}` : ''}

LỘ TRÌNH CHI TIẾT TỪNG NGÀY:
${plan.days
  .map(
    (d) =>
      `\n📍 [Ngày ${d.dayNumber}: ${d.destination}] (Dự kiến: ${d.budgetEstimate})
- Điểm nhấn: ${d.highlights.join(' • ')}
- ☀️ Sáng: ${d.morning}
- 🌤️ Chiều: ${d.afternoon}
- 🌙 Tối: ${d.evening}
- 🚌 Phương tiện: ${d.transport}
- 🏨 Lưu trú: ${d.stay}`
  )
  .join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <section id="itinerary" className="py-14 sm:py-20 bg-sky-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider mb-2 border border-teal-200 shadow-2xs">
            <Bot className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {currentLang === 'vi'
                ? 'TẠO LỘ TRÌNH THEO NHU CẦU CÙNG AI'
                : currentLang === 'ko'
                ? 'AI 맞춤 여행 일정 플래너'
                : 'AI-POWERED CUSTOM ITINERARY'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'vi'
              ? 'Thiết Kế Lộ Trình Du Lịch Riêng Theo Mọi Nhu Cầu'
              : currentLang === 'ko'
              ? '원하시는 여행을 입력하시면 AI가 일정을 세워드립니다'
              : 'Design Your Custom Itinerary with Travel AI'}
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {currentLang === 'vi'
              ? 'Nhập bất kỳ mong muốn nào của bạn (điểm đến yêu thích, số ngày, sở thích ăn uống, đi cùng gia đình hay phượt bạn bè, ngân sách), trí tuệ nhân tạo AI sẽ tự động lập kế hoạch chi tiết từng ngày, từng buổi sáng - trưa - tối và dự toán chi phí minh bạch.'
              : currentLang === 'ko'
              ? '가고 싶은 여행지, 일정, 동행자, 선호하는 미식이나 예산 등을 자유롭게 입력하시면 AI가 일자별·시간대별 상세 루트와 실질적인 여행 경비를 투명하게 설계해 드립니다.'
              : 'Simply describe your dream journey — destinations, days, travel style, companions, or budget — and AI will craft a complete morning-to-night itinerary with realistic local cost breakdowns.'}
          </p>
        </div>

        {/* AI Travel Route Generator Box (Primary Interactive Control) */}
        <div className="bg-gradient-to-br from-sky-700 via-sky-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-sky-900/15 mb-10 border border-sky-400/30 relative overflow-hidden">
          {/* Background Decorative Accents */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-xs border border-white/20">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  {currentLang === 'vi'
                    ? 'AI GENERATOR • KẾT HỢP DỮ LIỆU 63 TỈNH THÀNH'
                    : currentLang === 'ko'
                    ? 'AI 스마트 플래너 • 베트남 63개 성·시 데이터 연동'
                    : 'AI TRAVEL PLANNER • 63 PROVINCES DATA'}
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs font-bold text-sky-100 hover:text-white cursor-pointer flex items-center gap-1.5 self-start sm:self-auto bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/15 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {showFilters
                    ? (currentLang === 'vi' ? 'Ẩn tùy chọn nâng cao' : currentLang === 'ko' ? '세부 필터 접기' : 'Hide filters')
                    : (currentLang === 'vi' ? 'Tùy chỉnh thời lượng & phong cách' : currentLang === 'ko' ? '일정·스타일 세부 선택' : 'Duration & style filters')}
                </span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              {currentLang === 'vi'
                ? 'Nhập Lộ Trình Bạn Muốn, AI Sẽ Lên Kế Hoạch Ngay Lập Tức'
                : currentLang === 'ko'
                ? '원하시는 여행 코스를 입력하시면 AI가 맞춤 일정을 세워드립니다'
                : 'Describe Your Dream Route, AI Plans Every Detail'}
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 mt-1.5 leading-relaxed max-w-3xl">
              {currentLang === 'vi'
                ? 'Bạn muốn đi phượt xe máy ngắm đèo, du lịch gia đình có trẻ nhỏ, nghỉ dưỡng resort biển, hay tour ẩm thực đường phố? Hãy nhập vào ô dưới đây:'
                : currentLang === 'ko'
                ? '가족 여행, 모터바이크 어드벤처, 휴양지 리조트, 로컬 맛집 투어 등 원하는 여행 방식을 적어주시면 AI가 최적의 일정과 경비를 계산해 드립니다.'
                : 'Tell AI your destinations, companion style, budget, or preferred activities. Receive a complete morning-to-night guide with real budget estimates!'}
            </p>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskAiPlanner();
              }}
              className="mt-5 flex flex-col sm:flex-row gap-2.5"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={
                    currentLang === 'vi'
                      ? 'Nhập lộ trình bạn muốn (Ví dụ: "Gia đình 4 người đi Đà Nẵng - Hội An 4 ngày 3 đêm thích tắm biển và ăn đặc sản")...'
                      : currentLang === 'ko'
                      ? '원하시는 일정을 적어주세요 (예: "부모님 모시고 4박 5일 다낭·호이안 힐링 여행 일정 짜줘")...'
                      : 'Enter your desired route (e.g. "4 days in Central Vietnam with kids, beach & street food under $1000")...'
                  }
                  className="w-full px-4 py-3.5 pr-10 rounded-2xl bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-3 focus:ring-amber-300 shadow-md border-0"
                />
                {customPrompt && (
                  <button
                    type="button"
                    onClick={() => setCustomPrompt('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isAiLoading || !customPrompt.trim()}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0 hover:scale-102"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>
                      {currentLang === 'vi'
                        ? 'AI Đang Lập Lộ Trình...'
                        : currentLang === 'ko'
                        ? 'AI 일정 계산 중...'
                        : 'AI Planning Route...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>
                      {currentLang === 'vi'
                        ? 'Tạo Lộ Trình Cùng AI'
                        : currentLang === 'ko'
                        ? 'AI 맞춤 일정 생성'
                        : 'Generate AI Route'}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Optional Advanced Filters Tray */}
            {showFilters && (
              <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Duration Category */}
                  <div>
                    <label className="block text-[11px] font-bold text-sky-200 mb-1.5">
                      ⏱️ {currentLang === 'vi' ? 'Quỹ thời gian:' : currentLang === 'ko' ? '여행 기간:' : 'Duration:'}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: '1-3', label: currentLang === 'vi' ? '1 - 3 Ngày' : currentLang === 'ko' ? '1~3일' : '1-3 Days' },
                        { id: '4-7', label: currentLang === 'vi' ? '4 - 7 Ngày' : currentLang === 'ko' ? '4~7일' : '4-7 Days' },
                        { id: '10-14', label: currentLang === 'vi' ? '8 - 14 Ngày' : currentLang === 'ko' ? '8~14일' : '8-14 Days' },
                      ].map((dur) => (
                        <button
                          key={dur.id}
                          type="button"
                          onClick={() => setSelectedDuration(dur.id as any)}
                          className={`py-1.5 px-2 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer ${
                            selectedDuration === dur.id
                              ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                              : 'bg-white/15 text-white hover:bg-white/25'
                          }`}
                        >
                          {dur.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel Style */}
                  <div>
                    <label className="block text-[11px] font-bold text-sky-200 mb-1.5">
                      ✨ {currentLang === 'vi' ? 'Phong cách trải nghiệm:' : currentLang === 'ko' ? '여행 테마:' : 'Travel Style:'}
                    </label>
                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="w-full py-1.5 px-3 rounded-xl bg-slate-900/60 text-white border border-white/20 text-xs focus:outline-hidden"
                    >
                      <option value="balanced" className="bg-slate-900">{currentLang === 'vi' ? 'Cân bằng & Linh hoạt' : currentLang === 'ko' ? '균형 잡힌 일정' : 'Balanced & Flexible'}</option>
                      <option value="family" className="bg-slate-900">{currentLang === 'vi' ? 'Gia đình có trẻ nhỏ / người lớn' : currentLang === 'ko' ? '가족 단위 힐링' : 'Family with kids / seniors'}</option>
                      <option value="adventure" className="bg-slate-900">{currentLang === 'vi' ? 'Phượt xe máy & Mạo hiểm' : currentLang === 'ko' ? '어드벤처 & 모터바이크' : 'Adventure & Motorbike'}</option>
                      <option value="resort" className="bg-slate-900">{currentLang === 'vi' ? 'Nghỉ dưỡng biển & Thư giãn' : currentLang === 'ko' ? '해변 리조트 휴양' : 'Seaside Resort & Relaxation'}</option>
                      <option value="heritage" className="bg-slate-900">{currentLang === 'vi' ? 'Khám phá văn hóa & Di sản' : currentLang === 'ko' ? '문화재 & 유네스코 유산' : 'Culture & Heritage'}</option>
                      <option value="backpack" className="bg-slate-900">{currentLang === 'vi' ? 'Tiết kiệm / Du lịch bụi' : currentLang === 'ko' ? '합리적 배낭여행' : 'Budget Backpacker'}</option>
                    </select>
                  </div>

                  {/* Budget Tier */}
                  <div>
                    <label className="block text-[11px] font-bold text-sky-200 mb-1.5">
                      💰 {currentLang === 'vi' ? 'Mức ngân sách:' : currentLang === 'ko' ? '예산 수준:' : 'Budget tier:'}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'budget', label: currentLang === 'vi' ? 'Tiết kiệm' : currentLang === 'ko' ? '실속형' : 'Budget' },
                        { id: 'standard', label: currentLang === 'vi' ? 'Tiêu chuẩn' : currentLang === 'ko' ? '표준형' : 'Standard' },
                        { id: 'luxury', label: currentLang === 'vi' ? 'Cao cấp' : currentLang === 'ko' ? '고급형' : 'Luxury' },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setSelectedBudget(b.id)}
                          className={`py-1.5 px-2 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer ${
                            selectedBudget === b.id
                              ? 'bg-teal-400 text-slate-950 font-black shadow-xs'
                              : 'bg-white/15 text-white hover:bg-white/25'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Preset Suggestion Chips */}
            <div className="mt-4 pt-3.5 border-t border-white/20">
              <span className="text-[11px] font-bold text-sky-100 block mb-2">
                💡 {currentLang === 'vi' ? 'Gợi ý nhu cầu phổ biến (nhấn để AI lên lịch trình ngay):' : currentLang === 'ko' ? '인기 추천 테마 (클릭 시 AI 자동 생성):' : 'Popular suggestions (click to auto-generate):'}
              </span>
              <div className="flex flex-wrap gap-2">
                {ITINERARY_PRESETS.map((preset, index) => {
                  const title =
                    currentLang === 'vi' ? preset.titleVi : currentLang === 'ko' ? preset.titleKo : preset.titleEn;
                  const prompt =
                    currentLang === 'vi' ? preset.promptVi : currentLang === 'ko' ? preset.promptKo : preset.promptEn;

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={isAiLoading}
                      onClick={() => handleAskAiPlanner(prompt, preset.duration, preset.style)}
                      className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/30 text-white text-[11px] font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 hover:scale-103"
                    >
                      <span>{preset.icon}</span>
                      <span>{title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State Banner */}
        {isAiLoading && (
          <div className="bg-white rounded-3xl border-2 border-amber-400 shadow-xl p-8 mb-10 text-center animate-pulse">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h4 className="text-lg font-black text-slate-900">
              {currentLang === 'vi'
                ? 'AI Đang Lên Kế Hoạch Lộ Trình Theo Nhu Cầu Của Bạn...'
                : currentLang === 'ko'
                ? 'AI가 입력하신 조건에 맞춰 최적의 일정을 설계 중입니다...'
                : 'AI is Designing Your Tailored Itinerary...'}
            </h4>
            <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto">
              {currentLang === 'vi'
                ? 'Đang phân tích điểm đến, sắp xếp cung đường di chuyển tối ưu, thực đơn ẩm thực và tính toán dự toán kinh phí chuẩn xác.'
                : currentLang === 'ko'
                ? '여행지 간 이동 동선, 추천 미식, 일자별 볼거리와 투명한 현지 경비를 계산하고 있습니다.'
                : 'Analyzing destinations, optimizing travel connections, food highlights, and computing daily spend estimates.'}
            </p>
          </div>
        )}

        {/* AI Generated Custom Itinerary Result Card */}
        {aiCustomPlan && (
          <div
            id="ai-itinerary-result-section"
            className="bg-white rounded-3xl border-2 border-teal-500 shadow-xl p-6 sm:p-8 mb-10 transition-all animate-in fade-in duration-300"
          >
            {/* Header of AI Result */}
            <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 border-b border-sky-100 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>
                      {hasGeneratedCustom
                        ? (currentLang === 'vi' ? 'Lộ Trình AI Tùy Chỉnh' : currentLang === 'ko' ? 'AI 맞춤 생성 코스' : 'AI Custom Route')
                        : (currentLang === 'vi' ? 'Lộ Trình Mẫu Thiết Kế Bởi AI' : currentLang === 'ko' ? 'AI 추천 표준 코스' : 'AI Featured Route')}
                    </span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                    {aiCustomPlan.budgetLevel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black">
                    ⏱️ {aiCustomPlan.durationLabel}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {aiCustomPlan.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                  {aiCustomPlan.overview}
                </p>

                {/* Best time & Special tip badges */}
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                  {aiCustomPlan.bestTime && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>
                        {currentLang === 'vi' ? 'Mùa đẹp nhất: ' : currentLang === 'ko' ? '최적 시기: ' : 'Best season: '}
                        {aiCustomPlan.bestTime}
                      </span>
                    </span>
                  )}
                  {aiCustomPlan.specialTip && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-bold">
                      <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{aiCustomPlan.specialTip}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Total Spend & Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 shrink-0">
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 shrink-0 text-left md:text-right">
                  <span className="text-[11px] text-slate-500 block font-medium">
                    {currentLang === 'vi'
                      ? 'Dự toán chi phí AI tính toán'
                      : currentLang === 'ko'
                      ? 'AI 예상 총 여행 경비'
                      : 'AI Estimated Total Spend'}
                  </span>
                  <span className="text-base sm:text-lg font-black text-teal-800">
                    {aiCustomPlan.estimatedCostTotal}
                  </span>
                </div>

                {/* Copy Itinerary Action */}
                <button
                  type="button"
                  onClick={() => handleCopyItinerary(aiCustomPlan)}
                  className="px-3.5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                  title="Sao chép toàn bộ lịch trình này"
                >
                  {copiedToast ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">
                        {currentLang === 'vi' ? 'Đã sao chép!' : currentLang === 'ko' ? '복사 완료!' : 'Copied!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600" />
                      <span>{currentLang === 'vi' ? 'Sao Chép' : currentLang === 'ko' ? '일정 복사' : 'Copy'}</span>
                    </>
                  )}
                </button>

                {/* Traveloka Booking CTA for AI plan */}
                <button
                  type="button"
                  onClick={() => {
                    const firstDayDest = aiCustomPlan.days[0]?.destination || 'Đà Nẵng';
                    const airportMap: Record<string, string> = {
                      'Hà Nội': 'HAN',
                      'Hạ Long': 'HPH',
                      'Sa Pa': 'HAN',
                      'Hà Giang': 'HAN',
                      'Đà Nẵng': 'DAD',
                      'Hội An': 'DAD',
                      'Huế': 'HUI',
                      'Nha Trang': 'CXR',
                      'Đà Lạt': 'DLI',
                      'Quy Nhơn': 'UIH',
                      'TP. Hồ Chí Minh': 'SGN',
                      'Phú Quốc': 'PQC',
                      'Cần Thơ': 'VCA',
                    };
                    const matchCode =
                      Object.entries(airportMap).find(([k]) => firstDayDest.includes(k))?.[1] || 'DAD';
                    const originCode = matchCode === 'HAN' ? 'SGN' : 'HAN';
                    openTravelokaModal('combo', { originCode, destCode: matchCode });
                  }}
                  className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#0194f3] to-[#007ce8] hover:from-[#0082d6] hover:to-[#0064d2] text-white text-xs font-black transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2.5 cursor-pointer border border-white/20"
                >
                  <Plane className="w-4 h-4 text-white" />
                  <div className="text-left">
                    <span className="block leading-tight font-extrabold text-white">
                      {currentLang === 'vi'
                        ? 'Đặt Vé & Phòng Traveloka'
                        : currentLang === 'ko'
                        ? 'Traveloka 항공 & 호텔 예약'
                        : 'Book on Traveloka'}
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold block">
                      {currentLang === 'vi' ? 'Ưu đãi combo giảm tới 30%' : currentLang === 'ko' ? '콤보 최대 30% 할인' : 'Save up to 30% combo'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Day-by-Day Detailed AI Plan Cards */}
            <div className="mt-8 space-y-6">
              {aiCustomPlan.days.map((day) => (
                <div
                  key={day.dayNumber}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-teal-100 hover:border-teal-300 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-200/60">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {currentLang === 'vi' ? `N${day.dayNumber}` : currentLang === 'ko' ? `${day.dayNumber}일차` : `D${day.dayNumber}`}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {day.destination}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>
                        {currentLang === 'vi' ? 'Chi phí ngày: ' : currentLang === 'ko' ? '일일 예상 경비: ' : 'Day spend: '}
                        {day.budgetEstimate}
                      </span>
                    </div>
                  </div>

                  {/* Highlights tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {day.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-teal-100 text-[11px] font-semibold text-teal-800 shadow-2xs"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  {/* Morning, Afternoon, Evening breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
                    <div className="p-3.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                      <span className="font-bold text-amber-700 block mb-1 flex items-center gap-1">
                        <span>☀️</span>
                        <span>{currentLang === 'vi' ? 'Buổi Sáng:' : currentLang === 'ko' ? '오전:' : 'Morning:'}</span>
                      </span>
                      <p className="text-slate-600 leading-relaxed">{day.morning}</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                      <span className="font-bold text-sky-700 block mb-1 flex items-center gap-1">
                        <span>🌤️</span>
                        <span>{currentLang === 'vi' ? 'Buổi Chiều:' : currentLang === 'ko' ? '오후:' : 'Afternoon:'}</span>
                      </span>
                      <p className="text-slate-600 leading-relaxed">{day.afternoon}</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                      <span className="font-bold text-indigo-700 block mb-1 flex items-center gap-1">
                        <span>🌙</span>
                        <span>{currentLang === 'vi' ? 'Buổi Tối:' : currentLang === 'ko' ? '저녁 & 야경:' : 'Evening:'}</span>
                      </span>
                      <p className="text-slate-600 leading-relaxed">{day.evening}</p>
                    </div>
                  </div>

                  {/* Transport & Stay Details with Traveloka Quick Actions */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100 gap-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Bus className="w-3.5 h-3.5 text-sky-600" />
                        <span>
                          <strong>{currentLang === 'vi' ? 'Di chuyển: ' : currentLang === 'ko' ? '교통편: ' : 'Transport: '}</strong>
                          {day.transport}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          <strong>{currentLang === 'vi' ? 'Chỗ ở: ' : currentLang === 'ko' ? '추천 숙소: ' : 'Accommodation: '}</strong>
                          {day.stay}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openTravelokaModal('hotel', { cityId: day.destination.toLowerCase() })}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                        title={currentLang === 'vi' ? `Tìm khách sạn Traveloka tại ${day.destination}` : currentLang === 'ko' ? `${day.destination} 호텔 검색` : `Search hotels in ${day.destination}`}
                      >
                        <Home className="w-3 h-3 text-emerald-600" />
                        <span>{currentLang === 'vi' ? 'Khách Sạn Traveloka' : currentLang === 'ko' ? 'Traveloka 호텔' : 'Traveloka Stays'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openTravelokaModal('xperience', { cityId: day.destination.toLowerCase() })}
                        className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold border border-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
                        title={currentLang === 'vi' ? `Tìm vé tham quan & tour tại ${day.destination}` : currentLang === 'ko' ? `${day.destination} 명소 입장권 검색` : `Search attractions in ${day.destination}`}
                      >
                        <Compass className="w-3 h-3 text-purple-600" />
                        <span>{currentLang === 'vi' ? 'Vé Vui Chơi' : currentLang === 'ko' ? '입장권 & 투어' : 'Attractions'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Regenerate / Create Another Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>
                  {currentLang === 'vi'
                    ? 'Bạn có thể nhập yêu cầu mới bất kỳ lúc nào để AI tạo thêm lộ trình khác.'
                    : currentLang === 'ko'
                    ? '언제든지 상단 입력창에 새로운 요구사항을 적어 다른 일정을 생성하실 수 있습니다.'
                    : 'Feel free to type any new requirements above to generate another personalized plan.'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: document.getElementById('itinerary')?.offsetTop || 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
                <span>
                  {currentLang === 'vi'
                    ? 'Nhập yêu cầu lộ trình khác'
                    : currentLang === 'ko'
                    ? '다른 여행 코스 입력하기'
                    : 'Plan another route'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
