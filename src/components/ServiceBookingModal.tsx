import React, { useState } from 'react';
import {
  X,
  Plane,
  Home,
  Compass,
  Calendar,
  Clock,
  User,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  QrCode,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Users,
  Gift,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TRAVELOKA_POPULAR_COMBOS } from '../data/travelokaData';
import { Language } from '../types';

interface ServiceBookingModalProps {
  currentLang: Language;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({ currentLang }) => {
  const {
    isBookingModalOpen,
    bookingModalType,
    bookingModalInitialData,
    closeBookingModal,
    currentUser,
    isAuthenticated,
    openAuthModal,
    openAccountModal,
    addFlightBooking,
    addHotelBooking,
    addTourBooking,
    openTravelokaModal,
  } = useAuth();

  const [activeType, setActiveType] = useState<'flight' | 'hotel' | 'combo' | 'tour'>(bookingModalType);

  // Sync with prop
  React.useEffect(() => {
    setActiveType(bookingModalType);
  }, [bookingModalType]);

  // Flight form state
  const [airline, setAirline] = useState<'Vietnam Airlines' | 'Vietjet Air' | 'Bamboo Airways'>('Vietnam Airlines');
  const [flightRoute, setFlightRoute] = useState('HAN-DAD');
  const [departureDate, setDepartureDate] = useState('2026-10-15');
  const [seatClass, setSeatClass] = useState<'Phổ thông (Economy)' | 'Thương gia (Business)'>('Phổ thông (Economy)');
  const [flightPassengers, setFlightPassengers] = useState(1);
  const [passengerName, setPassengerName] = useState(currentUser?.fullName || '');

  // Hotel form state
  const [hotelChoice, setHotelChoice] = useState('silk_sense_hoian');
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-18');
  const [roomType, setRoomType] = useState('Phòng Deluxe Giường Đôi (Buffet sáng)');
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelSpecialRequests, setHotelSpecialRequests] = useState('');

  // Combo form state
  const [selectedComboId, setSelectedComboId] = useState('combo-danang-hoian');
  const [comboDepDate, setComboDepDate] = useState('2026-10-15');
  const [comboRetDate, setComboRetDate] = useState('2026-10-18');
  const [comboGuests, setComboGuests] = useState(2);
  const [comboRooms, setComboRooms] = useState(1);
  const [comboAirline, setComboAirline] = useState<'Vietnam Airlines' | 'Vietjet Air' | 'Bamboo Airways'>('Vietnam Airlines');
  const [comboContactName, setComboContactName] = useState(currentUser?.fullName || '');
  const [comboContactPhone, setComboContactPhone] = useState(currentUser?.phone || '');

  // Tour form state
  const [selectedTour, setSelectedTour] = useState('central_heritage');
  const [tourStartDate, setTourStartDate] = useState('2026-10-20');
  const [tourParticipants, setTourParticipants] = useState(2);
  const [tourContactName, setTourContactName] = useState(currentUser?.fullName || '');
  const [tourContactPhone, setTourContactPhone] = useState(currentUser?.phone || '');

  // Booking success state
  const [bookedResult, setBookedResult] = useState<{
    code: string;
    type: 'flight' | 'hotel' | 'tour';
    message: string;
    points: number;
  } | null>(null);

