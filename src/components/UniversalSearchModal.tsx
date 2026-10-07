import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  MapPin,
  Utensils,
  Route,
  Compass,
  LayoutGrid,
  Calendar,
  Sparkles,
  ChevronRight,
  Clock,
  Shirt,
  Home,
  Music,
  ExternalLink,
  BookOpen,
  Filter,
  ArrowRight,
  CheckCircle2,
  Tag,
  Eye,
  Landmark,
  Copy,
  Check,
  Share2,
  Ticket,
  Building2,
  Sparkle,
  Compass as CompassIcon,
  ShieldCheck,
  Plane,
} from 'lucide-react';
import {
  DESTINATIONS,
  CUISINE_LIST,
  ITINERARY_PLANS,
  HISTORIC_MONUMENTS,
} from '../data/travelData';
import { ALL_54_ETHNIC_GROUPS, EthnicGroupDetail } from '../data/ethnicData';
import { KO_DESTINATIONS, KO_CUISINES } from '../data/koreanTranslations';
import { Destination, CuisineItem, Language, HistoricMonument, ItineraryPlan } from '../types';
import { DestinationDetailModal } from './DestinationDetailModal';
import { CuisineDetailModal } from './CuisineDetailModal';
import {
  getEthnicCostumeImage,
  getEthnicArchitectureImage,
  getEthnicFestivalImage,
} from './CultureAndHeritage';

export type SearchCategory = 'all' | 'destinations' | 'cuisines' | 'menus' | 'heritage';

export type SearchActionType =
  | 'open-destination'
  | 'open-cuisine'
  | 'open-ethnic'
  | 'open-itinerary'
  | 'open-menu'
  | 'open-monument';

export interface SearchResultItem {
  id: string;
  category: 'destinations' | 'cuisines' | 'menus' | 'heritage';
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  badge: string;
  badgeColor: string;
  rawItem: any;
  actionType: SearchActionType;
  targetId?: string;
}

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

