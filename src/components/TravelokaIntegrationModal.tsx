import React, { useState, useEffect } from 'react';
import {
  X,
  Plane,
  Home,
  Compass,
  Calendar,
  Users,
  ExternalLink,
  Sparkles,
  Ticket,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  ChevronRight,
  ArrowRightLeft,
  Tag,
  Star,
  Smartphone,
  Gift,
  Search,
  MapPin,
  Clock,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';
import {
  TRAVELOKA_AIRPORTS,
  TRAVELOKA_HOTEL_CITIES,
  TRAVELOKA_POPULAR_COMBOS,
  TRAVELOKA_POPULAR_HOTELS,
  TRAVELOKA_POPULAR_ACTIVITIES,
  TRAVELOKA_PROMOS,
  TRAVELOKA_APP_LINKS,
  TRAVELOKA_PACKAGES_URL,
  buildTravelokaFlightUrl,
  buildTravelokaHotelUrl,
  buildTravelokaComboUrl,
  buildTravelokaActivitiesUrl,
} from '../data/travelokaData';
import { KO_HOTELS, KO_PROMOS } from '../data/koreanTranslations';

interface TravelokaIntegrationModalProps {
  currentLang: Language;
}

export const TravelokaIntegrationModal: React.FC<TravelokaIntegrationModalProps> = ({ currentLang }) => {
  const {
    isTravelokaModalOpen,
    travelokaModalTab,
    travelokaPrefill,
    closeTravelokaModal,
    openBookingModal,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'flight' | 'hotel' | 'combo' | 'xperience' | 'promo' | 'app'>(
    travelokaModalTab || 'flight'
  );

  // Sync tab with context trigger
  useEffect(() => {
    if (travelokaModalTab) {
      setActiveTab(travelokaModalTab);
    }
  }, [travelokaModalTab]);

  // Flight search states
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [originCode, setOriginCode] = useState(travelokaPrefill?.originCode || 'HAN');
  const [destCode, setDestCode] = useState(travelokaPrefill?.destCode || 'DAD');
  const [departureDate, setDepartureDate] = useState(
    travelokaPrefill?.date || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState(
    new Date(Date.now() + 18 * 86400000).toISOString().split('T')[0]
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatClass, setSeatClass] = useState<'ECONOMY' | 'BUSINESS' | 'PREMIUM_ECONOMY'>('ECONOMY');
  const [preferredAirline, setPreferredAirline] = useState<string>('all');

  // Hotel search states
  const [selectedCityId, setSelectedCityId] = useState(travelokaPrefill?.cityId || 'da-nang');
  const [hotelFilterQuery, setHotelFilterQuery] = useState('');
  const [hotelRegionFilter, setHotelRegionFilter] = useState<'all' | 'North' | 'Central' | 'South'>('all');
  const [checkInDate, setCheckInDate] = useState(
    travelokaPrefill?.date || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 17 * 86400000).toISOString().split('T')[0]
  );
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelRooms, setHotelRooms] = useState(1);

  // Combo (Flight + Hotel) search states
  const [comboOrigin, setComboOrigin] = useState(travelokaPrefill?.originCode || 'HAN');
  const [comboDest, setComboDest] = useState(travelokaPrefill?.destCode || 'DAD');
  const [comboDepDate, setComboDepDate] = useState(
    travelokaPrefill?.date || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [comboRetDate, setComboRetDate] = useState(
    new Date(Date.now() + 17 * 86400000).toISOString().split('T')[0]
  );
  const [comboGuests, setComboGuests] = useState(2);
  const [comboRooms, setComboRooms] = useState(1);
  const [comboSeatClass, setComboSeatClass] = useState<'ECONOMY' | 'BUSINESS' | 'PREMIUM_ECONOMY'>('ECONOMY');
  const [comboRegionFilter, setComboRegionFilter] = useState<'all' | 'North' | 'Central' | 'South'>('all');
  const [comboFilterQuery, setComboFilterQuery] = useState('');

  // Xperience (Attraction / Activity) search states
  const [xperienceQuery, setXperienceQuery] = useState('');
  const [xperienceCityFilter, setXperienceCityFilter] = useState<string>(travelokaPrefill?.cityId || 'all');
  const [xperienceCategoryFilter, setXperienceCategoryFilter] = useState<string>('all');
  const [xperienceDate, setXperienceDate] = useState(
    travelokaPrefill?.date || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [xperienceTickets, setXperienceTickets] = useState(2);

  // Copied promo code tracker
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Handle prefill updates when modal opens
  useEffect(() => {
    if (travelokaPrefill) {
      let orig = travelokaPrefill.originCode || 'HAN';
      let dest = travelokaPrefill.destCode || 'DAD';
      if (orig === dest) {
        orig = dest === 'HAN' ? 'SGN' : 'HAN';
      }
      setOriginCode(orig);
      setComboOrigin(orig);
      setDestCode(dest);
      setComboDest(dest);

      if (travelokaPrefill.cityId) {
        setSelectedCityId(travelokaPrefill.cityId);
        setXperienceCityFilter(travelokaPrefill.cityId);
      }
      if (travelokaPrefill.date) {
        setDepartureDate(travelokaPrefill.date);
        setCheckInDate(travelokaPrefill.date);
        setComboDepDate(travelokaPrefill.date);
        setXperienceDate(travelokaPrefill.date);
      }
    }
  }, [travelokaPrefill]);

  if (!isTravelokaModalOpen) return null;

  // Swap flight direction
  const handleSwapAirports = () => {
    const temp = originCode;
    setOriginCode(destCode);
    setDestCode(temp);
  };

  // Swap combo direction
  const handleSwapComboAirports = () => {
    const temp = comboOrigin;
    setComboOrigin(comboDest);
    setComboDest(temp);
  };

  // Set combo destination accurately - guarantees it fills "nơi cần đến" without jumping to another box
  const handleSetComboDest = (newDestCode: string) => {
    setComboDest(newDestCode);
    if (newDestCode === comboOrigin) {
      const fallbackOrigin = newDestCode === 'HAN' ? 'SGN' : 'HAN';
      setComboOrigin(fallbackOrigin);
    }
  };

  // Set combo origin accurately - guarantees no collision with destination
  const handleSetComboOrigin = (newOriginCode: string) => {
    setComboOrigin(newOriginCode);
    if (newOriginCode === comboDest) {
      const fallbackDest = newOriginCode === 'DAD' ? 'CXR' : newOriginCode === 'HAN' ? 'DAD' : 'HAN';
      setComboDest(fallbackDest);
    }
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const flightSearchUrl = buildTravelokaFlightUrl({
    originCode,
    destCode,
    departureDate,
    returnDate: isRoundTrip ? returnDate : undefined,
    seatClass,
    adults,
    children,
    infants,
  });

  const hotelSearchUrl = buildTravelokaHotelUrl({
    cityIdOrName: selectedCityId,
    checkInDate,
    checkOutDate,
    guests: hotelGuests,
    rooms: hotelRooms,
  });

  const comboSearchUrl = buildTravelokaComboUrl({
    originCode: comboOrigin,
    destCode: comboDest,
    departureDate: comboDepDate,
    returnDate: comboRetDate,
    guests: comboGuests,
    rooms: comboRooms,
    seatClass: comboSeatClass,
  });

  const currentOriginAirport = TRAVELOKA_AIRPORTS.find((a) => a.code === originCode) || TRAVELOKA_AIRPORTS[0];
  const currentDestAirport = TRAVELOKA_AIRPORTS.find((a) => a.code === destCode) || TRAVELOKA_AIRPORTS[2];
  const currentComboOriginAirport = TRAVELOKA_AIRPORTS.find((a) => a.code === comboOrigin) || TRAVELOKA_AIRPORTS[0];
  const currentComboDestAirport = TRAVELOKA_AIRPORTS.find((a) => a.code === comboDest) || TRAVELOKA_AIRPORTS[2];

  const comboFlightUrl = buildTravelokaFlightUrl({
    originCode: comboOrigin,
    destCode: comboDest,
    departureDate: comboDepDate,
    returnDate: comboRetDate,
    seatClass: comboSeatClass,
    adults: comboGuests,
  });

  const comboHotelUrl = buildTravelokaHotelUrl({
    cityIdOrName: currentComboDestAirport.cityVi,
    checkInDate: comboDepDate,
    checkOutDate: comboRetDate,
    guests: comboGuests,
    rooms: comboRooms,
  });

  const filteredComboCities = TRAVELOKA_HOTEL_CITIES.filter((c) => {
    const matchRegion = comboRegionFilter === 'all' || c.region === comboRegionFilter;
    const matchQuery =
      !comboFilterQuery ||
      c.nameVi.toLowerCase().includes(comboFilterQuery.toLowerCase()) ||
      c.nameEn.toLowerCase().includes(comboFilterQuery.toLowerCase()) ||
      c.popularSpots.some((s) => s.toLowerCase().includes(comboFilterQuery.toLowerCase()));
    return matchRegion && matchQuery;
  });

  const cityToComboAirport: Record<string, string> = {
    'da-nang': 'DAD',
    'phu-quoc': 'PQC',
    'nha-trang': 'CXR',
    'da-lat': 'DLI',
    'quy-nhon': 'UIH',
    'con-dao': 'VCS',
    'ha-long': 'HPH',
    'ha-noi': 'HAN',
    'ho-chi-minh': 'SGN',
    'sai-gon': 'SGN',
    'can-tho': 'VCA',
    'hue': 'HUI',
    'hoi-an': 'DAD',
    'sa-pa': 'HAN',
    'ninh-binh': 'HAN',
    'ha-giang': 'HAN',
    'phu-yen': 'TBB',
    'vinh': 'VII',
    'buon-ma-thuot': 'BMV',
    'pleiku': 'PXU',
    'dong-hoi': 'VDH',
    'dien-bien': 'DIN',
    'thanh-hoa': 'THD',
    'moc-chau': 'HAN',
  };
  const currentCityObj =
    TRAVELOKA_HOTEL_CITIES.find((c) => c.id === selectedCityId) ||
    TRAVELOKA_HOTEL_CITIES.find(
      (c) =>
        c.nameVi.toLowerCase().includes(selectedCityId.toLowerCase()) ||
        c.nameEn.toLowerCase().includes(selectedCityId.toLowerCase())
    ) ||
    TRAVELOKA_HOTEL_CITIES[0];

  const filteredHotelCities = TRAVELOKA_HOTEL_CITIES.filter((c) => {
    const matchRegion = hotelRegionFilter === 'all' || c.region === hotelRegionFilter;
    const matchQuery =
      !hotelFilterQuery ||
      c.nameVi.toLowerCase().includes(hotelFilterQuery.toLowerCase()) ||
      c.nameEn.toLowerCase().includes(hotelFilterQuery.toLowerCase()) ||
      c.popularSpots.some((s) => s.toLowerCase().includes(hotelFilterQuery.toLowerCase()));
    return matchRegion && matchQuery;
  });

  const xperienceSearchUrl = buildTravelokaActivitiesUrl({
    query: xperienceQuery || (xperienceCityFilter !== 'all' ? xperienceCityFilter : undefined),
  });

  const filteredActivities = TRAVELOKA_POPULAR_ACTIVITIES.filter((act) => {
    const matchCity = xperienceCityFilter === 'all' || act.destCity === xperienceCityFilter;
    const matchCategory =
      xperienceCategoryFilter === 'all' ||
      act.categoryVi.toLowerCase().includes(xperienceCategoryFilter.toLowerCase()) ||
      act.categoryEn.toLowerCase().includes(xperienceCategoryFilter.toLowerCase());
    const matchQuery =
      !xperienceQuery ||
      act.nameVi.toLowerCase().includes(xperienceQuery.toLowerCase()) ||
      act.nameEn.toLowerCase().includes(xperienceQuery.toLowerCase()) ||
      act.destCityVi.toLowerCase().includes(xperienceQuery.toLowerCase());
    return matchCity && matchCategory && matchQuery;
  });


  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeTravelokaModal}
    >
      <div
        className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-4xl w-full my-auto overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Traveloka Signature Deep Sky Blue */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0194f3] via-[#0082d6] to-[#0064d2] text-white relative shrink-0">
          <button
            onClick={closeTravelokaModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer border border-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.8 rounded-full bg-white text-[#0194f3] text-[11px] font-black uppercase tracking-wider shadow-xs">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              <span>Traveloka Partner</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              {currentLang === 'vi' ? 'Liên Kết Chính Thức' : currentLang === 'ko' ? '공식 파트너 연동' : 'Official Integration'}
            </span>
            <span className="text-xs text-sky-100 font-medium">
              {currentLang === 'vi' ? 'Đặt vé máy bay & khách sạn dễ dàng hơn' : currentLang === 'ko' ? '간편한 항공권 & 호텔 실시간 예약' : 'Seamless flight & hotel booking'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>
                  {currentLang === 'vi'
                    ? 'Cổng Đặt Dịch Vụ Du Lịch Traveloka'
                    : currentLang === 'ko'
                    ? 'Traveloka 공식 여행 예약 포털'
                    : 'Traveloka Booking Hub'}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/20 text-white">
                  Vietnam
                </span>
              </h3>
              <p className="text-xs text-sky-100 mt-1 max-w-xl">
                {currentLang === 'vi'
                  ? 'Tra cứu giá vé máy bay nội địa, phòng khách sạn, resort & vé vui chơi với ưu đãi độc quyền dành cho bạn.'
                  : currentLang === 'ko'
                  ? '베트남 국내선 항공권, 엄선된 호텔 및 리조트, 인기 관광지 입장권을 전용 할인 혜택과 함께 실시간 조회하세요.'
                  : 'Search real-time domestic flights, hotel resorts & attraction passes with exclusive promo discounts.'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 flex flex-wrap bg-black/15 p-1 rounded-2xl border border-white/20 backdrop-blur-xs gap-1">
            <button
              onClick={() => setActiveTab('flight')}
              className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'flight'
                  ? 'bg-white text-[#0194f3] shadow-md font-black'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Vé Máy Bay' : currentLang === 'ko' ? '항공권' : 'Flights'}</span>
            </button>
            <button
              onClick={() => setActiveTab('hotel')}
              className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'hotel'
                  ? 'bg-white text-[#0194f3] shadow-md font-black'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Khách Sạn' : currentLang === 'ko' ? '호텔 & 숙소' : 'Hotels'}</span>
            </button>
            <button
              onClick={() => setActiveTab('combo')}
              className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'combo'
                  ? 'bg-white text-[#0194f3] shadow-md font-black'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Combo Tiết Kiệm' : currentLang === 'ko' ? '절약 콤보' : 'Combo'}</span>
            </button>
            <button
              onClick={() => setActiveTab('xperience')}
              className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'xperience'
                  ? 'bg-white text-[#0194f3] shadow-md font-black'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Vé Vui Chơi' : currentLang === 'ko' ? '입장권 & 액티비티' : 'Xperience'}</span>
            </button>
            <button
              onClick={() => setActiveTab('promo')}
              className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'promo'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-amber-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Mã Giảm Giá' : currentLang === 'ko' ? '할인 쿠폰' : 'Vouchers'}</span>
            </button>
            <button
              onClick={() => setActiveTab('app')}
              className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'app'
                  ? 'bg-white text-[#0194f3] shadow-md font-black'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Tải App' : currentLang === 'ko' ? '앱 다운로드' : 'Mobile App'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* TAB 1: VÉ MÁY BAY */}
          {activeTab === 'flight' && (
            <div className="space-y-4">
              {/* Trip type toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={!isRoundTrip}
                      onChange={() => setIsRoundTrip(false)}
                      className="text-[#0194f3] focus:ring-[#0194f3]"
                    />
                    <span>{currentLang === 'vi' ? 'Một chiều' : 'One-way'}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={isRoundTrip}
                      onChange={() => setIsRoundTrip(true)}
                      className="text-[#0194f3] focus:ring-[#0194f3]"
                    />
                    <span>{currentLang === 'vi' ? 'Khứ hồi' : 'Roundtrip'}</span>
                  </label>
                </div>

                <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentLang === 'vi' ? 'Miễn phí đổi lịch Easy Reschedule' : 'Easy Reschedule Included'}</span>
                </div>
              </div>

              {/* Origin & Destination with Swap button */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-2 items-center">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {currentLang === 'vi' ? 'Điểm khởi hành' : 'From'}
                  </label>
                  <select
                    value={originCode}
                    onChange={(e) => setOriginCode(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    {TRAVELOKA_AIRPORTS.map((apt) => (
                      <option key={apt.code} value={apt.code} disabled={apt.code === destCode}>
                        {apt.cityVi} ({apt.code}) — {apt.nameVi}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{currentOriginAirport.nameVi}</p>
                </div>

                <button
                  type="button"
                  onClick={handleSwapAirports}
                  title={currentLang === 'vi' ? 'Đổi chiều bay' : 'Swap direction'}
                  className="mx-auto w-10 h-10 rounded-full bg-sky-100 hover:bg-[#0194f3] text-[#0194f3] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs shrink-0"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {currentLang === 'vi' ? 'Điểm đến' : 'To'}
                  </label>
                  <select
                    value={destCode}
                    onChange={(e) => setDestCode(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    {TRAVELOKA_AIRPORTS.map((apt) => (
                      <option key={apt.code} value={apt.code} disabled={apt.code === originCode}>
                        {apt.cityVi} ({apt.code}) — {apt.nameVi}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{currentDestAirport.nameVi}</p>
                </div>
              </div>

              {/* Dates & Passengers & Seat Class */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#0194f3]" />
                    <span>{currentLang === 'vi' ? 'Ngày đi' : 'Departure Date'}</span>
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden"
                  />
                </div>

                {isRoundTrip ? (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#0194f3]" />
                      <span>{currentLang === 'vi' ? 'Ngày về' : 'Return Date'}</span>
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden"
                    />
                  </div>
                ) : (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#0194f3]" />
                      <span>{currentLang === 'vi' ? 'Hạng ghế' : 'Seat Class'}</span>
                    </label>
                    <select
                      value={seatClass}
                      onChange={(e) => setSeatClass(e.target.value as any)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value="ECONOMY">{currentLang === 'vi' ? 'Phổ thông (Economy)' : 'Economy'}</option>
                      <option value="BUSINESS">{currentLang === 'vi' ? 'Thương gia (Business)' : 'Business'}</option>
                      <option value="PREMIUM_ECONOMY">{currentLang === 'vi' ? 'Phổ thông đặc biệt' : 'Premium Economy'}</option>
                    </select>
                  </div>
                )}

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#0194f3]" />
                    <span>{currentLang === 'vi' ? 'Hành khách' : 'Passengers'}</span>
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    <option value={1}>1 {currentLang === 'vi' ? 'Người lớn' : 'Adult'}</option>
                    <option value={2}>2 {currentLang === 'vi' ? 'Người lớn' : 'Adults'}</option>
                    <option value={3}>3 {currentLang === 'vi' ? 'Người lớn' : 'Adults'}</option>
                    <option value={4}>4 {currentLang === 'vi' ? 'Người lớn' : 'Adults'}</option>
                    <option value={5}>5+ {currentLang === 'vi' ? 'Người lớn (Nhóm)' : 'Adults (Group)'}</option>
                  </select>
                </div>
              </div>

              {/* Supported Airlines Badge */}
              <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-600 font-medium">
                  {currentLang === 'vi' ? 'Hãng bay được so sánh giá trực tuyến:' : 'Airlines price compared:'}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-sky-200 text-sky-800 text-[11px] font-bold shadow-2xs">
                    Vietnam Airlines
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-red-200 text-red-600 text-[11px] font-bold shadow-2xs">
                    Vietjet Air
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-700 text-[11px] font-bold shadow-2xs">
                    Bamboo Airways
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-700 text-[11px] font-bold shadow-2xs">
                    Vietravel Airlines
                  </span>
                </div>
              </div>

              {/* Primary Call to Action: Direct Link to Traveloka */}
              <div className="pt-2">
                <a
                  href={flightSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0194f3] to-[#007ce8] hover:from-[#0084dc] hover:to-[#006cc7] text-white font-black text-sm shadow-lg shadow-sky-200 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Plane className="w-5 h-5 stroke-[2.5]" />
                  <span>
                    {currentLang === 'vi'
                      ? `Tìm Chuyến Bay ${originCode} ➔ ${destCode} Trên Traveloka Ngay`
                      : `Search Flights ${originCode} ➔ ${destCode} on Traveloka`}
                  </span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  {currentLang === 'vi'
                    ? '✓ Tự động điền lộ trình và ngày bay • Đảm bảo giá minh bạch không phí ẩn • Áp mã BAYVIETNAM50K'
                    : '✓ Auto pre-fills your route & dates • Transparent pricing with no hidden fees • Apply code BAYVIETNAM50K'}
                </p>
              </div>

              {/* Popular Routes Quick Picks */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentLang === 'vi' ? 'Các chặng bay nội địa giá tốt phổ biến:' : 'Popular Domestic Flight Routes:'}</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { from: 'HAN', to: 'DAD', label: 'Hà Nội ➔ Đà Nẵng', price: 'từ 690k' },
                    { from: 'SGN', to: 'PQC', label: 'Sài Gòn ➔ Phú Quốc', price: 'từ 580k' },
                    { from: 'HAN', to: 'SGN', label: 'Hà Nội ➔ Sài Gòn', price: 'từ 890k' },
                    { from: 'DAD', to: 'VCA', label: 'Đà Nẵng ➔ Cần Thơ', price: 'từ 650k' },
                  ].map((r, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setOriginCode(r.from);
                        setDestCode(r.to);
                      }}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-left transition-colors cursor-pointer group"
                    >
                      <div className="text-[11px] font-bold text-slate-800 group-hover:text-[#0194f3] truncate">
                        {r.label}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-extrabold">{r.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KHÁCH SẠN */}
          {activeTab === 'hotel' && (
            <div className="space-y-4">
              {/* Search Bar & Region Quick Filter */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={hotelFilterQuery}
                      onChange={(e) => setHotelFilterQuery(e.target.value)}
                      placeholder={
                        currentLang === 'vi'
                          ? 'Tìm khách sạn theo thành phố hoặc địa danh (Đà Nẵng, Sa Pa, Phú Quốc, Ninh Bình...)'
                          : 'Search by city or area (Da Nang, Sa Pa, Phu Quoc, Ninh Binh...)'
                      }
                      className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0194f3] focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />
                    {hotelFilterQuery && (
                      <button
                        onClick={() => setHotelFilterQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Region Filter Buttons */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl shrink-0">
                    {[
                      { id: 'all', labelVi: 'Tất cả', labelEn: 'All' },
                      { id: 'North', labelVi: 'Miền Bắc', labelEn: 'North' },
                      { id: 'Central', labelVi: 'Miền Trung', labelEn: 'Central' },
                      { id: 'South', labelVi: 'Miền Nam', labelEn: 'South' },
                    ].map((rf) => (
                      <button
                        key={rf.id}
                        type="button"
                        onClick={() => setHotelRegionFilter(rf.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          hotelRegionFilter === rf.id
                            ? 'bg-white text-[#0194f3] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {currentLang === 'vi' ? rf.labelVi : rf.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination City Grid / Selector */}
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-44 overflow-y-auto p-1.5 bg-slate-50 rounded-2xl border border-slate-200 custom-scrollbar">
                    {filteredHotelCities.map((c) => {
                      const isSelected = selectedCityId === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedCityId(c.id)}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0194f3] text-white border-[#0194f3] shadow-md font-bold'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                          }`}
                        >
                          <div className="text-xs font-bold truncate">{currentLang === 'vi' ? c.nameVi : c.nameEn}</div>
                          <div className={`text-[10px] truncate ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                            {c.avgPriceVND}
                          </div>
                        </button>
                      );
                    })}

                    {hotelFilterQuery && filteredHotelCities.length === 0 && (
                      <div className="col-span-full py-4 text-center text-xs text-slate-500">
                        {currentLang === 'vi'
                          ? `Không có trong danh mục sẵn, bạn vẫn có thể tìm "${hotelFilterQuery}" trực tiếp trên Traveloka bên dưới.`
                          : `Not in curated list, you can still search "${hotelFilterQuery}" directly on Traveloka.`}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#0194f3]" />
                    <span>Check-in</span>
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#0194f3]" />
                    <span>Check-out</span>
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#0194f3]" />
                    <span>{currentLang === 'vi' ? 'Số khách' : 'Guests'}</span>
                  </label>
                  <select
                    value={hotelGuests}
                    onChange={(e) => setHotelGuests(parseInt(e.target.value) || 2)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    <option value={1}>1 {currentLang === 'vi' ? 'khách' : 'guest'}</option>
                    <option value={2}>2 {currentLang === 'vi' ? 'khách (Đôi)' : 'guests'}</option>
                    <option value={3}>3 {currentLang === 'vi' ? 'khách' : 'guests'}</option>
                    <option value={4}>4 {currentLang === 'vi' ? 'khách (Gia đình)' : 'guests'}</option>
                    <option value={6}>6+ {currentLang === 'vi' ? 'khách (Nhóm)' : 'guests'}</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Home className="w-3 h-3 text-[#0194f3]" />
                    <span>{currentLang === 'vi' ? 'Số phòng' : 'Rooms'}</span>
                  </label>
                  <select
                    value={hotelRooms}
                    onChange={(e) => setHotelRooms(parseInt(e.target.value) || 1)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    <option value={1}>1 {currentLang === 'vi' ? 'phòng' : 'room'}</option>
                    <option value={2}>2 {currentLang === 'vi' ? 'phòng' : 'rooms'}</option>
                    <option value={3}>3 {currentLang === 'vi' ? 'phòng' : 'rooms'}</option>
                  </select>
                </div>
              </div>

              {/* City Preview highlight & Area Shortcuts */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-teal-50/70 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-slate-200 border border-white shadow-xs">
                    <img
                      src={currentCityObj.thumbnailUrl}
                      alt={currentCityObj.nameVi}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-black text-slate-900">
                        {currentLang === 'vi' ? currentCityObj.nameVi : currentCityObj.nameEn}
                      </h5>
                      <span className="px-2 py-0.5 rounded-md bg-[#0194f3]/10 text-[#0194f3] text-[10px] font-bold">
                        {currentCityObj.region === 'North' ? 'Miền Bắc' : currentCityObj.region === 'Central' ? 'Miền Trung' : 'Miền Nam'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {currentLang === 'vi' ? 'Khu vực nổi bật: ' : 'Key spots: '}
                      {currentCityObj.popularSpots.join(' • ')}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-sky-100">
                  <span className="text-[10px] text-slate-500 block">Giá trung bình</span>
                  <span className="text-xs font-black text-[#0194f3]">{currentCityObj.avgPriceVND}</span>
                </div>
              </div>

              {/* Quick Area / Spot Shortcut Links */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                  {currentLang === 'vi' ? '⚡ Tìm nhanh khách sạn theo khu vực du lịch nổi tiếng:' : '⚡ Quick hotel search by popular spots:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentCityObj.popularSpots.map((spot, idx) => {
                    const spotUrl = `https://www.traveloka.com/vi-vn/hotel/search?q=${encodeURIComponent(`${spot} ${currentCityObj.nameVi}`)}&spec=${checkInDate.split('-').reverse().join('-')}.${checkOutDate.split('-').reverse().join('-')}.${hotelRooms}.${hotelGuests}.HOTEL_GEO`;
                    return (
                      <a
                        key={idx}
                        href={spotUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-[#0194f3] text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <MapPin className="w-3 h-3 text-[#0194f3]" />
                        <span>{spot}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-2">
                <a
                  href={hotelSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-lg shadow-emerald-200 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Home className="w-5 h-5 stroke-[2.5]" />
                  <span>
                    {currentLang === 'vi'
                      ? `Tìm Khách Sạn & Resort Tại ${currentCityObj.nameVi} Trên Traveloka`
                      : `Search Hotels in ${currentCityObj.nameEn} on Traveloka`}
                  </span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  {currentLang === 'vi'
                    ? '✓ Thanh toán tại khách sạn hoặc qua VietQR, MoMo • Miễn phí hủy phòng theo chính sách • Nhập mã HOTELTRAVELOKA15'
                    : '✓ Pay at hotel or via digital wallets • Free cancellation policies • Apply voucher HOTELTRAVELOKA15'}
                </p>
              </div>

              {/* Curated Top Hotels & Resorts with Direct Booking */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>
                      {currentLang === 'vi'
                        ? 'Khách sạn & Resort nổi bật đặt trực tiếp qua Traveloka:'
                        : currentLang === 'ko'
                        ? 'Traveloka 인기 추천 호텔 & 리조트 실시간 예약:'
                        : 'Featured Hotels & Resorts on Traveloka:'}
                    </span>
                  </h5>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {currentLang === 'vi' ? 'Cam kết giá tốt nhất' : currentLang === 'ko' ? '최저가 보장제' : 'Best Price Guarantee'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {TRAVELOKA_POPULAR_HOTELS.map((hotel) => {
                    const koHotel = KO_HOTELS[hotel.id];
                    const hotelName = currentLang === 'vi' ? hotel.nameVi : currentLang === 'ko' && koHotel ? koHotel.nameKo : hotel.nameEn;
                    const hotelBadge = currentLang === 'vi' ? hotel.badgeVi : currentLang === 'ko' && koHotel ? koHotel.badgeKo : hotel.badgeEn;
                    const hotelAddress = currentLang === 'ko' && koHotel ? koHotel.addressKo : hotel.address;
                    const hotelFeatures = currentLang === 'vi' ? hotel.featuresVi : currentLang === 'ko' && koHotel ? koHotel.featuresKo : hotel.featuresEn;

                    const directHotelUrl = buildTravelokaHotelUrl({
                      cityIdOrName: hotel.cityId,
                      hotelName: hotel.nameVi,
                      checkInDate,
                      checkOutDate,
                      guests: hotelGuests,
                      rooms: hotelRooms,
                    });

                    return (
                      <div
                        key={hotel.id}
                        className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="h-32 overflow-hidden relative">
                            <img
                              src={hotel.imageUrl}
                              alt={hotel.nameVi}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black shadow-xs">
                              {hotelBadge}
                            </span>
                            <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                              <div className="flex items-center gap-1 text-amber-300 text-[10px] font-bold mb-0.5">
                                {'★'.repeat(hotel.stars)}
                                <span className="text-white text-[9px] font-semibold ml-1 bg-white/20 px-1 rounded">
                                  {hotel.ratingScore}
                                </span>
                              </div>
                              <h6 className="text-xs font-black text-white leading-tight truncate">
                                {hotelName}
                              </h6>
                            </div>
                          </div>

                          <div className="p-3 space-y-2">
                            <p className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span>{hotelAddress}</span>
                            </p>

                            <div className="space-y-1">
                              {hotelFeatures.slice(0, 2).map((feat, fidx) => (
                                <div key={fidx} className="flex items-start gap-1 text-[10px] text-slate-600 leading-snug">
                                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-3 pt-0 border-t border-slate-100 mt-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-slate-400 font-medium">
                              {currentLang === 'vi' ? 'Giá mỗi đêm:' : currentLang === 'ko' ? '1박 요금:' : 'Per night:'}
                            </span>
                            <span className="text-xs font-black text-emerald-700">{hotel.pricePerNightVND}</span>
                          </div>

                          <a
                            href={directHotelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Home className="w-3.5 h-3.5" />
                            <span>
                              {currentLang === 'vi'
                                ? 'Đặt Phòng Này Trên Traveloka'
                                : currentLang === 'ko'
                                ? 'Traveloka에서 이 호텔 예약'
                                : 'Book on Traveloka'}
                            </span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMBO TIẾT KIỆM (Flight + Hotel Bundles) */}
          {activeTab === 'combo' && (
            <div className="space-y-5">
              {/* Highlight Intro Banner */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] uppercase shadow-xs">
                      SIÊU TIẾT KIỆM TỚI 30%
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-amber-950">
                      {currentLang === 'vi'
                        ? 'Combo Trọn Gói Vé Máy Bay + Khách Sạn Trên Traveloka'
                        : 'Flight + Hotel Bundle on Traveloka'}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyPromoCode('COMBOTRAVEL30')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95"
                    title={currentLang === 'vi' ? 'Nhấn để sao chép mã ưu đãi' : 'Click to copy promo code'}
                  >
                    <span>Mã: COMBOTRAVEL30</span>
                    {copiedCode === 'COMBOTRAVEL30' ? (
                      <Check className="w-3.5 h-3.5 text-slate-950" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-950" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentLang === 'vi'
                    ? 'Đặt trọn gói vé máy bay khứ hồi kèm phòng khách sạn cùng lúc trên Traveloka để hệ thống tự động ghép giá sỉ độc quyền. Tiết kiệm 450.000₫ - 1.200.000₫/người so với đặt riêng lẻ từng phần, thanh toán tiện lợi gói gọn trong 1 đơn đặt chỗ!'
                    : 'Bundle your round-trip flights and hotel stay together on Traveloka to unlock exclusive wholesale rates, saving 25% - 30% per person compared to separate bookings.'}
                </p>
              </div>

              {/* Interactive Combo Search Engine */}
              <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{currentLang === 'vi' ? 'Tìm gói combo theo lộ trình của bạn' : 'Search package for your route'}</span>
                  </h5>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    {currentLang === 'vi' ? 'Vận hành trực tiếp như vé bay & khách sạn Traveloka' : 'Direct live flight & hotel booking'}
                  </span>
                </div>

                {/* 1. LỘ TRÌNH CHUYẾN ĐI (KHỞI HÀNH & NƠI CẦN ĐẾN) */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
                  {/* Ô 1: Khởi hành từ */}
                  <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200 hover:border-sky-400 transition-colors shadow-2xs">
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-[#0194f3]" />
                      <span>{currentLang === 'vi' ? 'Khởi hành từ (Điểm đi)' : 'Departure (From)'}</span>
                    </label>
                    <select
                      value={comboOrigin}
                      onChange={(e) => handleSetComboOrigin(e.target.value)}
                      className="w-full text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      {TRAVELOKA_AIRPORTS.map((apt) => (
                        <option key={apt.code} value={apt.code}>
                          {apt.cityVi} ({apt.code}) — {apt.nameVi}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium truncate">
                      {currentComboOriginAirport.nameVi}
                    </p>
                  </div>

                  {/* Nút đổi chiều ⇄ */}
                  <button
                    type="button"
                    onClick={handleSwapComboAirports}
                    title={currentLang === 'vi' ? 'Đổi chiều điểm đi / điểm đến' : 'Swap direction'}
                    className="mx-auto w-11 h-11 rounded-full bg-amber-100 hover:bg-amber-500 text-amber-900 hover:text-slate-950 transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 shrink-0"
                  >
                    <ArrowRightLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Ô 2: Nơi cần đến (Điểm đến combo) */}
                  <div className="bg-white p-3.5 rounded-2xl border-2 border-amber-400 ring-2 ring-amber-100 hover:border-amber-500 transition-colors shadow-2xs">
                    <label className="block text-[11px] font-extrabold text-amber-900 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{currentLang === 'vi' ? 'Nơi cần đến (Điểm đến combo)' : 'Destination (To)'}</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {currentLang === 'vi' ? 'Điểm nghỉ dưỡng' : 'Vacation Spot'}
                      </span>
                    </label>
                    <select
                      value={comboDest}
                      onChange={(e) => handleSetComboDest(e.target.value)}
                      className="w-full text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      {TRAVELOKA_AIRPORTS.map((apt) => (
                        <option key={apt.code} value={apt.code}>
                          {apt.cityVi} ({apt.code}) — {apt.nameVi}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-amber-800 mt-1 font-bold truncate">
                      ✓ Tự động ghép phòng khách sạn tại: {currentComboDestAirport.cityVi}
                    </p>
                  </div>
                </div>

                {/* GỢI Ý NHANH NƠI CẦN ĐẾN ĐƯỢC YÊU THÍCH NHẤT */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-500" />
                      <span>{currentLang === 'vi' ? 'Gợi ý nhanh nơi cần đến được yêu thích nhất:' : 'Popular Combo Destinations:'}</span>
                    </span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {currentLang === 'vi' ? 'Nhấn để chọn ngay nơi cần đến' : 'Click to select destination'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { code: 'DAD', labelVi: 'Đà Nẵng & Hội An', icon: '🏖️' },
                      { code: 'PQC', labelVi: 'Phú Quốc', icon: '🏝️' },
                      { code: 'CXR', labelVi: 'Nha Trang', icon: '🌊' },
                      { code: 'DLI', labelVi: 'Đà Lạt', icon: '🌲' },
                      { code: 'VCS', labelVi: 'Côn Đảo', icon: '🏝️' },
                      { code: 'HPH', labelVi: 'Hạ Long', icon: '⛵' },
                      { code: 'UIH', labelVi: 'Quy Nhơn', icon: '🌊' },
                      { code: 'HUI', labelVi: 'Huế', icon: '🏰' },
                      { code: 'HAN', labelVi: 'Hà Nội & Sa Pa', icon: '🏙️' },
                      { code: 'SGN', labelVi: 'TP. Hồ Chí Minh', icon: '🏙️' },
                      { code: 'VCA', labelVi: 'Cần Thơ', icon: '🌾' },
                      { code: 'TBB', labelVi: 'Phú Yên', icon: '⛰️' },
                    ].map((d) => {
                      const isSelected = comboDest === d.code;
                      return (
                        <button
                          key={d.code}
                          type="button"
                          onClick={() => handleSetComboDest(d.code)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 font-black shadow-sm border border-amber-600 ring-2 ring-amber-300 scale-102'
                              : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/70'
                          }`}
                        >
                          <span>{d.icon}</span>
                          <span>{d.labelVi}</span>
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-amber-950 font-extrabold' : 'text-slate-400'}`}>
                            ({d.code})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dates & Guests & Class */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#0194f3]" />
                      <span>{currentLang === 'vi' ? 'Ngày đi' : 'Depart date'}</span>
                    </label>
                    <input
                      type="date"
                      value={comboDepDate}
                      onChange={(e) => setComboDepDate(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden"
                    />
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#0194f3]" />
                      <span>{currentLang === 'vi' ? 'Ngày về' : 'Return date'}</span>
                    </label>
                    <input
                      type="date"
                      value={comboRetDate}
                      onChange={(e) => setComboRetDate(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden"
                    />
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#0194f3]" />
                      <span>{currentLang === 'vi' ? 'Số khách' : 'Guests'}</span>
                    </label>
                    <select
                      value={comboGuests}
                      onChange={(e) => setComboGuests(parseInt(e.target.value) || 2)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value={1}>1 {currentLang === 'vi' ? 'khách' : 'guest'}</option>
                      <option value={2}>2 {currentLang === 'vi' ? 'khách (Đôi)' : 'guests'}</option>
                      <option value={3}>3 {currentLang === 'vi' ? 'khách' : 'guests'}</option>
                      <option value={4}>4 {currentLang === 'vi' ? 'khách (Gia đình)' : 'guests'}</option>
                      <option value={5}>5+ {currentLang === 'vi' ? 'khách (Nhóm)' : 'guests'}</option>
                    </select>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Home className="w-3 h-3 text-[#0194f3]" />
                      <span>{currentLang === 'vi' ? 'Số phòng' : 'Rooms'}</span>
                    </label>
                    <select
                      value={comboRooms}
                      onChange={(e) => setComboRooms(parseInt(e.target.value) || 1)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value={1}>1 {currentLang === 'vi' ? 'phòng' : 'room'}</option>
                      <option value={2}>2 {currentLang === 'vi' ? 'phòng' : 'rooms'}</option>
                      <option value={3}>3 {currentLang === 'vi' ? 'phòng' : 'rooms'}</option>
                    </select>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#0194f3]" />
                      <span>{currentLang === 'vi' ? 'Hạng ghế bay' : 'Seat Class'}</span>
                    </label>
                    <select
                      value={comboSeatClass}
                      onChange={(e) => setComboSeatClass(e.target.value as any)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value="ECONOMY">{currentLang === 'vi' ? 'Phổ thông' : 'Economy'}</option>
                      <option value="BUSINESS">{currentLang === 'vi' ? 'Thương gia' : 'Business'}</option>
                      <option value="PREMIUM_ECONOMY">{currentLang === 'vi' ? 'Phổ thông đặc biệt' : 'Premium Eco'}</option>
                    </select>
                  </div>
                </div>

                {/* Combo Route Summary Preview & Inclusions */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Plane className="w-4 h-4 text-[#0194f3]" />
                      <span>{comboOrigin} ⇄ {comboDest} ({currentComboDestAirport.cityVi})</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Home className="w-4 h-4 text-emerald-600" />
                      <span>{comboRooms} {currentLang === 'vi' ? 'phòng' : 'room'} cho {comboGuests} {currentLang === 'vi' ? 'khách' : 'guests'}</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1.5 font-bold text-amber-800">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>{currentLang === 'vi' ? 'Tiết kiệm ước tính ~25% - 30%' : 'Est. save 25% - 30%'}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 text-[11px] font-extrabold shadow-2xs">
                    ✓ Vé khứ hồi + Chỗ ở 1 chạm
                  </span>
                </div>

                {/* CÁC NÚT ĐẶT COMBO VẬN HÀNH TRỰC TIẾP NHƯ VÉ BAY & KHÁCH SẠN TRAVELOKA */}
                <div className="space-y-2.5 pt-1">
                  {/* NÚT CHÍNH: TÌM & ĐẶT GÓI COMBO TRỰC TIẾP TRÊN TRAVELOKA PACKAGES */}
                  <a
                    href={comboSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => copyPromoCode('COMBOTRAVEL30')}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-slate-950" />
                    <span className="truncate">
                      {currentLang === 'vi'
                        ? `Tìm Gói Combo Vé Máy Bay + Khách Sạn Tại ${currentComboDestAirport.cityVi} (Traveloka)`
                        : currentLang === 'ko'
                        ? `${currentComboDestAirport.cityVi} 항공권+호텔 절약 콤보 패키지 예약 (Traveloka)`
                        : `Book Flight + Hotel Bundle in ${currentComboDestAirport.cityVi} (Traveloka)`}
                    </span>
                    <ExternalLink className="w-4 h-4 shrink-0 text-slate-950" />
                  </a>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Nút 1: Đặt chuyến bay khứ hồi trực tiếp trên Traveloka */}
                    <a
                      href={comboFlightUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => copyPromoCode('COMBOTRAVEL30')}
                      className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#0194f3] to-[#007ce8] hover:from-[#0084dc] hover:to-[#006cc7] text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <Plane className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      <span className="truncate">
                        {currentLang === 'vi'
                          ? `1. Đặt Vé Bay Khứ Hồi (${comboOrigin} ⇄ ${comboDest})`
                          : currentLang === 'ko'
                          ? `1. 왕복 항공권 예약 (${comboOrigin} ⇄ ${comboDest})`
                          : `1. Book Round-trip Flights (${comboOrigin} ⇄ ${comboDest})`}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>

                    {/* Nút 2: Đặt khách sạn điểm đến trực tiếp trên Traveloka */}
                    <a
                      href={comboHotelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => copyPromoCode('COMBOTRAVEL30')}
                      className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <Home className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      <span className="truncate">
                        {currentLang === 'vi'
                          ? `2. Đặt Khách Sạn Tại ${currentComboDestAirport.cityVi}`
                          : currentLang === 'ko'
                          ? `2. ${currentComboDestAirport.cityVi} 호텔 예약`
                          : `2. Book Hotel in ${currentComboDestAirport.cityVi}`}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Nút 3: Mở cả 2 tab (Vé bay + Khách sạn) đồng thời */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        copyPromoCode('COMBOTRAVEL30');
                        window.open(comboFlightUrl, '_blank', 'noopener,noreferrer');
                        setTimeout(() => {
                          window.open(comboHotelUrl, '_blank', 'noopener,noreferrer');
                        }, 200);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>
                        {currentLang === 'vi'
                          ? '⚡ Mở Trọn Gói Cả Vé Bay & Khách Sạn (2 Tab Traveloka)'
                          : currentLang === 'ko'
                          ? '⚡ 왕복 항공권 & 호텔 2개 탭 동시 열기'
                          : '⚡ Open Both Flight & Hotel Tabs on Traveloka'}
                      </span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </button>

                    {/* Nút 4: Đặt giữ chỗ combo trong hệ thống */}
                    <button
                      type="button"
                      onClick={() => {
                        closeTravelokaModal();
                        openBookingModal('combo', {
                          originCode: comboOrigin,
                          destCode: comboDest,
                          date: comboDepDate,
                        });
                      }}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer border border-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>
                        {currentLang === 'vi'
                          ? '📝 Đặt Giữ Chỗ Combo Nhanh (Lưu Vào Tài Khoản)'
                          : currentLang === 'ko'
                          ? '📝 앱에서 콤보 바로 예약 (계정 연동)'
                          : '📝 Book Combo In-App (Sync to Account)'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Popular Combo Routes Quick Picks */}
                <div className="pt-2 border-t border-slate-200">
                  <h6 className="text-[11px] font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{currentLang === 'vi' ? 'Các gói combo khứ hồi giá tốt phổ biến:' : 'Popular Round-trip Combo Routes:'}</span>
                  </h6>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { from: 'HAN', to: 'DAD', label: 'Hà Nội ➔ Đà Nẵng', price: 'từ 2.490k' },
                      { from: 'SGN', to: 'PQC', label: 'Sài Gòn ➔ Phú Quốc', price: 'từ 2.990k' },
                      { from: 'HAN', to: 'CXR', label: 'Hà Nội ➔ Nha Trang', price: 'từ 2.750k' },
                      { from: 'SGN', to: 'DLI', label: 'Sài Gòn ➔ Đà Lạt', price: 'từ 2.190k' },
                      { from: 'HAN', to: 'UIH', label: 'Hà Nội ➔ Quy Nhơn', price: 'từ 2.390k' },
                      { from: 'SGN', to: 'VCS', label: 'Sài Gòn ➔ Côn Đảo', price: 'từ 3.650k' },
                      { from: 'DAD', to: 'HPH', label: 'Đà Nẵng ➔ Hạ Long', price: 'từ 2.350k' },
                      { from: 'SGN', to: 'HAN', label: 'Sài Gòn ➔ Hà Nội', price: 'từ 3.190k' },
                    ].map((r, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setComboOrigin(r.from);
                          setComboDest(r.to);
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-left transition-colors cursor-pointer group shadow-2xs"
                      >
                        <div className="text-[11px] font-bold text-slate-800 group-hover:text-amber-800 truncate">
                          {r.label}
                        </div>
                        <div className="text-[10px] text-amber-700 font-extrabold">{r.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Curated Top Combos with Multi-Action Booking Links */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{currentLang === 'vi' ? 'Các gói combo nghỉ dưỡng hot nhất liên kết trực tiếp Traveloka:' : 'Featured Hot Bundles Directly Linked on Traveloka:'}</span>
                  </h5>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {currentLang === 'vi' ? 'Bao gồm vé bay khứ hồi & phòng nghỉ' : 'Includes round-trip & stay'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {TRAVELOKA_POPULAR_COMBOS.map((combo) => {
                    const directDealUrl = buildTravelokaComboUrl({
                      originCode: combo.originAirport,
                      destCode: combo.destAirport,
                      destCity: combo.destCity,
                      departureDate: comboDepDate,
                      returnDate: comboRetDate,
                      guests: comboGuests,
                      rooms: comboRooms,
                      seatClass: comboSeatClass,
                    });

                    const dealFlightUrl = buildTravelokaFlightUrl({
                      originCode: combo.originAirport,
                      destCode: combo.destAirport,
                      departureDate: comboDepDate,
                      returnDate: comboRetDate,
                      seatClass: comboSeatClass,
                      adults: comboGuests,
                    });

                    const dealHotelUrl = buildTravelokaHotelUrl({
                      cityIdOrName: combo.destCity,
                      checkInDate: comboDepDate,
                      checkOutDate: comboRetDate,
                      guests: comboGuests,
                      rooms: comboRooms,
                    });

                    return (
                      <div
                        key={combo.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="h-36 overflow-hidden relative">
                            <img
                              src={combo.imageUrl}
                              alt={combo.titleVi}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                            <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-black shadow-xs">
                              {currentLang === 'vi' ? combo.savingsVi : combo.savingsEn}
                            </span>
                            {combo.badgeVi && (
                              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[9px] font-black tracking-wider uppercase shadow-xs">
                                {currentLang === 'vi' ? combo.badgeVi : combo.badgeEn}
                              </span>
                            )}
                            <div className="absolute bottom-2.5 left-3 right-3 text-white">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md inline-block mb-1">
                                {currentLang === 'vi' ? combo.durationVi : combo.durationEn} • {combo.destCityVi}
                              </span>
                              <h5 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-1">
                                {currentLang === 'vi' ? combo.titleVi : combo.titleEn}
                              </h5>
                            </div>
                          </div>

                          <div className="p-3.5 space-y-2.5">
                            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                              <span className="font-bold text-slate-900 block mb-0.5">🏨 Chỗ ở bao gồm:</span>
                              <p className="line-clamp-2">{currentLang === 'vi' ? combo.hotelTypeVi : combo.hotelTypeEn}</p>
                            </div>

                            <div className="space-y-1">
                              {(currentLang === 'vi' ? combo.featuresVi : combo.featuresEn).map((feat, fidx) => (
                                <div key={fidx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                  <span className="line-clamp-1">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 pt-0 border-t border-slate-100 mt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-medium">Giá trọn gói combo:</span>
                            <span className="text-xs sm:text-sm font-black text-amber-700">{combo.priceVND}</span>
                          </div>

                          {/* Multi-Action Traveloka Direct Deals */}
                          <div className="space-y-1.5">
                            {/* Nút đặt trọn gói combo trên Traveloka */}
                            <a
                              href={directDealUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => copyPromoCode('COMBOTRAVEL30')}
                              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                              title={currentLang === 'vi' ? 'Mở trang combo trọn gói Traveloka' : currentLang === 'ko' ? 'Traveloka 패키지 열기' : 'Open bundle on Traveloka'}
                            >
                              <Sparkles className="w-4 h-4 text-slate-950" />
                              <span>
                                {currentLang === 'vi'
                                  ? 'Xem Gói Combo Trên Traveloka'
                                  : currentLang === 'ko'
                                  ? 'Traveloka 콤보 패키지 열기'
                                  : 'View Package on Traveloka'}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-slate-950" />
                            </a>

                            <div className="grid grid-cols-2 gap-1.5">
                              <a
                                href={dealFlightUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => copyPromoCode('COMBOTRAVEL30')}
                                className="py-2 px-2 rounded-xl bg-[#0194f3] hover:bg-[#007ce8] text-white font-black text-xs flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                                title={currentLang === 'vi' ? 'Đặt chuyến bay khứ hồi combo trên Traveloka' : currentLang === 'ko' ? 'Traveloka 왕복 항공권' : 'Book round-trip flight on Traveloka'}
                              >
                                <Plane className="w-3.5 h-3.5" />
                                <span>{currentLang === 'vi' ? '1. Vé Bay' : currentLang === 'ko' ? '1. 항공권' : '1. Flight'}</span>
                                <ExternalLink className="w-3 h-3 ml-0.5" />
                              </a>
                              <a
                                href={dealHotelUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => copyPromoCode('COMBOTRAVEL30')}
                                className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                                title={currentLang === 'vi' ? 'Đặt khách sạn combo trên Traveloka' : currentLang === 'ko' ? 'Traveloka 호텔' : 'Book hotel on Traveloka'}
                              >
                                <Home className="w-3.5 h-3.5" />
                                <span>{currentLang === 'vi' ? '2. Khách Sạn' : currentLang === 'ko' ? '2. 호텔' : '2. Hotel'}</span>
                                <ExternalLink className="w-3 h-3 ml-0.5" />
                              </a>
                            </div>

                            {/* In-app instant booking */}
                            <button
                              type="button"
                              onClick={() => {
                                closeTravelokaModal();
                                openBookingModal('combo', {
                                  comboId: combo.id,
                                  originCode: combo.originAirport,
                                  destCode: combo.destAirport,
                                  date: comboDepDate,
                                });
                              }}
                              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <Gift className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>
                                {currentLang === 'vi'
                                  ? 'Đặt Giữ Chỗ Combo Này'
                                  : currentLang === 'ko'
                                  ? '이 콤보 앱에서 예약'
                                  : 'Book This Bundle'}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Direct Link to Traveloka Packages Home */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0194f3] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-slate-900">
                      {currentLang === 'vi'
                        ? 'Cần tùy biến gói combo cho chuyến đi khác?'
                        : currentLang === 'ko'
                        ? '다른 여행지의 맞춤 콤보 패키지가 필요하신가요?'
                        : 'Need a custom package for other trips?'}
                    </h6>
                    <p className="text-[11px] text-slate-600">
                      {currentLang === 'vi'
                        ? 'Khám phá hơn 200+ gói combo du lịch tới 63 tỉnh thành trên cổng chính thức Traveloka.'
                        : currentLang === 'ko'
                        ? 'Traveloka 공식 포털에서 63개 성·시로 향하는 200개 이상의 다양한 여행 콤보 패키지를 확인해보세요.'
                        : 'Explore 200+ vacation packages across Vietnam on official Traveloka portal.'}
                    </p>
                  </div>
                </div>

                <a
                  href={TRAVELOKA_PACKAGES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#0194f3] hover:bg-[#007ce8] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>
                    {currentLang === 'vi'
                      ? 'Mở Cổng Combo Traveloka'
                      : currentLang === 'ko'
                      ? 'Traveloka 콤보 포털 열기'
                      : 'Open Traveloka Packages'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: VÉ VUI CHƠI XPERIENCE */}
          {activeTab === 'xperience' && (
            <div className="space-y-4">
              {/* Highlight Intro Banner */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-purple-500/5 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-600 text-white font-black text-[10px] uppercase shadow-xs">
                    TRAVELOKA XPERIENCE
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-purple-950">
                    {currentLang === 'vi' ? 'Vé Vui Chơi, Cáp Treo & Tour Trải Nghiệm' : 'Traveloka Attractions & Tours'}
                  </h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentLang === 'vi'
                    ? 'Đặt trước vé Sun World Bà Nà Hills, VinWonders Phú Quốc, Cáp treo Fansipan Sa Pa, Du thuyền Vịnh Hạ Long và hàng trăm vé tham quan. Quét mã QR trực tiếp tại cổng không phải xếp hàng chờ đợi, đảm bảo giá vé rẻ hơn mua tại quầy!'
                    : 'Pre-book amusement parks, cable cars, museum admissions & guided tours to skip the ticket lines with instant mobile QR entry.'}
                </p>
              </div>

              {/* Interactive Attraction Search & Filter Bar */}
              <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-purple-600" />
                    <span>{currentLang === 'vi' ? 'Tìm vé vui chơi theo điểm đến & từ khóa' : 'Search attractions by destination'}</span>
                  </h5>
                  <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                    {currentLang === 'vi' ? 'Nhập mã XPERIENCEFUN20' : 'Use code XPERIENCEFUN20'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.5fr,1fr,auto] gap-2 items-center">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={xperienceQuery}
                      onChange={(e) => setXperienceQuery(e.target.value)}
                      placeholder={
                        currentLang === 'vi'
                          ? 'Tìm vé (Bà Nà Hills, VinWonders, Fansipan, Du thuyền Hạ Long...)'
                          : 'Search (Ba Na Hills, VinWonders, Fansipan, Cruise...)'
                      }
                      className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-100 shadow-2xs"
                    />
                    {xperienceQuery && (
                      <button
                        onClick={() => setXperienceQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
                    <select
                      value={xperienceCityFilter}
                      onChange={(e) => setXperienceCityFilter(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value="all">📍 {currentLang === 'vi' ? 'Tất cả điểm đến' : 'All Destinations'}</option>
                      <option value="da-nang">Đà Nẵng (Bà Nà Hills, Núi Thần Tài)</option>
                      <option value="phu-quoc">Phú Quốc (VinWonders, Safari, Hòn Thơm)</option>
                      <option value="sa-pa">Sa Pa (Fansipan Legend, Mường Hoa)</option>
                      <option value="ha-long">Hạ Long (Du thuyền 5 sao, Vịnh di sản)</option>
                      <option value="nha-trang">Nha Trang (VinWonders Hòn Tre)</option>
                      <option value="hoi-an">Hội An (Ký Ức Hội An, Rừng dừa Bảy Mẫu)</option>
                      <option value="ha-noi">Hà Nội (Thủy cung Lotte, Tinh Hoa Bắc Bộ)</option>
                      <option value="ho-chi-minh">TP. Hồ Chí Minh (Du thuyền sông Sài Gòn)</option>
                      <option value="tay-ninh">Tây Ninh (Cáp treo Núi Bà Đen)</option>
                    </select>
                  </div>

                  <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
                    <select
                      value={xperienceCategoryFilter}
                      onChange={(e) => setXperienceCategoryFilter(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value="all">🏷️ {currentLang === 'vi' ? 'Mọi danh mục' : 'All Categories'}</option>
                      <option value="Cáp treo">{currentLang === 'vi' ? 'Cáp treo & Danh thắng' : 'Cable Car & Peak'}</option>
                      <option value="Công viên">{currentLang === 'vi' ? 'Công viên chủ đề & Safari' : 'Theme Park & Safari'}</option>
                      <option value="Du thuyền">{currentLang === 'vi' ? 'Du thuyền & Ngắm cảnh' : 'Cruise & Sightseeing'}</option>
                      <option value="Show">{currentLang === 'vi' ? 'Show nghệ thuật thực cảnh' : 'Cultural Live Shows'}</option>
                      <option value="khoáng">{currentLang === 'vi' ? 'Suối khoáng & Onsen' : 'Hot Springs & Onsen'}</option>
                    </select>
                  </div>
                </div>

                {/* Quick Attraction Chips */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                    {currentLang === 'vi' ? '⚡ Vé tham quan hot nhất được tìm kiếm nhiều:' : '⚡ Most searched attraction tickets:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: '🎡 Sun World Bà Nà Hills', q: 'Sun World Ba Na Hills Da Nang' },
                      { label: '🦁 VinWonders & Safari Phú Quốc', q: 'VinWonders Phu Quoc Safari' },
                      { label: '🚠 Cáp Treo Fansipan Sa Pa', q: 'Sun World Fansipan Legend' },
                      { label: '🚢 Du Thuyền Vịnh Hạ Long', q: 'Du thuyen Vinh Ha Long' },
                      { label: '⛰️ Cáp Treo Núi Bà Đen', q: 'Sun World Nui Ba Den' },
                      { label: '🎭 Show Ký Ức Hội An', q: 'Ky Uc Hoi An Memories Show' },
                      { label: '🐠 Thủy Cung Lotte Hà Nội', q: 'Lotte World Aquarium Ha Noi' },
                    ].map((spot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setXperienceQuery(spot.q)}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-700 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <span>{spot.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Search CTA */}
                <div className="pt-1">
                  <a
                    href={xperienceSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-purple-200 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Compass className="w-5 h-5 stroke-[2.5]" />
                    <span>
                      {currentLang === 'vi'
                        ? `Tìm Kiếm Vé Vui Chơi & Hoạt Động Trên Traveloka Xperience Ngay`
                        : `Search Attractions on Traveloka Xperience`}
                    </span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                  <p className="text-[11px] text-center text-slate-500 mt-2">
                    {currentLang === 'vi'
                      ? '✓ Quét mã QR trực tiếp qua cổng • Đảm bảo giá rẻ hơn mua tại quầy • Áp mã XPERIENCEFUN20'
                      : '✓ Instant QR mobile entry • Guaranteed lower price than ticket counter • Apply code XPERIENCEFUN20'}
                  </p>
                </div>
              </div>

              {/* Grid of Verified Attractions with Direct Booking Buttons */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span>{currentLang === 'vi' ? 'Danh sách vé vui chơi chính thức có thể đặt ngay:' : 'Official Attraction Passes Ready to Book:'}</span>
                  </h5>
                  <span className="text-[11px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    {filteredActivities.length} {currentLang === 'vi' ? 'hoạt động nổi bật' : 'experiences'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredActivities.map((act) => {
                    const directActUrl = act.bookingUrl || buildTravelokaActivitiesUrl({ query: act.nameVi });

                    return (
                      <div
                        key={act.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-purple-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="h-36 overflow-hidden relative">
                            <img
                              src={act.imageUrl}
                              alt={act.nameVi}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                            <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-purple-600 text-white text-[10px] font-black shadow-xs">
                              {currentLang === 'vi' ? act.badgeVi : act.badgeEn}
                            </span>
                            <div className="absolute bottom-2.5 left-3 right-3 text-white">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md inline-block mb-1">
                                {act.destCityVi} • {currentLang === 'vi' ? act.categoryVi : act.categoryEn}
                              </span>
                              <h5 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-1">
                                {currentLang === 'vi' ? act.nameVi : act.nameEn}
                              </h5>
                            </div>
                          </div>

                          <div className="p-3.5 space-y-2.5">
                            <div className="space-y-1">
                              {(currentLang === 'vi' ? act.featuresVi : act.featuresEn).map((feat, fidx) => (
                                <div key={fidx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                  <span className="line-clamp-1">{feat}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                              <QrCode className="w-3.5 h-3.5" />
                              <span>{currentLang === 'vi' ? 'Quét mã QR vào cổng không xếp hàng' : 'Direct QR entry, skip line'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 pt-0 border-t border-slate-100 mt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-slate-400 font-medium">Giá vé ưu đãi:</span>
                            <span className="text-xs sm:text-sm font-black text-purple-800">{act.priceVND}</span>
                          </div>

                          <a
                            href={directActUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            <span>{currentLang === 'vi' ? 'Đặt Vé Này Trên Traveloka' : 'Book on Traveloka'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MÃ GIẢM GIÁ & PROMO CODES */}
          {activeTab === 'promo' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                {currentLang === 'vi'
                  ? 'Bấm nút "Sao chép" để copy mã ưu đãi và dán tại bước thanh toán trên trang đặt vé Traveloka:'
                  : currentLang === 'ko'
                  ? '원하는 할인 쿠폰의 "복사" 버튼을 누른 후 Traveloka 결제 페이지 쿠폰 입력란에 붙여넣으세요:'
                  : 'Click "Copy" to copy promo code and paste at the Traveloka checkout step:'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRAVELOKA_PROMOS.map((promo) => {
                  const isCopied = copiedCode === promo.code;
                  const koPromo = KO_PROMOS[promo.code];
                  const promoTitle = currentLang === 'vi' ? promo.titleVi : currentLang === 'ko' && koPromo ? koPromo.titleKo : promo.titleEn;
                  const promoDiscount = currentLang === 'vi' ? promo.discountVi : currentLang === 'ko' && koPromo ? koPromo.discountKo : promo.discountEn;

                  return (
                    <div
                      key={promo.code}
                      className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase">
                          {promo.badge}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {currentLang === 'vi' ? 'Hạn:' : currentLang === 'ko' ? '유효기간:' : 'Exp:'} {promo.expiryDate}
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs font-black text-slate-900 mb-0.5">
                          {promoTitle}
                        </h5>
                        <p className="text-[11px] text-slate-600">
                          {promoDiscount}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-dashed border-amber-200 flex items-center justify-between gap-2">
                        <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono font-black text-amber-900 tracking-wider">
                          {promo.code}
                        </div>
                        <button
                          type="button"
                          onClick={() => copyPromoCode(promo.code)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isCopied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{currentLang === 'vi' ? 'Đã chép!' : currentLang === 'ko' ? '복사됨!' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{currentLang === 'vi' ? 'Sao chép' : currentLang === 'ko' ? '코드 복사' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: TẢI APP MOBILE & QUÉT QR */}
          {activeTab === 'app' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0194f3] text-xs font-bold">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Traveloka Mobile App</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900">
                    {currentLang === 'vi'
                      ? 'Tải App Traveloka Cho Điện Thoại'
                      : 'Download Traveloka Mobile App'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentLang === 'vi'
                      ? 'Quản lý toàn bộ vé máy bay, nhận phòng khách sạn không cần in giấy tờ, nhận cảnh báo giá vé rẻ (Price Alerts) và làm thủ tục trực tuyến (Online Check-in) nhanh chóng.'
                      : 'Manage all flights & hotel vouchers offline, receive real-time price alerts, and complete web check-in seamlessly on mobile.'}
                  </p>

                  <div className="space-y-2 pt-1 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                      <span>{currentLang === 'vi' ? 'Thẻ lên máy bay & Voucher lưu trong máy' : 'Digital boarding passes & vouchers'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                      <span>{currentLang === 'vi' ? 'Hỗ trợ khách hàng 24/7 trực tiếp trên ứng dụng' : '24/7 in-app live customer support'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                      <span>{currentLang === 'vi' ? 'Tích lũy Traveloka Points quy đổi quà tặng' : 'Earn Traveloka Points for future discounts'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <a
                      href={TRAVELOKA_APP_LINKS.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.02.63-2.67 1.4-.58.67-1.08 1.76-.94 2.82 1.03.08 2.05-.53 2.67-1.29z" />
                      </svg>
                      <span>App Store (iOS)</span>
                    </a>

                    <a
                      href={TRAVELOKA_APP_LINKS.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.3 0 .58.09.81.25l13.5 8.5c.61.38.79 1.19.41 1.8-.1.17-.25.31-.41.41l-13.5 8.5c-.23.16-.51.25-.81.25-.83 0-1.5-.67-1.5-1.5z" />
                      </svg>
                      <span>Google Play (Android)</span>
                    </a>
                  </div>
                </div>

                {/* QR Code Card */}
                <div className="bg-sky-50 rounded-3xl p-6 border border-sky-100 flex flex-col items-center justify-center text-center">
                  <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 mb-3">
                    <QrCode className="w-28 h-28 text-[#0194f3]" />
                  </div>
                  <h5 className="text-xs font-black text-slate-900">
                    {currentLang === 'vi' ? 'Quét QR tải & mở App Traveloka' : 'Scan QR to Open Traveloka App'}
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                    {currentLang === 'vi'
                      ? 'Mở camera điện thoại quét mã QR để tải app và nhận ngay gói ưu đãi tân thủ lên đến 500.000₫.'
                      : 'Point your smartphone camera to download the app and unlock welcoming discount packs.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Trust & Guarantee Banner */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                {currentLang === 'vi'
                  ? 'Liên kết bảo mật trực tiếp cùng Traveloka Việt Nam • Thanh toán tiện lợi qua MoMo, ZaloPay, VietQR & Thẻ nội địa'
                  : 'Official direct integration with Traveloka • Convenient payment with digital wallets & cards'}
              </span>
            </div>
            <a
              href={TRAVELOKA_APP_LINKS.webHome}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0194f3] font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
            >
              <span>{currentLang === 'vi' ? 'Trang chủ Traveloka.com' : 'Traveloka.com Official Portal'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
