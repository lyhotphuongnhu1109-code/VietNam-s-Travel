import React, { useState } from 'react';
import {
  MapPin,
  Utensils,
  Search,
  Compass,
  Tag,
  Volume2,
  Play,
  Plane,
  Home,
  Gift,
} from 'lucide-react';

import { DESTINATIONS, CUISINE_LIST } from '../data/travelData';
import { Region, Language } from '../types';
import { playVoiceGuide } from '../utils/speech';
import { useAuth } from '../context/AuthContext';
import { KO_DESTINATIONS, KO_CUISINES, tr } from '../data/koreanTranslations';

interface ExploreDestinationsProps {
  currentLang: Language;
}

export const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({ currentLang }) => {
  const { openTravelokaModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'places' | 'food'>('all');
  const [selectedRegion, setSelectedRegion] = useState<'all' | Region>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter destinations
  const filteredDestinations = DESTINATIONS.filter((item) => {
    const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.travelType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Filter cuisines
  const filteredCuisines = CUISINE_LIST.filter((food) => {
    const matchesRegion = selectedRegion === 'all' || food.region === selectedRegion;
    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.travelType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="explore" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Danh Thắng & Ẩm Thực' : currentLang === 'ko' ? '주요 명소 & 대표 미식' : 'Destinations & Cuisine'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {currentLang === 'vi'
                ? 'Khám Phá Địa Điểm & Món Ngon Nổi Tiếng'
                : currentLang === 'ko'
                ? '베트남 대표 명소 & 유명 미식 탐험'
                : 'Iconic Sights & Famous Gastronomy'}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              {currentLang === 'vi'
                ? 'Mỗi địa danh và món ăn đều gắn liền với dòng giới thiệu nét đặc trưng của loại hình du lịch, câu chuyện văn hóa ngàn năm và chi phí tham khảo thực tế.'
                : currentLang === 'ko'
                ? '모든 명소와 요리에는 여행 유형별 특징, 유구한 역사·문화 이야기 및 실질적인 참고 여행 경비가 함께 제공됩니다.'
                : 'Each destination and dish comes paired with travel typology insights, historical heritage stories, and practical pricing.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={currentLang === 'vi' ? 'Tìm địa danh, món ăn...' : currentLang === 'ko' ? '명소, 대표 요리 검색...' : 'Search place, dish...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/40 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400 transition-all"
            />
          </div>
        </div>

        {/* Filter Controls: Tabs & Regions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-sky-100">
          {/* Main Category Tabs */}
          <div className="flex items-center bg-sky-50/80 p-1 rounded-2xl border border-sky-100">
            <button
              id="tab-all"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              {currentLang === 'vi' ? 'Tất cả' : currentLang === 'ko' ? '전체' : 'All'}
            </button>
            <button
              id="tab-places"
              onClick={() => setActiveTab('places')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'places'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Địa Điểm Cần Đến' : currentLang === 'ko' ? '주요 명소' : 'Places'}</span>
            </button>
            <button
              id="tab-food"
              onClick={() => setActiveTab('food')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'food'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Đặc Sắc Ẩm Thực' : currentLang === 'ko' ? '대표 미식' : 'Cuisine'}</span>
            </button>
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1">
              {currentLang === 'vi' ? 'Vùng:' : currentLang === 'ko' ? '지역:' : 'Region:'}
            </span>
            {(['all', 'North', 'Central', 'South'] as const).map((r) => {
              const label =
                r === 'all'
                  ? currentLang === 'vi'
                    ? 'Toàn quốc'
                    : currentLang === 'ko'
                    ? '전국'
                    : 'All'
                  : r === 'North'
                  ? currentLang === 'vi'
                    ? 'Miền Bắc'
                    : currentLang === 'ko'
                    ? '북부'
                    : 'North'
                  : r === 'Central'
                  ? currentLang === 'vi'
                    ? 'Miền Trung'
                    : currentLang === 'ko'
                    ? '중부'
                    : 'Central'
                  : currentLang === 'vi'
                  ? 'Miền Nam'
                  : currentLang === 'ko'
                  ? '남부'
                  : 'South';
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content: Destinations */}
        {(activeTab === 'all' || activeTab === 'places') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-600" />
                <span>
                  {currentLang === 'vi'
                    ? 'Danh Thắng Di Sản & Kỳ Quan Thiên Nhiên'
                    : currentLang === 'ko'
                    ? '세계유산 명소 & 대자연의 경이'
                    : 'Iconic Heritage & Natural Wonders'}
                </span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {filteredDestinations.length}{' '}
                {currentLang === 'vi' ? 'địa điểm' : currentLang === 'ko' ? '개 명소' : 'places'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => {
                const destKo = KO_DESTINATIONS[dest.id] || KO_DESTINATIONS[dest.id.replace(/-.*/, '')];
                const displayName =
                  currentLang === 'vi'
                    ? dest.vietnameseName
                    : currentLang === 'ko'
                    ? destKo?.nameKo || dest.name
                    : dest.name;
                const displaySub =
                  currentLang === 'vi'
                    ? dest.name
                    : currentLang === 'ko'
                    ? dest.vietnameseName
                    : dest.vietnameseName;
                const displayTravelType =
                  currentLang === 'ko' && destKo?.travelTypeKo
                    ? destKo.travelTypeKo
                    : dest.travelType;
                const displayDesc =
                  currentLang === 'ko' && destKo?.descKo
                    ? destKo.descKo
                    : dest.description;
                const displayCultural =
                  currentLang === 'ko' && destKo?.culturalSignificanceKo
                    ? destKo.culturalSignificanceKo
                    : dest.culturalSignificance;
                const displayBestTime =
                  currentLang === 'ko' && destKo?.bestTimeKo
                    ? destKo.bestTimeKo
                    : dest.bestTime;
                const displayCost =
                  currentLang === 'vi'
                    ? dest.estimatedCostVND
                    : currentLang === 'ko'
                    ? destKo?.costKo || dest.estimatedCostUSD
                    : dest.estimatedCostUSD;

                return (
                  <div
                    key={dest.id}
                    className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-xs hover:shadow-lg hover:border-sky-200 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={dest.imageUrl}
                          alt={displayName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sky-400" />
                          <span>{dest.province}</span>
                        </div>
                        <div
                          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                            dest.category === 'nature'
                              ? 'bg-emerald-600'
                              : dest.category === 'heritage'
                              ? 'bg-red-700'
                              : dest.category === 'beach'
                              ? 'bg-sky-600'
                              : 'bg-[#78350f]'
                          }`}
                        >
                          {currentLang === 'vi'
                            ? dest.category === 'nature'
                              ? '🌿 Thiên Nhiên'
                              : dest.category === 'heritage'
                              ? '🏛️ Di Sản'
                              : dest.category === 'cultural'
                              ? '🎎 Văn Hóa'
                              : dest.category === 'beach'
                              ? '🌊 Biển Đảo'
                              : '⭐ Lịch Sử'
                            : currentLang === 'ko'
                            ? dest.category === 'nature'
                              ? '🌿 자연 경관'
                              : dest.category === 'heritage'
                              ? '🏛️ 세계유산'
                              : dest.category === 'cultural'
                              ? '🎎 민족 문화'
                              : dest.category === 'beach'
                              ? '🌊 청정 해양'
                              : '⭐ 역사 유적'
                            : dest.category.toUpperCase()}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                              {displayName}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">
                              {displaySub}
                            </p>
                          </div>
                        </div>

                        {/* Travel Type Badge */}
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[11px] font-semibold mb-3 border border-sky-200">
                          <Tag className="w-3 h-3 text-sky-600" />
                          <span>{displayTravelType}</span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                          {displayDesc}
                        </p>

                        {/* Cultural Significance box - Earthy Clay & Teak Warmth */}
                        <div className="p-3 rounded-xl bg-[#fdfbf7] border border-[#e7ded4] text-[11px] text-[#5c3826] mb-3">
                          <strong className="font-bold block mb-0.5 text-[#78350f]">
                            {currentLang === 'vi'
                              ? '🏛️ Ý nghĩa văn hóa & lịch sử:'
                              : currentLang === 'ko'
                              ? '🏛️ 문화 및 역사적 스토리:'
                              : '🏛️ Cultural Story & Heritage:'}
                          </strong>
                          <p className="line-clamp-2 leading-relaxed">{displayCultural}</p>
                        </div>

                        {/* Best time & Cost - Golden Ripe Rice Accent */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                          <span>
                            <strong>
                              {currentLang === 'vi'
                                ? 'Thời gian đẹp:'
                                : currentLang === 'ko'
                                ? '최적 시기:'
                                : 'Best time:'}
                            </strong>{' '}
                            {displayBestTime}
                          </span>
                          <span className="font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {displayCost}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: Thuyết minh, Đặt vé Traveloka, Video */}
                    <div className="p-4 pt-0 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          const voiceText =
                            currentLang === 'vi'
                              ? dest.voiceGuideVi
                              : currentLang === 'ko'
                              ? destKo?.voiceKo || dest.voiceGuideKo || dest.voiceGuideEn
                              : dest.voiceGuideEn;
                          playVoiceGuide(voiceText, currentLang);
                        }}
                        className="flex-1 py-2 rounded-xl bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-sky-200"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>
                          {currentLang === 'vi'
                            ? 'Thuyết minh'
                            : currentLang === 'ko'
                            ? '음성 해설'
                            : 'Audio Guide'}
                        </span>
                      </button>

                      {dest.videoUrl && (
                        <button
                          onClick={() => {
                            setActiveTab('videos');
                            const el = document.getElementById('video-showcase');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors cursor-pointer"
                          title={
                            currentLang === 'vi'
                              ? 'Xem video 3 miền'
                              : currentLang === 'ko'
                              ? '3대 지역 영상 보기'
                              : 'Watch 3-region videos'
                          }
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Traveloka Full Booking Suite for this Destination */}
                    <div className="px-4 pb-3.5 pt-2 border-t border-slate-100 bg-slate-50/70">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0194f3]" />
                          <span>
                            {currentLang === 'vi'
                              ? 'Đặt dịch vụ qua Traveloka:'
                              : currentLang === 'ko'
                              ? 'Traveloka 간편 예약:'
                              : 'Book with Traveloka:'}
                          </span>
                        </span>
                        <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                          Official Partner
                        </span>
                      </div>
                      {(() => {
                        const airportMap: Record<string, string> = {
                          hanoi: 'HAN',
                          'ha-noi': 'HAN',
                          'da-nang': 'DAD',
                          'hoi-an': 'DAD',
                          hue: 'HUI',
                          'sa-pa': 'HAN',
                          'ha-long': 'HPH',
                          'ninh-binh': 'HAN',
                          'ha-giang': 'HAN',
                          'phu-quoc': 'PQC',
                          'nha-trang': 'CXR',
                          'da-lat': 'DLI',
                          'sai-gon': 'SGN',
                          'ho-chi-minh': 'SGN',
                          'can-tho': 'VCA',
                          'con-dao': 'VCS',
                          'quy-nhon': 'UIH',
                          'mui-ne': 'SGN',
                          'phan-thiet': 'SGN',
                          'vung-tau': 'SGN',
                          'cao-bang': 'HAN',
                          'dong-hoi': 'VDH',
                          'phong-nha': 'VDH',
                          'tuy-hoa': 'TBB',
                          'phu-yen': 'TBB',
                          'buon-ma-thuot': 'BMV',
                          pleiku: 'PXU',
                        };
                        const destAirport = airportMap[dest.id] || 'DAD';
                        const originAirport = destAirport === 'HAN' ? 'SGN' : 'HAN';

                        return (
                          <div className="grid grid-cols-4 gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                openTravelokaModal('flight', {
                                  originCode: originAirport,
                                  destCode: destAirport,
                                  cityId: dest.id,
                                })
                              }
                              className="py-1.5 px-1 rounded-xl bg-white hover:bg-sky-50 text-sky-800 border border-slate-200 hover:border-sky-300 text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer shadow-2xs hover:scale-102"
                              title={
                                currentLang === 'vi'
                                  ? 'Đặt vé máy bay'
                                  : currentLang === 'ko'
                                  ? '항공권 예약'
                                  : 'Book Flight'
                              }
                            >
                              <Plane className="w-3.5 h-3.5 text-[#0194f3]" />
                              <span className="truncate">
                                {currentLang === 'vi'
                                  ? 'Vé bay'
                                  : currentLang === 'ko'
                                  ? '항공권'
                                  : 'Flight'}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                openTravelokaModal('hotel', {
                                  cityId: dest.id,
                                  destCode: destAirport,
                                })
                              }
                              className="py-1.5 px-1 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-slate-200 hover:border-emerald-300 text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer shadow-2xs hover:scale-102"
                              title={
                                currentLang === 'vi'
                                  ? 'Đặt phòng khách sạn'
                                  : currentLang === 'ko'
                                  ? '호텔 예약'
                                  : 'Book Hotel'
                              }
                            >
                              <Home className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="truncate">
                                {currentLang === 'vi'
                                  ? 'Khách sạn'
                                  : currentLang === 'ko'
                                  ? '호텔'
                                  : 'Hotel'}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                openTravelokaModal('combo', {
                                  originCode: originAirport,
                                  destCode: destAirport,
                                  cityId: dest.id,
                                })
                              }
                              className="py-1.5 px-1 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-slate-200 hover:border-amber-300 text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer shadow-2xs hover:scale-102"
                              title={
                                currentLang === 'vi'
                                  ? 'Combo vé + phòng tiết kiệm 30%'
                                  : currentLang === 'ko'
                                  ? '항공+호텔 30% 절약 콤보'
                                  : 'Save 30% Combo'
                              }
                            >
                              <Gift className="w-3.5 h-3.5 text-amber-600" />
                              <span className="truncate font-black text-amber-700">
                                {currentLang === 'ko' ? '콤보 -30%' : 'Combo -30%'}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                openTravelokaModal('xperience', { cityId: dest.id })
                              }
                              className="py-1.5 px-1 rounded-xl bg-white hover:bg-purple-50 text-purple-900 border border-slate-200 hover:border-purple-300 text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer shadow-2xs hover:scale-102"
                              title={
                                currentLang === 'vi'
                                  ? 'Vé vui chơi & hoạt động'
                                  : currentLang === 'ko'
                                  ? '입장권 & 투어 패스'
                                  : 'Attraction Tickets'
                              }
                            >
                              <Compass className="w-3.5 h-3.5 text-purple-600" />
                              <span className="truncate">
                                {currentLang === 'vi'
                                  ? 'Vé vui chơi'
                                  : currentLang === 'ko'
                                  ? '입장권'
                                  : 'Passes'}
                              </span>
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content: Cuisine */}
        {(activeTab === 'all' || activeTab === 'food') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-600" />
                <span>
                  {currentLang === 'vi'
                    ? 'Tinh Hoa Ẩm Thực 3 Miền Đậm Đà Bản Sắc'
                    : currentLang === 'ko'
                    ? '3대 지역의 진수 & 베트남 전통 미식'
                    : 'Regional Gastronomy & Culinary Heritage'}
                </span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {filteredCuisines.length}{' '}
                {currentLang === 'vi'
                  ? 'món ngon'
                  : currentLang === 'ko'
                  ? '가지 대표 요리'
                  : 'dishes'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCuisines.map((food) => {
                const foodKo = KO_CUISINES[food.id];
                const displayName =
                  currentLang === 'vi'
                    ? food.vietnameseName
                    : currentLang === 'ko'
                    ? foodKo?.nameKo || food.name
                    : food.name;
                const displaySub =
                  currentLang === 'vi'
                    ? food.name
                    : currentLang === 'ko'
                    ? food.vietnameseName
                    : food.vietnameseName;
                const displayDesc =
                  currentLang === 'ko' && foodKo?.descKo
                    ? foodKo.descKo
                    : food.description;
                const displayTaste =
                  currentLang === 'ko' && foodKo?.tasteKo
                    ? foodKo.tasteKo
                    : food.tasteProfile;
                const spots =
                  currentLang === 'ko' && foodKo?.spotsKo
                    ? foodKo.spotsKo
                    : food.recommendedPlaces;

                return (
                  <div
                    key={food.id}
                    className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-xs hover:shadow-lg hover:border-amber-200 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={food.imageUrl}
                          alt={displayName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold">
                          {food.region === 'North'
                            ? tr(currentLang, 'Miền Bắc', 'North', '북부')
                            : food.region === 'Central'
                            ? tr(currentLang, 'Miền Trung', 'Central', '중부')
                            : tr(currentLang, 'Miền Nam', 'South', '남부')}
                        </div>
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-black shadow-md border border-amber-300">
                          {food.averagePriceVND}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h4 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors mb-1">
                          {displayName}
                        </h4>
                        <p className="text-xs text-slate-500 mb-2">{displaySub}</p>

                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold mb-3 border border-amber-200">
                          <Tag className="w-3 h-3 text-amber-600" />
                          <span>{food.travelType}</span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                          {displayDesc}
                        </p>

                        {/* Cultural Story - Warm Earthy Clay and Flavors */}
                        <div className="p-3 rounded-xl bg-[#faf6f0] border border-[#e8ded1] text-[11px] text-[#5c3826] mb-3">
                          <strong className="text-[#78350f] block mb-0.5 font-bold">
                            {currentLang === 'vi'
                              ? '🥢 Hương vị & Nét văn hóa:'
                              : currentLang === 'ko'
                              ? '🥢 미식의 특징 & 문화:'
                              : '🥢 Flavor & Cultural Heritage:'}
                          </strong>
                          <p className="line-clamp-2 leading-relaxed">{displayTaste}</p>
                        </div>

                        {/* Recommended Places */}
                        <div className="text-[11px] text-slate-500">
                          <strong className="text-slate-800 block mb-1">
                            {currentLang === 'vi'
                              ? 'Quán ngon gợi ý:'
                              : currentLang === 'ko'
                              ? '추천 맛집:'
                              : 'Famous spots:'}
                          </strong>
                          <ul className="list-disc list-inside space-y-0.5">
                            {spots.slice(0, 2).map((place, idx) => (
                              <li key={idx} className="truncate">
                                {place}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => {
                          const voiceText =
                            currentLang === 'vi'
                              ? `${food.vietnameseName}. ${food.description}. ${food.tasteProfile}. Giá trung bình: ${food.averagePriceVND}`
                              : currentLang === 'ko'
                              ? `${displayName}. ${displayDesc} ${displayTaste}. 평균 가격: ${food.averagePriceVND}`
                              : `${food.name}. ${food.description}. ${food.tasteProfile}. Average price: ${food.averagePriceVND}`;
                          playVoiceGuide(voiceText, currentLang);
                        }}
                        className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-500 hover:text-slate-950 text-amber-900 border border-amber-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>
                          {currentLang === 'vi'
                            ? 'Nghe giới thiệu món'
                            : currentLang === 'ko'
                            ? '요리 음성 소개'
                            : 'Audio Guide'}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
