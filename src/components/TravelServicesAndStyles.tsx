import React, { useState } from 'react';
import {
  Plane,
  Train,
  Bus,
  Bike,
  Home,
  Building2,
  Users,
  Compass,
  CheckCircle2,
  AlertCircle,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Ticket,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import { TRAVEL_SERVICES, TRAVEL_STYLES } from '../data/travelData';
import { TravelService, TravelStyleGuide, Language } from '../types';
import { useAuth } from '../context/AuthContext';
import { TRAVELOKA_PROMOS } from '../data/travelokaData';
import { KO_SERVICES, KO_STYLES } from '../data/koreanTranslations';

interface TravelServicesAndStylesProps {
  currentLang: Language;
}

export const TravelServicesAndStyles: React.FC<TravelServicesAndStylesProps> = ({ currentLang }) => {
  const { openTravelokaModal, openBookingModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'traveloka' | 'transport' | 'accommodation' | 'styles'>('traveloka');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-6 h-6 text-sky-600" />;
      case 'Train':
        return <Train className="w-6 h-6 text-sky-600" />;
      case 'Bus':
        return <Bus className="w-6 h-6 text-sky-600" />;
      case 'Bike':
        return <Bike className="w-6 h-6 text-sky-600" />;
      case 'Home':
        return <Home className="w-6 h-6 text-emerald-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-emerald-600" />;
      default:
        return <Compass className="w-6 h-6 text-sky-600" />;
    }
  };

  const transportServices = TRAVEL_SERVICES.filter((s) => s.category === 'transport');
  const accommodationServices = TRAVEL_SERVICES.filter((s) => s.category === 'accommodation');

  return (
    <section id="services" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>
              {currentLang === 'vi'
                ? 'Cẩm Nang Dịch Vụ & Loại Hình Du Lịch'
                : currentLang === 'ko'
                ? '여행 서비스 & 스타일 가이드'
                : 'Services, Stays & Travel Styles'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'vi'
              ? 'Phương Tiện Di Chuyển, Chỗ Ở & Phương Thức Tổ Chức'
              : currentLang === 'ko'
              ? '교통편, 숙소 및 맞춤 여행 스타일'
              : 'Transportation, Accommodation & Tour Modes'}
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            {currentLang === 'vi'
              ? 'Thông tin minh bạch về giá vé, ưu nhược điểm và kinh nghiệm thực tế giúp du khách trong nước và quốc tế chủ động chuyến đi.'
              : currentLang === 'ko'
              ? '교통편 요금, 장단점, 현지 꿀팁과 숙소 정보를 투명하게 확인하고 안전한 여행을 준비하세요.'
              : 'Transparent guidelines on fares, pros and cons, and essential local tips for seamless traveling across Vietnam.'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-sky-50/80 p-1.5 rounded-2xl border border-sky-100 inline-flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('traveloka')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'traveloka'
                  ? 'bg-gradient-to-r from-[#0194f3] to-[#007ce8] text-white shadow-md'
                  : 'text-[#0194f3] hover:text-[#0064d2] hover:bg-sky-100/60 font-black'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>
                {currentLang === 'vi'
                  ? 'Liên Kết Traveloka (Vé & Khách Sạn)'
                  : currentLang === 'ko'
                  ? 'Traveloka 연동 (항공권 & 호텔)'
                  : 'Traveloka Integration'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('transport')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'transport'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>
                {currentLang === 'vi'
                  ? 'Phương Tiện Di Chuyển'
                  : currentLang === 'ko'
                  ? '교통수단 안내'
                  : 'Transportation'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('accommodation')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'accommodation'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>
                {currentLang === 'vi'
                  ? 'Chỗ Ở & Nghỉ Dưỡng'
                  : currentLang === 'ko'
                  ? '숙소 & 리조트'
                  : 'Accommodation & Stays'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('styles')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'styles'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>
                {currentLang === 'vi'
                  ? 'Các Loại Hình & Phương Thức'
                  : currentLang === 'ko'
                  ? '여행 스타일 & 투어'
                  : 'Travel Styles & Tours'}
              </span>
            </button>
          </div>
        </div>

        {/* Content: Traveloka Partner Portal */}
        {activeTab === 'traveloka' && (
          <div className="space-y-6">
            {/* Traveloka Hero Banner */}
            <div className="bg-gradient-to-r from-[#0194f3] via-[#0082d6] to-[#0064d2] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
                <Plane className="w-72 h-72 text-white" />
              </div>

              <div className="relative z-10 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-white text-[#0194f3] text-xs font-black uppercase tracking-wider shadow-xs">
                    TRAVELOKA PARTNER
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                    {currentLang === 'vi'
                      ? 'ĐẶT VÉ & PHÒNG DỄ DÀNG'
                      : currentLang === 'ko'
                      ? '초간편 항공 & 숙소 예약'
                      : 'FAST BOOKING'}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentLang === 'vi'
                    ? 'Đặt Vé Máy Bay & Khách Sạn Trực Tiếp Qua Traveloka'
                    : currentLang === 'ko'
                    ? 'Traveloka 연동 국내선 항공권 & 호텔 실시간 예약'
                    : 'Book Domestic Flights & Hotels via Traveloka'}
                </h3>

                <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
                  {currentLang === 'vi'
                    ? 'Ứng dụng đã liên kết trực tiếp cùng hệ sinh thái Traveloka, cho phép bạn tra cứu giá vé máy bay nội địa theo thời gian thực (Vietnam Airlines, Vietjet, Bamboo Airways), đặt hơn 20.000 khách sạn & homestay và hưởng mã giảm giá độc quyền.'
                    : currentLang === 'ko'
                    ? 'Traveloka 공식 시스템과 직접 연동되어 베트남항공, 비엣젯, 밤부항공 실시간 최저가 항공권 조회, 20,000개 이상의 엄선된 호텔 및 홈스테이 예약, 전용 할인 쿠폰 혜택을 원스톱으로 제공합니다.'
                    : 'Directly linked with Traveloka to provide real-time domestic airfares, 20,000+ verified hotels and exclusive voucher discounts for smooth travel across Vietnam.'}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => openTravelokaModal('flight')}
                    className="px-4 py-2.5 rounded-2xl bg-white text-[#0194f3] hover:bg-sky-50 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <Plane className="w-4 h-4" />
                    <span>{currentLang === 'vi' ? 'Vé Máy Bay' : currentLang === 'ko' ? '국내선 항공권' : 'Flights'}</span>
                  </button>

                  <button
                    onClick={() => openTravelokaModal('hotel')}
                    className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <Home className="w-4 h-4" />
                    <span>{currentLang === 'vi' ? 'Khách Sạn & Resort' : currentLang === 'ko' ? '호텔 & 리조트' : 'Hotels & Resorts'}</span>
                  </button>

                  <button
                    onClick={() => openTravelokaModal('combo')}
                    className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{currentLang === 'vi' ? 'Combo Tiết Kiệm -30%' : currentLang === 'ko' ? '30% 절약 콤보 패키지' : 'Combo Bundles'}</span>
                  </button>

                  <button
                    onClick={() => openTravelokaModal('xperience')}
                    className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{currentLang === 'vi' ? 'Vé Vui Chơi Xperience' : currentLang === 'ko' ? '액티비티 & 입장권' : 'Attraction Tickets'}</span>
                  </button>

                  <button
                    onClick={() => openTravelokaModal('promo')}
                    className="px-3.5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border border-white/30"
                  >
                    <Ticket className="w-4 h-4 text-amber-300" />
                    <span>{currentLang === 'vi' ? 'Mã Giảm Giá' : currentLang === 'ko' ? '전용 할인 쿠폰' : 'Vouchers'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Feature Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Feature 1 */}
              <div
                onClick={() => openTravelokaModal('flight')}
                className="p-5 rounded-3xl bg-white border border-sky-100 hover:border-[#0194f3] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#0194f3] group-hover:bg-[#0194f3] group-hover:text-white transition-colors flex items-center justify-center mb-3">
                    <Plane className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-[#0194f3] transition-colors">
                    {currentLang === 'vi' ? 'Vé Máy Bay Giá Tốt' : currentLang === 'ko' ? '최저가 항공권 실시간 검색' : 'Best Flight Fares'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {currentLang === 'vi'
                      ? 'So sánh giá vé giữa Vietnam Airlines, Vietjet Air, Bamboo Airways & Vietravel Airlines trên cùng 1 màn hình.'
                      : currentLang === 'ko'
                      ? '베트남항공, 비엣젯, 밤부항공, 비엣트래블 항공 등 주요 항공사의 실시간 운임을 한눈에 비교하세요.'
                      : 'Compare real-time airfares across major carriers on a single screen.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0194f3]">
                  <span>{currentLang === 'vi' ? 'Đặt vé ngay' : currentLang === 'ko' ? '항공권 예약하기' : 'Book flight'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Feature 2 */}
              <div
                onClick={() => openTravelokaModal('hotel')}
                className="p-5 rounded-3xl bg-white border border-emerald-100 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center mb-3">
                    <Home className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {currentLang === 'vi' ? '20.000+ Khách Sạn & Resort' : currentLang === 'ko' ? '20,000+ 호텔 & 감성 숙소' : '20,000+ Stays & Resorts'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {currentLang === 'vi'
                      ? 'Từ homestay mộc mạc tại Sa Pa, Hà Giang đến resort 5 sao biển Đà Nẵng, Phú Quốc với mức giá ưu đãi.'
                      : currentLang === 'ko'
                      ? '사파와 하장의 전통 홈스테이부터 다낭, 푸꾸옥의 5성급 럭셔리 비치 리조트까지 특가로 예약하세요.'
                      : 'From rustic homestays in Northwest to 5-star ocean resorts in Phu Quoc.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{currentLang === 'vi' ? 'Tìm chỗ ở' : currentLang === 'ko' ? '숙소 찾아보기' : 'Find stay'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Feature 3 */}
              <div
                onClick={() => openTravelokaModal('combo')}
                className="p-5 rounded-3xl bg-white border border-amber-100 hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                    {currentLang === 'vi' ? 'Combo Tiết Kiệm Tới 30%' : currentLang === 'ko' ? '항공+숙소 최대 30% 절약 콤보' : 'Combo Save up to 30%'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {currentLang === 'vi'
                      ? 'Đặt trọn gói vé máy bay + khách sạn cùng lúc giúp tiết kiệm hàng trăm nghìn đến tiền triệu cho mỗi chuyến đi.'
                      : currentLang === 'ko'
                      ? '항공권과 호텔을 묶어 패키지로 예약하면 여행 경비를 최대 30%까지 대폭 절약할 수 있습니다.'
                      : 'Bundle flights and hotels together to save significantly on every vacation.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>{currentLang === 'vi' ? 'Xem các gói combo' : currentLang === 'ko' ? '콤보 패키지 보기' : 'View packages'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Feature 4 */}
              <div
                onClick={() => openTravelokaModal('xperience')}
                className="p-5 rounded-3xl bg-white border border-purple-100 hover:border-purple-500 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors flex items-center justify-center mb-3">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                    {currentLang === 'vi' ? 'Vé Vui Chơi & Hoạt Động' : currentLang === 'ko' ? '놀이공원 & 투어 액티비티 티켓' : 'Attraction Tickets'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {currentLang === 'vi'
                      ? 'Sun World Bà Nà Hills, VinWonders, cáp treo Fansipan, du thuyền Hạ Long. Quét mã QR vào cổng không cần xếp hàng.'
                      : currentLang === 'ko'
                      ? '바나힐 썬월드, 빈원더스, 판시판 케이블카, 하롱베이 크루즈. 현장에서 줄 설 필요 없이 모바일 QR로 바로 입장하세요.'
                      : 'Sun World Ba Na Hills, VinWonders, Fansipan, Ha Long cruise with instant mobile QR entry.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                  <span>{currentLang === 'vi' ? 'Đặt vé vui chơi' : currentLang === 'ko' ? '입장권 예약하기' : 'Book tickets'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content: Transport Services */}
        {activeTab === 'transport' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transportServices.map((service) => {
              const koService = KO_SERVICES[service.id];
              const title = currentLang === 'vi' ? service.vietnameseName : currentLang === 'ko' ? koService?.nameKo || service.name : service.name;
              const price = currentLang === 'ko' ? koService?.priceRangeKo || service.priceRange : service.priceRange;
              const desc = currentLang === 'ko' ? koService?.descKo || service.description : service.description;
              const advantages = currentLang === 'ko' ? koService?.advantagesKo || service.advantages : service.advantages;
              const tips = currentLang === 'ko' ? koService?.tipsKo || service.tipsForTourists : service.tipsForTourists;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {title}
                        </h4>
                        <p className="text-xs font-bold text-sky-700">{price}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {desc}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        {currentLang === 'vi'
                          ? 'Ưu điểm nổi bật:'
                          : currentLang === 'ko'
                          ? '주요 장점:'
                          : 'Key Advantages:'}
                      </span>
                      {advantages.map((adv, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{adv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100/80 text-[11px] text-amber-900">
                    <div className="flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-0.5">
                          {currentLang === 'vi'
                            ? 'Lời khuyên cho du khách:'
                            : currentLang === 'ko'
                            ? '여행자 팁:'
                            : 'Tourist tip:'}
                        </strong>
                        <span>{tips}</span>
                      </div>
                    </div>
                  </div>

                  {service.id === 'airline' && (
                    <button
                      type="button"
                      onClick={() => openTravelokaModal('flight')}
                      className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0194f3] to-[#007ce8] hover:from-[#0084dc] hover:to-[#006cc7] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <Plane className="w-4 h-4" />
                      <span>
                        {currentLang === 'vi'
                          ? 'Đặt Vé Máy Bay Qua Traveloka'
                          : currentLang === 'ko'
                          ? 'Traveloka로 항공권 예약'
                          : 'Book Flights via Traveloka'}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Content: Accommodation */}
        {activeTab === 'accommodation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accommodationServices.map((service) => {
              const koService = KO_SERVICES[service.id];
              const title = currentLang === 'vi' ? service.vietnameseName : currentLang === 'ko' ? koService?.nameKo || service.name : service.name;
              const price = currentLang === 'ko' ? koService?.priceRangeKo || service.priceRange : service.priceRange;
              const desc = currentLang === 'ko' ? koService?.descKo || service.description : service.description;
              const advantages = currentLang === 'ko' ? koService?.advantagesKo || service.advantages : service.advantages;
              const tips = currentLang === 'ko' ? koService?.tipsKo || service.tipsForTourists : service.tipsForTourists;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {title}
                        </h4>
                        <p className="text-xs font-bold text-emerald-700">{price}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {desc}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        {currentLang === 'vi'
                          ? 'Trải nghiệm khác biệt:'
                          : currentLang === 'ko'
                          ? '차별화된 경험:'
                          : 'Unique Benefits:'}
                      </span>
                      {advantages.map((adv, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{adv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-sky-900">
                      <div className="flex items-start gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block mb-0.5">
                            {currentLang === 'vi'
                              ? 'Mẹo đặt phòng an toàn:'
                              : currentLang === 'ko'
                              ? '안전 예약 팁:'
                              : 'Safe booking tip:'}
                          </strong>
                          <span>{tips}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openTravelokaModal('hotel')}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <Home className="w-4 h-4" />
                      <span>
                        {currentLang === 'vi'
                          ? 'Tìm & Đặt Chỗ Ở Qua Traveloka'
                          : currentLang === 'ko'
                          ? 'Traveloka로 숙소 검색 & 예약'
                          : 'Search & Book Stays on Traveloka'}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content: Travel Styles & Organization */}
        {activeTab === 'styles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRAVEL_STYLES.map((style) => {
              const koStyle = KO_STYLES[style.id];
              const title = currentLang === 'ko' ? koStyle?.titleKo || style.title : style.title;
              const suitableFor = currentLang === 'ko' ? koStyle?.suitableForKo || style.suitableFor : style.suitableFor;
              const desc = currentLang === 'ko' ? koStyle?.descKo || style.description : style.description;
              const pros = currentLang === 'ko' ? koStyle?.prosKo || style.pros : style.pros;
              const cons = currentLang === 'ko' ? koStyle?.consKo || style.cons : style.cons;
              const advice = currentLang === 'ko' ? koStyle?.adviceKo || style.recommendations : style.recommendations;

              return (
                <div
                  key={style.id}
                  className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-lg bg-sky-50 text-sky-700 text-xs font-bold mb-2">
                      {currentLang === 'vi' ? 'Phù hợp: ' : currentLang === 'ko' ? '추천 대상: ' : 'Best for: '} {suitableFor}
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-2">
                      {title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <span className="font-bold text-emerald-800 block mb-1">
                          ✓ {currentLang === 'vi' ? 'Ưu điểm:' : currentLang === 'ko' ? '장점:' : 'Pros:'}
                        </span>
                        <ul className="space-y-1 text-slate-600">
                          {pros.map((p, i) => (
                            <li key={i} className="leading-snug">• {p}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-bold text-slate-700 block mb-1">
                          ! {currentLang === 'vi' ? 'Cân nhắc:' : currentLang === 'ko' ? '고려사항:' : 'Considerations:'}
                        </span>
                        <ul className="space-y-1 text-slate-600">
                          {cons.map((c, i) => (
                            <li key={i} className="leading-snug">• {c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-xs text-sky-800 font-medium">
                    <strong>
                      {currentLang === 'vi'
                        ? 'Gợi ý từ VIETNAM’S TRAVEL: '
                        : currentLang === 'ko'
                        ? 'VIETNAM’S TRAVEL 추천: '
                        : 'Our Advice: '}
                    </strong>
                    {advice}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
