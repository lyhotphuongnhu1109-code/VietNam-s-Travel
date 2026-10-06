import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Tag,
  Volume2,
  Calendar,
  DollarSign,
  Plane,
  Home,
  Utensils,
  Sparkles,
  Clock,
  Compass,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Star,
  Info,
  ChevronLeft,
} from 'lucide-react';
import { Destination, Language } from '../types';
import { DESTINATION_DETAILS, DestinationFullGuide } from '../data/destinationDetailData';
import { playVoiceGuide, stopVoiceGuide } from '../utils/speech';
import { useAuth } from '../context/AuthContext';
import { KO_DESTINATIONS } from '../data/koreanTranslations';

interface DestinationDetailModalProps {
  destination: Destination | null;
  currentLang: Language;
  onClose: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  currentLang,
  onClose,
}) => {
  const { openTravelokaModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'info' | 'flights' | 'hotels' | 'dining'>('info');
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

  // Reset tab & image index when opening a new destination
  useEffect(() => {
    setActiveTab('info');
    setSelectedImageIdx(0);
    setIsPlayingAudio(false);
  }, [destination]);

  if (!destination) return null;

  const destKo = KO_DESTINATIONS[destination.id] || KO_DESTINATIONS[destination.id.replace(/-.*/, '')];
  const displayName =
    currentLang === 'vi'
      ? destination.vietnameseName
      : currentLang === 'ko'
      ? destKo?.nameKo || destination.name
      : destination.name;

  const displaySub =
    currentLang === 'vi'
      ? destination.name
      : currentLang === 'ko'
      ? destination.vietnameseName
      : destination.vietnameseName;

  const details: DestinationFullGuide =
    DESTINATION_DETAILS[destination.id] ||
    DESTINATION_DETAILS['da-nang-city'];

  const galleryImages = details.gallery && details.gallery.length > 0
    ? details.gallery
    : [{ url: destination.imageUrl, captionVi: destination.vietnameseName, captionEn: destination.name, captionKo: displayName }];

  const currentImage = galleryImages[selectedImageIdx] || galleryImages[0];
  const currentCaption =
    currentLang === 'vi'
      ? currentImage.captionVi
      : currentLang === 'ko'
      ? currentImage.captionKo
      : currentImage.captionEn;

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      stopVoiceGuide();
      setIsPlayingAudio(false);
    } else {
      const voiceText =
        currentLang === 'vi'
          ? destination.voiceGuideVi
          : currentLang === 'ko'
          ? destKo?.voiceKo || destination.voiceGuideKo || destination.voiceGuideEn
          : destination.voiceGuideEn;

      playVoiceGuide(
        voiceText,
        currentLang,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const handleOpenFlightBooking = () => {
    const originCode = details.flights.originOptions[0]?.code || 'SGN';
    openTravelokaModal('flight', {
      originCode,
      destCode: details.flights.airportCode,
    });
  };

  const handleOpenHotelBooking = () => {
    openTravelokaModal('hotel', {
      cityId: details.hotels.travelokaCityId || destination.province.toLowerCase(),
    });
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
        className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-4xl w-full my-auto overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient & branding */}
        <div className="p-3.5 sm:p-4.5 bg-gradient-to-r from-sky-700 via-sky-600 to-teal-700 text-white flex items-center justify-between shrink-0 relative">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 shadow-xs shrink-0">
              <Compass className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-2xl font-black tracking-tight leading-tight">
                  {displayName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  {destination.province}
                </span>
              </div>
              <p className="text-xs text-sky-100 mt-0.5 font-medium">
                {displaySub} • {destination.travelType}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopVoiceGuide();
              onClose();
            }}
            className="p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer border border-white/20 shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Gallery Showcase - Compact image banner so information section has maximum space */}
        <div className="relative bg-slate-950 shrink-0 overflow-hidden">
          {/* Main Image - Compact height to give maximum space to information */}
          <div className="relative h-16 sm:h-20 w-full overflow-hidden bg-slate-900">
            <img
              src={currentImage.url}
              alt={currentCaption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/25" />

            {/* Bottom Caption & Thumbnail Indicators Overlay */}
            <div className="absolute bottom-1 left-3 right-3 flex items-center justify-between gap-2 text-white text-xs">
              <span className="font-semibold line-clamp-1 drop-shadow-md text-[11px] sm:text-xs">
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
                <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold ml-1">
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImageIdx((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation Controls with integrated quick price/count badges */}
        <div className="flex items-center bg-slate-50 border-b border-slate-200 px-3 sm:px-6 overflow-x-auto custom-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'info'
                ? 'border-sky-600 text-sky-700 bg-sky-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="w-4 h-4 text-sky-600" />
            <span>
              {currentLang === 'vi' ? 'Thông Tin & Di Sản' : currentLang === 'ko' ? '기본 정보 & 볼거리' : 'Overview & Info'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('flights')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'flights'
                ? 'border-[#0194f3] text-[#007ce8] bg-sky-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plane className="w-4 h-4 text-[#0194f3]" />
            <span>
              {currentLang === 'vi' ? 'Giá Vé Máy Bay' : currentLang === 'ko' ? '항공권 가격' : 'Flight Tickets'}
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-sky-100 text-[#0194f3] text-[10px] font-black">
              {details.flights.airportCode}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hotels')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'hotels'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span>
              {currentLang === 'vi' ? 'Giá Khách Sạn & Resort' : currentLang === 'ko' ? '호텔 & 숙소 가격' : 'Hotels & Rates'}
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
              {details.hotels.tiers[0]?.priceRange ? details.hotels.tiers[0].priceRange.split('/')[0].trim() : 'Từ 350k'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dining')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'dining'
                ? 'border-amber-600 text-amber-800 bg-amber-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-4 h-4 text-amber-600" />
            <span>
              {currentLang === 'vi' ? 'Địa Điểm Ăn Uống' : currentLang === 'ko' ? '추천 맛집' : 'Dining Spots'}
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
              {details.diningSpots.length} {currentLang === 'vi' ? 'quán' : 'spots'}
            </span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* TAB 1: OVERVIEW & HIGHLIGHTS */}
          {activeTab === 'info' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Description */}
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{currentLang === 'vi' ? 'Giới Thiệu Danh Thắng' : currentLang === 'ko' ? '명소 상세 소개' : 'Destination Overview'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {currentLang === 'ko' && destKo?.descKo ? destKo.descKo : destination.description}
                </p>
              </div>

              {/* Cultural Significance & History */}
              <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#e7ded4]">
                <h4 className="text-xs font-bold text-[#78350f] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>{currentLang === 'vi' ? 'Ý Nghĩa Văn Hóa & Giá Trị Lịch Sử Ngàn Năm' : currentLang === 'ko' ? '문화적 가치 및 역사적 의의' : 'Cultural Story & Heritage Significance'}</span>
                </h4>
                <p className="text-xs text-[#5c3826] leading-relaxed">
                  {currentLang === 'ko' && destKo?.culturalSignificanceKo ? destKo.culturalSignificanceKo : destination.culturalSignificance}
                </p>
              </div>

              {/* Quick Info Grid: Best time, Ticket price, Opening hours */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80">
                  <span className="font-bold text-amber-900 block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    <span>{currentLang === 'vi' ? 'Thời Điểm Đẹp Nhất:' : currentLang === 'ko' ? '최적 방문 시기:' : 'Best Time:'}</span>
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {currentLang === 'ko' && destKo?.bestTimeKo ? destKo.bestTimeKo : destination.bestTime}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
                  <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{currentLang === 'vi' ? 'Vé Tham Quan / Chi Phí:' : currentLang === 'ko' ? '입장료 및 예상 경비:' : 'Ticket Price & Fees:'}</span>
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {details.ticketPriceInfo}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80">
                  <span className="font-bold text-sky-900 block mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-700" />
                    <span>{currentLang === 'vi' ? 'Giờ Mở Cửa / Hoạt Động:' : currentLang === 'ko' ? '운영 시간:' : 'Opening Hours:'}</span>
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {details.openingHoursInfo}
                  </p>
                </div>
              </div>

              {/* Top Highlights List */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>{currentLang === 'vi' ? 'Trải Nghiệm & Điểm Nhấn Không Thể Bỏ Lỡ' : currentLang === 'ko' ? '놓치지 말아야 할 핵심 체험' : 'Top Highlights & Activities'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {details.highlightsList.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-2 text-xs text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-black flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio Guide Interactive Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-sky-900 block">
                      {currentLang === 'vi' ? 'Thuyết Minh Âm Thanh AI Bằng Giọng Đọc Bản Địa' : currentLang === 'ko' ? '원어민 AI 오디오 가이드' : 'AI Speech Audio Guide'}
                    </span>
                    <p className="text-[11px] text-slate-600">
                      {currentLang === 'vi'
                        ? 'Lắng nghe thuyết minh chi tiết về lịch sử và truyền thuyết của danh thắng này.'
                        : currentLang === 'ko'
                        ? '이 명소의 역사와 흥미로운 전설을 음성으로 생생하게 들어보세요.'
                        : 'Listen to narrated historical stories and legends of this site.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlayVoice}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-slate-950 animate-pulse font-black'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>
                    {isPlayingAudio
                      ? (currentLang === 'vi' ? 'Đang phát âm thanh...' : currentLang === 'ko' ? '음성 재생 중...' : 'Playing...')
                      : (currentLang === 'vi' ? '🔊 Nghe Thuyết Minh' : currentLang === 'ko' ? '🔊 오디오 가이드 듣기' : '🔊 Listen Audio')}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FLIGHT TICKETS */}
          {activeTab === 'flights' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 p-4 sm:p-5 rounded-2xl border border-sky-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0194f3] text-white text-[10px] font-black uppercase tracking-wider">
                      {details.flights.airportCode}
                    </span>
                    <h4 className="text-base font-black text-slate-900">
                      {details.flights.nearestAirport}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ⏱️ <strong>Thời gian di chuyển:</strong> {details.flights.flightDuration}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    ✈️ <strong>Hãng hàng không khai thác:</strong> {details.flights.airlines.join(', ')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenFlightBooking}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0194f3] to-[#007ce8] hover:from-[#0082d6] hover:to-[#0064d2] text-white text-xs font-black transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Plane className="w-4 h-4 text-white" />
                  <span>
                    {currentLang === 'vi' ? 'Tìm Vé Máy Bay Traveloka' : currentLang === 'ko' ? 'Traveloka 항공권 검색' : 'Search Flights on Traveloka'}
                  </span>
                </button>
              </div>

              {/* Price Range Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-bold block mb-1 uppercase tracking-wider">
                    {currentLang === 'vi' ? 'Vé Khứ Hồi Tham Khảo' : currentLang === 'ko' ? '왕복 항공권 예상 요금' : 'Roundtrip Fare Estimate'}
                  </span>
                  <div className="text-lg font-black text-[#0194f3] mb-1">
                    {details.flights.roundtripPriceEstimate}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Bao gồm thuế phí, 7kg hành lý xách tay và ưu đãi đặt sớm.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-bold block mb-1 uppercase tracking-wider">
                    {currentLang === 'vi' ? 'Vé Một Chiều Tham Khảo' : currentLang === 'ko' ? '편도 항공권 예상 요금' : 'One-way Fare Estimate'}
                  </span>
                  <div className="text-lg font-black text-emerald-600 mb-1">
                    {details.flights.onewayPriceEstimate}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Mức giá ưu đãi các khung giờ sáng sớm hoặc tối muộn.
                  </p>
                </div>
              </div>

              {/* Insider Booking Advice */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
                <h5 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                  <span>💡</span>
                  <span>{currentLang === 'vi' ? 'Bí Quyết Săn Vé Máy Bay Giá Tốt Nhất:' : currentLang === 'ko' ? '특가 항공권 예약 꿀팁:' : 'Smart Flight Booking Tips:'}</span>
                </h5>
                <p className="text-slate-700 leading-relaxed">
                  {details.flights.bookingAdvice}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: HOTELS & RESORTS */}
          {activeTab === 'hotels' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    {currentLang === 'vi' ? 'Phân Khúc Giá Khách Sạn & Khu Nghỉ Dưỡng' : currentLang === 'ko' ? '숙소 등급별 가격대 안내' : 'Hotel Price Tiers & Stays'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Dự toán chi phí lưu trú thực tế tại {destination.province}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenHotelBooking}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>
                    {currentLang === 'vi' ? 'Xem Phòng Traveloka' : currentLang === 'ko' ? 'Traveloka 호텔 예약' : 'Book on Traveloka'}
                  </span>
                </button>
              </div>

              {/* Price Tiers List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {details.hotels.tiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-left flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        Phân Khúc {idx + 1}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 mt-0.5 mb-1.5">
                        {tier.category}
                      </h5>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        {tier.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-xs font-black text-emerald-700 block">
                        {tier.priceRange}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Recommended Stays */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{currentLang === 'vi' ? 'Khách Sạn & Resort Tiêu Biểu Được Yêu Thích' : currentLang === 'ko' ? '추천 베스트 호텔 & 리조트' : 'Recommended Top Stays'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {details.hotels.recommendedStays.map((stay, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 mb-1">
                          {Array.from({ length: stay.stars }).map((_, s) => (
                            <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                          {stay.name}
                        </h5>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mb-2">
                          📍 {stay.address}
                        </p>
                        <div className="space-y-1 mb-3">
                          {stay.features.map((f, fi) => (
                            <span
                              key={fi}
                              className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[9px] font-semibold mr-1 mb-1"
                            >
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-medium">Giá từ:</span>
                        <span className="text-xs font-black text-emerald-700">
                          {stay.pricePerNight} / đêm
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DINING & LOCAL SPECIALTIES */}
          {activeTab === 'dining' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    {currentLang === 'vi' ? 'Địa Điểm Ăn Uống Nổi Tiếng & Món Ngon Đặc Sản' : currentLang === 'ko' ? '현지 대표 맛집 & 시그니처 요리' : 'Famous Dining Spots & Local Food'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Tinh hoa ẩm thực bản địa không thể bỏ lỡ tại {displayName}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  {details.diningSpots.length} Quán nổi tiếng
                </span>
              </div>

              {/* Dining Spots List Cards */}
              <div className="space-y-3.5">
                {details.diningSpots.map((spot, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h5 className="text-sm font-black text-slate-900">
                          {spot.name}
                        </h5>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{spot.rating} / 5.0</span>
                        </div>
                      </div>

                      <div className="text-xs font-bold text-amber-700 mb-1.5 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-amber-600" />
                        <span>Món đặc sản: {spot.dish}</span>
                      </div>

                      <p className="text-xs text-slate-600 mb-1">
                        📍 <strong>Địa chỉ:</strong> {spot.address}
                      </p>

                      <p className="text-[11px] text-slate-500 italic bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50 mt-2">
                        💡 <strong>Mẹo sành ăn:</strong> {spot.highlightTip}
                      </p>
                    </div>

                    <div className="md:text-right shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Khoảng giá:</span>
                      <span className="text-sm font-black text-slate-900 block text-emerald-700">
                        {spot.priceRange}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">
                        🕒 {spot.openingHours}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Quick Actions */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
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
              <Volume2 className="w-3.5 h-3.5 text-sky-600" />
              <span>{isPlayingAudio ? 'Dừng phát' : 'Thuyết minh'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenFlightBooking}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Plane className="w-3.5 h-3.5 text-[#0194f3]" />
              <span>Đặt vé bay</span>
            </button>

            <button
              type="button"
              onClick={handleOpenHotelBooking}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đặt phòng</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              stopVoiceGuide();
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer text-xs"
          >
            {currentLang === 'vi' ? 'Đóng (ESC)' : currentLang === 'ko' ? '닫기 (ESC)' : 'Close (ESC)'}
          </button>
        </div>
      </div>
    </div>
  );
};
