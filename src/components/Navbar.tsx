import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Utensils,
  Languages,
  Star,
  X,
  Sparkles,
  BookOpen,
  Route,
  Bus,
  Flag,
  LayoutGrid,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Plane,
  User,
  Globe,
  Volume2,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { playVoiceGuide, stopVoiceGuide } from '../utils/speech';


import { Language } from '../types';

interface NavbarProps {
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
  activeSection: string;
  onOpenSearch?: () => void;
}

interface NavGridItem {
  id: string;
  labelVi: string;
  labelEn: string;
  labelKo: string;
  descVi: string;
  descEn: string;
  descKo: string;
  tagVi: string;
  tagEn: string;
  tagKo: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  borderHover: string;
  icon: React.ElementType;
}

interface LanguageOption {
  id: Language;
  flag: string;
  code: string;
  nativeName: string;
  subName: string;
  tagVi: string;
  tagEn: string;
  tagKo: string;
  badgeVi: string;
  badgeEn: string;
  badgeKo: string;
  descVi: string;
  descEn: string;
  descKo: string;
  featuresVi: string[];
  featuresEn: string[];
  featuresKo: string[];
  voiceSample: string;
  borderHover: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  activeSection,
  onOpenSearch,
}) => {
  const { openTravelokaModal, isAuthenticated, currentUser, openAccountModal, openAuthModal } = useAuth();
  const [gridMenuOpen, setGridMenuOpen] = useState(false);
  const [searchGridQuery, setSearchGridQuery] = useState('');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [searchLangQuery, setSearchLangQuery] = useState('');
  const [playingLangVoice, setPlayingLangVoice] = useState<Language | null>(null);


  const navItems: NavGridItem[] = [
    {
      id: 'intro',
      labelVi: 'Giới Thiệu Tổng Quan',
      labelEn: 'App Overview',
      labelKo: '앱 소개 및 개요',
      descVi: 'Sứ mệnh kết nối du lịch, non nước biển trời & giá trị văn hóa ngàn năm',
      descEn: 'Connecting Vietnam travel highlights, ocean charms & timeless heritage',
      descKo: '베트남 63개 성·시, 자연 경관과 유구한 역사·문화적 가치를 잇는 여정',
      tagVi: 'Tổng quan non nước',
      tagEn: 'Overview',
      tagKo: '개요',
      gradient: 'from-sky-600 to-emerald-600',
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      borderHover: 'hover:border-sky-300',
      icon: Sparkles,
    },
    {
      id: 'explore',
      labelVi: 'Khám Phá & Ẩm Thực',
      labelEn: 'Destinations & Food',
      labelKo: '3대 지역 명소 & 미식',
      descVi: 'Danh lam thắng cảnh 3 miền & ẩm thực trứ danh Bắc - Trung - Nam',
      descEn: 'Top destinations & authentic culinary delights across 3 regions',
      descKo: '북부·중부·남부 최고 여행지 및 전통 미식 요리 탐방',
      tagVi: 'Vàng lúa & Ẩm thực',
      tagEn: 'Cuisine',
      tagKo: '명소 & 미식',
      gradient: 'from-amber-500 to-red-600',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-700',
      borderHover: 'hover:border-amber-300',
      icon: Utensils,
    },
    {
      id: 'map',
      labelVi: 'Bản Đồ Thuyết Minh',
      labelEn: 'Interactive Voice Map',
      labelKo: '음성 지원 대화형 지도',
      descVi: 'Bản đồ 63 tỉnh thành xanh thẳm kèm thuyết minh giọng nói sống động',
      descEn: 'Interactive 63 provinces map with automatic speech audio guide',
      descKo: '베트남 S자 곡선 63개 성·시 대화형 지도 및 지역별 전문 오디오 가이드',
      tagVi: 'Xanh lục bảo AI',
      tagEn: 'AI Voice',
      tagKo: '음성 지도',
      gradient: 'from-emerald-600 to-sky-600',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700',
      borderHover: 'hover:border-emerald-300',
      icon: MapPin,
    },
    {
      id: 'itinerary',
      labelVi: 'Tạo Lộ Trình Cùng AI',
      labelEn: 'AI Itinerary Planner',
      labelKo: 'AI 맞춤 여행 일정',
      descVi: 'Nhập điểm đến và sở thích để AI tự động lên lịch trình chi tiết và dự toán kinh phí',
      descEn: 'Personalized AI travel routes tailored to your desires with transparent budgets',
      descKo: '원하는 여행지 입력 시 AI가 일자별 코스와 경비를 자동 설계',
      tagVi: 'AI Thông Minh',
      tagEn: 'AI Powered',
      tagKo: 'AI 플래너',
      gradient: 'from-emerald-600 to-teal-700',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderHover: 'hover:border-emerald-300',
      icon: Route,
    },
    {
      id: 'services',
      labelVi: 'Dịch Vụ & Chỗ Ở',
      labelEn: 'Services & Stays',
      labelKo: '여행 서비스 & 숙소',
      descVi: 'Vé máy bay, xe khách, tàu hỏa, homestay mộc mạc ấm cúng & phong cách du lịch',
      descEn: 'Transport tickets, curated hotels, cozy rustic homestays & travel styles',
      descKo: '비행기, 기차, 호텔, 리조트 및 패키지 콤보 절약 팁',
      tagVi: 'Nâu đất ấm cúng',
      tagEn: 'Services',
      tagKo: '서비스 & 숙소',
      gradient: 'from-[#78350f] to-[#b45309]',
      iconBg: 'bg-[#faf4ed]',
      iconColor: 'text-[#78350f]',
      borderHover: 'hover:border-[#b45309]/40',
      icon: Bus,
    },
    {
      id: 'heritage',
      labelVi: '54 Dân Tộc & Lịch Sử',
      labelEn: '54 Ethnic Groups & Heritage',
      labelKo: '54개 민족 문화 & 역사 유산',
      descVi: 'Bản sắc trang phục độc bản 54 dân tộc & các di tích lịch sử ngàn năm',
      descEn: 'Authentic 54 ethnic groups costumes & historical national monuments',
      descKo: '54개 민족의 고유한 전통 의상, 건축 양식, 민속 축제 및 문화 보물',
      tagVi: 'Di sản & Thổ cẩm',
      tagEn: 'Heritage',
      tagKo: '민족 & 문화',
      gradient: 'from-[#854d0e] to-amber-600',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-800',
      borderHover: 'hover:border-amber-300',
      icon: BookOpen,
    },
    {
      id: 'sovereignty',
      labelVi: 'Chủ Quyền Biển Đảo',
      labelEn: 'Maritime Sovereignty',
      labelKo: '바다·섬 주권 및 해양 유산',
      descVi: 'Tư liệu lịch sử & cơ sở pháp lý thiêng liêng Hoàng Sa - Trường Sa',
      descEn: 'Sacred historical & legal sovereignty of Hoang Sa & Truong Sa',
      descKo: '호앙사(Hoang Sa)·쯔엉사(Truong Sa) 군도의 역사적 증거와 3,260km 청정 해안',
      tagVi: 'Đỏ gạch thiêng liêng',
      tagEn: 'Sovereignty',
      tagKo: '영토 주권',
      gradient: 'from-red-700 to-rose-800',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-700',
      borderHover: 'hover:border-red-300',
      icon: Flag,
    },
    {
      id: 'translator',
      labelVi: 'Phiên Dịch Du Lịch',
      labelEn: 'Travel Translator',
      labelKo: 'AI 여행 번역기 & 회화집',
      descVi: 'Sổ tay câu thoại thông dụng 6 ngôn ngữ & phát âm chuẩn giọng',
      descEn: 'Essential travel phrasebook in 6 languages with voice pronunciation',
      descKo: '실시간 여행 베트남어·한국어 회화집 및 AI 스마트 가이드',
      tagVi: 'Đa ngôn ngữ',
      tagEn: 'Translator',
      tagKo: '다국어 번역',
      gradient: 'from-sky-600 to-cyan-700',
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-700',
      borderHover: 'hover:border-sky-300',
      icon: Languages,
    },
    {
      id: 'reviews',
      labelVi: 'Đánh Giá & Nhận Xét',
      labelEn: 'Traveler Reviews',
      labelKo: '여행자 생생 후기 & 평점',
      descVi: 'Cảm nhận chân thực và đánh giá uy tín từ cộng đồng du khách bốn phương',
      descEn: 'Real traveler testimonials, verified community ratings & feedback',
      descKo: '베트남을 여행한 국내외 여행자들의 진솔한 평가와 팁',
      tagVi: 'Đánh giá 5★',
      tagEn: 'Reviews',
      tagKo: '여행 후기',
      gradient: 'from-amber-500 to-yellow-600',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderHover: 'hover:border-amber-300',
      icon: Star,
    },
  ];

  const languageOptions: LanguageOption[] = [
    {
      id: 'vi',
      flag: '🇻🇳',
      code: 'VI',
      nativeName: 'Tiếng Việt',
      subName: 'Vietnamese • Chữ Quốc Ngữ',
      tagVi: 'Bản địa • Toàn diện',
      tagEn: 'Native • Comprehensive',
      tagKo: '모국어 • 표준',
      badgeVi: 'MẶC ĐỊNH',
      badgeEn: 'DEFAULT',
      badgeKo: '기본 설정',
      descVi: 'Nội dung nguyên bản sâu sắc về 63 tỉnh thành, 54 dân tộc anh em, ẩm thực truyền thống và chủ quyền biển đảo Hoàng Sa - Trường Sa thiêng liêng.',
      descEn: 'Full native Vietnamese experience with 63 provinces, 54 ethnic groups, culinary traditions, and sacred island sovereignty.',
      descKo: '베트남 63개 성·시 명소, 54개 민족 전통 의상 및 문화, 로컬 미식과 해양 주권에 대한 깊이 있는 표준 콘텐츠.',
      featuresVi: [
        'Thuyết minh giọng nói 63 tỉnh thành chuẩn bản xứ',
        'Bộ tư liệu 54 dân tộc anh em & di tích lịch sử',
        'Bản đồ ẩm thực danh tiếng Bắc - Trung - Nam',
        'Tư liệu lịch sử chủ quyền Hoàng Sa & Trường Sa',
      ],
      featuresEn: [
        'Native voice guide for all 63 provinces',
        '54 ethnic groups culture & historic monuments',
        'Authentic 3-region culinary specialties',
        'Sacred maritime sovereignty historical documentation',
      ],
      featuresKo: [
        '베트남 63개 성·시 표준 원어민 오디오 가이드',
        '54개 민족 전통 의상 및 유적지 아카이브',
        '북부·중부·남부 3대 지역 대표 미식 지도',
        '호앙사·쯔엉사 군도 해양 주권 역사 기록',
      ],
      voiceSample: 'Xin chào! Chúc bạn có một hành trình khám phá Việt Nam thật trọn vẹn và ý nghĩa!',
      borderHover: 'hover:border-emerald-300',
    },
    {
      id: 'en',
      flag: '🇬🇧',
      code: 'EN',
      nativeName: 'English',
      subName: 'International Edition • Tiếng Anh',
      tagVi: 'Quốc tế • Toàn cầu',
      tagEn: 'Global • International',
      tagKo: '글로벌 표준',
      badgeVi: 'GLOBAL',
      badgeEn: 'INTERNATIONAL',
      badgeKo: '글로벌 에디션',
      descVi: 'Giao diện tiếng Anh chuẩn quốc tế thiết kế dành riêng cho du khách quốc tế, người du lịch bụi và chuyên gia khám phá Việt Nam.',
      descEn: 'Standard international English edition tailored for global backpackers, foreign tourists, and expats with voice maps, curated itineraries, and AI phrasebook.',
      descKo: '해외 배낭여행객, 외국인 관광객 및 글로벌 여행자를 위한 오디오 지도, 일정 플래너 및 AI 회화집 지원.',
      featuresVi: [
        'Giao diện chuẩn hóa quốc tế dễ dàng theo dõi',
        'Hệ thống âm thanh thuyết minh tiếng Anh tự nhiên',
        'Gợi ý lộ trình linh hoạt từ 1 đến 14 ngày',
        'Sổ tay phiên dịch du lịch với phiên âm thông minh',
      ],
      featuresEn: [
        'Internationalized interface and intuitive navigation',
        'English audio narration for all major destinations',
        'Curated travel itineraries from 1 to 14 days',
        'AI-powered phrasebook with pronunciation guides',
      ],
      featuresKo: [
        '글로벌 표준 영문 인터페이스 및 직관적 내비게이션',
        '주요 명소 전문 영문 오디오 가이드 지원',
        '1일~14일 맞춤형 추천 여행 일정 플래너',
        '발음 표기가 포함된 AI 스마트 여행 회화집',
      ],
      voiceSample: 'Hello! Welcome to Vietnam, a land of endless charm, rich culture, and breathtaking landscapes!',
      borderHover: 'hover:border-sky-300',
    },
    {
      id: 'ko',
      flag: '🇰🇷',
      code: 'KO',
      nativeName: '한국어',
      subName: 'Korean Traveler Edition • Tiếng Hàn',
      tagVi: 'Khách du lịch Hàn Quốc',
      tagEn: 'Korean Travelers',
      tagKo: '한국인 맞춤 에디션',
      badgeVi: 'KOREAN',
      badgeEn: 'KOREAN EDITION',
      badgeKo: '한국인 전용',
      descVi: 'Phiên bản chuyên biệt cho du khách Hàn Quốc với bản dịch trau chuốt 63 tỉnh thành, 54 dân tộc, ẩm thực trứ danh và sổ tay câu thoại du lịch thực chiến.',
      descEn: 'Dedicated Korean edition with detailed translations of 63 provinces, 54 ethnic groups, culinary guides, and real-time travel phrases.',
      descKo: '한국인 여행자를 위해 세심하게 번역된 63개 성·시 명소, 54개 민족 전통 의상 및 문화재 해설, 로컬 미식 가이드와 실시간 한국어-베트남어 회화집.',
      featuresVi: [
        'Bản dịch tiếng Hàn chi tiết từ danh thắng đến món ăn',
        'Giọng đọc tiếng Hàn tự nhiên hỗ trợ khách du lịch',
        'Liên kết đặt vé Traveloka máy bay & khách sạn giá tốt',
        'Đối chiếu ngữ âm song ngữ Hàn - Việt cực kỳ tiện lợi',
      ],
      featuresEn: [
        'Thorough Korean translation for destinations and cuisines',
        'Natural Korean speech synthesis for travelers',
        'Traveloka direct integration for flights and hotels',
        'Bilingual Korean-Vietnamese phrase matching',
      ],
      featuresKo: [
        '베트남 63개 성·시 및 대표 미식 100% 한글 맞춤 번역',
        '한국어 자연스러운 음성 가이드 샘플 제공',
        'Traveloka 항공권·호텔·액티비티 특가 다이렉트 연동',
        '베트남어 발음 기호가 병기된 실시간 회화 가이드',
      ],
      voiceSample: '안녕하세요! 아름다운 베트남 여행에 오신 것을 진심으로 환영합니다. 안전하고 행복한 여행 되세요!',
      borderHover: 'hover:border-amber-300',
    },
  ];

  // Close grid menu and language menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGridMenuOpen(false);
        setLangMenuOpen(false);
        stopVoiceGuide();
      }
    };
    if (gridMenuOpen || langMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [gridMenuOpen, langMenuOpen]);

  const scrollToSection = (id: string) => {
    setGridMenuOpen(false);
    setLangMenuOpen(false);
    stopVoiceGuide();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const filteredGridItems = navItems.filter((item) => {
    if (!searchGridQuery.trim()) return true;
    const q = searchGridQuery.toLowerCase();
    return (
      item.labelVi.toLowerCase().includes(q) ||
      item.labelEn.toLowerCase().includes(q) ||
      item.descVi.toLowerCase().includes(q) ||
      item.descEn.toLowerCase().includes(q) ||
      item.tagVi.toLowerCase().includes(q) ||
      item.tagEn.toLowerCase().includes(q)
    );
  });

  const filteredLanguages = languageOptions.filter((lang) => {
    if (!searchLangQuery.trim()) return true;
    const q = searchLangQuery.toLowerCase();
    return (
      lang.nativeName.toLowerCase().includes(q) ||
      lang.subName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q) ||
      lang.descVi.toLowerCase().includes(q) ||
      lang.descEn.toLowerCase().includes(q) ||
      lang.descKo.toLowerCase().includes(q) ||
      lang.tagVi.toLowerCase().includes(q) ||
      lang.tagEn.toLowerCase().includes(q) ||
      lang.tagKo.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <button
              id="brand-logo-btn"
              onClick={() => scrollToSection('intro')}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden shrink-0"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white p-1 border border-slate-200/90 shadow-md shadow-sky-900/5 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/app_logo_1791123199904.jpg"
                  alt="VIETNAM'S TRAVEL"
                  className="w-full h-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                    VIETNAM'S TRAVEL
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  THE LAND OF ENDLESS DISCOVERY
                </p>
              </div>
            </button>

            {/* Middle: Retained Icons on the Menu Bar (without text labels, now cleanly in Grid Menu) */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-50/90 p-1.5 rounded-2xl border border-sky-100/90 shadow-2xs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const label = currentLang === 'vi' ? item.labelVi : currentLang === 'ko' ? item.labelKo : item.labelEn;

                return (
                  <div key={item.id} className="relative group">
                    <button
                      id={`nav-icon-${item.id}`}
                      onClick={() => scrollToSection(item.id)}
                      title={label}
                      className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                        isActive
                          ? 'bg-sky-600 text-white shadow-sm shadow-sky-300 ring-2 ring-sky-200'
                          : 'text-slate-600 hover:text-sky-600 hover:bg-white hover:shadow-xs'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>

                    {/* Tooltip on hover */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                      {label}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Action: Search + Traveloka + Grid Menu + Language Switch + Map + Account */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Button with Magnifying Glass Icon Only (no text) */}
              <button
                id="header-cta-search"
                onClick={onOpenSearch}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white shadow-xs hover:shadow-md transition-all flex items-center justify-center cursor-pointer group shrink-0"
                title={
                  currentLang === 'vi'
                    ? 'Tìm kiếm địa điểm, món ăn, menu (Ctrl+K)'
                    : currentLang === 'ko'
                    ? '통합 검색 (Ctrl+K)'
                    : 'Search (Ctrl+K)'
                }
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
              </button>

              {/* Traveloka Quick Button */}
              <button
                id="header-cta-traveloka"
                onClick={() => openTravelokaModal('flight')}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#0194f3] to-[#007ce8] hover:from-[#0082d6] hover:to-[#0064d2] shadow-xs hover:shadow-md transition-all cursor-pointer hover:scale-102 border border-white/20"
                title={currentLang === 'vi' ? 'Liên kết đặt vé máy bay & khách sạn Traveloka' : currentLang === 'ko' ? 'Traveloka 항공 & 호텔 예약' : 'Traveloka Flights & Hotels'}
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Traveloka</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              </button>

              {/* Prominent Grid Menu Button */}
              <button
                id="btn-grid-menu-toggle"
                onClick={() => setGridMenuOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-sky-800 bg-sky-100/90 hover:bg-sky-600 hover:text-white transition-all shadow-xs border border-sky-200/90 cursor-pointer group"
                title={currentLang === 'vi' ? 'Mở Menu Lưới Khám Phá' : currentLang === 'ko' ? '그리드 탐색 메뉴 열기' : 'Open Grid Menu'}
              >
                <LayoutGrid className="w-4 h-4 text-sky-600 group-hover:text-white transition-colors" />
                <span className="font-extrabold tracking-wide">
                  {currentLang === 'vi' ? 'Menu Lưới' : currentLang === 'ko' ? '그리드 메뉴' : 'Grid Menu'}
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-sky-200 group-hover:bg-white/20 text-sky-800 group-hover:text-white text-[10px] font-black">
                  9
                </span>
              </button>

              {/* User Account / Login */}
              <button
                id="header-cta-account"
                onClick={() => (isAuthenticated ? openAccountModal('profile') : openAuthModal('login'))}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                title={isAuthenticated ? currentUser?.fullName : currentLang === 'vi' ? 'Đăng nhập / Tài khoản' : currentLang === 'ko' ? '로그인 / 내 계정' : 'Login / Account'}
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden xl:inline text-[11px] font-bold">
                  {isAuthenticated
                    ? currentUser?.fullName?.split(' ').pop() || (currentLang === 'ko' ? '내 계정' : 'Tài khoản')
                    : currentLang === 'vi'
                    ? 'Tài khoản'
                    : currentLang === 'ko'
                    ? '내 계정'
                    : 'Account'}
                </span>
              </button>

              {/* Language Switcher Button - Flag only, no text */}
              <button
                id="btn-lang-grid-toggle"
                onClick={() => {
                  setGridMenuOpen(false);
                  setLangMenuOpen(true);
                }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 hover:scale-105 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center cursor-pointer text-xl sm:text-2xl select-none"
                title={
                  currentLang === 'vi'
                    ? 'Chuyển đổi ngôn ngữ'
                    : currentLang === 'ko'
                    ? '언어 변경'
                    : 'Change language'
                }
                aria-label="Change Language"
              >
                <span>{currentLang === 'vi' ? '🇻🇳' : currentLang === 'ko' ? '🇰🇷' : '🇬🇧'}</span>
              </button>

              {/* Quick Map Button (Tablet / Desktop) */}
              <button
                id="header-cta-map"
                onClick={() => scrollToSection('map')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>{currentLang === 'vi' ? 'Bản Đồ' : currentLang === 'ko' ? '지도' : 'Map'}</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Grid Menu Modal (Menu Lưới Toàn Diện) */}
      {gridMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setGridMenuOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-4xl w-full my-auto overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header of Grid Menu */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-sky-700 via-sky-600 to-teal-700 text-white flex items-center justify-between shrink-0 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 shadow-xs">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight">
                      {currentLang === 'vi'
                        ? 'Menu Lưới Khám Phá Việt Nam'
                        : currentLang === 'ko'
                        ? '베트남 여행 종합 그리드 메뉴'
                        : 'Vietnam Travel Grid Menu'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                      {currentLang === 'vi' ? '9 Chuyên mục' : currentLang === 'ko' ? '9개 카테고리' : '9 Categories'}
                    </span>
                  </div>
                  <p className="text-xs text-sky-100 mt-0.5 font-medium">
                    {currentLang === 'vi'
                      ? 'Biển trời xanh thẳm, thiên nhiên trù phú, sắc màu văn hóa & di sản ngàn năm'
                      : currentLang === 'ko'
                      ? '푸른 바다와 수려한 자연, 다채로운 민족 문화와 천년의 역사 유산'
                      : 'Azure seas, emerald nature, vibrant culture & timeless heritage'}
                  </p>
                </div>
              </div>

              <button
                id="close-grid-menu-btn"
                onClick={() => setGridMenuOpen(false)}
                className="p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Close grid menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 5-Color Vietnamese Signature Accent Bar */}
            <div className="h-1.5 w-full grid grid-cols-5 shrink-0">
              <div className="bg-sky-600" title="Xanh dương biển trời" />
              <div className="bg-emerald-600" title="Xanh lục bảo thiên nhiên" />
              <div className="bg-[#78350f]" title="Nâu đất phù sa" />
              <div className="bg-amber-500" title="Vàng lúa chín" />
              <div className="bg-red-700" title="Đỏ gạch ngói cổ" />
            </div>

            {/* Search Filter Bar inside Grid Menu */}
            <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchGridQuery}
                  onChange={(e) => setSearchGridQuery(e.target.value)}
                  placeholder={
                    currentLang === 'vi'
                      ? 'Tìm kiếm nhanh mục (ví dụ: ẩm thực, bản đồ, 54 dân tộc, lộ trình...)'
                      : currentLang === 'ko'
                      ? '카테고리 검색 (예: 미식, 지도, 54개 민족, 일정, 콤보...)'
                      : 'Search section (e.g. food, voice map, 54 ethnic groups, itinerary...)'
                  }
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {searchGridQuery && (
                <button
                  onClick={() => setSearchGridQuery('')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer shrink-0"
                >
                  {currentLang === 'vi' ? 'Xóa tìm kiếm' : currentLang === 'ko' ? '검색 초기화' : 'Clear'}
                </button>
              )}
            </div>

            {/* Quick Language Switcher Bar inside Grid Menu */}
            <div className="mx-4 sm:mx-6 mt-3.5 px-3.5 py-2.5 rounded-2xl bg-teal-50/90 border border-teal-200/90 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Languages className="w-4 h-4 text-teal-600" />
                <span>
                  {currentLang === 'vi'
                    ? 'Ngôn ngữ giao diện:'
                    : currentLang === 'ko'
                    ? '표시 언어 설정:'
                    : 'Display Language:'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider">
                  {currentLang.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => onToggleLang('vi')}
                  className={`px-3 py-1.5 rounded-xl text-base transition-all cursor-pointer ${
                    currentLang === 'vi'
                      ? 'bg-teal-600 shadow-xs ring-2 ring-teal-300'
                      : 'bg-white hover:bg-teal-100 border border-slate-200'
                  }`}
                  title="Tiếng Việt"
                >
                  🇻🇳
                </button>
                <button
                  onClick={() => onToggleLang('en')}
                  className={`px-3 py-1.5 rounded-xl text-base transition-all cursor-pointer ${
                    currentLang === 'en'
                      ? 'bg-teal-600 shadow-xs ring-2 ring-teal-300'
                      : 'bg-white hover:bg-teal-100 border border-slate-200'
                  }`}
                  title="English"
                >
                  🇬🇧
                </button>
                <button
                  onClick={() => onToggleLang('ko')}
                  className={`px-3 py-1.5 rounded-xl text-base transition-all cursor-pointer ${
                    currentLang === 'ko'
                      ? 'bg-teal-600 shadow-xs ring-2 ring-teal-300'
                      : 'bg-white hover:bg-teal-100 border border-slate-200'
                  }`}
                  title="한국어"
                >
                  🇰🇷
                </button>
                <button
                  onClick={() => {
                    setGridMenuOpen(false);
                    setLangMenuOpen(true);
                  }}
                  className="ml-2 text-xs font-black text-teal-700 hover:text-teal-900 underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>
                    {currentLang === 'vi'
                      ? 'Menu Lưới Ngôn Ngữ Chi Tiết'
                      : currentLang === 'ko'
                      ? '다국어 그리드 상세 메뉴'
                      : 'Language Grid Menu'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Traveloka Quick Launch Strip in Grid Menu */}
            <div className="mx-4 sm:mx-6 mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#0194f3]/10 via-[#0082d6]/10 to-teal-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0194f3] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#0194f3]">TRAVELOKA CONNECT</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
                      {currentLang === 'vi' ? 'ƯU ĐÃI APP' : currentLang === 'ko' ? '앱 특가' : 'APP DEALS'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {currentLang === 'vi'
                      ? 'Đặt vé máy bay, khách sạn 63 tỉnh thành & combo giá tốt trực tiếp'
                      : currentLang === 'ko'
                      ? '63개 성·시 국내선 항공권, 호텔 및 실속 콤보 패키지 다이렉트 예약'
                      : 'Book domestic flights, hotels & package combos directly'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setGridMenuOpen(false);
                    openTravelokaModal('flight');
                  }}
                  className="flex-1 sm:flex-none px-2.5 py-1.5 rounded-xl bg-[#0194f3] hover:bg-[#007ce8] text-white font-bold text-xs cursor-pointer shadow-xs transition-colors text-center"
                >
                  {currentLang === 'vi' ? '✈️ Vé Máy Bay' : currentLang === 'ko' ? '✈️ 항공권' : 'Flights'}
                </button>
                <button
                  onClick={() => {
                    setGridMenuOpen(false);
                    openTravelokaModal('hotel');
                  }}
                  className="flex-1 sm:flex-none px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors text-center"
                >
                  {currentLang === 'vi' ? '🏨 Khách Sạn' : currentLang === 'ko' ? '🏨 호텔' : 'Hotels'}
                </button>
                <button
                  onClick={() => {
                    setGridMenuOpen(false);
                    openTravelokaModal('combo');
                  }}
                  className="flex-1 sm:flex-none px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs cursor-pointer shadow-xs transition-colors text-center"
                >
                  {currentLang === 'vi' ? '🎁 Combo' : currentLang === 'ko' ? '🎁 콤보' : 'Combo'}
                </button>
                <button
                  onClick={() => {
                    setGridMenuOpen(false);
                    openTravelokaModal('xperience');
                  }}
                  className="flex-1 sm:flex-none px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors text-center"
                >
                  {currentLang === 'vi' ? '🎡 Vé Vui Chơi' : currentLang === 'ko' ? '🎡 액티비티' : 'Passes'}
                </button>
              </div>
            </div>

            {/* Grid Content: 3x3 Cards */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
              {filteredGridItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-sm font-semibold">
                    {currentLang === 'vi' ? 'Không tìm thấy chuyên mục phù hợp' : currentLang === 'ko' ? '일치하는 카테고리가 없습니다' : 'No matching section found'}
                  </p>
                  <button
                    onClick={() => setSearchGridQuery('')}
                    className="mt-2 text-xs text-sky-600 font-bold hover:underline cursor-pointer"
                  >
                    {currentLang === 'vi' ? 'Xem lại toàn bộ 9 chuyên mục' : currentLang === 'ko' ? '9개 카테고리 전체보기' : 'Show all 9 sections'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                  {filteredGridItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    const label = currentLang === 'vi' ? item.labelVi : currentLang === 'ko' ? item.labelKo : item.labelEn;
                    const desc = currentLang === 'vi' ? item.descVi : currentLang === 'ko' ? item.descKo : item.descEn;
                    const tag = currentLang === 'vi' ? item.tagVi : currentLang === 'ko' ? item.tagKo : item.tagEn;

                    return (
                      <button
                        key={item.id}
                        id={`grid-item-${item.id}`}
                        onClick={() => scrollToSection(item.id)}
                        className={`group p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                          isActive
                            ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-400 shadow-md'
                            : `bg-white border-slate-200/80 hover:bg-slate-50/80 hover:shadow-lg hover:-translate-y-0.5 ${item.borderHover}`
                        }`}
                      >
                        {/* Top: Icon + Badge */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${item.iconBg} ${item.iconColor}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <div className="flex items-center gap-1.5">
                              {isActive && (
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-600 text-white text-[10px] font-black">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {currentLang === 'vi' ? 'Đang xem' : currentLang === 'ko' ? '현재 위치' : 'Active'}
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                                {tag}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                            {label}
                          </h4>

                          {/* Description */}
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {desc}
                          </p>
                        </div>

                        {/* Bottom action indicator */}
                        <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-sky-600">
                          <span>{currentLang === 'vi' ? 'Xem chuyên mục' : currentLang === 'ko' ? '바로 이동하기' : 'Go to section'}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer of Grid Menu */}
            <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-4 text-[11px] font-medium flex-wrap justify-center sm:justify-start">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  63 {currentLang === 'vi' ? 'Tỉnh thành' : currentLang === 'ko' ? '개 성·시' : 'Provinces'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  54 {currentLang === 'vi' ? 'Dân tộc anh em' : currentLang === 'ko' ? '개 형제 민족' : 'Ethnic Groups'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {currentLang === 'vi'
                    ? 'Hoàng Sa & Trường Sa thiêng liêng'
                    : currentLang === 'ko'
                    ? '신성한 호앙사 & 쯔엉사 군도'
                    : 'Sacred Paracel & Spratly'}
                </span>
              </div>

              <button
                onClick={() => setGridMenuOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer text-xs"
              >
                {currentLang === 'vi' ? 'Đóng Menu (ESC)' : currentLang === 'ko' ? '메뉴 닫기 (ESC)' : 'Close Menu (ESC)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Grid Menu Modal (Menu Lưới Ngôn Ngữ Toàn Diện) */}
      {langMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => {
            stopVoiceGuide();
            setLangMenuOpen(false);
          }}
        >
          <div
            className="bg-white rounded-3xl border border-teal-100 shadow-2xl max-w-4xl w-full my-auto overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header of Language Grid Menu */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-teal-700 via-sky-600 to-indigo-700 text-white flex items-center justify-between shrink-0 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 shadow-xs">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight">
                      {currentLang === 'vi'
                        ? 'Menu Lưới Chuyển Đổi Ngôn Ngữ'
                        : currentLang === 'ko'
                        ? '다국어 전환 그리드 메뉴'
                        : 'Multilingual Language Grid Menu'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                      {currentLang === 'vi' ? '3 Ngôn ngữ' : currentLang === 'ko' ? '3개 공식 언어' : '3 Locales'}
                    </span>
                  </div>
                  <p className="text-xs text-sky-100 mt-0.5 font-medium">
                    {currentLang === 'vi'
                      ? 'Tiếng Việt bản địa, Tiếng Anh quốc tế & Tiếng Hàn Quốc cho du khách'
                      : currentLang === 'ko'
                      ? '베트남어(모국어), 영어(글로벌 표준), 한국어(관광객 맞춤) 3개 국어 지원'
                      : 'Native Vietnamese, Global English & Korean Traveler Edition'}
                  </p>
                </div>
              </div>

              <button
                id="close-lang-menu-btn"
                onClick={() => {
                  stopVoiceGuide();
                  setLangMenuOpen(false);
                }}
                className="p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Close language grid menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 5-Color Vietnamese Signature Accent Bar */}
            <div className="h-1.5 w-full grid grid-cols-5 shrink-0">
              <div className="bg-sky-600" title="Xanh dương biển trời" />
              <div className="bg-emerald-600" title="Xanh lục bảo thiên nhiên" />
              <div className="bg-[#78350f]" title="Nâu đất phù sa" />
              <div className="bg-amber-500" title="Vàng lúa chín" />
              <div className="bg-red-700" title="Đỏ gạch ngói cổ" />
            </div>

            {/* Search Filter Bar inside Language Grid Menu */}
            <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchLangQuery}
                  onChange={(e) => setSearchLangQuery(e.target.value)}
                  placeholder={
                    currentLang === 'vi'
                      ? 'Tìm kiếm ngôn ngữ (ví dụ: Tiếng Việt, English, 한국어, âm thanh, giọng đọc...)'
                      : currentLang === 'ko'
                      ? '언어 검색 (예: 한국어, 베트남어, 영어, 오디오 가이드...)'
                      : 'Search language (e.g. English, Vietnamese, Korean, voice narration...)'
                  }
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {searchLangQuery && (
                <button
                  onClick={() => setSearchLangQuery('')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer shrink-0"
                >
                  {currentLang === 'vi' ? 'Xóa tìm kiếm' : currentLang === 'ko' ? '검색 초기화' : 'Clear'}
                </button>
              )}
            </div>

            {/* Language Quick Switch Info Banner */}
            <div className="mx-4 sm:mx-6 mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-indigo-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-teal-800">
                      {currentLang === 'vi' ? 'HỆ THỐNG ĐA NGÔN NGỮ THÔNG MINH' : currentLang === 'ko' ? '스마트 다국어 시스템' : 'SMART MULTILINGUAL ENGINE'}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
                      AI & SPEECH
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {currentLang === 'vi'
                      ? 'Đổi ngôn ngữ giao diện sẽ đồng bộ toàn bộ thuyết minh, ẩm thực, bản đồ & lịch trình tức thì.'
                      : currentLang === 'ko'
                      ? '언어 변경 시 지도, 오디오 가이드, 추천 일정 및 로컬 미식 해설이 즉시 동기화됩니다.'
                      : 'Switching language syncs voice guides, culinary maps, and itineraries across the platform.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-bold hidden sm:inline">
                  {currentLang === 'vi' ? 'Đang chọn:' : currentLang === 'ko' ? '현재 선택:' : 'Active:'}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-teal-600 text-white font-extrabold text-xs shadow-xs">
                  {currentLang === 'vi' ? '🇻🇳 Tiếng Việt' : currentLang === 'ko' ? '🇰🇷 한국어' : '🇬🇧 English'}
                </span>
              </div>
            </div>

            {/* Grid Content: 3 Language Cards */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredLanguages.map((langItem) => {
                  const isActive = currentLang === langItem.id;
                  const isPlaying = playingLangVoice === langItem.id;
                  const desc = currentLang === 'vi' ? langItem.descVi : currentLang === 'ko' ? langItem.descKo : langItem.descEn;
                  const tag = currentLang === 'vi' ? langItem.tagVi : currentLang === 'ko' ? langItem.tagKo : langItem.tagEn;
                  const features = currentLang === 'vi' ? langItem.featuresVi : currentLang === 'ko' ? langItem.featuresKo : langItem.featuresEn;

                  return (
                    <div
                      key={langItem.id}
                      onClick={() => {
                        onToggleLang(langItem.id);
                        stopVoiceGuide();
                      }}
                      className={`rounded-2xl border text-left transition-all flex flex-col justify-between p-4.5 relative overflow-hidden cursor-pointer group select-none ${
                        isActive
                          ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500 shadow-md scale-[1.01]'
                          : `bg-white border-slate-200 hover:bg-slate-50/90 hover:shadow-lg hover:-translate-y-0.5 ${langItem.borderHover}`
                      }`}
                    >
                      {/* Top Bar: Flag + Badge + Active status */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-3xl leading-none">{langItem.flag}</span>
                            <div>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                                {langItem.code}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {isActive ? (
                              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-black shadow-xs">
                                <CheckCircle2 className="w-3 h-3" />
                                {currentLang === 'vi' ? 'Đang chọn' : currentLang === 'ko' ? '선택됨' : 'Selected'}
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-teal-600 group-hover:underline">
                                {currentLang === 'vi' ? 'Nhấn để chọn' : currentLang === 'ko' ? '클릭하여 선택' : 'Click to select'}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                              {tag}
                            </span>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="mb-2.5">
                          <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight group-hover:text-teal-700 transition-colors">
                            {langItem.nativeName}
                          </h4>
                          <p className="text-xs font-semibold text-teal-700 mt-0.5">
                            {langItem.subName}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 leading-relaxed mb-3.5">
                          {desc}
                        </p>

                        {/* Features List */}
                        <div className="space-y-1.5 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600">
                          {features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-teal-600 font-bold shrink-0">✓</span>
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action: Only Voice Preview, No Activation Button */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        {/* Audio Preview Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isPlaying) {
                              stopVoiceGuide();
                              setPlayingLangVoice(null);
                            } else {
                              playVoiceGuide(
                                langItem.voiceSample,
                                langItem.id,
                                () => setPlayingLangVoice(langItem.id),
                                () => setPlayingLangVoice(null),
                                () => setPlayingLangVoice(null)
                              );
                            }
                          }}
                          className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isPlaying
                              ? 'bg-amber-500 text-slate-950 border-amber-600 animate-pulse'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                          title="Nghe thử phát âm chuẩn"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                          <span>
                            {isPlaying
                              ? (currentLang === 'vi' ? 'Đang phát âm thanh...' : currentLang === 'ko' ? '음성 재생 중...' : 'Playing sample...')
                              : (currentLang === 'vi' ? '🔊 Nghe thử giọng đọc' : currentLang === 'ko' ? '🔊 원어민 음성 듣기' : '🔊 Hear Voice Sample')}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer of Language Grid Menu */}
            <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-4 text-[11px] font-medium flex-wrap justify-center sm:justify-start">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  100% {currentLang === 'vi' ? 'Bản địa hóa' : currentLang === 'ko' ? '현지화 지원' : 'Localized'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  {currentLang === 'vi' ? 'Tích hợp giọng đọc Web Speech' : currentLang === 'ko' ? 'Web Speech 오디오 연동' : 'Web Speech API Voice'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {currentLang === 'vi' ? 'Lưu tự động trên phiên duyệt' : currentLang === 'ko' ? '세션 실시간 동기화' : 'Instant Sync'}
                </span>
              </div>

              <button
                onClick={() => {
                  stopVoiceGuide();
                  setLangMenuOpen(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer text-xs"
              >
                {currentLang === 'vi' ? 'Đóng Menu (ESC)' : currentLang === 'ko' ? '메뉴 닫기 (ESC)' : 'Close Menu (ESC)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
