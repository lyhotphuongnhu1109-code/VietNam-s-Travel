import React from 'react';
import { Compass, Phone, ShieldCheck, Heart, MapPin, Mail, Globe } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-0 pb-12 border-t border-slate-800 relative">
      {/* 5-Color Vietnamese Signature Accent Bar */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-sky-600" title="Xanh đại dương" />
        <div className="flex-1 bg-emerald-600" title="Xanh lục bảo" />
        <div className="flex-1 bg-[#78350f]" title="Nâu đất phù sa" />
        <div className="flex-1 bg-amber-500" title="Vàng lúa chín" />
        <div className="flex-1 bg-red-700" title="Đỏ gạch nung" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Cultural Mission */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0 border border-slate-700">
                <img
                  src="/src/assets/images/app_logo_1791123199904.jpg"
                  alt="VIETNAM'S TRAVEL"
                  className="w-full h-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-white block">VIETNAM'S TRAVEL</span>
                <span className="text-[10px] text-sky-400 font-bold tracking-wider uppercase block">THE LAND OF ENDLESS DISCOVERY</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {currentLang === 'vi'
                ? 'Ứng dụng du lịch thông minh hướng tới việc quảng bá văn hóa của người Việt Nam nói chung và 54 dân tộc anh em nói riêng, với các công trình kiến trúc mang đậm giá trị lịch sử và bản sắc ngàn đời.'
                : currentLang === 'ko'
                ? '베트남 54개 형제 민족의 찬란한 문화유산, 역사적 건축물, 전설적인 미식과 아름다운 자연을 전 세계 여행자에게 알리는 공식 스마트 여행 플랫폼입니다.'
                : 'A cultural and smart travel platform dedicated to celebrating the authentic spirit of Vietnam, its 54 ethnic communities, legendary cuisine, and historic architecture.'}
            </p>
            <div className="mt-4 text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
              <span>🇻🇳</span>
              <span>
                {currentLang === 'vi'
                  ? 'Việt Nam - Vẻ Đẹp Bất Tận'
                  : currentLang === 'ko'
                  ? '베트남 - 영원한 매력 (Vietnam - Timeless Charm)'
                  : 'Vietnam - Timeless Charm'}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>{currentLang === 'vi' ? 'Khám Phá' : currentLang === 'ko' ? '주요 메뉴' : 'Navigation'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => scrollTo('intro')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Lợi ích của ứng dụng' : currentLang === 'ko' ? '앱 특별 혜택 안내' : 'App Benefits'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('explore')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Địa danh & Đặc sắc ẩm thực' : currentLang === 'ko' ? '주요 명소 & 대표 미식' : 'Destinations & Gastronomy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('map')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Bản đồ thuyết minh giọng nói' : currentLang === 'ko' ? '음성 지원 대화형 지도' : 'Audio Map of Vietnam'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('itinerary')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Lộ trình gợi ý theo nhu cầu' : currentLang === 'ko' ? '맞춤형 추천 일정 플래너' : 'Personalized Itineraries'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('heritage')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? '54 Dân tộc & Di tích lịch sử' : currentLang === 'ko' ? '54개 민족 문화 & 역사 유적' : '54 Ethnic Groups & Heritage'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{currentLang === 'vi' ? 'Dịch Vụ & Tiện Ích' : currentLang === 'ko' ? '여행 서비스 & 편의 도구' : 'Services & Utilities'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-sky-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Phương tiện di chuyển & Chỗ ở' : currentLang === 'ko' ? '교통수단 & 숙소 가이드' : 'Transportation & Stays'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-sky-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Các loại hình & phương thức' : currentLang === 'ko' ? '여행 조직 방식 & 유형' : 'Travel Tour Formats'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('translator')}
                  className="hover:text-sky-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Công cụ phiên dịch cho khách nước ngoài' : currentLang === 'ko' ? '외국인 여행자 회화 사전' : 'Tourist Translator'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('reviews')}
                  className="hover:text-sky-400 transition-colors cursor-pointer"
                >
                  {currentLang === 'vi' ? 'Đánh giá 1 - 5 sao từ du khách' : currentLang === 'ko' ? '여행자 1~5성 실시간 리뷰' : '1 - 5 Star Traveler Reviews'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Contacts & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Đường Dây Nóng Khẩn Cấp' : currentLang === 'ko' ? '긴급 핫라인 & 지원' : 'Emergency Tourist Support'}</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block font-medium">
                  {currentLang === 'vi' ? 'Hỗ trợ khẩn cấp du khách Việt Nam:' : currentLang === 'ko' ? '베트남 관광청 24시간 긴급 콜센터:' : 'Vietnam National Tourism Hotline:'}
                </span>
                <span className="font-bold text-amber-400 text-sm">1800 599 977</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-red-500/50 transition-colors">
                  <span className="text-slate-400 block">{currentLang === 'ko' ? '경찰 (Police)' : 'Công an (Police)'}</span>
                  <span className="font-bold text-white">113</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-red-500/50 transition-colors">
                  <span className="text-slate-400 block">{currentLang === 'ko' ? '응급의료 (Medical)' : 'Cấp cứu (Medical)'}</span>
                  <span className="font-bold text-white">115</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} VIETNAM'S TRAVEL.</span>
            <span className="hidden sm:inline">
              • {currentLang === 'vi' ? 'Tất cả bản quyền được bảo hộ.' : currentLang === 'ko' ? '모든 권리 보유.' : 'All rights reserved.'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>{currentLang === 'vi' ? 'Được xây dựng với' : currentLang === 'ko' ? '정성을 담아 제작됨' : 'Built with'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>
              {currentLang === 'vi'
                ? 'dành cho đất nước hình chữ S và du khách năm châu'
                : currentLang === 'ko'
                ? '베트남과 전 세계 모든 여행자를 위하여'
                : 'for the S-shaped nation and global travelers'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
