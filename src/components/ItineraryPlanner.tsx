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
  Wand2,
  Zap,
  MessageSquare,
  Send,
  X,
  Volume2,
  VolumeX,
  MapPin,
  Users,
  Heart,
  Camera,
  Coffee,
  Utensils,
  ChevronRight,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Layers,
  Settings2,
  Tag,
} from 'lucide-react';
import { Language } from '../types';
import { useAuth } from '../context/AuthContext';
import { resolveDestinationAirport, resolveDestinationCityId } from '../data/travelokaData';

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

export const POPULAR_DESTINATIONS = [
  { id: 'Đà Lạt', nameVi: 'Đà Lạt', label: '🌸 Thành phố hoa & Săn mây', code: 'DLI', tag: 'Cao nguyên se lạnh' },
  { id: 'Phú Quốc', nameVi: 'Phú Quốc', label: '🏝️ Đảo ngọc & Biển trong vắt', code: 'PQC', tag: 'Nghỉ dưỡng biển' },
  { id: 'Đà Nẵng - Hội An', nameVi: 'Đà Nẵng - Hội An', label: '🏖️ Biển Mỹ Khê & Phố đèn lồng', code: 'DAD', tag: 'Di sản & Biển' },
  { id: 'Sa Pa', nameVi: 'Sa Pa', label: '⛰️ Đỉnh Fansipan & Bản làng', code: 'HAN', tag: 'Săn mây Tây Bắc' },
  { id: 'Nha Trang', nameVi: 'Nha Trang', label: '🌊 Vịnh biển đẹp & VinWonders', code: 'CXR', tag: 'Vui chơi & Lặn san hô' },
  { id: 'Hà Nội - Ninh Bình', nameVi: 'Hà Nội - Ninh Bình', label: '🚣 Tràng An, Hang Múa & Phố Cổ', code: 'HAN', tag: 'Văn hóa ngàn năm' },
  { id: 'Cố Đô Huế', nameVi: 'Cố Đô Huế', label: '🏮 Đại Nội & Ca Huế sông Hương', code: 'HUI', tag: 'Cố đô di sản' },
  { id: 'Miền Tây - Cần Thơ', nameVi: 'Miền Tây', label: '🛶 Chợ nổi Cái Răng & Miệt vườn', code: 'VCA', tag: 'Sông nước hữu tình' },
  { id: 'Hạ Long', nameVi: 'Hạ Long', label: '⛵ Vịnh di sản & Du thuyền 5 sao', code: 'HPH', tag: 'Kỳ quan thế giới' },
  { id: 'Hà Giang', nameVi: 'Hà Giang', label: '🏍️ Mã Pí Lèng & Sông Nho Quế', code: 'HAN', tag: 'Cung đèo hùng vĩ' },
  { id: 'Quy Nhơn - Phú Yên', nameVi: 'Quy Nhơn', label: '🌅 Kỳ Co, Eo Gió & Gành Đá Đĩa', code: 'UIH', tag: 'Biển xanh hoang sơ' },
];

export const DEPARTURE_CITIES = [
  { id: 'TP. Hồ Chí Minh (SGN)', labelVi: 'TP. Hồ Chí Minh (Sân bay Tân Sơn Nhất - SGN)', code: 'SGN' },
  { id: 'Hà Nội (HAN)', labelVi: 'Hà Nội (Sân bay Nội Bài - HAN)', code: 'HAN' },
  { id: 'Đà Nẵng (DAD)', labelVi: 'Đà Nẵng (Sân bay Đà Nẵng - DAD)', code: 'DAD' },
  { id: 'Cần Thơ (VCA)', labelVi: 'Cần Thơ (Sân bay Trà Nóc - VCA)', code: 'VCA' },
  { id: 'Hải Phòng (HPH)', labelVi: 'Hải Phòng (Sân bay Cát Bi - HPH)', code: 'HPH' },
];

export const COMPANION_OPTIONS = [
  { id: 'couple', icon: '💑', labelVi: 'Cặp đôi / Trăng mật', descVi: 'Lãng mạn, riêng tư, ăn tối view đẹp' },
  { id: 'family_kids', icon: '👨‍👩‍👧‍👦', labelVi: 'Gia đình có trẻ nhỏ', descVi: 'Lịch nhẹ nhàng, khu vui chơi, resort' },
  { id: 'family_seniors', icon: '👵', labelVi: 'Gia đình & Người lớn tuổi', descVi: 'Nghỉ dưỡng, văn hóa, không leo dốc' },
  { id: 'friends', icon: '🎒', labelVi: 'Nhóm bạn trẻ / Phượt', descVi: 'Sống ảo, cafe đẹp, ăn đêm, vui hết nấc' },
  { id: 'solo', icon: '🚶', labelVi: 'Du lịch độc hành', descVi: 'Tự do trải nghiệm, khám phá sâu sắc' },
];

export const INTEREST_OPTIONS = [
  { id: 'food', icon: '🍜', labelVi: 'Ẩm thực & Food Tour đêm' },
  { id: 'photo', icon: '📸', labelVi: 'Check-in sống ảo & Cà phê đẹp' },
  { id: 'beach', icon: '🏖️', labelVi: 'Biển đảo & Lặn ngắm san hô' },
  { id: 'culture', icon: '🏛️', labelVi: 'Di sản văn hóa & Làng nghề' },
  { id: 'nature', icon: '⛰️', labelVi: 'Săn mây, Trekking & Thiên nhiên' },
  { id: 'theme_park', icon: '🎢', labelVi: 'VinWonders & Công viên giải trí' },
  { id: 'relaxation', icon: '💆', labelVi: 'Resort, Khoáng nóng & Spa' },
];

