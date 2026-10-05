import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Plane,
  Home,
  Compass,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';

interface AuthModalProps {
  currentLang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ currentLang }) => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    openAuthModal,
    register,
    login,
    loginDemoUser,
    openAccountModal,
  } = useAuth();

  // Tab switch within modal
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(authModalTab);

  // Sync when prop changes
  React.useEffect(() => {
    setActiveTab(authModalTab);
  }, [authModalTab]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nationality, setNationality] = useState('Việt Nam');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Login states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Status message
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setErrorMsg(
        currentLang === 'vi'
          ? 'Vui lòng điền đầy đủ các thông tin bắt buộc (*).'
          : 'Please fill in all required fields (*).'
      );
      return;
    }

    if (password.length < 6) {
      setErrorMsg(
        currentLang === 'vi'
          ? 'Mật khẩu phải có ít nhất 6 ký tự để bảo vệ tài khoản.'
          : 'Password must be at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(
        currentLang === 'vi'
          ? 'Mật khẩu xác nhận không khớp.'
          : 'Passwords do not match.'
      );
      return;
    }

    if (!agreeTerms) {
      setErrorMsg(
        currentLang === 'vi'
          ? 'Vui lòng đồng ý với Điều khoản dịch vụ du khách.'
          : 'Please accept the Tourist Service Terms.'
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await register({
        fullName,
        email,
        phone,
        password,
        nationality,
      });

      if (res.success) {
        setSuccessMsg(
          currentLang === 'vi'
            ? 'Đăng ký tài khoản thành công! Tặng bạn 500 Điểm thưởng Sen Vàng chào mừng.'
            : 'Registration successful! You received 500 Golden Lotus welcome points.'
        );
        setTimeout(() => {
          closeAuthModal();
          openAccountModal('profile');
        }, 1200);
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg(
        currentLang === 'vi' ? 'Đã xảy ra lỗi khi tạo tài khoản.' : 'An error occurred during registration.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMsg(
        currentLang === 'vi'
          ? 'Vui lòng nhập Email / Số điện thoại và Mật khẩu.'
          : 'Please enter Email / Phone and Password.'
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(loginIdentifier, loginPassword);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          closeAuthModal();
          openAccountModal('profile');
        }, 900);
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg(
        currentLang === 'vi' ? 'Lỗi đăng nhập. Vui lòng thử lại.' : 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    loginDemoUser();
    setSuccessMsg(
      currentLang === 'vi'
        ? 'Đã đăng nhập thành công với tài khoản mẫu (VIP Gold)!'
        : 'Logged in as Demo VIP Gold Traveler!'
    );
    setTimeout(() => {
      closeAuthModal();
      openAccountModal('flights');
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-xl w-full my-auto overflow-hidden text-slate-800 transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-6 bg-gradient-to-r from-sky-700 via-sky-600 to-teal-700 text-white relative shrink-0">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0">
              <img
                src="/src/assets/images/app_logo_1791123199904.jpg"
                alt="VIETNAM'S TRAVEL"
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 text-slate-950" />
                  <span>VIETNAM'S TRAVEL PASS</span>
                </div>
              </div>
              <span className="text-[11px] text-sky-100 font-medium block mt-0.5">
                {currentLang === 'vi' ? 'Cổng Dịch Vụ Du Khách • THE LAND OF ENDLESS DISCOVERY' : 'Traveler Portal • THE LAND OF ENDLESS DISCOVERY'}
              </span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {activeTab === 'register'
              ? currentLang === 'vi'
                ? 'Đăng Ký Tài Khoản Du Khách'
                : 'Create Traveler Account'
              : currentLang === 'vi'
              ? 'Đăng Nhập Tài Khoản Du Khách'
              : 'Log In to Traveler Account'}
          </h3>
          <p className="text-xs text-sky-100 mt-1 max-w-md">
            {activeTab === 'register'
              ? currentLang === 'vi'
                ? 'Đăng ký miễn phí để mua vé máy bay, đặt phòng khách sạn, book tour du lịch và nhận ưu đãi độc quyền 54 dân tộc.'
                : 'Free registration to book flights, stays, tours and collect Golden Lotus loyalty rewards.'
              : currentLang === 'vi'
              ? 'Quản lý vé máy bay điện tử, mã đặt phòng khách sạn và lịch trình du lịch của bạn.'
              : 'Manage your flight e-tickets, hotel reservations, and custom itineraries.'}
          </p>

          {/* Tab Switch Buttons inside Modal Header */}
          <div className="mt-4 flex bg-white/15 p-1 rounded-2xl border border-white/20 backdrop-blur-xs">
            <button
              onClick={() => {
                setActiveTab('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-sky-800 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Đăng Ký Mới' : 'Register'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-sky-800 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Đăng Nhập' : 'Log In'}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Notification Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Perks Bar */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-[11px] text-slate-700">
            <div className="flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="font-semibold">{currentLang === 'vi' ? 'Vé Máy Bay QR' : 'E-Ticket QR'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold">{currentLang === 'vi' ? 'Đặt Khách Sạn' : 'Hotel Stays'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-semibold">{currentLang === 'vi' ? '+500 Điểm Sen' : '+500 Points'}</span>
            </div>
          </div>

          {/* TAB 1: REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {currentLang === 'vi' ? 'Họ và tên du khách *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={currentLang === 'vi' ? 'Ví dụ: Nguyễn Văn An' : 'e.g. John Smith'}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {currentLang === 'vi' ? 'Địa chỉ Email *' : 'Email Address *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {currentLang === 'vi' ? 'Số điện thoại *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={currentLang === 'vi' ? '0912 345 678' : '+84 912 345 678'}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {currentLang === 'vi' ? 'Mật khẩu *' : 'Password *'}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {currentLang === 'vi' ? 'Xác nhận mật khẩu *' : 'Confirm Password *'}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {currentLang === 'vi' ? 'Quốc tịch / Nationality' : 'Nationality'}
                </label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="Việt Nam">🇻🇳 Việt Nam (Vietnamese Citizen)</option>
                  <option value="Hoa Kỳ (USA)">🇺🇸 Hoa Kỳ (United States)</option>
                  <option value="Hàn Quốc (Korea)">🇰🇷 Hàn Quốc (South Korea)</option>
                  <option value="Nhật Bản (Japan)">🇯🇵 Nhật Bản (Japan)</option>
                  <option value="Úc (Australia)">🇦🇺 Úc (Australia)</option>
                  <option value="Pháp (France)">🇫🇷 Pháp (France)</option>
                  <option value="Anh (UK)">🇬🇧 Vương Quốc Anh (United Kingdom)</option>
                  <option value="Đức (Germany)">🇩🇪 Đức (Germany)</option>
                  <option value="Khác">🌏 Quốc gia khác (Other)</option>
                </select>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-slate-600 leading-snug cursor-pointer">
                  {currentLang === 'vi' ? (
                    <>
                      Tôi đồng ý với{' '}
                      <span className="text-sky-600 font-semibold underline">
                        Điều khoản Dịch vụ Du lịch
                      </span>{' '}
                      và cam kết bảo mật thông tin đặt vé máy bay, khách sạn & tour theo chuẩn Quốc gia.
                    </>
                  ) : (
                    <>
                      I agree to the{' '}
                      <span className="text-sky-600 font-semibold underline">
                        Tourist Service Terms
                      </span>{' '}
                      and data privacy policy for travel reservations.
                    </>
                  )}
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {currentLang === 'vi'
                        ? 'Hoàn Tất Đăng Ký & Nhận 500 Điểm Sen Vàng'
                        : 'Register & Claim 500 Welcome Points'}
                    </span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: LOGIN FORM */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {currentLang === 'vi' ? 'Email hoặc Số điện thoại *' : 'Email or Phone Number *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder={
                        currentLang === 'vi'
                          ? 'Nhập email hoặc SĐT (Ví dụ: hoanglong.traveler@gmail.com)'
                          : 'Enter email or phone'
                      }
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {currentLang === 'vi' ? 'Mật khẩu *' : 'Password *'}
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          currentLang === 'vi'
                            ? 'Mẹo trải nghiệm nhanh: Bạn có thể bấm nút "Đăng nhập nhanh 1-Click" bên dưới để đăng nhập ngay mà không cần mật khẩu!'
                            : 'Quick tip: You can click the 1-Click Demo Login button below!'
                        )
                      }
                      className="text-[11px] text-sky-600 hover:underline cursor-pointer"
                    >
                      {currentLang === 'vi' ? 'Quên mật khẩu?' : 'Forgot password?'}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>{currentLang === 'vi' ? 'Đăng Nhập Ngay' : 'Log In Now'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Instant 1-Click Demo Login for Quick Testing */}
              <div className="relative pt-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 text-[11px] font-semibold">
                    {currentLang === 'vi' ? 'Hoặc trải nghiệm ngay' : 'Or quick access'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>
                  {currentLang === 'vi'
                    ? '⚡ Đăng nhập nhanh 1-Click (Tài khoản VIP có sẵn Vé máy bay, Khách sạn, Tour)'
                    : '⚡ 1-Click Instant Demo Login (Pre-loaded with Tickets & Stays)'}
                </span>
              </button>
            </div>
          )}

          {/* Footer Security Badge */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {currentLang === 'vi'
                ? 'Dữ liệu cá nhân & thanh toán được mã hóa an toàn 256-bit SSL'
                : 'Personal & booking data secured by 256-bit SSL encryption'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
