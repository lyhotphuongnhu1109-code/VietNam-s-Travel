/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroIntro } from './components/HeroIntro';
import { InteractiveMap } from './components/InteractiveMap';
import { ExploreDestinations } from './components/ExploreDestinations';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { TravelServicesAndStyles } from './components/TravelServicesAndStyles';
import { CultureAndHeritage } from './components/CultureAndHeritage';
import { SovereigntyAndIslands } from './components/SovereigntyAndIslands';
import { TranslatorPhrasebook } from './components/TranslatorPhrasebook';
import { ReviewsAndRating } from './components/ReviewsAndRating';
import { Footer } from './components/Footer';
import { ArrowUp, Volume2, Plane } from 'lucide-react';
import { Language } from './types';
import { useAuth } from './context/AuthContext';
import { TravelokaIntegrationModal } from './components/TravelokaIntegrationModal';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { AuthModal } from './components/AuthModal';
import { AccountHubModal } from './components/AccountHubModal';
import { UniversalSearchModal } from './components/UniversalSearchModal';

export default function App() {
  const { openTravelokaModal } = useAuth();
  const [currentLang, setCurrentLang] = useState<Language>('vi');

  const [activeSection, setActiveSection] = useState<string>('intro');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Global keyboard shortcut Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = [
        'intro',
        'explore',
        'map',
        'itinerary',
        'services',
        'heritage',
        'sovereignty',
        'translator',
        'reviews',
      ];

      const current = sections.find((sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={(lang) => setCurrentLang(lang)}
        activeSection={activeSection}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Phần mở đầu & Lợi ích của app */}
        <HeroIntro
          currentLang={currentLang}
          onExploreClick={() => scrollToSection('explore')}
          onMapClick={() => scrollToSection('map')}
        />

        {/* 2. Khám phá địa điểm du lịch & món ăn ngon nổi tiếng kèm video và dòng giới thiệu nét đặc trưng */}
        <ExploreDestinations currentLang={currentLang} />

        {/* 3. Bản đồ Việt Nam kèm giọng nói hướng dẫn (Web Speech API) */}
        <InteractiveMap currentLang={currentLang} />

        {/* 4. Gợi ý lộ trình theo nhu cầu (ngắn ngày, 4-7 ngày, xuyên Việt & AI custom generator) */}
        <ItineraryPlanner currentLang={currentLang} />

        {/* 5. Các dịch vụ về phương tiện di chuyển, chỗ ở & các loại hình du lịch/phương thức tổ chức */}
        <TravelServicesAndStyles currentLang={currentLang} />

        {/* 6. Bản sắc văn hóa 54 dân tộc anh em & di tích lịch sử */}
        <CultureAndHeritage currentLang={currentLang} />

        {/* 7. Chủ quyền biển đảo (Hoàng Sa, Trường Sa, Nhà giàn DK1) & Độc lập dân tộc Việt Nam */}
        <SovereigntyAndIslands currentLang={currentLang} />

        {/* 8. Công cụ hỗ trợ phiên dịch cho người nước ngoài & giải đáp thắc mắc du lịch */}
        <TranslatorPhrasebook currentLang={currentLang} />

        {/* 9. Mục đánh giá từ 1 - 5 sao và nhận xét của du khách ở cuối cùng */}
        <ReviewsAndRating currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Floating Action Buttons: Traveloka, Quick Map, Scroll Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          id="floating-btn-traveloka"
          onClick={() => openTravelokaModal('flight')}
          className="px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#0194f3] to-[#007ce8] hover:from-[#0082d6] hover:to-[#0064d2] text-white shadow-xl shadow-sky-400/40 transition-all hover:scale-105 flex items-center gap-2 text-xs font-black cursor-pointer border border-white/30"
          title={currentLang === 'vi' ? 'Liên kết đặt vé & phòng Traveloka' : currentLang === 'ko' ? 'Traveloka 항공권 & 호텔 예약' : 'Book Flights & Hotels on Traveloka'}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <Plane className="w-4 h-4 text-white" />
          <span>
            {currentLang === 'vi' ? 'Đặt Vé Traveloka' : currentLang === 'ko' ? 'Traveloka 예약' : 'Traveloka Deals'}
          </span>
        </button>

        <button
          id="floating-btn-map"
          onClick={() => scrollToSection('map')}
          className="p-3 rounded-full bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-300 transition-all hover:scale-110 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          title={currentLang === 'vi' ? 'Mở bản đồ giọng nói' : currentLang === 'ko' ? '음성 지도 열기' : 'Open audio map'}
        >
          <Volume2 className="w-4 h-4" />
          <span className="hidden sm:inline">
            {currentLang === 'vi' ? 'Bản Đồ Nghe' : currentLang === 'ko' ? '음성 지도' : 'Audio Map'}
          </span>
        </button>

        {showScrollTop && (
          <button
            id="floating-btn-scrolltop"
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white text-slate-700 border border-sky-200 shadow-md hover:bg-sky-50 transition-all hover:scale-110 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Global Interactive Modals */}
      <UniversalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        currentLang={currentLang}
      />
      <TravelokaIntegrationModal currentLang={currentLang} />
      <ServiceBookingModal currentLang={currentLang} />
      <AuthModal currentLang={currentLang} />
      <AccountHubModal currentLang={currentLang} />
    </div>
  );
}