export const DURATION_OPTIONS = [
  { days: 2, labelVi: '2N1Đ', fullVi: '2 Ngày 1 Đêm (Cuối tuần)' },
  { days: 3, labelVi: '3N2Đ', fullVi: '3 Ngày 2 Đêm (Lý tưởng)', popular: true },
  { days: 4, labelVi: '4N3Đ', fullVi: '4 Ngày 3 Đêm (Trọn vẹn)', popular: true },
  { days: 5, labelVi: '5N4Đ', fullVi: '5 Ngày 4 Đêm (Thư thả)' },
  { days: 6, labelVi: '6N5Đ', fullVi: '6 Ngày 5 Đêm (Khám phá sâu)' },
  { days: 7, labelVi: '7N6Đ', fullVi: '7 Ngày 6 Đêm (Tour xuyên tuyến)' },
];

export const BUDGET_OPTIONS = [
  { id: 'budget', icon: '🏷️', labelVi: 'Tiết kiệm', descVi: '~900k/ngày (Homestay, quán bản địa, xe máy)' },
  { id: 'standard', icon: '💎', labelVi: 'Tiêu chuẩn', descVi: '~1.5tr/ngày (Khách sạn 3-4★, xe riêng/taxi, hải sản)' },
  { id: 'luxury', icon: '👑', labelVi: 'Cao cấp', descVi: '~2.8tr/ngày (Resort 5★, ẩm thực fine dining, xe VIP)' },
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
  const { openTravelokaModal, openBookingModal } = useAuth();

  // Mode & User Wish Studio State
  const [creationMode, setCreationMode] = useState<'studio' | 'prompt'>('studio');
  const [selectedDestination, setSelectedDestination] = useState<string>('Đà Lạt');
  const [customDestinationText, setCustomDestinationText] = useState<string>('');
  const [selectedDeparture, setSelectedDeparture] = useState<string>('TP. Hồ Chí Minh (SGN)');
  const [selectedDays, setSelectedDays] = useState<number>(3);
  const [selectedCompanion, setSelectedCompanion] = useState<string>('couple');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['food', 'photo', 'nature']);
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>('standard');
  const [specialWishNotes, setSpecialWishNotes] = useState<string>('');
  const [loadingStage, setLoadingStage] = useState<number>(0);

  // Backward compatible prompt states
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

  // Gemini Tweak & Interactive Day Advice States
  const [tweakInstruction, setTweakInstruction] = useState('');
  const [isTweaking, setIsTweaking] = useState(false);
  const [tweakMessage, setTweakMessage] = useState<string | null>(null);
  const [dayAdviceModal, setDayAdviceModal] = useState<{
    day: AiCustomDay;
    advice: string | null;
    isLoading: boolean;
    question: string;
  } | null>(null);

  // Gemini TTS Audio Narration State
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Helper to resolve departure airport code and destination airport for Traveloka actions
  const getTravelokaRouteInfo = (specificDest?: string) => {
    const rawDest =
      specificDest ||
      customDestinationText.trim() ||
      selectedDestination ||
      aiCustomPlan?.days[0]?.destination ||
      'Đà Lạt';
    const target = resolveDestinationAirport(rawDest);
    const depMatch = selectedDeparture.match(/\(([A-Z]{3})\)/);
    const depCode = depMatch ? depMatch[1] : 'SGN';
    const safeOrigin = depCode === target.code ? (target.code === 'HAN' ? 'SGN' : 'HAN') : depCode;
    return {
      target,
      originCode: safeOrigin,
      destCode: target.code,
      cityId: target.cityId,
      cityVi: target.cityVi || rawDest,
    };
  };

  const handlePlayGeminiAudio = async (plan: AiCustomItinerary) => {
    if (isPlayingAudio && audioElement) {
      audioElement.pause();
      setIsPlayingAudio(false);
      return;
    }

    setIsAudioLoading(true);
    try {
      const res = await fetch('/api/gemini/itinerary-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: plan.title,
          overview: plan.overview,
          language: currentLang,
        }),
      });
      const data = await res.json();
      if (data.audio) {
        if (audioElement) {
          audioElement.pause();
        }
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => setIsPlayingAudio(false);
        setAudioElement(audio);
        await audio.play();
        setIsPlayingAudio(true);
      }
    } catch (err) {
      console.error('Failed to play Gemini audio:', err);
    } finally {
      setIsAudioLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [audioElement]);

  // Keep initial plan synced if language changes and user hasn't generated a custom plan yet
  React.useEffect(() => {
    if (!hasGeneratedCustom) {
      setAiCustomPlan(INITIAL_PLANS[currentLang] || INITIAL_PLANS.vi);
    }
  }, [currentLang, hasGeneratedCustom]);

  // Handle AI generation when user enters prompt or clicks generate in studio
  const handleAskAiPlanner = async (options?: {
    dest?: string;
    dep?: string;
    days?: number;
    comp?: string;
    interestsList?: string[];
    budget?: string;
    notes?: string;
    freePrompt?: string;
    overrideDuration?: '1-3' | '4-7' | '10-14';
    overrideStyle?: string;
  }) => {
    const dest = options?.dest || (customDestinationText.trim() || selectedDestination);
    const dep = options?.dep || selectedDeparture;
    const days = options?.days || selectedDays;
    const comp = options?.comp || selectedCompanion;
    const ints = options?.interestsList || selectedInterests;
    const bud = options?.budget || selectedBudgetTier;
    const notes = options?.notes !== undefined ? options.notes : specialWishNotes;
    const freePrompt = options?.freePrompt !== undefined ? options.freePrompt : customPrompt;

    setIsAiLoading(true);
    setTweakMessage(null);
    setLoadingStage(0);

    const stageTimer = setInterval(() => {
      setLoadingStage((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1100);

    try {
      const res = await fetch('/api/gemini/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: dest,
          departureCity: dep,
          durationDays: days,
          companion: comp,
          interests: ints,
          budgetTier: bud,
          specialNotes: notes,
          prompt: freePrompt || `${dest} ${days} ngày khởi hành từ ${dep} đi cùng ${comp}`,
          language: currentLang,
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
      clearInterval(stageTimer);
      setIsAiLoading(false);
    }
  };

  // Handle interactive tweaking with Google Gemini
  const handleTweakWithGemini = async (instructionToUse?: string) => {
    const instruction = (instructionToUse || tweakInstruction).trim();
    if (!instruction || !aiCustomPlan) return;

    setIsTweaking(true);
    setTweakMessage(null);
    try {
      const res = await fetch('/api/gemini/itinerary-tweak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPlan: aiCustomPlan,
          tweakInstruction: instruction,
          language: currentLang,
        }),
      });
      const data = await res.json();
      if (data.itinerary) {
        setAiCustomPlan(data.itinerary);
        setHasGeneratedCustom(true);
        setTweakInstruction('');
        setTweakMessage(
          currentLang === 'vi'
            ? `✨ Google Gemini đã cập nhật lộ trình: "${instruction}"`
            : currentLang === 'ko'
            ? `✨ Gemini가 요청하신 조건("${instruction}")을 반영하여 일정을 업데이트했습니다.`
            : `✨ Google Gemini updated your itinerary: "${instruction}"`
        );
        setTimeout(() => {
          const el = document.getElementById('ai-itinerary-result-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } catch (err) {
      console.error('Failed to tweak itinerary with Gemini:', err);
    } finally {
      setIsTweaking(false);
    }
  };

  // Handle getting Day Advice from Gemini
  const handleOpenDayAdvice = async (day: AiCustomDay, customQ?: string) => {
    setDayAdviceModal({
      day,
      advice: null,
      isLoading: true,
      question: customQ || '',
    });

    try {
      const res = await fetch('/api/gemini/day-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day,
          destination: day.destination,
          question: customQ || '',
          language: currentLang,
        }),
      });
      const data = await res.json();
      setDayAdviceModal((prev) =>
        prev
          ? {
              ...prev,
              advice: data.advice || '',
              isLoading: false,
            }
          : null
      );
    } catch (err) {
      console.error('Failed to get Gemini day advice:', err);
      setDayAdviceModal((prev) =>
        prev
          ? {
              ...prev,
              advice:
                currentLang === 'vi'
                  ? '💡 Hãy chuẩn bị trang phục nhẹ nhàng, giày đi bộ êm, sạc dự phòng và tận hưởng trọn vẹn từng khoảnh khắc!'
                  : '💡 Wear comfortable shoes, carry a power bank, and enjoy every moment of your journey!',
              isLoading: false,
            }
          : null
      );
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-amber-100 text-indigo-950 text-xs font-black uppercase tracking-wider mb-3 border border-indigo-200/90 shadow-2xs">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>
              {currentLang === 'vi'
                ? 'TÍCH HỢP GOOGLE GEMINI 3.8 FLASH • TRÍ TUỆ DU LỊCH ĐỘT PHÁ'
                : currentLang === 'ko'
                ? 'GOOGLE GEMINI 3.8 FLASH 탑재 • 지능형 여행 AI'
                : 'POWERED BY GOOGLE GEMINI 3.8 FLASH • SMART TRAVEL AI'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'vi'
              ? 'Thiết Kế Lộ Trình Du Lịch Thông Minh Cùng Google Gemini'
              : currentLang === 'ko'
              ? 'Google Gemini AI로 완성하는 나만의 베트남 맞춤 여행 일정'
              : 'Design Your Custom Itinerary with Google Gemini AI'}
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {currentLang === 'vi'
              ? 'Mô hình Google Gemini 3.8 Flash kết hợp cơ sở tri thức 63 tỉnh thành Việt Nam, tự động phân tích sở thích, tối ưu cung đường, sắp xếp thực đơn ẩm thực và tính toán ngân sách chi tiết từng ngày.'
              : currentLang === 'ko'
              ? 'Google Gemini 3.8 Flash 모델이 베트남 63개 성·시 관광 빅데이터와 결합하여 여행자의 취향과 예산에 맞춘 최적의 이동 동선, 미식 추천, 일자별 코스를 실시간으로 설계합니다.'
              : 'Google Gemini 3.8 Flash combines with real Vietnam 63 provinces travel intelligence to optimize routing, recommend authentic dining, and compute precise daily spend in real-time.'}
          </p>
        </div>

        {/* AI Travel Route Generator Box (Primary Interactive Control) */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-indigo-950/40 mb-10 border border-indigo-400/30 relative overflow-hidden">
          {/* Background Decorative Accents */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Header & Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-black backdrop-blur-xs border border-indigo-400/30 shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>
                    {currentLang === 'vi'
                      ? 'AI STUDIO • THIẾT KẾ LỘ TRÌNH THEO ĐÚNG Ý BẠN'
                      : currentLang === 'ko'
                      ? 'AI STUDIO • 나만의 맞춤 여행 코스 빌더'
                      : 'AI STUDIO • CUSTOM ROUTE BUILDER'}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-300/30">
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Google Gemini 3.8 Flash</span>
                </span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="inline-flex p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setCreationMode('studio')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    creationMode === 'studio'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-sky-200 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentLang === 'vi' ? 'Thiết Kế Chi Tiết' : currentLang === 'ko' ? '세부 맞춤 설계' : 'Custom Studio'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCreationMode('prompt')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    creationMode === 'prompt'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-sky-200 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{currentLang === 'vi' ? 'Nhập Nhanh Prompt' : currentLang === 'ko' ? '자유 프롬프트' : 'Quick Prompt'}</span>
                </button>
              </div>
            </div>

            {/* Mode 1: Interactive Wish Studio */}
            {creationMode === 'studio' ? (
              <div className="space-y-6">
                {/* Section 1: Destination & Departure */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>{currentLang === 'vi' ? '1. Chọn Điểm Đến Bạn Muốn Khám Phá' : currentLang === 'ko' ? '1. 여행 목적지 선택' : '1. Choose Destination'}</span>
                    </label>
                    <span className="text-[11px] text-sky-200">
                      {currentLang === 'vi' ? 'Nhấn chọn địa danh bên dưới hoặc gõ tự do' : 'Click to select or type below'}
                    </span>
                  </div>

                  {/* Destination Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-3">
                    {POPULAR_DESTINATIONS.map((dest) => {
                      const isSelected = selectedDestination === dest.id && !customDestinationText;
                      return (
                        <button
                          key={dest.id}
                          type="button"
                          onClick={() => {
                            setSelectedDestination(dest.id);
                            setCustomDestinationText('');
                          }}
                          className={`p-2.5 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                            isSelected
                              ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black border-amber-300 shadow-lg scale-102 ring-2 ring-amber-300'
                              : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                          }`}
                        >
                          <span className="text-xs font-extrabold block truncate leading-tight">{dest.nameVi}</span>
                          <span className={`text-[10px] block mt-0.5 truncate ${isSelected ? 'text-slate-900 font-semibold' : 'text-sky-200'}`}>
                            {dest.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom destination input & Departure City in a row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={customDestinationText}
                        onChange={(e) => {
                          setCustomDestinationText(e.target.value);
                          if (e.target.value) {
                            setSelectedDestination(e.target.value);
                          }
                        }}
                        placeholder={
                          currentLang === 'vi'
                            ? 'Hoặc gõ địa danh bất kỳ (Vũng Tàu, Côn Đảo, Buôn Ma Thuột...)'
                            : 'Or type any destination in Vietnam...'
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 text-xs sm:text-sm border border-white/20 focus:border-amber-400 placeholder:text-slate-400 focus:outline-hidden transition-all shadow-inner"
                      />
                    </div>

                    {/* Departure City */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-sky-200 font-bold shrink-0">
                        🛫 {currentLang === 'vi' ? 'Khởi hành từ:' : 'From:'}
                      </span>
                      <select
                        value={selectedDeparture}
                        onChange={(e) => setSelectedDeparture(e.target.value)}
                        className="flex-1 py-2.5 px-3 rounded-2xl bg-white/15 hover:bg-white/20 text-white border border-white/25 text-xs font-bold focus:outline-hidden cursor-pointer"
                      >
                        {DEPARTURE_CITIES.map((c) => (
                          <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                            {c.labelVi}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Duration & Companion */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4 border-t border-white/10">
                  {/* Duration Selector */}
                  <div>
                    <label className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-2">
                      ⏱️ {currentLang === 'vi' ? '2. Thời Lượng Chuyến Đi' : '2. Trip Duration'}
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {DURATION_OPTIONS.map((dur) => {
                        const isSelected = selectedDays === dur.days;
                        return (
                          <button
                            key={dur.days}
                            type="button"
                            onClick={() => setSelectedDays(dur.days)}
                            className={`py-2 px-1 rounded-2xl text-center transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md scale-102 ring-2 ring-amber-300'
                                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                            }`}
                          >
                            <span className="text-xs font-black block leading-none">{dur.labelVi}</span>
                            {dur.popular && (
                              <span className="text-[9px] font-bold text-amber-300 group-hover:text-amber-200 block mt-0.5">
                                {isSelected ? '★ Chọn' : '★ Hot'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Companion Selector */}
                  <div>
                    <label className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-2">
                      👥 {currentLang === 'vi' ? '3. Bạn Đồng Hành Cùng Ai?' : '3. Who Is Traveling?'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {COMPANION_OPTIONS.map((comp) => {
                        const isSelected = selectedCompanion === comp.id;
                        return (
                          <button
                            key={comp.id}
                            type="button"
                            onClick={() => setSelectedCompanion(comp.id)}
                            className={`p-2 rounded-2xl text-left transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-500 text-white font-black border-indigo-300 shadow-md ring-2 ring-amber-300'
                                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                            }`}
                          >
                            <span className="text-base block leading-none">{comp.icon}</span>
                            <span className="text-[11px] font-bold block mt-1 leading-tight truncate">{comp.labelVi}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Section 3: Interests & Desires (Multi-select) */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black text-amber-300 uppercase tracking-wider">
                      🎯 {currentLang === 'vi' ? '4. Gu Trải Nghiệm & Sở Thích Của Bạn (Chọn nhiều)' : '4. Travel Interests & Desires'}
                    </label>
                    <span className="text-[11px] text-sky-200">
                      {currentLang === 'vi' ? 'Đã chọn: ' : 'Selected: '}
                      <strong className="text-amber-300 font-black">{selectedInterests.length}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((item) => {
                      const isSelected = selectedInterests.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedInterests(selectedInterests.filter((x) => x !== item.id));
                            } else {
                              setSelectedInterests([...selectedInterests, item.id]);
                            }
                          }}
                          className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-teal-400 text-slate-950 font-black border-teal-300 shadow-md ring-2 ring-teal-300 scale-102'
                              : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span>{item.labelVi}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 ml-0.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Budget Tier & Special Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4 border-t border-white/10">
                  {/* Budget Tier */}
                  <div>
                    <label className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-2">
                      💰 {currentLang === 'vi' ? '5. Mức Ngân Sách Mong Muốn' : '5. Budget Tier'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {BUDGET_OPTIONS.map((b) => {
                        const isSelected = selectedBudgetTier === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBudgetTier(b.id)}
                            className={`p-2.5 rounded-2xl text-left transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md ring-2 ring-amber-300'
                                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                            }`}
                          >
                            <span className="text-sm block">{b.icon}</span>
                            <span className="text-xs font-black block mt-0.5 leading-tight">{b.labelVi}</span>
                            <span className={`text-[10px] block mt-1 leading-tight ${isSelected ? 'text-slate-900 font-bold' : 'text-sky-200'}`}>
                              {b.descVi.split('(')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Special Custom Notes */}
                  <div>
                    <label className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-2">
                      ✍️ {currentLang === 'vi' ? '6. Ghi Chú Mong Muốn Riêng (Nếu có)' : '6. Special Wish Notes'}
                    </label>
                    <input
                      type="text"
                      value={specialWishNotes}
                      onChange={(e) => setSpecialWishNotes(e.target.value)}
                      placeholder={
                        currentLang === 'vi'
                          ? 'Ví dụ: "Thích ăn lẩu gà lá é Tao Ngộ", "Thích cafe ngắm mây", "Bé 3 tuổi cần lịch nhẹ"...'
                          : 'e.g. "Love sunset cafes", "Prefer local street food", "Traveling with 3yo kid"...'
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 text-xs sm:text-sm border border-white/20 focus:border-amber-400 placeholder:text-slate-400 focus:outline-hidden transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Big Action Button */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-sky-200 text-center sm:text-left">
                    <span>
                      {currentLang === 'vi'
                        ? `Lộ trình dự kiến: ${selectedDestination} • ${selectedDays} Ngày • ${COMPANION_OPTIONS.find((c) => c.id === selectedCompanion)?.labelVi || ''}`
                        : `Plan: ${selectedDestination} • ${selectedDays} Days`}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={isAiLoading}
                    onClick={() => handleAskAiPlanner()}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-950/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102"
                  >
                    <Sparkles className="w-5 h-5 text-slate-950" />
                    <span>
                      {currentLang === 'vi'
                        ? 'TẠO LỘ TRÌNH MAY ĐO CÙNG GEMINI AI'
                        : currentLang === 'ko'
                        ? 'GEMINI 맞춤 여행 일정 생성'
                        : 'GENERATE CUSTOM ITINERARY WITH GEMINI'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-950 ml-1" />
                  </button>
                </div>
              </div>
            ) : (
              /* Mode 2: Free Prompt Mode */
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAskAiPlanner({ freePrompt: customPrompt });
                  }}
                  className="mt-2 flex flex-col sm:flex-row gap-2.5"
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
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>{currentLang === 'vi' ? 'Tạo Lộ Trình' : 'Generate'}</span>
                  </button>
                </form>

                {/* Quick Preset Suggestion Chips */}
                <div className="mt-4 pt-3.5 border-t border-white/20">
                  <span className="text-[11px] font-bold text-sky-100 block mb-2">
                    💡 {currentLang === 'vi' ? 'Gợi ý nhu cầu phổ biến (nhấn để AI lên lịch trình ngay):' : 'Popular suggestions (click to auto-generate):'}
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
                          onClick={() => handleAskAiPlanner({ freePrompt: prompt, dest: title.split('(')[0]?.trim() })}
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
            )}
          </div>
        </div>

        {/* Enhanced Dynamic Loading State Banner with Step Progress */}
        {isAiLoading && (
          <div className="bg-white rounded-3xl border-2 border-indigo-500 shadow-2xl p-6 sm:p-8 mb-10 transition-all animate-in fade-in duration-300">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                <Loader2 className="w-7 h-7 animate-spin text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900">
                {currentLang === 'vi'
                  ? `Google Gemini Đang May Đo Lộ Trình ${customDestinationText.trim() || selectedDestination}...`
                  : `Google Gemini is Crafting Your Route...`}
              </h4>
              <p className="text-xs text-slate-500 mt-1.5">
                {currentLang === 'vi'
                  ? `Đang thiết lập lịch trình ${selectedDays} ngày, xuất phát từ ${selectedDeparture}, phù hợp với ${COMPANION_OPTIONS.find((c) => c.id === selectedCompanion)?.labelVi || 'bạn'}.`
                  : 'Synthesizing local intelligence, routes, and budget estimates...'}
              </p>

              {/* Progress Steps Checklist */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {[
                  { stage: 0, textVi: 'Phân tích điểm đến & phong cách đồng hành' },
                  { stage: 1, textVi: 'Tối ưu hóa cung đường di chuyển & phương tiện' },
                  { stage: 2, textVi: 'Tuyển chọn ẩm thực đặc sản & điểm check-in' },
                  { stage: 3, textVi: 'Tính toán dự toán kinh phí & liên kết vé Traveloka' },
                ].map((s) => {
                  const isDone = loadingStage > s.stage;
                  const isCurrent = loadingStage === s.stage;
                  return (
                    <div
                      key={s.stage}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        isDone
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : isCurrent
                          ? 'bg-indigo-50 text-indigo-900 border-indigo-300 animate-pulse'
                          : 'bg-slate-50 text-slate-400 border-slate-200 opacity-60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                      <span className="truncate">{s.textVi}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* AI Generated Custom Itinerary Result Card */}
        {aiCustomPlan && (
          <div
            id="ai-itinerary-result-section"
            className="bg-white rounded-3xl border-2 border-indigo-500 shadow-xl p-6 sm:p-8 mb-10 transition-all animate-in fade-in duration-300"
          >
            {/* Header of AI Result */}
            <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 border-b border-sky-100 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>
                      {hasGeneratedCustom
                        ? (currentLang === 'vi' ? 'Lộ Trình May Đo Google Gemini 3.8 Flash' : currentLang === 'ko' ? 'Google Gemini 3.8 Flash 맞춤 코스' : 'Google Gemini 3.8 Flash Custom Route')
                        : (currentLang === 'vi' ? 'Lộ Trình Chuẩn Thiết Kế Bởi Google Gemini' : currentLang === 'ko' ? 'Google Gemini 추천 코스' : 'Google Gemini Route')}
                    </span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-[10px] font-black">
                    🛫 Khởi hành: {selectedDeparture.split(' (')[0]}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[10px] font-black">
                    👥 {COMPANION_OPTIONS.find((c) => c.id === selectedCompanion)?.labelVi || selectedCompanion}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                    💰 {aiCustomPlan.budgetLevel}
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

                {/* Audio Narration Action with Gemini TTS */}
                <button
                  type="button"
                  onClick={() => handlePlayGeminiAudio(aiCustomPlan)}
                  disabled={isAudioLoading}
                  className={`px-3.5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    isPlayingAudio
                      ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm animate-pulse'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200 shadow-2xs'
                  }`}
                  title={currentLang === 'vi' ? 'Nghe giọng đọc thuyết minh lộ trình bằng Google Gemini' : 'Listen to Gemini Audio Narration'}
                >
                  {isAudioLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                      <span>{currentLang === 'vi' ? 'Đang đọc...' : 'Loading audio...'}</span>
                    </>
                  ) : isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4 text-slate-950" />
                      <span>{currentLang === 'vi' ? 'Dừng Đọc' : 'Stop Audio'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-indigo-700" />
                      <span>{currentLang === 'vi' ? 'Thuyết Minh AI' : currentLang === 'ko' ? 'AI 오디오 가이드' : 'Gemini Voice'}</span>
                    </>
                  )}
                </button>

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

                {/* Traveloka Flight Booking CTA for AI plan */}
                <button
                  type="button"
                  onClick={() => {
                    const route = getTravelokaRouteInfo();
                    openTravelokaModal('flight', {
                      originCode: route.originCode,
                      destCode: route.destCode,
                      cityId: route.cityId,
                    });
                  }}
                  className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#0194f3] to-[#007ce8] hover:from-[#0082d6] hover:to-[#0064d2] text-white text-xs font-black transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                  title="Đặt vé máy bay Traveloka"
                >
                  <Plane className="w-4 h-4 text-white" />
                  <div className="text-left">
                    <span className="block leading-tight font-extrabold text-white">
                      {currentLang === 'vi'
                        ? 'Đặt Vé Máy Bay Traveloka'
                        : currentLang === 'ko'
                        ? 'Traveloka 항공권 예약'
                        : 'Traveloka Flights'}
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold block">
                      {currentLang === 'vi'
                        ? `${getTravelokaRouteInfo().originCode} ➔ ${getTravelokaRouteInfo().destCode} • Từ 580k`
                        : `${getTravelokaRouteInfo().originCode} ➔ ${getTravelokaRouteInfo().destCode} • Best Fares`}
                    </span>
                  </div>
                </button>

                {/* Traveloka Combo Booking CTA */}
                <button
                  type="button"
                  onClick={() => {
                    const route = getTravelokaRouteInfo();
                    openTravelokaModal('combo', {
                      originCode: route.originCode,
                      destCode: route.destCode,
                      cityId: route.cityId,
                    });
                  }}
                  className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs font-black transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
                  title="Đặt combo vé máy bay + khách sạn giảm tới 30%"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <div className="text-left">
                    <span className="block leading-tight font-extrabold text-slate-950">
                      {currentLang === 'vi'
                        ? 'Combo Vé + Phòng (-30%)'
                        : currentLang === 'ko'
                        ? '항공+호텔 콤보 (-30%)'
                        : 'Flight + Hotel Combo'}
                    </span>
                    <span className="text-[10px] text-slate-900 font-bold block">
                      {currentLang === 'vi' ? 'Tiết kiệm tới 1.5 triệu/người' : currentLang === 'ko' ? '패키지 특가 할인' : 'Save up to 30% bundle'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Traveloka Integrated Ticket & Hotel Booking Banner */}
            {(() => {
              const route = getTravelokaRouteInfo();
              return (
                <div className="mt-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200/90 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0194f3] to-[#0060b8] text-white flex items-center justify-center shadow-md shadow-sky-500/20 shrink-0">
                        <Plane className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full bg-[#0194f3] text-white text-[10px] font-black uppercase tracking-wider">
                            Traveloka Partner
                          </span>
                          <span className="text-xs font-black text-slate-900">
                            {currentLang === 'vi'
                              ? `Đặt Vé Cho Lộ Trình: ${selectedDeparture.split(' (')[0]} ➔ ${route.cityVi} (${route.originCode} ➔ ${route.destCode})`
                              : `Book Tickets for Route: ${route.originCode} ➔ ${route.destCode} (${route.cityVi})`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {currentLang === 'vi'
                            ? 'So sánh giá vé Vietnam Airlines, Vietjet, Bamboo • Xuất vé điện tử tức thì • Giảm thêm mã BAYVIETNAM50K'
                            : 'Compare real-time fares from Vietnam Airlines, Vietjet, Bamboo • Instant E-ticket delivery'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          openTravelokaModal('flight', {
                            originCode: route.originCode,
                            destCode: route.destCode,
                            cityId: route.cityId,
                          });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#0194f3] hover:bg-[#0082d6] text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-102"
                      >
                        <Plane className="w-3.5 h-3.5" />
                        <span>{currentLang === 'vi' ? 'Đặt Vé Bay' : currentLang === 'ko' ? '항공권 예약' : 'Book Flight'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          openTravelokaModal('combo', {
                            originCode: route.originCode,
                            destCode: route.destCode,
                            cityId: route.cityId,
                          });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-102"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                        <span>{currentLang === 'vi' ? 'Combo Vé + Phòng -30%' : currentLang === 'ko' ? '콤보 -30%' : 'Combo -30%'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          openTravelokaModal('hotel', { cityId: route.cityId });
                        }}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <Home className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{currentLang === 'vi' ? 'Khách Sạn' : currentLang === 'ko' ? '호텔 예약' : 'Hotels'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          openBookingModal('flight', {
                            originCode: route.originCode,
                            destCode: route.destCode,
                          });
                        }}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                        <span>{currentLang === 'vi' ? 'Xuất Vé Trong App' : currentLang === 'ko' ? '인앱 발권' : 'In-App Pass'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Interactive Google Gemini Route Tweak Box */}
            <div className="mt-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/70 border border-indigo-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <Wand2 className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-2 flex-wrap">
                      <span>{currentLang === 'vi' ? 'Trợ Lý Google Gemini Tinh Chỉnh Lộ Trình' : currentLang === 'ko' ? 'Google Gemini 실시간 코스 맞춤 수정' : 'Google Gemini Route Tuner'}</span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">gemini-3.8-flash</span>
                    </h4>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  {currentLang === 'vi' ? 'Tự động tính toán & cập nhật tức thì' : currentLang === 'ko' ? '실시간 즉시 업데이트' : 'Instant AI re-calculation'}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
                {currentLang === 'vi'
                  ? 'Bạn muốn điều chỉnh điều gì? Nhấn vào các gợi ý nhanh bên dưới hoặc nhập trực tiếp yêu cầu (ví dụ: "thêm các quán cafe trứng đẹp", "chuyển sang khách sạn 5 sao", "giảm ngân sách"): '
                  : currentLang === 'ko'
                  ? '일정에서 변경하고 싶은 부분이 있으신가요? 아래 추천 버튼을 누르거나 직접 요구사항을 입력해 보세요:'
                  : 'Want to adjust anything? Click quick options below or type your custom request for Gemini:'}
              </p>

              {/* Quick Tweak Action Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  {
                    icon: '💰',
                    textVi: 'Tối ưu chi phí tiết kiệm hơn',
                    textKo: '알뜰 실속형 예산으로 절감',
                    textEn: 'Optimize budget to be more affordable',
                  },
                  {
                    icon: '📸',
                    textVi: 'Thêm các điểm check-in sống ảo HOT',
                    textKo: '인생샷 핫플레이스 포토존 추가',
                    textEn: 'Add trending Instagram photo spots',
                  },
                  {
                    icon: '🍜',
                    textVi: 'Bổ sung thêm đặc sản & street food địa phương',
                    textKo: '로컬 미식 & 스트리트 푸드 강화',
                    textEn: 'Add more local street food gems',
                  },
                  {
                    icon: '🏨',
                    textVi: 'Nâng cấp khách sạn sang resort nghỉ dưỡng cao cấp',
                    textKo: '고급 리조트·호텔 휴양 위주로 변경',
                    textEn: 'Upgrade to luxury resorts & hotels',
                  },
                  {
                    icon: '👨‍👩‍👧',
                    textVi: 'Giảm nhịp độ di chuyển cho gia đình có trẻ em',
                    textKo: '가족 맞춤 여유로운 힐링 동선으로 조정',
                    textEn: 'Relaxed pace for families with kids',
                  },
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isTweaking || isAiLoading}
                    onClick={() => handleTweakWithGemini(currentLang === 'vi' ? chip.textVi : currentLang === 'ko' ? chip.textKo : chip.textEn)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-600 hover:text-white text-slate-700 text-[11px] font-bold border border-indigo-200/80 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 hover:scale-102"
                  >
                    <span>{chip.icon}</span>
                    <span>{currentLang === 'vi' ? chip.textVi : currentLang === 'ko' ? chip.textKo : chip.textEn}</span>
                  </button>
                ))}
              </div>

              {/* Custom Tweak Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTweakWithGemini();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={tweakInstruction}
                  onChange={(e) => setTweakInstruction(e.target.value)}
                  placeholder={
                    currentLang === 'vi'
                      ? 'Nhập yêu cầu chỉnh sửa gửi cho Gemini (Ví dụ: "Ngày 2 thêm lặn ngắm san hô", "Đổi phương tiện sang tàu hỏa")...'
                      : currentLang === 'ko'
                      ? 'Gemini에게 수정 요청을 입력하세요 (예: "2일차 저녁에 야시장 추가해줘", "이동편을 기차로 변경")...'
                      : 'Ask Gemini to tweak (e.g., "Add coral snorkeling on Day 2", "Switch to scenic train ride")...'
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm border border-indigo-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-400 shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={isTweaking || !tweakInstruction.trim() || isAiLoading}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-xs shrink-0"
                >
                  {isTweaking ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{currentLang === 'vi' ? 'Gemini đang sửa...' : 'Updating...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{currentLang === 'vi' ? 'Gửi Gemini' : currentLang === 'ko' ? 'Gemini에 요청' : 'Ask Gemini'}</span>
                    </>
                  )}
                </button>
              </form>

              {tweakMessage && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{tweakMessage}</span>
                </div>
              )}
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
                        onClick={() => handleOpenDayAdvice(day)}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-800 text-[11px] font-bold border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs hover:scale-102"
                        title={currentLang === 'vi' ? `Hỏi Google Gemini mẹo du lịch cho ${day.destination}` : currentLang === 'ko' ? `${day.destination} Gemini 꿀팁` : `Ask Gemini tips for ${day.destination}`}
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>{currentLang === 'vi' ? 'Hỏi Gemini Mẹo' : currentLang === 'ko' ? 'Gemini 꿀팁' : 'Gemini Tips'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const route = getTravelokaRouteInfo(day.destination);
                          openTravelokaModal('flight', {
                            originCode: route.originCode,
                            destCode: route.destCode,
                            cityId: route.cityId,
                          });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-[11px] font-bold border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
                        title={currentLang === 'vi' ? `Đặt vé máy bay / di chuyển tới ${day.destination} trên Traveloka` : `Book flight to ${day.destination} on Traveloka`}
                      >
                        <Plane className="w-3 h-3 text-sky-600" />
                        <span>{currentLang === 'vi' ? 'Vé Máy Bay' : currentLang === 'ko' ? '항공권 예약' : 'Book Flight'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const route = getTravelokaRouteInfo(day.destination);
                          openTravelokaModal('hotel', { cityId: route.cityId });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                        title={currentLang === 'vi' ? `Tìm khách sạn Traveloka tại ${day.destination}` : currentLang === 'ko' ? `${day.destination} 호텔 검색` : `Search hotels in ${day.destination}`}
                      >
                        <Home className="w-3 h-3 text-emerald-600" />
                        <span>{currentLang === 'vi' ? 'Khách Sạn Traveloka' : currentLang === 'ko' ? 'Traveloka 호텔' : 'Traveloka Stays'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const route = getTravelokaRouteInfo(day.destination);
                          openTravelokaModal('xperience', { cityId: route.cityId });
                        }}
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

      {/* Day Advice Modal Powered by Google Gemini */}
      {dayAdviceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setDayAdviceModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-indigo-200 relative animate-in zoom-in-95 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    {currentLang === 'vi'
                      ? `Gemini Tư Vấn: Ngày ${dayAdviceModal.day.dayNumber} - ${dayAdviceModal.day.destination}`
                      : currentLang === 'ko'
                      ? `Gemini 가이드: ${dayAdviceModal.day.dayNumber}일차 - ${dayAdviceModal.day.destination}`
                      : `Gemini Advice: Day ${dayAdviceModal.day.dayNumber} - ${dayAdviceModal.day.destination}`}
                  </h4>
                  <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
                    Google Gemini 3.8 Flash • Smart Travel Assistant
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDayAdviceModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="py-4 overflow-y-auto flex-1 space-y-4">
              {dayAdviceModal.isLoading ? (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-600">
                    {currentLang === 'vi'
                      ? 'Gemini đang phân tích điểm đến và chuẩn bị mẹo du lịch cho bạn...'
                      : 'Gemini is evaluating destination insights...'}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-700 leading-relaxed space-y-2 whitespace-pre-wrap">
                  {dayAdviceModal.advice}
                </div>
              )}

              {/* User Follow-up Question Input */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  💬 {currentLang === 'vi' ? 'Hỏi thêm Gemini về ngày này:' : currentLang === 'ko' ? 'Gemini에게 추가 질문하기:' : 'Ask Gemini a question about this day:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dayAdviceModal.question}
                    onChange={(e) =>
                      setDayAdviceModal((prev) => (prev ? { ...prev, question: e.target.value } : null))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (dayAdviceModal.question.trim()) {
                          handleOpenDayAdvice(dayAdviceModal.day, dayAdviceModal.question);
                        }
                      }
                    }}
                    placeholder={
                      currentLang === 'vi'
                        ? 'Ví dụ: "Nên mặc đồ gì?", "Quán cà phê đẹp gần đây?", "Lưu ý an toàn gì?"...'
                        : 'e.g. "What outfit to wear?", "Best cafe nearby?", "Any safety tips?"...'
                    }
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-400"
                  />
                  <button
                    type="button"
                    disabled={dayAdviceModal.isLoading || !dayAdviceModal.question.trim()}
                    onClick={() => handleOpenDayAdvice(dayAdviceModal.day, dayAdviceModal.question)}
                    className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{currentLang === 'vi' ? 'Hỏi' : 'Ask'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setDayAdviceModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                {currentLang === 'vi' ? 'Đóng' : currentLang === 'ko' ? '닫기' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