  // Predefined routes for flights
  const FLIGHT_ROUTES = [
    { id: 'HAN-DAD', nameVi: 'Hà Nội (HAN) ➔ Đà Nẵng (DAD)', origin: 'Hà Nội (Nội Bài - HAN)', originCode: 'HAN', dest: 'Đà Nẵng (Sân bay Đà Nẵng - DAD)', destCode: 'DAD', basePrice: 1700000 },
    { id: 'HAN-SGN', nameVi: 'Hà Nội (HAN) ➔ TP. Hồ Chí Minh (SGN)', origin: 'Hà Nội (Nội Bài - HAN)', originCode: 'HAN', dest: 'TP. Hồ Chí Minh (Tân Sơn Nhất - SGN)', destCode: 'SGN', basePrice: 2100000 },
    { id: 'SGN-PQC', nameVi: 'TP. Hồ Chí Minh (SGN) ➔ Phú Quốc (PQC)', origin: 'TP. Hồ Chí Minh (Tân Sơn Nhất - SGN)', originCode: 'SGN', dest: 'Phú Quốc (Sân bay Phú Quốc - PQC)', destCode: 'PQC', basePrice: 1450000 },
    { id: 'HAN-CXR', nameVi: 'Hà Nội (HAN) ➔ Nha Trang / Cam Ranh (CXR)', origin: 'Hà Nội (Nội Bài - HAN)', originCode: 'HAN', dest: 'Nha Trang (Cam Ranh - CXR)', destCode: 'CXR', basePrice: 1850000 },
    { id: 'DAD-VCA', nameVi: 'Đà Nẵng (DAD) ➔ Cần Thơ (VCA)', origin: 'Đà Nẵng (DAD)', originCode: 'DAD', dest: 'Cần Thơ (Sân bay Cần Thơ - VCA)', destCode: 'VCA', basePrice: 1600000 },
  ];

  // Predefined hotels
  const HOTEL_LIST = [
    { id: 'silk_sense_hoian', name: 'Silk Sense Hoi An River Resort & Spa', loc: 'Phố Cổ Hội An, Quảng Nam', region: 'Central' as const, pricePerNight: 1600000 },
    { id: 'la_siesta_hanoi', name: 'La Siesta Classic Ma May Hotel', loc: 'Phố Cổ Hoàn Kiếm, Hà Nội', region: 'North' as const, pricePerNight: 1850000 },
    { id: 'dalat_edensee', name: 'Dalat Edensee Lake Resort & Spa', loc: 'Hồ Tuyền Lâm, Đà Lạt', region: 'Central' as const, pricePerNight: 2100000 },
    { id: 'vinpearl_nhatrang', name: 'Vinpearl Resort & Spa Nha Trang Bay', loc: 'Đảo Hòn Tre, Nha Trang', region: 'Central' as const, pricePerNight: 2400000 },
    { id: 'intercon_phuquoc', name: 'InterContinental Phu Quoc Long Beach', loc: 'Bãi Trường, Phú Quốc', region: 'South' as const, pricePerNight: 3200000 },
    { id: 'sapa_ecolodge', name: 'Topas Ecolodge Sa Pa (Nhà sàn view ruộng bậc thang)', loc: 'Bản Lếch, Sa Pa, Lào Cai', region: 'North' as const, pricePerNight: 2300000 },
  ];

  // Predefined tours
  const TOUR_LIST = [
    { id: 'central_heritage', title: 'Hành Trình Di Sản Miền Trung (Huế - Đà Nẵng - Hội An)', duration: '4 Ngày 3 Đêm', style: 'Di sản & Ẩm thực cung đình', pricePerPerson: 3990000, pickup: 'Sân bay Quốc tế Đà Nẵng' },
    { id: 'north_wonders', title: 'Kỳ Quan Miền Bắc (Hà Nội - Vịnh Hạ Long - Tràng An)', duration: '3 Ngày 2 Đêm', style: 'Thiên nhiên & Danh thắng UNESCO', pricePerPerson: 3450000, pickup: 'Khách sạn tại Phố Cổ Hà Nội' },
    { id: 'hagiang_loop', title: 'Chinh Phục Cao Nguyên Đá Đồng Văn & Mã Pí Lèng', duration: '4 Ngày 3 Đêm', style: 'Bản sắc dân tộc H’Mông, Dao, Lô Lô', pricePerPerson: 4200000, pickup: 'Bến xe hoặc Trung tâm TP Hà Giang' },
    { id: 'taynguyen_gong', title: 'Tây Nguyên Huyền Thoại & Không Gian Văn Hóa Cồng Chiêng', duration: '3 Ngày 2 Đêm', style: 'Nhà Rông, Cồng Chiêng Ba Na, Gia Rai', pricePerPerson: 3200000, pickup: 'Sân bay Pleiku (Gia Lai)' },
    { id: 'mekong_floating', title: 'Miền Tây Sông Nước & Chợ Nổi Cái Răng Cần Thơ', duration: '2 Ngày 1 Đêm', style: 'Văn hóa miệt vườn & Ẩm thực sông nước', pricePerPerson: 1890000, pickup: 'Trung tâm Quận 1, TP. Hồ Chí Minh' },
  ];