// Preset interactive menus and guides
const PRESET_MENUS = [
  {
    id: 'menu-grid-9sections',
    titleVi: 'Menu Lưới Khám Phá Toàn Diện (9 Mục Chính Của Ứng Dụng)',
    titleEn: 'Comprehensive Grid Discovery Menu (9 App Pillars)',
    titleKo: '그리드 탐색 메뉴 (앱 9대 핵심 영역 전체)',
    subtitleVi: 'Bao quát toàn bộ 9 phân hệ nội dung đặc sắc: Biển đảo, 54 dân tộc, Ẩm thực, Bản đồ...',
    subtitleEn: 'Covers all 9 core features: Islands, 54 Ethnicities, Cuisine, Audio Map, Translator...',
    subtitleKo: '신성한 영토, 54개 민족, 미식, 음성 지도, 여행 코스 등 앱의 9대 핵심 콘텐츠 총망라',
    badge: 'Menu Ứng Dụng',
    sections: [
      { num: '01', title: 'Giới Thiệu Văn Hóa & Video Toàn Cảnh', desc: 'Video 4K cảnh sắc non sông, di sản ngàn năm văn hiến và bản sắc dân tộc.' },
      { num: '02', title: 'Khám Phá Địa Điểm & Tinh Hoa Ẩm Thực 3 Miền', desc: 'Hạ Long, Tràng An, Cố đô Huế, Phố cổ Hội An và hàng trăm món ngon nức tiếng.' },
      { num: '03', title: 'Bản Đồ Thuyết Minh Giọng Nói 63 Tỉnh Thành', desc: 'Tọa độ chủ quyền Hoàng Sa - Trường Sa thiêng liêng, giọng đọc truyền cảm.' },
      { num: '04', title: 'Lên Kế Hoạch Lịch Trình & Dự Toán Chi Phí', desc: 'Gợi ý tour 2-3 ngày, 4-7 ngày, xuyên Việt và công cụ tính ngân sách chi tiết.' },
      { num: '05', title: 'Dịch Vụ Di Chuyển & Phong Cách Du Lịch', desc: 'Liên kết đặt vé Traveloka máy bay, xe khách limousine, tàu hỏa và khách sạn.' },
      { num: '06', title: '54 Dân Tộc Anh Em & Di Tích Lịch Sử', desc: 'Trang phục cổ truyền, kiến trúc nếp nhà sàn, lễ hội tâm linh của 54 dân tộc.' },
      { num: '07', title: 'Chủ Quyền Biển Đảo Hoàng Sa - Trường Sa', desc: 'Tư liệu lịch sử hùng hồn, hải đội Hoàng Sa và khẳng định chủ quyền thiêng liêng.' },
      { num: '08', title: 'Công Cụ Phiên Dịch Ngoại Ngữ Cho Du Khách', desc: 'Hội thoại du lịch thực tế, phát âm chuẩn xác, hỗ trợ tiếng Anh - Hàn - Việt.' },
      { num: '09', title: 'Đánh Giá & Nhận Xét Của Du Khách Toàn Cầu', desc: 'Gửi cảm nhận, chấm điểm 1-5 sao và lưu giữ nhật ký hành trình ý nghĩa.' },
    ],
  },
  {
    id: 'menu-booking-services-traveloka',
    titleVi: 'Menu Dịch Vụ Di Chuyển & Đặt Vé Traveloka Toàn Quốc',
    titleEn: 'Transport & Traveloka Booking Services (Nationwide)',
    titleKo: '전국 교통편 & 트래블로카 다이렉트 예약 메뉴',
    subtitleVi: 'Vé máy bay nội địa & quốc tế, xe khách giường nằm, tàu hỏa, limousine và khách sạn 3-5 sao',
    subtitleEn: 'Domestic/international flights, sleeper coaches, express trains, limousines & luxury resorts',
    subtitleKo: '국내외 항공권, 슬리핑 버스, 관광 열차, 리무진 및 호텔 실시간 예약',
    badge: 'Dịch Vụ Đặt Vé',
    sections: [
      { num: '✈️', title: 'Vé Máy Bay Giá Tốt', desc: 'Vietnam Airlines, Vietjet Air, Bamboo Airways bay thẳng tới Hà Nội, Đà Nẵng, Phú Quốc, Sài Gòn.' },
      { num: '🚐', title: 'Xe Khách Giường Nằm & Limousine', desc: 'Tuyến Hà Nội - Sa Pa/Hà Giang, Sài Gòn - Đà Lạt/Mũi Né, Đà Nẵng - Huế chất lượng cao.' },
      { num: '🚆', title: 'Tàu Hỏa Bắc Nam Thống Nhất', desc: 'Trải nghiệm cung đường sắt đẹp nhất qua đèo Hải Vân và bờ biển miền Trung thanh bình.' },
      { num: '🏨', title: 'Khách Sạn & Resort Nghỉ Dưỡng', desc: 'Hàng ngàn phòng nghỉ từ homestay bản làng mộc mạc đến resort 5 sao ven biển ưu đãi tới 40%.' },
    ],
  },
];

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [previewDestination, setPreviewDestination] = useState<Destination | null>(null);
  const [previewCuisine, setPreviewCuisine] = useState<CuisineItem | null>(null);
  const [previewEthnic, setPreviewEthnic] = useState<EthnicGroupDetail | null>(null);
  const [previewItinerary, setPreviewItinerary] = useState<any | null>(null);
  const [previewMonument, setPreviewMonument] = useState<HistoricMonument | null>(null);
  const [previewMenu, setPreviewMenu] = useState<any | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  // AI Smart Search states (In-app knowledge + External real-time Google search grounding)
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    summary: string;
    recommendedPlaces: string[];
    recommendedFoods: string[];
    insiderTips: string[];
    webSources: Array<{ title: string; uri: string }>;
  } | null>(null);
  const [lastSearchedAiQuery, setLastSearchedAiQuery] = useState('');

  // Trigger AI Search
  const handleTriggerAiSearch = async (forcedQuery?: string) => {
    const q = (forcedQuery !== undefined ? forcedQuery : searchQuery).trim();
    if (!q) return;

    setIsAiLoading(true);
    setLastSearchedAiQuery(q);

    try {
      const res = await fetch('/api/gemini/smart-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          language: currentLang,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setAiResult({
        summary: data.summary || data.answer || '',
        recommendedPlaces: data.recommendedPlaces || [],
        recommendedFoods: data.recommendedFoods || [],
        insiderTips: data.insiderTips || [],
        webSources: data.webSources || [],
      });
    } catch (err) {
      console.error('AI smart search failed:', err);
      // Fallback
      setAiResult({
        summary:
          currentLang === 'vi'
            ? `Dựa trên dữ liệu ứng dụng "VIETNAM'S TRAVEL" và thông tin thực tế: "${q}" là chủ đề du lịch và văn hóa giàu bản sắc. Bạn có thể nhấp trực tiếp vào bất kỳ mục nào trong danh sách bên dưới để xem toàn bộ thông tin chi tiết.`
            : `Travel insights for "${q}": Synthesized from in-app destinations, cuisines, 54 ethnic groups and external facts. Click directly on any card below to view full details immediately.`,
        recommendedPlaces: [],
        recommendedFoods: [],
        insiderTips: [
          currentLang === 'vi'
            ? 'Tham khảo kỹ chi phí dự toán, ẩm thực và nếp sinh hoạt văn hóa địa phương trước chuyến đi.'
            : 'Check detailed budget estimates, regional delicacies, and local customs before departure.',
        ],
        webSources: [],
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setPreviewDestination(null);
      setPreviewCuisine(null);
      setPreviewEthnic(null);
      setPreviewItinerary(null);
      setPreviewMonument(null);
      setPreviewMenu(null);
      setAiResult(null);
      setIsAiLoading(false);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewDestination) {
          setPreviewDestination(null);
        } else if (previewCuisine) {
          setPreviewCuisine(null);
        } else if (previewEthnic) {
          setPreviewEthnic(null);
        } else if (previewItinerary) {
          setPreviewItinerary(null);
        } else if (previewMonument) {
          setPreviewMonument(null);
        } else if (previewMenu) {
          setPreviewMenu(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    onClose,
    previewDestination,
    previewCuisine,
    previewEthnic,
    previewItinerary,
    previewMonument,
    previewMenu,
  ]);

  // Transform and Index all Searchable items
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const results: SearchResultItem[] = [];

    // 1. Destinations (Địa điểm muốn đi)
    DESTINATIONS.forEach((dest) => {
      const koDest = KO_DESTINATIONS[dest.id];
      const title =
        currentLang === 'vi'
          ? dest.vietnameseName || dest.name
          : currentLang === 'ko'
          ? koDest?.nameKo || dest.nameKo || dest.name
          : dest.name;
      const desc =
        currentLang === 'ko' && koDest?.descKo ? koDest.descKo : dest.description;

      results.push({
        id: `dest-${dest.id}`,
        category: 'destinations',
        title,
        subtitle: `${dest.region === 'North' ? 'Miền Bắc' : dest.region === 'Central' ? 'Miền Trung' : 'Miền Nam'} • ${dest.culturalSignificance}`,
        description: desc,
        imageUrl: dest.imageUrl,
        badge: currentLang === 'vi' ? '📍 Địa Điểm' : currentLang === 'ko' ? '📍 명소' : '📍 Destination',
        badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
        rawItem: dest,
        actionType: 'open-destination',
      });
    });

    // 2. Cuisines (Món ăn ngon)
    CUISINE_LIST.forEach((food) => {
      const koFood = KO_CUISINES[food.id];
      const title =
        currentLang === 'vi'
          ? food.vietnameseName
          : currentLang === 'ko'
          ? koFood?.nameKo || food.name
          : food.name;
      const desc =
        currentLang === 'ko' && koFood?.descKo ? koFood.descKo : food.description;

      results.push({
        id: `food-${food.id}`,
        category: 'cuisines',
        title,
        subtitle: `${food.region === 'North' ? 'Đặc sản Miền Bắc' : food.region === 'Central' ? 'Đặc sản Miền Trung' : 'Đặc sản Miền Nam'} • ${food.tasteProfile}`,
        description: desc,
        imageUrl: food.imageUrl,
        badge: currentLang === 'vi' ? '🍜 Món Ăn Ngon' : currentLang === 'ko' ? '🍜 대표 미식' : '🍜 Cuisine',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
        rawItem: food,
        actionType: 'open-cuisine',
      });
    });

    // 3. Menus & Itineraries (Các Menu đã tạo & Lộ trình tour)
    PRESET_MENUS.forEach((menu) => {
      const title =
        currentLang === 'vi'
          ? menu.titleVi
          : currentLang === 'ko'
          ? menu.titleKo
          : menu.titleEn;
      const subtitle =
        currentLang === 'vi'
          ? menu.subtitleVi
          : currentLang === 'ko'
          ? menu.subtitleKo
          : menu.subtitleEn;

      results.push({
        id: `menu-${menu.id}`,
        category: 'menus',
        title,
        subtitle,
        description: subtitle,
        badge: currentLang === 'vi' ? `📋 ${menu.badge}` : currentLang === 'ko' ? '📋 메뉴/코스' : '📋 Menu / Tour',
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        rawItem: menu,
        actionType: 'open-menu',
      });
    });

    ITINERARY_PLANS.forEach((plan) => {
      results.push({
        id: `plan-${plan.id}`,
        category: 'menus',
        title: plan.title,
        subtitle: `Lộ trình ${plan.duration === '1-3' ? '2-3 ngày' : plan.duration === '4-7' ? '4-7 ngày' : '10-14 ngày'} • ${plan.estimatedCostTotal}`,
        description: plan.overview,
        badge: currentLang === 'vi' ? '🗓️ Lịch Trình Có Sẵn' : currentLang === 'ko' ? '🗓️ 추천 일정' : '🗓️ Itinerary',
        badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
        rawItem: plan,
        actionType: 'open-itinerary',
      });
    });

    // 4. Heritage (54 Dân tộc anh em & Di tích)
    ALL_54_ETHNIC_GROUPS.forEach((ethnic) => {
      results.push({
        id: `ethnic-${ethnic.id}`,
        category: 'heritage',
        title: `Dân tộc ${ethnic.name}`,
        subtitle: `${ethnic.linguisticGroupVi} • ${ethnic.regionVi}`,
        description: `${ethnic.culturalHighlight}. Nếp nhà: ${ethnic.architecture}. Lễ hội: ${ethnic.festivals}`,
        imageUrl: ethnic.imageUrl,
        badge: currentLang === 'vi' ? '🏛️ 54 Dân Tộc' : currentLang === 'ko' ? '🏛️ 54개 민족' : '🏛️ Ethnic Group',
        badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
        rawItem: ethnic,
        actionType: 'open-ethnic',
      });
    });

    HISTORIC_MONUMENTS.forEach((monument) => {
      results.push({
        id: `monument-${monument.id}`,
        category: 'heritage',
        title: monument.name,
        subtitle: `${monument.location} • ${monument.period}`,
        description: monument.historicalValue,
        imageUrl: monument.imageUrl,
        badge: currentLang === 'vi' ? '🏰 Di Tích Lịch Sử' : currentLang === 'ko' ? '🏰 역사 유적' : '🏰 Monument',
        badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
        rawItem: monument,
        actionType: 'open-monument',
      });
    });

    return results;
  }, [currentLang]);

  // Filter results based on search query and active tab
  const filteredResults = useMemo(() => {
    let list = allSearchItems;

    // Filter by tab
    if (activeCategory !== 'all') {
      list = list.filter((item) => item.category === activeCategory);
    }

    // Filter by query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q)
        );
      });
    }

    return list;
  }, [allSearchItems, activeCategory, searchQuery]);

  // Counts by category
  const counts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filterFn = (item: SearchResultItem) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    };

    return {
      all: allSearchItems.filter(filterFn).length,
      destinations: allSearchItems.filter((i) => i.category === 'destinations' && filterFn(i)).length,
      cuisines: allSearchItems.filter((i) => i.category === 'cuisines' && filterFn(i)).length,
      menus: allSearchItems.filter((i) => i.category === 'menus' && filterFn(i)).length,
      heritage: allSearchItems.filter((i) => i.category === 'heritage' && filterFn(i)).length,
    };
  }, [allSearchItems, searchQuery]);

  // Directly displays the content when an item is clicked
  const handleSelectItem = (item: SearchResultItem) => {
    if (item.actionType === 'open-destination') {
      setPreviewDestination(item.rawItem as Destination);
    } else if (item.actionType === 'open-cuisine') {
      setPreviewCuisine(item.rawItem as CuisineItem);
    } else if (item.actionType === 'open-ethnic') {
      setPreviewEthnic(item.rawItem as EthnicGroupDetail);
    } else if (item.actionType === 'open-itinerary') {
      setPreviewItinerary(item);
    } else if (item.actionType === 'open-menu') {
      setPreviewMenu(item.rawItem);
    } else if (item.actionType === 'open-monument') {
      setPreviewMonument(item.rawItem as HistoricMonument);
    }
  };

  // Open destination by name from AI recommendation
  const handleOpenPlaceByName = (name: string) => {
    const q = name.toLowerCase().trim();
    const foundDest = DESTINATIONS.find(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.vietnameseName?.toLowerCase().includes(q) ||
        q.includes(d.name.toLowerCase()) ||
        (d.vietnameseName && q.includes(d.vietnameseName.toLowerCase()))
    );
    if (foundDest) {
      setPreviewDestination(foundDest);
      return;
    }
    const foundMonument = HISTORIC_MONUMENTS.find(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        q.includes(m.name.toLowerCase()) ||
        m.location.toLowerCase().includes(q)
    );
    if (foundMonument) {
      setPreviewMonument(foundMonument);
    }
  };

  // Open cuisine by name from AI recommendation
  const handleOpenFoodByName = (name: string) => {
    const q = name.toLowerCase().trim();
    const foundCuisine = CUISINE_LIST.find(
      (c) =>
        c.vietnameseName.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        q.includes(c.vietnameseName.toLowerCase())
    );
    if (foundCuisine) {
      setPreviewCuisine(foundCuisine);
    }
  };

  const handleCopyAiAnswer = () => {
    if (aiResult?.summary) {
      navigator.clipboard.writeText(aiResult.summary);
      setCopiedAnswer(true);
      setTimeout(() => setCopiedAnswer(false), 2000);
    }
  };

  // Quick popular search / AI prompt tags
  const popularTags = [
    { label: 'Phở Hà Nội', category: 'cuisines' },
    { label: 'Đà Nẵng & Hội An', category: 'destinations' },
    { label: 'Bún bò Huế', category: 'cuisines' },
    { label: 'Lịch trình 4 ngày 3 đêm', category: 'menus' },
    { label: 'Dân tộc Ba Na', category: 'heritage' },
    { label: 'Phú Quốc', category: 'destinations' },
    { label: 'Hà Giang mùa lúa chín', category: 'destinations' },
    { label: 'Bánh mì', category: 'cuisines' },
    { label: 'Dân tộc H’Mông', category: 'heritage' },
    { label: 'Hoàng Thành Thăng Long', category: 'heritage' },
    { label: 'Cơm tấm Sài Gòn', category: 'cuisines' },
    { label: 'Dịch vụ vé Traveloka', category: 'menus' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Search Modal Overlay */}
      <div
        className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-4xl w-full my-6 sm:my-10 overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Search Box with Magnifying Glass & AI Integration */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-sky-800 via-sky-700 to-teal-800 text-white shrink-0 relative">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-amber-300 shadow-inner">
                  <Search className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                    <span>
                      {currentLang === 'vi'
                        ? 'Tìm Kiếm & Trí Tuệ Nhân Tạo AI'
                        : currentLang === 'ko'
                        ? '통합 검색 & AI 스마트 어시스턴트'
                        : 'Universal Search & Travel AI'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3 h-3 text-slate-950" />
                      <span>AI Powered</span>
                    </span>
                  </h3>
                  <p className="text-xs text-sky-100/90 hidden sm:block">
                    {currentLang === 'vi'
                      ? 'Tìm kiếm địa điểm, món ăn, menu hoặc hỏi AI tổng hợp dữ liệu trong app và tra cứu ngoài đời thực.'
                      : currentLang === 'ko'
                      ? '명소, 미식, 코스 검색 및 앱 내 데이터와 외부 최신 실시간 정보를 종합한 AI 답변을 확인하세요.'
                      : 'Search places, cuisines, menus or ask AI synthesizing in-app data & real-world facts.'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Đóng tìm kiếm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Field with Magnifying Glass & AI Smart Search Trigger */}
            <div className="relative mt-2 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-sky-800 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      e.preventDefault();
                      handleTriggerAiSearch();
                    }
                  }}
                  placeholder={
                    currentLang === 'vi'
                      ? 'Nhập địa điểm, món ăn, menu hoặc câu hỏi... (Nhấn Enter để AI giải đáp)'
                      : currentLang === 'ko'
                      ? '명소, 미식, 코스 또는 질문 입력... (Enter 누르면 AI 종합 답변)'
                      : 'Search places, dishes, menus or questions... (Press Enter for AI Answer)'
                  }
                  className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-semibold shadow-lg focus:outline-hidden focus:ring-4 focus:ring-amber-300 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setAiResult(null);
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Xóa tìm kiếm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* AI Smart Search Action Button */}
              <button
                type="button"
                onClick={() => handleTriggerAiSearch()}
                disabled={isAiLoading || !searchQuery.trim()}
                className="px-3.5 sm:px-4 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 active:scale-95 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg transition-all cursor-pointer shrink-0 border border-amber-300"
                title={
                  currentLang === 'vi'
                    ? 'AI tổng hợp thông tin trong app & tra cứu bên ngoài'
                    : currentLang === 'ko'
                    ? '앱 내부 및 외부 실시간 정보를 종합한 AI 답변'
                    : 'AI synthesized answer (In-app + External facts)'
                }
              >
                <Sparkles className={`w-4 h-4 text-slate-950 ${isAiLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline font-black">
                  {isAiLoading
                    ? currentLang === 'ko'
                      ? 'AI 분석 중...'
                      : 'AI Đang Tìm...'
                    : currentLang === 'ko'
                    ? 'AI 종합 검색'
                    : 'Hỏi AI'}
                </span>
                <span className="sm:hidden font-black">AI</span>
              </button>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="p-3 sm:px-6 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
              }`}
            >
              <span>🌟</span>
              <span>{currentLang === 'vi' ? 'Tất Cả' : currentLang === 'ko' ? '전체' : 'All'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('destinations')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'destinations'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>{currentLang === 'vi' ? 'Địa Điểm Muốn Đi' : currentLang === 'ko' ? '가고 싶은 명소' : 'Destinations'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${activeCategory === 'destinations' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {counts.destinations}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('cuisines')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'cuisines'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentLang === 'vi' ? 'Món Ăn Ngon' : currentLang === 'ko' ? '대표 미식' : 'Cuisine'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${activeCategory === 'cuisines' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {counts.cuisines}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('menus')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'menus'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
              }`}
            >
              <Route className="w-3.5 h-3.5 text-emerald-500" />
              <span>{currentLang === 'vi' ? 'Menu & Lịch Trình' : currentLang === 'ko' ? '메뉴 및 여행 코스' : 'Menus & Tours'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${activeCategory === 'menus' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {counts.menus}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('heritage')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'heritage'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>{currentLang === 'vi' ? '54 Dân Tộc & Di Tích' : currentLang === 'ko' ? '54개 민족 & 유적' : 'Ethnic & Heritage'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${activeCategory === 'heritage' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {counts.heritage}
              </span>
            </button>
          </div>

          {/* Quick Popular Keywords & AI Query Chips */}
          <div className="p-3 sm:px-6 bg-amber-50/60 border-b border-amber-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[11px] font-bold text-amber-900 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {currentLang === 'vi' ? 'Gợi ý tìm nhanh:' : currentLang === 'ko' ? '인기 검색:' : 'Suggested:'}
            </span>
            {popularTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(tag.label);
                  handleTriggerAiSearch(tag.label);
                }}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100/80 text-slate-700 hover:text-amber-950 text-[11px] font-semibold border border-amber-200/80 transition-colors shrink-0 cursor-pointer shadow-2xs hover:border-amber-300 flex items-center gap-1"
              >
                <span>{tag.label}</span>
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="overflow-y-auto custom-scrollbar flex-1 p-3 sm:p-6 space-y-4">
            {/* AI Loading State */}
            {isAiLoading && (
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-sky-50 border-2 border-amber-300/80 shadow-md flex items-center gap-3.5 animate-pulse">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-5 h-5 animate-spin text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-950 flex items-center gap-2">
                    <span>
                      {currentLang === 'vi'
                        ? 'Trí tuệ nhân tạo AI đang đối chiếu dữ liệu App & tra cứu thực tế bên ngoài...'
                        : currentLang === 'ko'
                        ? 'AI가 앱 내 데이터와 외부 최신 실시간 정보를 종합 분석 중입니다...'
                        : 'AI is cross-referencing in-app knowledge & external real-world facts...'}
                    </span>
                  </h4>
                  <p className="text-xs text-amber-900/80 mt-0.5">
                    {currentLang === 'vi'
                      ? 'Dựa trên 63 tỉnh thành, 54 dân tộc, ẩm thực 3 miền và tra cứu dữ liệu mới nhất bên ngoài để cho ra đáp án chính xác nhất.'
                      : currentLang === 'ko'
                      ? '베트남 63개 성·시, 54개 민족, 3대 지역 미식 및 최신 실시간 정보를 기반으로 정확한 답변을 도출합니다.'
                      : 'Synthesizing in-app database and external travel knowledge for optimal accuracy.'}
                  </p>
                </div>
              </div>
            )}

            {/* AI Synthesized Answer Card */}
            {aiResult && !isAiLoading && (
              <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/95 via-white to-sky-50/80 border-2 border-amber-300 shadow-md space-y-3.5">
                <div className="flex items-center justify-between border-b border-amber-200/70 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                          {currentLang === 'vi'
                            ? 'Đáp Án Tổng Hợp Bởi AI (Độ Chính Xác Cao)'
                            : currentLang === 'ko'
                            ? 'AI 종합 분석 답변'
                            : 'AI Synthesized Answer'}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-200/90 text-amber-950 text-[10px] font-black border border-amber-300">
                          {currentLang === 'vi' ? 'Dữ liệu App + Tra cứu bên ngoài' : currentLang === 'ko' ? '앱 + 외부 실시간' : 'App + Web Grounding'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {currentLang === 'vi'
                          ? `Câu hỏi tìm kiếm: "${lastSearchedAiQuery}"`
                          : `Query: "${lastSearchedAiQuery}"`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopyAiAnswer}
                      className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-white border border-amber-200 text-amber-900 hover:bg-amber-100/70 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      title="Sao chép câu trả lời"
                    >
                      {copiedAnswer ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-700" />}
                      <span className="hidden sm:inline">{copiedAnswer ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                    <button
                      onClick={() => setAiResult(null)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Đóng câu trả lời AI"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main AI Answer Text */}
                <div className="text-xs sm:text-sm leading-relaxed text-slate-800 whitespace-pre-line bg-white/95 p-4 rounded-2xl border border-amber-200/70 shadow-2xs font-normal">
                  {aiResult.summary}
                </div>

                {/* AI Interactive Matched Places / Foods in App */}
                {(aiResult.recommendedPlaces?.length > 0 || aiResult.recommendedFoods?.length > 0) && (
                  <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2">
                    <span className="text-xs font-black text-sky-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      {currentLang === 'vi' ? 'Nội dung liên quan trong App (Nhấp để xem ngay):' : 'Related in App (Click to open immediately):'}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {aiResult.recommendedPlaces?.map((place, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleOpenPlaceByName(place)}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-sky-600 text-sky-800 hover:text-white border border-sky-300 text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 group"
                        >
                          <MapPin className="w-3.5 h-3.5 text-sky-600 group-hover:text-white" />
                          <span>{place}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </button>
                      ))}
                      {aiResult.recommendedFoods?.map((food, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => handleOpenFoodByName(food)}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-600 text-amber-800 hover:text-white border border-amber-300 text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 group"
                        >
                          <Utensils className="w-3.5 h-3.5 text-amber-600 group-hover:text-white" />
                          <span>{food}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insider Tips */}
                {aiResult.insiderTips && aiResult.insiderTips.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      {currentLang === 'vi' ? 'Lời khuyên du lịch hữu ích:' : currentLang === 'ko' ? '핵심 여행 꿀팁:' : 'Helpful Travel Tips:'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aiResult.insiderTips.map((tip, tIdx) => (
                        <div key={tIdx} className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-200 text-xs text-amber-950 font-medium flex items-start gap-2">
                          <span className="text-amber-600 font-bold shrink-0">💡</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Web Grounding Sources (External Knowledge) */}
                {aiResult.webSources && aiResult.webSources.length > 0 && (
                  <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-600 font-bold flex items-center gap-1 text-[11px]">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      {currentLang === 'vi' ? 'Nguồn tra cứu bên ngoài:' : currentLang === 'ko' ? '외부 참조 출처:' : 'External Web Sources:'}
                    </span>
                    {aiResult.webSources.map((source, sIdx) => (
                      <a
                        key={sIdx}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:text-amber-900 text-slate-700 text-[11px] font-medium transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <span className="line-clamp-1 max-w-[200px]">{source.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 text-slate-400" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Results Grid - Clicking ANY card immediately displays its full content */}
            {filteredResults.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center">
                  <Search className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  {currentLang === 'vi'
                    ? `Không tìm thấy kết quả nào cho "${searchQuery}"`
                    : currentLang === 'ko'
                    ? `"${searchQuery}"에 대한 검색 결과가 없습니다`
                    : `No results found for "${searchQuery}"`}
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {currentLang === 'vi'
                    ? 'Bạn có thể thử bấm nút "Hỏi AI" ở trên để AI tra cứu thông tin toàn diện, hoặc thử từ khóa khác như: Hà Nội, Đà Nẵng, Phở, Lịch trình 4 ngày, 54 dân tộc...'
                    : currentLang === 'ko'
                    ? '상단의 "AI 질문" 버튼을 눌러보거나 다른 키워드로 검색해 보세요.'
                    : 'Try clicking "Ask AI" above or search other keywords.'}
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => handleTriggerAiSearch(searchQuery)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Hỏi AI câu này</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {currentLang === 'vi' ? 'Xem lại tất cả' : 'View all'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {filteredResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-sky-50/60 border border-slate-200/90 hover:border-sky-400 shadow-xs hover:shadow-md transition-all cursor-pointer group flex gap-3.5 items-start relative"
                    title={
                      currentLang === 'vi'
                        ? `Nhấp để xem nội dung chi tiết: ${item.title}`
                        : `Click to view details: ${item.title}`
                    }
                  >
                    {/* Item Image or Icon */}
                    {item.imageUrl ? (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 group-hover:scale-102 transition-transform shadow-2xs">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        {item.category === 'menus' ? (
                          <Route className="w-7 h-7 text-white" />
                        ) : (
                          <Compass className="w-7 h-7 text-white" />
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-black border uppercase tracking-wider ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                        <span className="text-[11px] font-bold text-sky-600 group-hover:text-sky-700 flex items-center gap-0.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <span>Xem nội dung</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1">
                        {item.title}
                      </h4>

                      {item.subtitle && (
                        <p className="text-xs text-amber-700 font-semibold line-clamp-1 mt-0.5">
                          {item.subtitle}
                        </p>
                      )}

                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {currentLang === 'vi'
                  ? `Hiển thị ${filteredResults.length} kết quả (Nhấp vào bất kỳ mục nào để xem nội dung)`
                  : currentLang === 'ko'
                  ? `${filteredResults.length}개의 검색 결과 (카드를 클릭하면 바로 내용 표시)`
                  : `Showing ${filteredResults.length} results (Click any item to view content)`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {currentLang === 'vi' ? 'Nhấn ESC để đóng' : currentLang === 'ko' ? 'ESC 키로 닫기' : 'Press ESC to close'}
              </span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer"
              >
                {currentLang === 'vi' ? 'Đóng' : currentLang === 'ko' ? '닫기' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Destination Detail Modal */}
      {previewDestination && (
        <DestinationDetailModal
          destination={previewDestination}
          currentLang={currentLang}
          onClose={() => setPreviewDestination(null)}
        />
      )}

      {/* 2. Cuisine Detail Modal */}
      {previewCuisine && (
        <CuisineDetailModal
          cuisine={previewCuisine}
          currentLang={currentLang}
          onClose={() => setPreviewCuisine(null)}
        />
      )}

      {/* 3. Itinerary Plan Detail Modal */}
      {previewItinerary && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
          onClick={() => setPreviewItinerary(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/20">
                  <Route className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-white/20 text-emerald-100 text-[10px] font-black uppercase">
                    {previewItinerary.badge}
                  </span>
                  <h4 className="text-base sm:text-lg font-black">{previewItinerary.title}</h4>
                </div>
              </div>
              <button
                onClick={() => setPreviewItinerary(null)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-4">
              {previewItinerary.subtitle && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{previewItinerary.subtitle}</span>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                <h5 className="font-black text-slate-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Tổng quan hành trình:</span>
                </h5>
                <p>{previewItinerary.description}</p>
              </div>

              {/* Day-by-day plan if available */}
              {previewItinerary.rawItem?.days && Array.isArray(previewItinerary.rawItem.days) && (
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Chi tiết lịch trình từng ngày:
                  </h5>
                  {previewItinerary.rawItem.days.map((d: any, dIdx: number) => (
                    <div key={dIdx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs">
                      <div className="flex items-center justify-between font-bold border-b border-slate-100 pb-2">
                        <span className="text-emerald-700 font-black text-sm">
                          Ngày {d.dayNumber}: {d.destination}
                        </span>
                        {d.budgetEstimate && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold">
                            {d.budgetEstimate}
                          </span>
                        )}
                      </div>
                      {d.morning && (
                        <p className="leading-relaxed">
                          <strong className="text-sky-700 font-bold">🌅 Buổi sáng:</strong> {d.morning}
                        </p>
                      )}
                      {d.afternoon && (
                        <p className="leading-relaxed">
                          <strong className="text-amber-700 font-bold">☀️ Buổi chiều:</strong> {d.afternoon}
                        </p>
                      )}
                      {d.evening && (
                        <p className="leading-relaxed">
                          <strong className="text-indigo-700 font-bold">🌙 Buổi tối:</strong> {d.evening}
                        </p>
                      )}
                      {(d.transport || d.stay) && (
                        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3 text-[11px] text-slate-500">
                          {d.transport && <span>🚗 Phương tiện: <strong>{d.transport}</strong></span>}
                          {d.stay && <span>🏨 Lưu trú: <strong>{d.stay}</strong></span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
              <button
                onClick={() => setPreviewItinerary(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Ethnic Group Detail Modal (Costume, Architecture, Festivals) */}
      {previewEthnic && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
          onClick={() => setPreviewEthnic(null)}
        >
          <div
            className="bg-slate-950 rounded-3xl max-w-2xl w-full border border-purple-500/30 text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-gradient-to-r from-purple-800 to-indigo-900 flex items-center justify-between shrink-0">
              <div>
                <span className="px-2 py-0.5 rounded-md bg-white/20 text-purple-200 text-[10px] font-black uppercase">
                  54 Dân Tộc Việt Nam
                </span>
                <h4 className="text-lg font-black text-white mt-0.5">Dân tộc {previewEthnic.name}</h4>
                <p className="text-xs text-purple-200">{previewEthnic.linguisticGroupVi} • {previewEthnic.regionVi}</p>
              </div>
              <button
                onClick={() => setPreviewEthnic(null)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 text-xs">
              {/* 1. Trang phục đặc trưng */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Shirt className="w-4 h-4" />
                  <span>1. Trang phục đặc trưng độc bản</span>
                </div>
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={getEthnicCostumeImage(previewEthnic)}
                    alt={previewEthnic.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-slate-200 leading-relaxed text-xs">{previewEthnic.traditionalCostume}</p>
              </div>

              {/* 2. Kiến trúc nhà ở */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-sky-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Home className="w-4 h-4" />
                  <span>2. Kiến trúc nhà ở truyền thống</span>
                </div>
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={getEthnicArchitectureImage(previewEthnic)}
                    alt={previewEthnic.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-slate-200 leading-relaxed text-xs">{previewEthnic.architecture}</p>
              </div>

              {/* 3. Lễ hội truyền thống */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Music className="w-4 h-4" />
                  <span>3. Lễ hội truyền thống & Phong tục</span>
                </div>
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={getEthnicFestivalImage(previewEthnic)}
                    alt={previewEthnic.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-slate-200 leading-relaxed text-xs">{previewEthnic.festivals}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-end gap-2 shrink-0">
              <button
                onClick={() => setPreviewEthnic(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Historic Monument Detail Modal */}
      {previewMonument && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
          onClick={() => setPreviewMonument(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full border border-rose-200 text-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-gradient-to-r from-rose-700 via-rose-800 to-red-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/20">
                  <Landmark className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-white/20 text-rose-100 text-[10px] font-black uppercase">
                    Di Tích Lịch Sử Quốc Gia & UNESCO
                  </span>
                  <h4 className="text-base sm:text-lg font-black">{previewMonument.name}</h4>
                  <p className="text-xs text-rose-100">{previewMonument.location}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewMonument(null)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 text-xs">
              {/* Photo Banner */}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                <img
                  src={previewMonument.imageUrl}
                  alt={previewMonument.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Period & Dynasty */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Thời kỳ & Triều đại lịch sử:</span>
                </span>
                <p className="text-amber-950 font-bold text-xs sm:text-sm">{previewMonument.period}</p>
              </div>

              {/* Historical Significance */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                  <span>Giá trị lịch sử & Tầm vóc văn hóa:</span>
                </span>
                <p className="text-slate-800 leading-relaxed text-xs sm:text-sm">{previewMonument.historicalValue}</p>
              </div>

              {/* Architecture */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Kiến trúc & Nghệ thuật xây dựng:</span>
                </span>
                <p className="text-slate-800 leading-relaxed text-xs sm:text-sm">{previewMonument.architecturalStyle}</p>
              </div>

              {/* Ticket & Location */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-emerald-950 font-bold flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-emerald-600" />
                  <span>Giá vé tham quan tham khảo:</span>
                </span>
                <span className="font-black text-emerald-800">{previewMonument.ticketPrice}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
              <button
                onClick={() => setPreviewMonument(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Preset Menu Detail Modal */}
      {previewMenu && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
          onClick={() => setPreviewMenu(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full border border-emerald-200 text-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/20">
                  <LayoutGrid className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-white/20 text-emerald-100 text-[10px] font-black uppercase">
                    {previewMenu.badge}
                  </span>
                  <h4 className="text-base sm:text-lg font-black">{previewMenu.titleVi}</h4>
                </div>
              </div>
              <button
                onClick={() => setPreviewMenu(null)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 text-xs">
              <p className="text-slate-600 font-medium leading-relaxed">
                {previewMenu.subtitleVi}
              </p>

              {previewMenu.sections && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {previewMenu.sections.map((sec: any, sIdx: number) => (
                    <div key={sIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          {sec.num}
                        </span>
                        <h5 className="font-black text-slate-900 text-xs line-clamp-1">{sec.title}</h5>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed pl-8">{sec.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
              <button
                onClick={() => setPreviewMenu(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
