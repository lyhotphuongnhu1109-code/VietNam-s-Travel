import React, { useState } from 'react';
import {
  X,
  User,
  Plane,
  Home,
  Compass,
  Award,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Plus,
  LogOut,
  Sparkles,
  Phone,
  Mail,
  Copy,
  Check,
  CreditCard,
  Ticket,
  ChevronRight,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FlightBooking, HotelBooking, TourBooking } from '../types/account';
import { Language } from '../types';

interface AccountHubModalProps {
  currentLang: Language;
}

export const AccountHubModal: React.FC<AccountHubModalProps> = ({ currentLang }) => {
  const {
    currentUser,
    bookings,
    isAccountModalOpen,
    accountModalTab,
    closeAccountModal,
    openAccountModal,
    openBookingModal,
    logout,
    updateProfile,
    cancelBooking,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'flights' | 'hotels' | 'tours'>(
    accountModalTab
  );

  // Sync tab when prop changes
  React.useEffect(() => {
    setActiveTab(accountModalTab);
  }, [accountModalTab]);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFullName, setEditFullName] = useState(currentUser?.fullName || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editPassport, setEditPassport] = useState(currentUser?.passportOrId || '');
  const [editNationality, setEditNationality] = useState(currentUser?.nationality || 'Việt Nam');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Sync profile values when currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      setEditFullName(currentUser.fullName);
      setEditPhone(currentUser.phone);
      setEditPassport(currentUser.passportOrId || '');
      setEditNationality(currentUser.nationality);
      setSelectedAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  if (!isAccountModalOpen || !currentUser) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editFullName,
      phone: editPhone,
      passportOrId: editPassport,
      nationality: editNationality,
      avatar: selectedAvatar,
    });
    setProfileSuccessMsg(
      currentLang === 'vi'
        ? 'Cập nhật thông tin hồ sơ du khách thành công!'
        : 'Profile updated successfully!'
    );
    setIsEditingProfile(false);
    setTimeout(() => setProfileSuccessMsg(''), 3000);
  };

  // Avatar presets
  const AVATAR_OPTIONS = [
    {
      id: 'av_1',
      label: 'Hội An Lantern',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'av_2',
      label: 'Sa Pa Explorer',
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'av_3',
      label: 'Highland Nature',
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'av_4',
      label: 'Heritage Lover',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeAccountModal}
    >
      <div
        className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-4xl w-full my-auto overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Digital Membership Card */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-sky-800 via-sky-700 to-teal-800 text-white relative shrink-0">
          <button
            onClick={closeAccountModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Digital Card Component */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-sky-900 flex items-center justify-center text-[10px] text-slate-950 font-black">
                  ★
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {currentUser.fullName}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/90 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    {currentUser.memberTier}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-sky-100 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-sky-300" />
                    {currentUser.email}
                  </span>
                  <span className="hidden sm:inline text-sky-300">•</span>
                  <span className="hidden sm:flex items-center gap-1">
                    <Phone className="w-3 h-3 text-sky-300" />
                    {currentUser.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick stats and rewards */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center">
                <span className="block text-[10px] uppercase font-bold text-sky-200">
                  {currentLang === 'vi' ? 'Điểm Sen Vàng' : 'Lotus Points'}
                </span>
                <span className="text-base sm:text-lg font-black text-amber-300">
                  {currentUser.rewardPoints.toLocaleString()}
                </span>
              </div>

              <button
                onClick={logout}
                className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-white/10 hover:bg-red-500/80 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                title={currentLang === 'vi' ? 'Đăng xuất' : 'Log Out'}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLang === 'vi' ? 'Thoát' : 'Log Out'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-5 flex overflow-x-auto gap-1 bg-black/20 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xs">
            <button
              onClick={() => setActiveTab('flights')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'flights'
                  ? 'bg-white text-sky-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Vé Máy Bay' : 'Flights'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-sky-100 text-sky-800 font-black">
                {bookings.flights.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'hotels'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Khách Sạn & Stays' : 'Hotels'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-black">
                {bookings.hotels.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('tours')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'tours'
                  ? 'bg-white text-amber-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Tour Du Lịch' : 'Tours'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900 font-black">
                {bookings.tours.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'profile'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Hồ Sơ & Thẻ' : 'Profile & Card'}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Notification */}
          {profileSuccessMsg && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{profileSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: FLIGHT BOOKINGS */}
          {activeTab === 'flights' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Plane className="w-4 h-4 text-sky-600" />
                    <span>{currentLang === 'vi' ? 'Vé Máy Bay Điện Tử (E-Tickets)' : 'Flight E-Tickets'}</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentLang === 'vi'
                      ? 'Lưu trữ thẻ lên máy bay, mã QR và chi tiết chuyến bay'
                      : 'Store your boarding passes, QR codes, and flight itineraries'}
                  </p>
                </div>

                <button
                  onClick={() => openBookingModal('flight')}
                  className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{currentLang === 'vi' ? 'Đặt Thêm Vé' : 'Book Flight'}</span>
                </button>
              </div>

              {bookings.flights.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-3xl bg-slate-50 border border-dashed border-slate-200">
                  <Plane className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    {currentLang === 'vi'
                      ? 'Bạn chưa có vé máy bay nào được đặt.'
                      : 'You do not have any flight bookings yet.'}
                  </p>
                  <button
                    onClick={() => openBookingModal('flight')}
                    className="mt-3 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{currentLang === 'vi' ? 'Mua vé máy bay ngay' : 'Book a Flight Ticket'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.flights.map((flight) => (
                    <div
                      key={flight.id}
                      className="bg-gradient-to-r from-sky-50/50 via-white to-sky-50/30 rounded-3xl border border-sky-200/80 p-5 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
                    >
                      {/* Top Bar of the Boarding Pass */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-sky-600 text-white text-xs font-black">
                            {flight.airline}
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            Số hiệu: {flight.flightNumber}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            onClick={() => handleCopyCode(flight.bookingCode)}
                            className="px-2.5 py-1 rounded-lg bg-white border border-sky-200 text-sky-800 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer hover:bg-sky-50"
                            title="Sao chép mã PNR"
                          >
                            <span>PNR: {flight.bookingCode}</span>
                            {copiedCode === flight.bookingCode ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-400" />
                            )}
                          </span>

                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              flight.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {flight.status === 'confirmed'
                              ? currentLang === 'vi'
                                ? '✓ Đã xác nhận'
                                : 'Confirmed'
                              : flight.status}
                          </span>
                        </div>
                      </div>

                      {/* Flight Origin to Destination Visual */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4">
                        {/* Origin */}
                        <div>
                          <span className="text-2xl font-black text-slate-900 block tracking-tight">
                            {flight.originCode}
                          </span>
                          <span className="text-xs font-bold text-slate-700 block">
                            {flight.origin}
                          </span>
                          <span className="text-[11px] text-sky-700 font-semibold block mt-0.5">
                            {flight.departureTime} • {flight.departureDate}
                          </span>
                        </div>

                        {/* Mid Indicator */}
                        <div className="text-center px-2">
                          <span className="text-[11px] text-slate-400 block mb-1">
                            {flight.seatClass}
                          </span>
                          <div className="relative flex items-center justify-center">
                            <div className="w-full border-t border-dashed border-sky-300" />
                            <Plane className="w-4 h-4 text-sky-600 absolute rotate-90 bg-white px-0.5" />
                          </div>
                          <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                            {currentLang === 'vi' ? 'Bay thẳng (Direct)' : 'Direct Flight'}
                          </span>
                        </div>

                        {/* Destination */}
                        <div className="sm:text-right">
                          <span className="text-2xl font-black text-slate-900 block tracking-tight">
                            {flight.destCode}
                          </span>
                          <span className="text-xs font-bold text-slate-700 block">
                            {flight.destination}
                          </span>
                          <span className="text-[11px] text-sky-700 font-semibold block mt-0.5">
                            {flight.arrivalTime} (Dự kiến)
                          </span>
                        </div>
                      </div>

                      {/* Passenger Details & QR Code Bar */}
                      <div className="pt-3 border-t border-sky-100/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="text-slate-600">
                            <span className="font-semibold text-slate-700">
                              {currentLang === 'vi' ? 'Hành khách: ' : 'Passengers: '}
                            </span>
                            {flight.passengerNames.join(', ')} ({flight.passengers} khách)
                          </div>
                          <div className="text-slate-500 text-[11px] flex items-center gap-3">
                            <span>
                              <strong>Cửa (Gate):</strong> {flight.gate || '04'}
                            </span>
                            <span>
                              <strong>Ghế:</strong> {flight.seatNumber || 'Hàng 12'}
                            </span>
                            <span>
                              <strong>Tổng tiền:</strong> {formatVND(flight.totalPriceVND)}
                            </span>
                          </div>
                        </div>

                        {/* QR Code Simulation Badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-sky-100 shadow-2xs">
                          <QrCode className="w-7 h-7 text-slate-900" />
                          <div className="text-[10px] leading-tight">
                            <span className="font-bold text-slate-900 block">Thẻ lên tàu bay</span>
                            <span className="text-slate-400">Scan at boarding</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HOTEL BOOKINGS */}
          {activeTab === 'hotels' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Home className="w-4 h-4 text-emerald-600" />
                    <span>{currentLang === 'vi' ? 'Khách Sạn & Homestay Đã Đặt' : 'Hotel Reservations'}</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentLang === 'vi'
                      ? 'Phiếu xác nhận đặt phòng, ngày check-in và hỗ trợ dịch vụ lưu trú'
                      : 'Hotel confirmation vouchers, check-in dates, and contact info'}
                  </p>
                </div>

                <button
                  onClick={() => openBookingModal('hotel')}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{currentLang === 'vi' ? 'Đặt Phòng Mới' : 'Book Stay'}</span>
                </button>
              </div>

              {bookings.hotels.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-3xl bg-slate-50 border border-dashed border-slate-200">
                  <Home className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    {currentLang === 'vi'
                      ? 'Bạn chưa có đặt phòng khách sạn hay homestay nào.'
                      : 'You do not have any hotel reservations yet.'}
                  </p>
                  <button
                    onClick={() => openBookingModal('hotel')}
                    className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{currentLang === 'vi' ? 'Đặt phòng ngay' : 'Book a Hotel'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.hotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-xs hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-1 inline-block">
                            {hotel.region === 'North' ? 'Miền Bắc' : hotel.region === 'Central' ? 'Miền Trung' : 'Miền Nam'}
                          </span>
                          <h5 className="text-base font-bold text-slate-900">
                            {hotel.hotelName}
                          </h5>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{hotel.location}</span>
                          </p>
                        </div>

                        <div className="text-right">
                          <span
                            onClick={() => handleCopyCode(hotel.bookingCode)}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-bold inline-flex items-center gap-1 cursor-pointer hover:bg-slate-100"
                            title="Sao chép mã phòng"
                          >
                            <span>Mã: {hotel.bookingCode}</span>
                            {copiedCode === hotel.bookingCode ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-400" />
                            )}
                          </span>
                          <span className="block text-xs font-black text-emerald-700 mt-1">
                            {formatVND(hotel.totalPriceVND)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 px-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Check-in</span>
                          <span className="font-bold text-slate-800">{hotel.checkInDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Check-out</span>
                          <span className="font-bold text-slate-800">{hotel.checkOutDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Thời gian</span>
                          <span className="font-bold text-slate-800">{hotel.nights} đêm</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Số khách</span>
                          <span className="font-bold text-slate-800">{hotel.guests} khách</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600">
                        <strong>Loại phòng:</strong> {hotel.roomType}
                        {hotel.specialRequests && (
                          <div className="text-[11px] text-slate-500 mt-1 italic">
                            Yêu cầu: "{hotel.specialRequests}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TOUR BOOKINGS */}
          {activeTab === 'tours' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>{currentLang === 'vi' ? 'Tour Du Lịch Đã Đặt' : 'Booked Travel Tours'}</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentLang === 'vi'
                      ? 'Lịch trình trọn gói, hướng dẫn viên và điểm hẹn xuất phát'
                      : 'Curated tour itineraries, guides, and meeting points'}
                  </p>
                </div>

                <button
                  onClick={() => openBookingModal('tour')}
                  className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{currentLang === 'vi' ? 'Book Tour Mới' : 'Book Tour'}</span>
                </button>
              </div>

              {bookings.tours.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-3xl bg-slate-50 border border-dashed border-slate-200">
                  <Compass className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    {currentLang === 'vi'
                      ? 'Bạn chưa có tour du lịch nào được book.'
                      : 'You do not have any booked tours yet.'}
                  </p>
                  <button
                    onClick={() => openBookingModal('tour')}
                    className="mt-3 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{currentLang === 'vi' ? 'Khám phá & Book tour' : 'Browse & Book Tours'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.tours.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-white rounded-3xl border border-amber-200/80 p-5 shadow-xs hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-1 inline-block">
                            {tour.duration}
                          </span>
                          <h5 className="text-base font-bold text-slate-900">
                            {tour.tourTitle}
                          </h5>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Phong cách: {tour.tourStyle}
                          </p>
                        </div>

                        <div className="text-right">
                          <span
                            onClick={() => handleCopyCode(tour.bookingCode)}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-bold inline-flex items-center gap-1 cursor-pointer hover:bg-slate-100"
                            title="Sao chép mã tour"
                          >
                            <span>Mã: {tour.bookingCode}</span>
                            {copiedCode === tour.bookingCode ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-400" />
                            )}
                          </span>
                          <span className="block text-xs font-black text-amber-800 mt-1">
                            {formatVND(tour.totalPriceVND)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-amber-50/40 p-3 rounded-2xl border border-amber-100">
                        <div>
                          <strong>Ngày khởi hành:</strong> {tour.startDate}
                        </div>
                        <div>
                          <strong>Số người tham gia:</strong> {tour.participants} người
                        </div>
                        <div className="sm:col-span-2">
                          <strong>Điểm đón & Hướng dẫn viên:</strong> {tour.departureLocation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE & MEMBERSHIP CARD */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Membership Benefits Box */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-amber-700" />
                  <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                    {currentLang === 'vi'
                      ? 'Quyền Lợi Hội Viên Bông Sen Vàng'
                      : 'Golden Lotus Member Privileges'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-amber-900 mt-3">
                  <div className="p-2.5 bg-white/70 rounded-xl border border-amber-200/60">
                    <span className="font-bold block mb-0.5">🎫 Vé Máy Bay</span>
                    <span>Được hỗ trợ đổi giờ bay miễn phí 1 lần & chọn chỗ ngồi ưu tiên.</span>
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-xl border border-amber-200/60">
                    <span className="font-bold block mb-0.5">🏨 Khách Sạn & Stays</span>
                    <span>Giảm thêm 10-15% tại các khu nghỉ dưỡng và homestay bản địa liên kết.</span>
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-xl border border-amber-200/60">
                    <span className="font-bold block mb-0.5">🎁 54 Dân Tộc</span>
                    <span>Tích điểm đổi quà lưu niệm thổ cẩm đặc sắc và cẩm nang du lịch độc bản.</span>
                  </div>
                </div>
              </div>

              {/* Personal Information Form */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-sky-600" />
                    <span>{currentLang === 'vi' ? 'Thông Tin Cá Nhân Du Khách' : 'Traveler Profile Info'}</span>
                  </h4>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{currentLang === 'vi' ? 'Chỉnh Sửa' : 'Edit'}</span>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    {/* Avatar Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {currentLang === 'vi' ? 'Chọn Ảnh Đại Diện (Avatar)' : 'Choose Avatar'}
                      </label>
                      <div className="flex items-center gap-3">
                        {AVATAR_OPTIONS.map((av) => (
                          <button
                            type="button"
                            key={av.id}
                            onClick={() => setSelectedAvatar(av.url)}
                            className={`p-1 rounded-2xl transition-all cursor-pointer ${
                              selectedAvatar === av.url
                                ? 'ring-3 ring-sky-500 scale-105 shadow-md'
                                : 'opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={av.url}
                              alt={av.label}
                              className="w-12 h-12 rounded-xl object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          {currentLang === 'vi' ? 'Họ và tên *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={editFullName}
                          onChange={(e) => setEditFullName(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          {currentLang === 'vi' ? 'Số điện thoại *' : 'Phone Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          {currentLang === 'vi' ? 'Số Hộ chiếu / CCCD' : 'Passport / ID Number'}
                        </label>
                        <input
                          type="text"
                          value={editPassport}
                          onChange={(e) => setEditPassport(e.target.value)}
                          placeholder="001298012345"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          {currentLang === 'vi' ? 'Quốc tịch' : 'Nationality'}
                        </label>
                        <input
                          type="text"
                          value={editNationality}
                          onChange={(e) => setEditNationality(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        {currentLang === 'vi' ? 'Lưu Thay Đổi' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                      >
                        {currentLang === 'vi' ? 'Hủy' : 'Cancel'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-0.5">Họ và tên:</span>
                      <span className="font-bold text-slate-900 text-sm">{currentUser.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Địa chỉ Email:</span>
                      <span className="font-bold text-slate-900">{currentUser.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Số điện thoại:</span>
                      <span className="font-bold text-slate-900">{currentUser.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Quốc tịch:</span>
                      <span className="font-bold text-slate-900">{currentUser.nationality}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Số CCCD / Hộ chiếu:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {currentUser.passportOrId || 'Chưa cập nhật'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Ngày tham gia:</span>
                      <span className="font-bold text-slate-900">{currentUser.createdAt}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