  if (!isBookingModalOpen) return null;

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  // Require auth handler
  const ensureAuth = () => {
    if (!isAuthenticated) {
      openAuthModal('register');
      return false;
    }
    return true;
  };

  // Handle Flight Submit
  const handleBookFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ensureAuth()) return;

    const routeObj = FLIGHT_ROUTES.find((r) => r.id === flightRoute) || FLIGHT_ROUTES[0];
    const multiplier = seatClass.includes('Thương gia') ? 2.2 : 1;
    const total = Math.round(routeObj.basePrice * multiplier * flightPassengers);
    const flightNum = airline === 'Vietnam Airlines' ? `VN ${Math.floor(100 + Math.random() * 800)}` : airline === 'Vietjet Air' ? `VJ ${Math.floor(200 + Math.random() * 700)}` : `QH ${Math.floor(300 + Math.random() * 600)}`;

    const newBooking = addFlightBooking({
      airline,
      flightNumber: flightNum,
      origin: routeObj.origin,
      originCode: routeObj.originCode,
      destination: routeObj.dest,
      destCode: routeObj.destCode,
      departureDate,
      departureTime: '08:45',
      arrivalTime: '10:15',
      seatClass,
      passengers: flightPassengers,
      passengerNames: [passengerName || currentUser?.fullName || 'Hành khách'],
      totalPriceVND: total,
      gate: `${Math.floor(1 + Math.random() * 12)}`,
      seatNumber: `${Math.floor(10 + Math.random() * 25)}${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}`,
    });

    setBookedResult({
      code: newBooking.bookingCode,
      type: 'flight',
      message: `Đặt vé máy bay thành công cho chặng ${routeObj.originCode} ➔ ${routeObj.destCode}!`,
      points: Math.round(total / 10000),
    });
  };

  // Handle Hotel Submit
  const handleBookHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ensureAuth()) return;

    const hotelObj = HOTEL_LIST.find((h) => h.id === hotelChoice) || HOTEL_LIST[0];
    const nights = 3;
    const total = hotelObj.pricePerNight * nights;

    const newBooking = addHotelBooking({
      hotelName: hotelObj.name,
      location: hotelObj.loc,
      region: hotelObj.region,
      checkInDate,
      checkOutDate,
      roomType,
      nights,
      guests: hotelGuests,
      guestName: currentUser?.fullName || 'Khách du lịch',
      guestPhone: currentUser?.phone || '0912 345 678',
      totalPriceVND: total,
      specialRequests: hotelSpecialRequests || 'Phòng view đẹp, hỗ trợ check-in thuận tiện',
    });

    setBookedResult({
      code: newBooking.bookingCode,
      type: 'hotel',
      message: `Đặt phòng thành công tại ${hotelObj.name}!`,
      points: Math.round(total / 10000),
    });
  };

  // Handle Tour Submit
  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ensureAuth()) return;

    const tourObj = TOUR_LIST.find((t) => t.id === selectedTour) || TOUR_LIST[0];
    const total = tourObj.pricePerPerson * tourParticipants;

    const newBooking = addTourBooking({
      tourTitle: tourObj.title,
      duration: tourObj.duration,
      startDate: tourStartDate,
      departureLocation: tourObj.pickup,
      participants: tourParticipants,
      contactName: tourContactName || currentUser?.fullName || 'Khách du lịch',
      contactPhone: tourContactPhone || currentUser?.phone || '0912 345 678',
      totalPriceVND: total,
      tourStyle: tourObj.style,
    });

    setBookedResult({
      code: newBooking.bookingCode,
      type: 'tour',
      message: `Book tour thành công: ${tourObj.title}!`,
      points: Math.round(total / 10000),
    });
  };

  // Handle Combo Submit
  const handleBookCombo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ensureAuth()) return;

    const comboObj = TRAVELOKA_POPULAR_COMBOS.find((c) => c.id === selectedComboId) || TRAVELOKA_POPULAR_COMBOS[0];
    const total = comboObj.priceNum * comboGuests;

    addFlightBooking({
      airline: comboAirline,
      flightNumber: comboAirline === 'Vietnam Airlines' ? 'VN 182' : comboAirline === 'Vietjet Air' ? 'VJ 628' : 'QH 214',
      origin: comboObj.originAirport === 'HAN' ? 'Hà Nội (HAN)' : 'TP. Hồ Chí Minh (SGN)',
      originCode: comboObj.originAirport,
      destination: `${comboObj.destCityVi} (${comboObj.destAirport})`,
      destCode: comboObj.destAirport,
      departureDate: comboDepDate,
      departureTime: '08:30',
      arrivalTime: '10:00',
      seatClass: 'Phổ thông (Economy)',
      passengers: comboGuests,
      passengerNames: [comboContactName || currentUser?.fullName || 'Hành khách'],
      totalPriceVND: Math.round(total * 0.55),
      gate: '6',
      seatNumber: '12A, 12B',
    });

    addHotelBooking({
      hotelName: comboObj.recommendedHotel || comboObj.hotelTypeVi,
      location: comboObj.destCityVi,
      region: 'Central',
      checkInDate: comboDepDate,
      checkOutDate: comboRetDate,
      roomType: 'Phòng Deluxe Combo Trọn Gói (Buffet sáng)',
      nights: 3,
      guests: comboGuests,
      guestName: comboContactName || currentUser?.fullName || 'Khách du lịch',
      guestPhone: comboContactPhone || currentUser?.phone || '0912 345 678',
      totalPriceVND: Math.round(total * 0.45),
      specialRequests: 'Gói combo tiết kiệm vé bay + khách sạn ưu đãi',
    });

    setBookedResult({
      code: `CB-TK-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'flight',
      message: `Đặt trọn gói ${comboObj.titleVi} thành công! Vé máy bay & phòng khách sạn đã được lưu vào tài khoản.`,
      points: Math.round(total / 8000),
    });
  };

  const handleFinishAndOpenHub = () => {
    closeBookingModal();
    const tabTarget = bookedResult?.type === 'flight' ? 'flights' : bookedResult?.type === 'hotel' ? 'hotels' : 'tours';
    setBookedResult(null);
    openAccountModal(tabTarget);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeBookingModal}
    >
      <div
        className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-2xl w-full my-auto overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-800 via-sky-700 to-teal-800 text-white relative shrink-0">
          <button
            onClick={closeBookingModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              {currentLang === 'vi' ? 'Dịch Vụ Trực Tuyến' : 'Online Booking'}
            </span>
            <span className="text-xs text-sky-100 font-medium">
              {currentLang === 'vi' ? 'Lưu ngay vào tài khoản du khách' : 'Sync directly to account'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {activeType === 'flight'
              ? currentLang === 'vi'
                ? 'Đặt Mua Vé Máy Bay Nội Địa'
                : 'Book Domestic Flight Ticket'
              : activeType === 'hotel'
              ? currentLang === 'vi'
                ? 'Đặt Trước Khách Sạn & Homestay'
                : 'Reserve Hotel & Homestay'
              : activeType === 'combo'
              ? currentLang === 'vi'
                ? 'Đặt Combo Tiết Kiệm Vé Máy Bay + Khách Sạn'
                : 'Book Flight + Hotel Savings Bundle'
              : currentLang === 'vi'
              ? 'Book Tour Du Lịch Tuyển Chọn'
              : 'Book Curated Vietnam Tour'}
          </h3>

          {/* Switch Service Tabs */}
          <div className="mt-4 flex flex-wrap bg-white/15 p-1 rounded-2xl border border-white/20 backdrop-blur-xs gap-1">
            <button
              onClick={() => {
                setActiveType('flight');
                setBookedResult(null);
              }}
              className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeType === 'flight'
                  ? 'bg-white text-sky-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Vé Máy Bay' : 'Flights'}</span>
            </button>
            <button
              onClick={() => {
                setActiveType('hotel');
                setBookedResult(null);
              }}
              className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeType === 'hotel'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Khách Sạn' : 'Hotels'}</span>
            </button>
            <button
              onClick={() => {
                setActiveType('combo');
                setBookedResult(null);
              }}
              className={`flex-1 min-w-[100px] py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeType === 'combo'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Combo -30%' : 'Bundle'}</span>
            </button>
            <button
              onClick={() => {
                setActiveType('tour');
                setBookedResult(null);
              }}
              className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeType === 'tour'
                  ? 'bg-white text-amber-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Book Tour' : 'Tours'}</span>
            </button>
            <button
              onClick={() => {
                closeBookingModal();
                openTravelokaModal(
                  activeType === 'combo'
                    ? 'combo'
                    : activeType === 'hotel'
                    ? 'hotel'
                    : activeType === 'tour'
                    ? 'xperience'
                    : 'flight'
                );
              }}
              className="py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white/20 hover:bg-white text-white hover:text-[#0194f3] border border-white/30 shrink-0"
              title="Đặt qua cổng Traveloka chính thức"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>
                Traveloka{' '}
                {activeType === 'combo'
                  ? '🎁 Combo -30%'
                  : activeType === 'hotel'
                  ? '🏨 Khách Sạn'
                  : activeType === 'tour'
                  ? '🎡 Vui Chơi'
                  : '✈️ Vé Bay'}
              </span>
            </button>
          </div>
        </div>

        {/* Body Form */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Success Screen */}
          {bookedResult ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-black text-slate-900">
                  {bookedResult.message}
                </h4>
                <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-mono font-bold">
                  <span>MÃ XÁC NHẬN:</span>
                  <span className="text-sky-700 text-sm">{bookedResult.code}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-1.5 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>+{bookedResult.points} Điểm Sen Vàng Đã Cộng Vào Tài Khoản!</span>
                </div>
                <span>
                  Thẻ lên máy bay điện tử & thông tin đặt chỗ đã được lưu an toàn trong Không Gian Tài Khoản của bạn.
                </span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  onClick={handleFinishAndOpenHub}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>{currentLang === 'vi' ? 'Xem trong Không Gian Tài Khoản' : 'View in My Account'}</span>
                </button>
                <button
                  onClick={() => setBookedResult(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Đặt thêm dịch vụ khác' : 'Book Another Service'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Not Logged In Notice Bar */}
              {!isAuthenticated && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {currentLang === 'vi'
                        ? 'Bạn chưa đăng nhập. Đăng ký tài khoản để tự động lưu thẻ điện tử & nhận điểm thưởng.'
                        : 'Sign up to automatically store your digital pass & claim reward points.'}
                    </span>
                  </div>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shrink-0 cursor-pointer shadow-xs"
                  >
                    {currentLang === 'vi' ? 'Đăng Ký Nhanh' : 'Sign Up'}
                  </button>
                </div>
              )}

              {/* FLIGHT FORM */}
              {activeType === 'flight' && (
                <form onSubmit={handleBookFlight} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {currentLang === 'vi' ? 'Chọn Hãng Hàng Không' : 'Airline'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Vietnam Airlines', name: 'Vietnam Airlines', tag: '4-Star National' },
                        { id: 'Vietjet Air', name: 'Vietjet Air', tag: 'Tiết kiệm / Eco' },
                        { id: 'Bamboo Airways', name: 'Bamboo Airways', tag: 'Hiếu khách' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAirline(item.id as any)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                            airline === item.id
                              ? 'border-sky-500 bg-sky-50/70 text-sky-900 ring-2 ring-sky-200 font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600'
                          }`}
                        >
                          <span className="block text-xs font-bold">{item.name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{item.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {currentLang === 'vi' ? 'Chặng bay nội địa' : 'Flight Route'}
                    </label>
                    <select
                      value={flightRoute}
                      onChange={(e) => setFlightRoute(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 font-medium"
                    >
                      {FLIGHT_ROUTES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.nameVi} — Từ {formatVND(r.basePrice)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Ngày bay' : 'Departure Date'}
                      </label>
                      <input
                        type="date"
                        required
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Hạng vé' : 'Seat Class'}
                      </label>
                      <select
                        value={seatClass}
                        onChange={(e) => setSeatClass(e.target.value as any)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                      >
                        <option value="Phổ thông (Economy)">Phổ thông (Economy)</option>
                        <option value="Thương gia (Business)">Thương gia (Business)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Số khách' : 'Passengers'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="9"
                        value={flightPassengers}
                        onChange={(e) => setFlightPassengers(parseInt(e.target.value) || 1)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {currentLang === 'vi' ? 'Họ và tên hành khách' : 'Passenger Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <span className="text-slate-500">
                      Tổng tiền dự tính: <strong className="text-sky-700 text-sm">
                        {formatVND(
                          ((FLIGHT_ROUTES.find((r) => r.id === flightRoute)?.basePrice || 1700000) *
                            (seatClass.includes('Thương gia') ? 2.2 : 1)) *
                            flightPassengers
                        )}
                      </strong>
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Plane className="w-4 h-4" />
                      <span>{currentLang === 'vi' ? 'Xác Nhận & Xuất Vé' : 'Confirm & Issue Ticket'}</span>
                    </button>
                  </div>

                  {/* Traveloka Direct Option */}
                  <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-[#0194f3] text-white shrink-0">
                        <Plane className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs text-sky-950 font-medium">
                        {currentLang === 'vi'
                          ? 'So sánh mọi khung giờ & giá vé trực tiếp qua Traveloka Partner.'
                          : 'Compare all schedules & live fares directly via Traveloka Partner.'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        closeBookingModal();
                        const routeObj = FLIGHT_ROUTES.find((r) => r.id === flightRoute) || FLIGHT_ROUTES[0];
                        openTravelokaModal('flight', {
                          originCode: routeObj.originCode,
                          destCode: routeObj.destCode,
                          date: departureDate,
                        });
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0194f3] hover:bg-[#007ce8] text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
                    >
                      {currentLang === 'vi' ? 'Mở Vé Bay Traveloka' : 'Open Traveloka Flights'}
                    </button>
                  </div>
                </form>
              )}

              {/* HOTEL FORM */}
              {activeType === 'hotel' && (
                <form onSubmit={handleBookHotel} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {currentLang === 'vi' ? 'Chọn Khách Sạn / Homestay Đặc Sắc' : 'Select Hotel / Homestay'}
                    </label>
                    <select
                      value={hotelChoice}
                      onChange={(e) => setHotelChoice(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 font-medium"
                    >
                      {HOTEL_LIST.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} — {h.loc} ({formatVND(h.pricePerNight)}/đêm)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>

                  <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Số khách' : 'Guests'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={hotelGuests}
                        onChange={(e) => setHotelGuests(parseInt(e.target.value) || 2)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {currentLang === 'vi' ? 'Loại phòng' : 'Room Type'}
                    </label>
                    <input
                      type="text"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {currentLang === 'vi' ? 'Yêu cầu đặc biệt (Không bắt buộc)' : 'Special Requests (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={hotelSpecialRequests}
                      onChange={(e) => setHotelSpecialRequests(e.target.value)}
                      placeholder={currentLang === 'vi' ? 'Ví dụ: Tầng cao, phòng yên tĩnh, nhận phòng sớm...' : 'e.g. Quiet room, high floor'}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <span className="text-slate-500">
                      Tổng tiền (3 đêm): <strong className="text-emerald-700 text-sm">
                        {formatVND((HOTEL_LIST.find((h) => h.id === hotelChoice)?.pricePerNight || 1600000) * 3)}
                      </strong>
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Home className="w-4 h-4" />
                      <span>{currentLang === 'vi' ? 'Xác Nhận Đặt Phòng' : 'Confirm Reservation'}</span>
                    </button>
                  </div>

                  {/* Traveloka Direct Option */}
                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-600 text-white shrink-0">
                        <Home className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs text-emerald-950 font-medium">
                        {currentLang === 'vi'
                          ? 'Tìm hơn 20.000 khách sạn & homestay giá tốt trực tiếp qua Traveloka.'
                          : 'Explore 20,000+ verified hotels & resorts directly on Traveloka.'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        closeBookingModal();
                        const hObj = HOTEL_LIST.find((h) => h.id === hotelChoice);
                        openTravelokaModal('hotel', {
                          cityId: hObj ? (hObj.region === 'North' ? 'ha-noi' : hObj.region === 'Central' ? 'da-nang' : 'phu-quoc') : 'da-nang',
                          date: checkInDate,
                        });
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
                    >
                      {currentLang === 'vi' ? 'Đặt Khách Sạn Traveloka' : 'Book on Traveloka'}
                    </button>
                  </div>
                </form>
              )}

              {/* COMBO FORM */}
              {activeType === 'combo' && (
                <form onSubmit={handleBookCombo} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>{currentLang === 'vi' ? 'Chọn Gói Combo Vé Máy Bay + Khách Sạn' : 'Select Flight + Hotel Bundle'}</span>
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                        Tiết kiệm tới 30%
                      </span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-200 custom-scrollbar">
                      {TRAVELOKA_POPULAR_COMBOS.map((combo) => (
                        <button
                          key={combo.id}
                          type="button"
                          onClick={() => setSelectedComboId(combo.id)}
                          className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex gap-2.5 items-center ${
                            selectedComboId === combo.id
                              ? 'border-amber-500 bg-amber-50/80 text-amber-950 ring-2 ring-amber-200 font-bold shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                            <img
                              src={combo.imageUrl}
                              alt={combo.titleVi}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold truncate flex items-center justify-between">
                              <span className="truncate">{currentLang === 'vi' ? combo.titleVi : combo.titleEn}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {combo.originAirport} ➔ {combo.destAirport} • {combo.durationVi}
                            </div>
                            <div className="text-xs font-black text-amber-700 mt-0.5">
                              {combo.priceVND}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {currentLang === 'vi' ? 'Hãng bay ưu tiên trong combo' : 'Preferred Airline'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Vietnam Airlines', name: 'Vietnam Airlines', tag: '4-Star National' },
                        { id: 'Vietjet Air', name: 'Vietjet Air', tag: 'Tiết kiệm / Eco' },
                        { id: 'Bamboo Airways', name: 'Bamboo Airways', tag: 'Hiếu khách' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setComboAirline(item.id as any)}
                          className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            comboAirline === item.id
                              ? 'border-amber-500 bg-amber-50/80 text-amber-950 ring-2 ring-amber-200 font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600'
                          }`}
                        >
                          <span className="block text-xs font-bold">{item.name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{item.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Ngày khởi hành' : 'Departure Date'}
                      </label>
                      <input
                        type="date"
                        required
                        value={comboDepDate}
                        onChange={(e) => setComboDepDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Ngày về' : 'Return Date'}
                      </label>
                      <input
                        type="date"
                        required
                        value={comboRetDate}
                        onChange={(e) => setComboRetDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Số khách' : 'Guests'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={comboGuests}
                        onChange={(e) => setComboGuests(parseInt(e.target.value) || 2)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Số phòng' : 'Rooms'}
                      </label>
                      <select
                        value={comboRooms}
                        onChange={(e) => setComboRooms(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 font-medium cursor-pointer"
                      >
                        <option value={1}>1 phòng</option>
                        <option value={2}>2 phòng</option>
                        <option value={3}>3 phòng</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Họ và tên người đại diện' : 'Contact Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={comboContactName}
                        onChange={(e) => setComboContactName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Số điện thoại' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={comboContactPhone}
                        onChange={(e) => setComboContactPhone(e.target.value)}
                        placeholder="0912 345 678"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <span className="text-slate-500">
                      Tổng combo ({comboGuests} khách): <strong className="text-amber-800 text-sm">
                        {formatVND(
                          (TRAVELOKA_POPULAR_COMBOS.find((c) => c.id === selectedComboId)?.priceNum || 2490000) *
                            comboGuests
                        )}
                      </strong>
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Gift className="w-4 h-4 stroke-[2.5]" />
                      <span>{currentLang === 'vi' ? 'Xác Nhận Đặt Combo' : 'Confirm Bundle Booking'}</span>
                    </button>
                  </div>

                  {/* Traveloka Direct Option */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-amber-500 text-slate-950 shrink-0">
                        <Gift className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs text-amber-950 font-medium">
                        {currentLang === 'vi'
                          ? 'Hoặc tra cứu trực tiếp toàn bộ gói combo vé bay + khách sạn trên Traveloka.'
                          : 'Or search full flight + hotel packages directly on official Traveloka.'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        closeBookingModal();
                        const cObj = TRAVELOKA_POPULAR_COMBOS.find((c) => c.id === selectedComboId);
                        openTravelokaModal('combo', {
                          originCode: cObj?.originAirport || 'HAN',
                          destCode: cObj?.destAirport || 'DAD',
                          date: comboDepDate,
                        });
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
                    >
                      {currentLang === 'vi' ? 'Mở Combo Trên Traveloka' : 'Open Traveloka Bundle'}
                    </button>
                  </div>
                </form>
              )}
              {activeType === 'tour' && (
                <form onSubmit={handleBookTour} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {currentLang === 'vi' ? 'Chọn Tour Du Lịch Tuyển Chọn' : 'Select Tour Package'}
                    </label>
                    <select
                      value={selectedTour}
                      onChange={(e) => setSelectedTour(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 font-medium"
                    >
                      {TOUR_LIST.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title} ({t.duration}) — {formatVND(t.pricePerPerson)}/khách
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Ngày khởi hành mong muốn' : 'Departure Date'}
                      </label>
                      <input
                        type="date"
                        required
                        value={tourStartDate}
                        onChange={(e) => setTourStartDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Số lượng khách' : 'Participants'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={tourParticipants}
                        onChange={(e) => setTourParticipants(parseInt(e.target.value) || 2)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Tên người liên hệ' : 'Contact Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={tourContactName}
                        onChange={(e) => setTourContactName(e.target.value)}
                        placeholder="Nguyễn Văn An"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {currentLang === 'vi' ? 'Số điện thoại' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={tourContactPhone}
                        onChange={(e) => setTourContactPhone(e.target.value)}
                        placeholder="0912 345 678"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <span className="text-slate-500">
                      Tổng tiền tour: <strong className="text-amber-800 text-sm">
                        {formatVND(
                          (TOUR_LIST.find((t) => t.id === selectedTour)?.pricePerPerson || 3990000) *
                            tourParticipants
                        )}
                      </strong>
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Compass className="w-4 h-4" />
                      <span>{currentLang === 'vi' ? 'Xác Nhận Book Tour' : 'Confirm Tour Booking'}</span>
                    </button>
                  </div>

                  {/* Traveloka Direct Option */}
                  <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-purple-600 text-white shrink-0">
                        <Compass className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs text-purple-950 font-medium">
                        {currentLang === 'vi'
                          ? 'Đặt vé Bà Nà Hills, Fansipan, VinWonders trực tiếp qua Traveloka Xperience.'
                          : 'Book Ba Na Hills, Fansipan, VinWonders passes via Traveloka Xperience.'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        closeBookingModal();
                        openTravelokaModal('xperience', {
                          date: tourStartDate,
                        });
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
                    >
                      {currentLang === 'vi' ? 'Mở Vé Vui Chơi Traveloka' : 'Open Traveloka Passes'}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
