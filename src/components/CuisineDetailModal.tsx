import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Utensils,
  MapPin,
  Volume2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Info,
  Clock,
  DollarSign,
  Compass,
} from 'lucide-react';
import { CuisineItem, Language } from '../types';
import { CUISINE_DETAILS, CuisineFullGuide } from '../data/cuisineDetailData';
import { playVoiceGuide, stopVoiceGuide } from '../utils/speech';
import { KO_CUISINES } from '../data/koreanTranslations';

interface CuisineDetailModalProps {
  cuisine: CuisineItem | null;
  currentLang: Language;
  onClose: () => void;
}

export const CuisineDetailModal: React.FC<CuisineDetailModalProps> = ({
  cuisine,
  currentLang,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'dining' | 'info'>('dining');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<'all' | 'North' | 'Central' | 'South'>('all');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopVoiceGuide();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset tab & image index when opening a new cuisine
  useEffect(() => {
    setActiveTab('dining');
    setSelectedRegionFilter('all');
    setSelectedImageIdx(0);
    setIsPlayingAudio(false);
  }, [cuisine]);

  if (!cuisine) return null;

  const foodKo = KO_CUISINES[cuisine.id];
  const displayName =
    currentLang === 'vi'
      ? cuisine.vietnameseName
      : currentLang === 'ko'
      ? foodKo?.nameKo || cuisine.name
      : cuisine.name;

  const displaySub =
    currentLang === 'vi'
      ? cuisine.name
      : currentLang === 'ko'
      ? cuisine.vietnameseName
      : cuisine.vietnameseName;

  const displayDesc =
    currentLang === 'ko' && foodKo?.descKo
      ? foodKo.descKo
      : cuisine.description;

  const displayTaste =
    currentLang === 'ko' && foodKo?.tasteKo
      ? foodKo.tasteKo
      : cuisine.tasteProfile;

  const displayStory =
    currentLang === 'ko' && foodKo?.culturalStoryKo
      ? foodKo.culturalStoryKo
      : cuisine.culturalStory;

  const guide: CuisineFullGuide =
    CUISINE_DETAILS[cuisine.id] || CUISINE_DETAILS['pho-vietnam'];

  const galleryImages = guide.gallery && guide.gallery.length > 0
    ? guide.gallery
    : [{ url: cuisine.imageUrl, captionVi: cuisine.vietnameseName, captionEn: cuisine.name, captionKo: displayName }];

  const currentImage = galleryImages[selectedImageIdx] || galleryImages[0];
  const currentCaption =
    currentLang === 'vi'
      ? currentImage.captionVi
      : currentLang === 'ko'
      ? currentImage.captionKo
      : currentImage.captionEn;

  // Filter dining spots by region (North / Central / South)
  const filteredDiningSpots = useMemo(() => {
    if (selectedRegionFilter === 'all') return guide.diningSpots;
    return guide.diningSpots.filter((s) => s.region === selectedRegionFilter);
  }, [guide.diningSpots, selectedRegionFilter]);

  const northCount = guide.diningSpots.filter((s) => s.region === 'North').length;
  const centralCount = guide.diningSpots.filter((s) => s.region === 'Central').length;
  const southCount = guide.diningSpots.filter((s) => s.region === 'South').length;

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      stopVoiceGuide();
      setIsPlayingAudio(false);
    } else {
      const voiceText =
        currentLang === 'vi'
          ? `${cuisine.vietnameseName}. ${cuisine.description}. ${cuisine.tasteProfile}. Giá tham khảo: ${cuisine.averagePriceVND}.`
          : currentLang === 'ko'
          ? `${displayName}. ${displayDesc} ${displayTaste}. 평균 가격: ${cuisine.averagePriceVND}.`
          : `${cuisine.name}. ${cuisine.description}. ${cuisine.tasteProfile}. Average price: ${cuisine.averagePriceVND}.`;

      playVoiceGuide(
        voiceText,
        currentLang,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => {
        stopVoiceGuide();
        onClose();
      }}
    >
      <div
        className="bg-white rounded-3xl border border-amber-100 shadow-2xl max-w-4xl w-full my-auto overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Dish Name & Overview */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-white flex items-center justify-between shrink-0 relative">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 shadow-xs shrink-0">
              <Utensils className="w-5 h-5 text-amber-200" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-2xl font-black tracking-tight leading-tight truncate">
                  {displayName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  {guide.diningSpots.length} {currentLang === 'vi' ? 'Quán ngon toàn quốc' : 'Eateries nationwide'}
                </span>
              </div>
              <p className="text-xs text-amber-100 mt-0.5 font-medium truncate">
                {displaySub} • {cuisine.travelType}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopVoiceGuide();
              onClose();
            }}
            className="p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer border border-white/20 shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Compact Photo Gallery Banner (Kept small so eatery information gets maximum space) */}
        <div className="relative bg-slate-950 shrink-0 overflow-hidden">
          <div className="relative h-16 sm:h-20 w-full overflow-hidden bg-slate-900">
            <img
              src={currentImage.url}
              alt={currentCaption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/25" />

            {/* Bottom Caption & Indicators */}
            <div className="absolute bottom-1 left-3 right-3 flex items-center justify-between gap-2 text-white text-xs">
              <span className="font-semibold line-clamp-1 drop-shadow-md text-[10px] sm:text-[11px]">
                📸 {currentCaption}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      selectedImageIdx === idx
                        ? 'w-5 bg-amber-400'
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
                <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-bold ml-1">
                  {selectedImageIdx + 1}/{galleryImages.length}
                </span>
              </div>
            </div>

            {/* Prev / Next controls */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImageIdx((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
                  }
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImageIdx((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation: Quán Ăn Ngon Toàn Quốc (Primary) & Thông Tin Món Ăn */}
        <div className="flex items-center bg-slate-50 border-b border-slate-200 px-3 sm:px-6 overflow-x-auto custom-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('dining')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'dining'
                ? 'border-amber-600 text-amber-900 bg-amber-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-4 h-4 text-amber-600" />
            <span>
              {currentLang === 'vi'
                ? 'Quán Ăn Ngon Trên Toàn Quốc'
                : currentLang === 'ko'
                ? '전국 추천 맛집'
                : 'Top Eateries Nationwide'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
              {guide.diningSpots.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'info'
                ? 'border-amber-600 text-amber-900 bg-amber-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="w-4 h-4 text-amber-600" />
            <span>
              {currentLang === 'vi'
                ? 'Hương Vị & Câu Chuyện Món Ăn'
                : currentLang === 'ko'
                ? '요리 소개 & 문화 이야기'
                : 'Flavors & Cultural Story'}
            </span>
          </button>
        </div>

        {/* Modal Body - Maximum space for eatery listings and information */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          {/* TAB: QUÁN ĂN NGON TRÊN TOÀN QUỐC (PRIMARY) */}
          {activeTab === 'dining' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Region Selector Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50/60 p-3 rounded-2xl border border-amber-200/60">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-xs font-bold text-amber-950">
                    {currentLang === 'vi' ? 'Lọc theo khu vực:' : 'Filter by region:'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedRegionFilter('all')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedRegionFilter === 'all'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white hover:bg-amber-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {currentLang === 'vi' ? 'Toàn quốc' : 'All'} ({guide.diningSpots.length})
                  </button>
                  {northCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedRegionFilter('North')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedRegionFilter === 'North'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white hover:bg-amber-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {currentLang === 'vi' ? 'Miền Bắc' : 'North'} ({northCount})
                    </button>
                  )}
                  {centralCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedRegionFilter('Central')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedRegionFilter === 'Central'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white hover:bg-amber-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {currentLang === 'vi' ? 'Miền Trung' : 'Central'} ({centralCount})
                    </button>
                  )}
                  {southCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedRegionFilter('South')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedRegionFilter === 'South'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white hover:bg-amber-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {currentLang === 'vi' ? 'Miền Nam' : 'South'} ({southCount})
                    </button>
                  )}
                </div>
              </div>

              {/* Eateries List */}
              <div className="space-y-3.5">
                {filteredDiningSpots.map((spot, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      {/* Name, City Badge, Rating */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h4 className="text-base font-black text-slate-900 tracking-tight">
                          {spot.name}
                        </h4>

                        {spot.city && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 text-[10px] font-black border border-amber-300">
                            <MapPin className="w-2.5 h-2.5 text-amber-700" />
                            <span>{spot.city}</span>
                          </span>
                        )}

                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{spot.rating} / 5.0</span>
                        </div>
                      </div>

                      {/* Signature Dish */}
                      <div className="text-xs font-bold text-amber-700 mb-1.5 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Món đặc sắc: {spot.dish}</span>
                      </div>

                      {/* Address */}
                      <p className="text-xs text-slate-600 mb-1.5 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span><strong>Địa chỉ:</strong> {spot.address}</span>
                      </p>

                      {/* Foodie Tip */}
                      <div className="text-[11px] text-amber-950 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 mt-2">
                        💡 <strong>Mẹo ăn ngon:</strong> {spot.highlightTip}
                      </div>
                    </div>

                    {/* Price and Hours Info */}
                    <div className="md:text-right shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 md:pl-4">
                      <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
                        Khoảng giá tham khảo
                      </span>
                      <span className="text-sm font-black text-emerald-700 block mt-0.5">
                        {spot.priceRange}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 flex md:justify-end items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{spot.openingHours}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: THÔNG TIN & HƯƠNG VỊ MÓN ĂN */}
          {activeTab === 'info' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Overview & Average Price */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{currentLang === 'vi' ? 'Giới Thiệu Món Ăn' : 'Overview'}</span>
                  </h4>
                  <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-950 font-black text-xs shadow-2xs">
                    {currentLang === 'vi' ? 'Giá trung bình: ' : 'Avg price: '}{cuisine.averagePriceVND}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {displayDesc}
                </p>
              </div>

              {/* Cultural Heritage Story */}
              <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#e7ded4]">
                <h4 className="text-xs font-bold text-[#78350f] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>📜</span>
                  <span>{currentLang === 'vi' ? 'Nguồn Gốc & Câu Chuyện Văn Hóa Ẩm Thực' : 'Culinary Heritage'}</span>
                </h4>
                <p className="text-xs text-[#5c3826] leading-relaxed">
                  {displayStory}
                </p>
              </div>

              {/* Taste Profile */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
                <span className="font-bold text-amber-900 block mb-1 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-700" />
                  <span>{currentLang === 'vi' ? 'Đặc Trưng Hương Vị & Cách Thưởng Thức Chuẩn Vị:' : 'Taste Profile & Authentic Experience:'}</span>
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {displayTaste}
                </p>
              </div>

              {/* AI Speech Voice Guide */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-950 block">
                      {currentLang === 'vi' ? 'Thuyết Minh Âm Thanh AI Bản Địa' : 'AI Speech Audio Guide'}
                    </span>
                    <p className="text-[11px] text-slate-600">
                      {currentLang === 'vi'
                        ? 'Lắng nghe giọng đọc giới thiệu chi tiết về hương vị và nguồn gốc món ăn.'
                        : 'Listen to native audio narration about this dish.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlayVoice}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-slate-950 animate-pulse font-black'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>
                    {isPlayingAudio
                      ? (currentLang === 'vi' ? 'Đang phát...' : 'Playing...')
                      : (currentLang === 'vi' ? '🔊 Nghe Thuyết Minh' : '🔊 Listen Audio')}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Simple, Clean - No Flights or Hotel buttons as requested */}
        <div className="p-3.5 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePlayVoice}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                isPlayingAudio
                  ? 'bg-amber-500 text-slate-950 border-amber-600 animate-pulse'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{isPlayingAudio ? 'Dừng phát' : 'Thuyết minh món'}</span>
            </button>

            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              🌟 Tuyển chọn {guide.diningSpots.length} địa chỉ ẩm thực uy tín
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              stopVoiceGuide();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer text-xs"
          >
            {currentLang === 'vi' ? 'Đóng (ESC)' : 'Close (ESC)'}
          </button>
        </div>
      </div>
    </div>
  );
};
