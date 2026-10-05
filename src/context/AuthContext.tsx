import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  FlightBooking,
  HotelBooking,
  TourBooking,
  BookingState,
} from '../types/account';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  bookings: BookingState;
  // Auth actions
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
    nationality: string;
  }) => Promise<{ success: boolean; message: string }>;
  login: (emailOrPhone: string, pass: string) => Promise<{ success: boolean; message: string }>;
  loginDemoUser: () => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  // Booking actions
  addFlightBooking: (booking: Omit<FlightBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => FlightBooking;
  addHotelBooking: (booking: Omit<HotelBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => HotelBooking;
  addTourBooking: (booking: Omit<TourBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => TourBooking;
  cancelBooking: (type: 'flights' | 'hotels' | 'tours', id: string) => void;
  // UI Modal controllers
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  isAccountModalOpen: boolean;
  accountModalTab: 'profile' | 'flights' | 'hotels' | 'tours';
  openAccountModal: (tab?: 'profile' | 'flights' | 'hotels' | 'tours') => void;
  closeAccountModal: () => void;
  isBookingModalOpen: boolean;
  bookingModalType: 'flight' | 'hotel' | 'combo' | 'tour';
  bookingModalInitialData: any;
  openBookingModal: (type: 'flight' | 'hotel' | 'combo' | 'tour', initialData?: any) => void;
  closeBookingModal: () => void;
  // Traveloka modal controller
  isTravelokaModalOpen: boolean;
  travelokaModalTab: 'flight' | 'hotel' | 'combo' | 'xperience' | 'promo';
  travelokaPrefill: { originCode?: string; destCode?: string; cityId?: string; date?: string } | null;
  openTravelokaModal: (
    tab?: 'flight' | 'hotel' | 'combo' | 'xperience' | 'promo',
    prefill?: { originCode?: string; destCode?: string; cityId?: string; date?: string }
  ) => void;
  closeTravelokaModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr_demo_888',
  fullName: 'Nguyễn Hoàng Long',
  email: 'hoanglong.traveler@gmail.com',
  phone: '0912 345 678',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  nationality: 'Việt Nam',
  memberTier: 'Vàng (Gold)',
  rewardPoints: 2450,
  passportOrId: '001298012345',
  createdAt: '2026-01-15',
};

const INITIAL_DEMO_BOOKINGS: BookingState = {
  flights: [
    {
      id: 'fl_001',
      bookingCode: 'VN-FL-8924',
      airline: 'Vietnam Airlines',
      flightNumber: 'VN 182',
      origin: 'Hà Nội (Nội Bài - HAN)',
      originCode: 'HAN',
      destination: 'Đà Nẵng (Sân bay Đà Nẵng - DAD)',
      destCode: 'DAD',
      departureDate: '2026-10-15',
      departureTime: '08:30',
      arrivalTime: '09:50',
      seatClass: 'Phổ thông (Economy)',
      passengers: 2,
      passengerNames: ['Nguyễn Hoàng Long', 'Trần Thu Trang'],
      totalPriceVND: 3400000,
      gate: '06',
      seatNumber: '14A, 14B',
      status: 'confirmed',
      createdAt: '2026-09-20',
    },
  ],
  hotels: [
    {
      id: 'ht_001',
      bookingCode: 'VN-HT-5612',
      hotelName: 'Silk Sense Hoi An River Resort & Spa',
      location: 'Phố Cổ Hội An, Tỉnh Quảng Nam',
      region: 'Central',
      checkInDate: '2026-10-15',
      checkOutDate: '2026-10-18',
      roomType: 'Phòng Deluxe Hướng Sông Hoài (Bao gồm buffet sáng)',
      nights: 3,
      guests: 2,
      guestName: 'Nguyễn Hoàng Long',
      guestPhone: '0912 345 678',
      totalPriceVND: 4800000,
      status: 'confirmed',
      specialRequests: 'Tầng cao, phòng không hút thuốc, hỗ trợ đưa đón sân bay Đà Nẵng',
      createdAt: '2026-09-20',
    },
  ],
  tours: [
    {
      id: 'tr_001',
      bookingCode: 'VN-TR-3391',
      tourTitle: 'Hành Trình Di Sản Miền Trung (Huế - Ngũ Hành Sơn - Hội An)',
      duration: '4 Ngày 3 Đêm',
      startDate: '2026-10-15',
      departureLocation: 'Sân bay Quốc tế Đà Nẵng (HDV đón)',
      participants: 2,
      contactName: 'Nguyễn Hoàng Long',
      contactPhone: '0912 345 678',
      totalPriceVND: 7980000,
      tourStyle: 'Văn hóa di sản & Ẩm thực cung đình',
      status: 'confirmed',
      createdAt: '2026-09-20',
    },
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load current user from localStorage
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('vietnam_travel_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Load all users dictionary (email/phone -> user data)
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, UserProfile & { password?: string }>>(() => {
    try {
      const saved = localStorage.getItem('vietnam_travel_users');
      return saved ? JSON.parse(saved) : { [DEMO_USER.email]: DEMO_USER };
    } catch {
      return { [DEMO_USER.email]: DEMO_USER };
    }
  });

  // Load bookings for current user or default demo
  const [bookings, setBookings] = useState<BookingState>(() => {
    try {
      const saved = localStorage.getItem('vietnam_travel_bookings');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountModalTab, setAccountModalTab] = useState<'profile' | 'flights' | 'hotels' | 'tours'>('profile');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalType, setBookingModalType] = useState<'flight' | 'hotel' | 'combo' | 'tour'>('flight');
  const [bookingModalInitialData, setBookingModalInitialData] = useState<any>(null);

  // Traveloka modal state
  const [isTravelokaModalOpen, setIsTravelokaModalOpen] = useState(false);
  const [travelokaModalTab, setTravelokaModalTab] = useState<'flight' | 'hotel' | 'combo' | 'xperience' | 'promo'>('flight');
  const [travelokaPrefill, setTravelokaPrefill] = useState<{ originCode?: string; destCode?: string; cityId?: string; date?: string } | null>(null);

  const openTravelokaModal = (
    tab: 'flight' | 'hotel' | 'combo' | 'xperience' | 'promo' = 'flight',
    prefill?: { originCode?: string; destCode?: string; cityId?: string; date?: string }
  ) => {
    setTravelokaModalTab(tab);
    setTravelokaPrefill(prefill || null);
    setIsTravelokaModalOpen(true);
  };
  const closeTravelokaModal = () => {
    setIsTravelokaModalOpen(false);
    setTravelokaPrefill(null);
  };

  // Sync current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vietnam_travel_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vietnam_travel_current_user');
    }
  }, [currentUser]);

  // Sync users dictionary to localStorage
  useEffect(() => {
    localStorage.setItem('vietnam_travel_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('vietnam_travel_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Register function
  const register = async (data: {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
    nationality: string;
  }) => {
    const emailKey = data.email.toLowerCase().trim();
    if (registeredUsers[emailKey]) {
      return { success: false, message: 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.' };
    }

    const newUser: UserProfile & { password?: string } = {
      id: `usr_${Date.now()}`,
      fullName: data.fullName.trim(),
      email: emailKey,
      phone: data.phone.trim(),
      password: data.password || '123456',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      nationality: data.nationality || 'Việt Nam',
      memberTier: 'Đồng (Bronze)',
      rewardPoints: 500, // Welcome bonus points!
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRegisteredUsers((prev) => ({ ...prev, [emailKey]: newUser }));
    setCurrentUser(newUser);
    return { success: true, message: 'Đăng ký tài khoản thành công! Bạn nhận được 500 Điểm thưởng Sen Vàng chào mừng.' };
  };

  // Login function
  const login = async (emailOrPhone: string, pass: string) => {
    const target = emailOrPhone.toLowerCase().trim();
    const allUsers = Object.values(registeredUsers) as (UserProfile & { password?: string })[];
    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === target || (u.phone && u.phone.replace(/\s+/g, '') === target.replace(/\s+/g, ''))
    );

    if (!foundUser) {
      // Allow demo user login fallback
      if (target.includes('demo') || target.includes('admin') || target === '0912345678') {
        setCurrentUser(DEMO_USER);
        return { success: true, message: 'Đăng nhập thành công với tài khoản trải nghiệm du khách!' };
      }
      return { success: false, message: 'Không tìm thấy tài khoản với email hoặc số điện thoại này.' };
    }

    if (foundUser.password && foundUser.password !== pass && pass !== '123456') {
      return { success: false, message: 'Mật khẩu không chính xác. Mẹo: bạn có thể dùng 123456 cho tài khoản mẫu.' };
    }

    setCurrentUser(foundUser);
    return { success: true, message: `Chào mừng ${foundUser.fullName} quay trở lại VIETNAM'S TRAVEL!` };
  };

  // Demo user quick login
  const loginDemoUser = () => {
    setCurrentUser(DEMO_USER);
    setRegisteredUsers((prev) => ({ ...prev, [DEMO_USER.email]: DEMO_USER }));
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAccountModalOpen(false);
  };

  // Update profile
  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setRegisteredUsers((prev) => ({
      ...prev,
      [updated.email.toLowerCase()]: { ...prev[updated.email.toLowerCase()], ...updated },
    }));
  };

  // Add flight booking
  const addFlightBooking = (bookingData: Omit<FlightBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => {
    const randomCode = `VN-FL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newFlight: FlightBooking = {
      ...bookingData,
      id: `fl_${Date.now()}`,
      bookingCode: randomCode,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed',
    };

    setBookings((prev) => ({
      ...prev,
      flights: [newFlight, ...prev.flights],
    }));

    // Reward points (+100 pts per 1,000,000 VND)
    if (currentUser) {
      const addedPoints = Math.round(newFlight.totalPriceVND / 10000);
      updateProfile({ rewardPoints: currentUser.rewardPoints + addedPoints });
    }

    return newFlight;
  };

  // Add hotel booking
  const addHotelBooking = (bookingData: Omit<HotelBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => {
    const randomCode = `VN-HT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newHotel: HotelBooking = {
      ...bookingData,
      id: `ht_${Date.now()}`,
      bookingCode: randomCode,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed',
    };

    setBookings((prev) => ({
      ...prev,
      hotels: [newHotel, ...prev.hotels],
    }));

    if (currentUser) {
      const addedPoints = Math.round(newHotel.totalPriceVND / 10000);
      updateProfile({ rewardPoints: currentUser.rewardPoints + addedPoints });
    }

    return newHotel;
  };

  // Add tour booking
  const addTourBooking = (bookingData: Omit<TourBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => {
    const randomCode = `VN-TR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTour: TourBooking = {
      ...bookingData,
      id: `tr_${Date.now()}`,
      bookingCode: randomCode,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed',
    };

    setBookings((prev) => ({
      ...prev,
      tours: [newTour, ...prev.tours],
    }));

    if (currentUser) {
      const addedPoints = Math.round(newTour.totalPriceVND / 10000);
      updateProfile({ rewardPoints: currentUser.rewardPoints + addedPoints });
    }

    return newTour;
  };

  // Cancel booking
  const cancelBooking = (type: 'flights' | 'hotels' | 'tours', id: string) => {
    setBookings((prev) => ({
      ...prev,
      [type]: (prev[type] as any[]).map((item) =>
        item.id === id ? { ...item, status: 'cancelled' } : item
      ),
    }));
  };

  // Modal handlers
  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openAccountModal = (tab: 'profile' | 'flights' | 'hotels' | 'tours' = 'profile') => {
    setAccountModalTab(tab);
    setIsAccountModalOpen(true);
  };
  const closeAccountModal = () => setIsAccountModalOpen(false);

  const openBookingModal = (type: 'flight' | 'hotel' | 'combo' | 'tour', initialData?: any) => {
    setBookingModalType(type);
    setBookingModalInitialData(initialData || null);
    setIsBookingModalOpen(true);
  };
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingModalInitialData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        bookings,
        register,
        login,
        loginDemoUser,
        logout,
        updateProfile,
        addFlightBooking,
        addHotelBooking,
        addTourBooking,
        cancelBooking,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        isAccountModalOpen,
        accountModalTab,
        openAccountModal,
        closeAccountModal,
        isBookingModalOpen,
        bookingModalType,
        bookingModalInitialData,
        openBookingModal,
        closeBookingModal,
        isTravelokaModalOpen,
        travelokaModalTab,
        travelokaPrefill,
        openTravelokaModal,
        closeTravelokaModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
