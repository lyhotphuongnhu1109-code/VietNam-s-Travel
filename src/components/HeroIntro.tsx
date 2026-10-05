import React from 'react';
import {
  Compass,
  MapPin,
  Volume2,
  Users,
  ShieldCheck,
  Languages,
  ChevronDown,
  ArrowRight,
  Landmark,
  UtensilsCrossed,
} from 'lucide-react';
import { APP_BENEFITS } from '../data/travelData';
import { Language } from '../types';

interface HeroIntroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onMapClick: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  currentLang,
  onExploreClick,
  onMapClick,
}) => {
  return (
    <section id="intro" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Soft Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/50 via-emerald-50/30 to-transparent pointer-events-none -z-10 rounded-3xl blur-2xl" />
      <div className="absolute -top-12 right-4 w-72 h-72 bg-emerald-100/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 -left-12 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-50 via-emerald-50 to-amber-50 text-slate-800 text-xs sm:text-sm font-semibold mb-6 border border-sky-200/80 shadow-xs">
            <img
              src="/src/assets/images/app_logo_1791123199904.jpg"
              alt="VIETNAM'S TRAVEL Logo"
              className="w-5 h-5 rounded-md object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-sky-900">
              {currentLang === 'vi'
                ? 'Ứng Dụng Du Lịch & Văn Hóa Đất Nước Hình Chữ S'
                : currentLang === 'ko'
                ? '베트남 문화유산 & 스마트 여행 공식 가이드'
                : 'Vietnam Heritage, Culture & Smart Travel Guide'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {currentLang === 'vi' ? (
              <>
                Chào Mừng Bạn Đến Với <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-emerald-600 to-amber-600">
                  VIETNAM'S TRAVEL
                </span>
              </>
            ) : currentLang === 'ko' ? (
              <>
                베트남의 숨결과 문화를 만나는 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-emerald-600 to-amber-600">
                  VIETNAM'S TRAVEL
                </span>
              </>
            ) : (
              <>
                Discover The Soul Of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-emerald-600 to-amber-600">
                  VIETNAM'S TRAVEL
                </span>
              </>
            )}
          </h1>

          {/* Deep Emotional Intro Paragraph */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {currentLang === 'vi' ? (
              <>
                Đến với ứng dụng du lịch <strong>“VIETNAM’S TRAVEL”</strong>, du khách có thể tìm hiểu về những địa điểm du lịch, những nét đặc trưng của văn hóa, đặc sắc ẩm thực, những di tích mang đậm nét bản sắc và ý nghĩa lịch sử quý giá của <strong className="text-[#78350f]">54 dân tộc anh em</strong>. Du khách còn có thể hiểu thêm về con người, đất nước Việt Nam, tham khảo chi phí, giá cả nơi đây, từ đó có cái nhìn tổng quan hơn về những chuyến đi và tự tin đặt chân đến dải đất hình chữ S xinh đẹp này.
              </>
            ) : currentLang === 'ko' ? (
              <>
                공식 여행 플랫폼 <strong>“VIETNAM’S TRAVEL”</strong>에 오신 것을 환영합니다! 북부 사파와 하롱베이의 수려한 자연, 다낭과 나트랑의 에메랄드빛 해변, <strong className="text-[#78350f]">54개 형제 민족</strong>의 찬란한 전통문화와 유네스코 세계유산, 세계적인 베트남 미식과 정확한 여행 경비 정보까지 원스톱으로 제공합니다.
              </>
            ) : (
              <>
                Welcome to <strong>“VIETNAM’S TRAVEL”</strong> — your comprehensive portal to explore Vietnam’s enchanting landscapes, the living heritage of <strong className="text-[#78350f]">54 ethnic brotherly groups</strong>, world-renowned gastronomy, and storied historic monuments. Gain deep cultural context, authentic travel cost estimates, interactive voice guidance, and bilingual translation tools before and during your journey to our beautiful S-shaped nation.
              </>
            )}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-btn-explore"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-300 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>{currentLang === 'vi' ? 'Khám Phá Địa Điểm & Ẩm Thực' : currentLang === 'ko' ? '명소 및 대표 미식 탐험' : 'Explore Places & Food'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-map"
              onClick={onMapClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-emerald-800 font-bold text-sm border-2 border-emerald-300 hover:bg-emerald-50/80 shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>{currentLang === 'vi' ? 'Bản Đồ Thuyết Minh Giọng Nói' : currentLang === 'ko' ? '음성 지원 대화형 지도' : 'Voice-Guided Map'}</span>
            </button>
          </div>

          {/* Quick Metrics / Cultural Highlights */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {/* Metric 1: Nâu đất - 54 Dân tộc anh em */}
            <div className="p-3.5 bg-[#fbf8f4] rounded-2xl border border-[#e8ded1] shadow-2xs hover:border-[#b45309]/50 transition-colors">
              <div className="flex items-center gap-2 text-[#78350f] font-black text-xl sm:text-2xl">
                <Users className="w-5 h-5 text-[#b45309]" />
                <span>54</span>
              </div>
              <p className="text-xs text-stone-600 font-semibold mt-1">
                {currentLang === 'vi' ? 'Dân tộc anh em' : currentLang === 'ko' ? '개 형제 민족' : 'Ethnic groups'}
              </p>
            </div>

            {/* Metric 2: Đỏ gạch - Di sản UNESCO & Lịch sử */}
            <div className="p-3.5 bg-red-50/60 rounded-2xl border border-red-200/80 shadow-2xs hover:border-red-300 transition-colors">
              <div className="flex items-center gap-2 text-red-700 font-black text-xl sm:text-2xl">
                <Landmark className="w-5 h-5 text-red-600" />
                <span>8+</span>
              </div>
              <p className="text-xs text-red-900/80 font-semibold mt-1">
                {currentLang === 'vi' ? 'Di sản UNESCO' : currentLang === 'ko' ? '대 유네스코 세계유산' : 'UNESCO Heritages'}
              </p>
            </div>

            {/* Metric 3: Vàng lúa chín - Ẩm thực 3 miền */}
            <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 shadow-2xs hover:border-amber-300 transition-colors">
              <div className="flex items-center gap-2 text-amber-700 font-black text-xl sm:text-2xl">
                <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                <span>100+</span>
              </div>
              <p className="text-xs text-amber-900/80 font-semibold mt-1">
                {currentLang === 'vi' ? 'Món ngon nổi tiếng' : currentLang === 'ko' ? '개 전통 대표 요리' : 'Signature dishes'}
              </p>
            </div>

            {/* Metric 4: Xanh lục bảo - Thiên nhiên & minh bạch */}
            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-xl sm:text-2xl">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>100%</span>
              </div>
              <p className="text-xs text-emerald-900/80 font-semibold mt-1">
                {currentLang === 'vi' ? 'Minh bạch chi phí' : currentLang === 'ko' ? '투명한 여행 경비' : 'Cost transparency'}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid (Lợi ích của app) */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {currentLang === 'vi'
                ? 'Lợi Ích Độc Đáo Của VIETNAM’S TRAVEL'
                : currentLang === 'ko'
                ? 'VIETNAM’S TRAVEL만의 특별한 혜택'
                : 'Key Benefits Of VIETNAM’S TRAVEL'}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
              {currentLang === 'vi'
                ? 'Công cụ đồng hành toàn diện giúp bạn lên kế hoạch chu đáo, thấu hiểu văn hóa và trải nghiệm trọn vẹn vẻ đẹp non sông.'
                : currentLang === 'ko'
                ? '철저한 여행 계획, 깊이 있는 문화 이해, 아름다운 자연과 함께하는 원스톱 스마트 동반자.'
                : 'Your all-in-one companion for cultural insights, audio tours, customized routes, and effortless communication.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {APP_BENEFITS.map((benefit, index) => {
              // Theming the 4 cards with our Vietnamese palette
              const cardStyles = [
                // 1. 54 Ethnic Groups: Earthy Brown & Gold
                {
                  border: 'border-[#e7ded4] hover:border-[#b45309]',
                  bg: 'bg-white hover:bg-[#fdfbf7]',
                  iconBg: 'bg-[#faf4ed] text-[#78350f] group-hover:bg-[#78350f] group-hover:text-white',
                  textHover: 'group-hover:text-[#78350f]',
                  linkText: 'text-[#78350f]',
                },
                // 2. Audio Map: Emerald Nature
                {
                  border: 'border-emerald-100 hover:border-emerald-300',
                  bg: 'bg-white hover:bg-emerald-50/30',
                  iconBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
                  textHover: 'group-hover:text-emerald-700',
                  linkText: 'text-emerald-700',
                },
                // 3. Itinerary Planner: Ocean Blue
                {
                  border: 'border-sky-100 hover:border-sky-300',
                  bg: 'bg-white hover:bg-sky-50/40',
                  iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
                  textHover: 'group-hover:text-sky-700',
                  linkText: 'text-sky-700',
                },
                // 4. Translator & Support: Brick Red & Gold
                {
                  border: 'border-red-100 hover:border-red-300',
                  bg: 'bg-white hover:bg-red-50/30',
                  iconBg: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
                  textHover: 'group-hover:text-red-700',
                  linkText: 'text-red-700',
                },
              ][index] || {
                border: 'border-sky-100 hover:border-sky-300',
                bg: 'bg-white',
                iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
                textHover: 'group-hover:text-sky-700',
                linkText: 'text-sky-600',
              };

              const title = currentLang === 'vi' ? benefit.titleVi : currentLang === 'ko' ? benefit.titleKo || benefit.titleEn : benefit.titleEn;
              const desc = currentLang === 'vi' ? benefit.descVi : currentLang === 'ko' ? benefit.descKo || benefit.descEn : benefit.descEn;

              return (
                <div
                  key={index}
                  className={`p-5 rounded-2xl ${cardStyles.bg} border ${cardStyles.border} shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${cardStyles.iconBg}`}>
                      {index === 0 && <Users className="w-6 h-6" />}
                      {index === 1 && <Volume2 className="w-6 h-6" />}
                      {index === 2 && <MapPin className="w-6 h-6" />}
                      {index === 3 && <Languages className="w-6 h-6" />}
                    </div>
                    <h3 className={`text-base font-bold text-slate-900 transition-colors ${cardStyles.textHover}`}>
                      {title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <div className={`mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold ${cardStyles.linkText}`}>
                    <span>{currentLang === 'vi' ? 'Tìm hiểu thêm' : currentLang === 'ko' ? '자세히 알아보기' : 'Learn more'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
