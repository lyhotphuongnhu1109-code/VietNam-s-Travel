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
  Sparkles,
} from 'lucide-react';

import { DESTINATIONS, CUISINE_LIST } from '../data/travelData';
import { Region, Language, Destination, CuisineItem } from '../types';
import { playVoiceGuide } from '../utils/speech';
import { useAuth } from '../context/AuthContext';
import { KO_DESTINATIONS, KO_CUISINES, tr } from '../data/koreanTranslations';
import { DestinationDetailModal } from './DestinationDetailModal';
import { CuisineDetailModal } from './CuisineDetailModal';

interface ExploreDestinationsProps {
  currentLang: Language;
}

export const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({ currentLang }) => {
  const { openTravelokaModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'places' | 'food'>('all');
  const [selectedRegion, setSelectedRegion] = useState<'all' | Region>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineItem | null>(null);

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <div>
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
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === 'vi'
                    ? 'Nhấp chuột vào từng hình ảnh để xem thư viện ảnh, thông tin chi tiết, giá vé máy bay, khách sạn và địa điểm ăn uống đặc sản.'
                    : currentLang === 'ko'
                    ? '사진을 클릭하시면 상세 갤러리, 여행 정보, 항공권 요금, 호텔 및 로컬 맛집을 확인하실 수 있습니다.'
                    : 'Click any photo to explore the image gallery, heritage info, flight & hotel prices, and dining spots.'}
                </p>
              </div>
              <span className="text-xs text-slate-500 font-medium shrink-0">
                {filteredDestinations.length}{' '}
                {currentLang === 'vi' ? 'địa điểm' : currentLang === 'ko' ? '개 명소' : 'places'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

                return (
                  <div
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest)}
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-slate-100 hover:border-sky-300 hover:scale-[1.02] bg-slate-100"
                    title={
                      currentLang === 'vi'
                        ? `Nhấp để xem hình ảnh, thông tin, vé máy bay, khách sạn & ẩm thực tại ${displayName} (${dest.province})`
                        : currentLang === 'ko'
                        ? `${displayName} (${dest.province}) 사진, 정보, 항공권, 숙소 및 맛집 전체보기`
                        : `Click to view photos, info, flights, hotels & dining in ${displayName} (${dest.province})`
                    }
                  >
                    {/* Destination Image - High quality visual fill */}
                    <img
                      src={dest.imageUrl}
                      alt={displayName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient shadow at bottom to make city/province name crystal clear */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />

                    {/* City / Province Name Tag */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-lg group-hover:border-amber-400/60 transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="tracking-tight">{dest.province}</span>
                      </div>

                      {/* Subtle hover indicator icon */}
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <div>
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
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === 'vi'
                    ? 'Nhấp chuột vào từng món ăn để xem danh sách các quán ăn ngon nổi tiếng trên toàn quốc và câu chuyện ẩm thực đặc sắc.'
                    : currentLang === 'ko'
                    ? '사진을 클릭하시면 전국의 유명 맛집 목록과 요리 이야기를 확인하실 수 있습니다.'
                    : 'Click any dish to explore top famous eateries nationwide and authentic culinary stories.'}
                </p>
              </div>
              <span className="text-xs text-slate-500 font-medium shrink-0">
                {filteredCuisines.length}{' '}
                {currentLang === 'vi'
                  ? 'món ngon'
                  : currentLang === 'ko'
                  ? '가지 대표 요리'
                  : 'dishes'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCuisines.map((food) => {
                const foodKo = KO_CUISINES[food.id];
                const displayName =
                  currentLang === 'vi'
                    ? food.vietnameseName
                    : currentLang === 'ko'
                    ? foodKo?.nameKo || food.name
                    : food.name;

                return (
                  <div
                    key={food.id}
                    onClick={() => setSelectedCuisine(food)}
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-slate-100 hover:border-amber-300 hover:scale-[1.02] bg-slate-100"
                    title={
                      currentLang === 'vi'
                        ? `Nhấp chuột vào để xem danh sách quán ăn ngon trên toàn quốc cho món ${displayName}`
                        : currentLang === 'ko'
                        ? `${displayName} 전국 유명 맛집 목록 보기`
                        : `Click to view top eateries nationwide for ${displayName}`
                    }
                  >
                    {/* Pure dish image on the outside */}
                    <img
                      src={food.imageUrl}
                      alt={displayName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient shadow at bottom to make dish name crystal clear */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent pointer-events-none" />

                    {/* Dish Name Only on the outside - no province/city as requested */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between pointer-events-none gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-base sm:text-lg font-black tracking-tight leading-snug drop-shadow-md group-hover:text-amber-300 transition-colors line-clamp-1">
                          {displayName}
                        </h4>
                      </div>

                      {/* Subtle hover indicator icon */}
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 shrink-0">
                        <Utensils className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Rich Destination Detail Modal (Images, Info, Flight & Hotel Rates, Dining) */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          currentLang={currentLang}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {/* Rich Cuisine Detail Modal (Images, Info, Flight & Hotel Rates, Dining Spots) */}
      {selectedCuisine && (
        <CuisineDetailModal
          cuisine={selectedCuisine}
          currentLang={currentLang}
          onClose={() => setSelectedCuisine(null)}
        />
      )}
    </section>
  );
};
