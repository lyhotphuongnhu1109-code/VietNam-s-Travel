import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  MapPin,
  Sparkles,
  Info,
  Compass,
  DollarSign,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';
import { Destination, Language } from '../types';
import { playVoiceGuide, stopVoiceGuide, isSpeaking } from '../utils/speech';
import { KO_DESTINATIONS, tr } from '../data/koreanTranslations';

interface InteractiveMapProps {
  currentLang: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ currentLang }) => {
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceLang, setVoiceLang] = useState<Language>(currentLang);

  useEffect(() => {
    setVoiceLang(currentLang);
  }, [currentLang]);

  // Clean up speech synthesis when unmounting
  useEffect(() => {
    return () => {
      stopVoiceGuide();
    };
  }, []);

  const handleSelectDestination = (dest: Destination, autoPlayVoice = true) => {
    setSelectedDest(dest);
    if (autoPlayVoice) {
      handlePlayVoice(dest, voiceLang);
    }
  };

  const handlePlayVoice = (dest: Destination, lang: Language) => {
    const destKo = KO_DESTINATIONS[dest.id] || KO_DESTINATIONS[dest.id.replace(/-.*/, '')];
    const textToRead =
      lang === 'vi'
        ? dest.voiceGuideVi
        : lang === 'ko'
        ? destKo?.voiceKo || dest.voiceGuideKo || dest.voiceGuideEn
        : dest.voiceGuideEn;
    setIsPlayingAudio(true);
    playVoiceGuide(
      textToRead,
      lang,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const handleStopVoice = () => {
    stopVoiceGuide();
    setIsPlayingAudio(false);
  };

  const activeDestKo = KO_DESTINATIONS[selectedDest.id] || KO_DESTINATIONS[selectedDest.id.replace(/-.*/, '')];

  return (
    <section id="map" className="py-14 sm:py-20 bg-gradient-to-b from-sky-50/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Volume2 className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            <span>
              {currentLang === 'vi'
                ? 'Bản Đồ Trực Quan Có Thuyết Minh Âm Thanh'
                : currentLang === 'ko'
                ? '음성 지원 대화형 지도'
                : 'Interactive Map with Voice Narration'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'vi'
              ? 'Bản Đồ Du Lịch Việt Nam & Giọng Nói Hướng Dẫn'
              : currentLang === 'ko'
              ? '베트남 관광 지도 & 오디오 가이드'
              : 'Vietnam Tourism Map & Audio Guide'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {currentLang === 'vi'
              ? 'Nhấp vào bất kỳ địa danh nào trên bản đồ hoặc danh sách bên dưới để lắng nghe giọng đọc giới thiệu về lịch sử, cảnh quan và văn hóa đặc trưng.'
              : currentLang === 'ko'
              ? '지도 위의 랜드마크나 아래 목록을 클릭하면 베트남의 역사, 비경, 문화에 대한 생생한 한국어 음성 해설을 들으실 수 있습니다.'
              : 'Click any destination on the map or the list to hear authentic audio narration about its history, scenic wonders, and cultural traits.'}
          </p>
        </div>

        {/* Voice Control Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-sky-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPlayingAudio ? 'bg-emerald-500 text-white animate-pulse' : 'bg-sky-100 text-sky-700'}`}>
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                {currentLang === 'vi'
                  ? 'Đang thuyết minh địa điểm:'
                  : currentLang === 'ko'
                  ? '현재 해설 중인 명소:'
                  : 'Now narrating:'}
              </p>
              <p className="text-sm font-bold text-slate-800">
                {currentLang === 'vi'
                  ? selectedDest.vietnameseName
                  : currentLang === 'ko'
                  ? activeDestKo?.nameKo || selectedDest.name
                  : selectedDest.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Choose voice language */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                id="voice-lang-vi"
                onClick={() => {
                  setVoiceLang('vi');
                  if (isPlayingAudio) handlePlayVoice(selectedDest, 'vi');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  voiceLang === 'vi' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                id="voice-lang-en"
                onClick={() => {
                  setVoiceLang('en');
                  if (isPlayingAudio) handlePlayVoice(selectedDest, 'en');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  voiceLang === 'en' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                id="voice-lang-ko"
                onClick={() => {
                  setVoiceLang('ko');
                  if (isPlayingAudio) handlePlayVoice(selectedDest, 'ko');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  voiceLang === 'ko' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                🇰🇷 한국어 음성
              </button>
            </div>

            {isPlayingAudio ? (
              <button
                id="btn-stop-audio"
                onClick={handleStopVoice}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>
                  {currentLang === 'vi'
                    ? 'Dừng đọc'
                    : currentLang === 'ko'
                    ? '음성 중지'
                    : 'Stop'}
                </span>
              </button>
            ) : (
              <button
                id="btn-play-audio"
                onClick={() => handlePlayVoice(selectedDest, voiceLang)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {currentLang === 'vi'
                    ? 'Nghe thuyết minh'
                    : currentLang === 'ko'
                    ? '음성 해설 듣기'
                    : 'Play Audio'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Main Grid: Interactive S-Map on Left, Detail Card & List on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Vietnam S-Curve Stylized Interactive Canvas / SVG Map */}
          <div className="lg:col-span-6 bg-white p-4 sm:p-6 rounded-3xl border border-sky-100 shadow-xs relative overflow-hidden flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-sky-50 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-sky-600 font-semibold">
                <Compass className="w-4 h-4" />
                {currentLang === 'vi'
                  ? 'Bản Đồ Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam'
                  : currentLang === 'ko'
                  ? '베트남 사회주의 공화국 지도'
                  : 'Map of Socialist Republic of Vietnam'}
              </span>
              <span className="text-[11px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100">
                {currentLang === 'vi'
                  ? 'Chạm để nghe'
                  : currentLang === 'ko'
                  ? '터치하여 듣기'
                  : 'Tap to listen'}
              </span>
            </div>

            {/* Vietnam Stylized Geographic SVG Canvas */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] bg-sky-50/60 rounded-2xl border border-sky-100/80 p-2 overflow-hidden select-none">
              {/* Soft Water Waves / Compass watermark */}
              <div className="absolute inset-0 bg-[radial-gradient(#bae6fd_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              {/* Vietnam S-Curve SVG Silhouette Background */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-xs"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(14, 165, 233, 0.1))' }}
              >
                {/* Coastal Line / Landmass stylized shape of Vietnam */}
                <path
                  d="M 50,6 
                     C 65,8 78,12 80,18
                     C 76,22 68,24 64,28
                     C 62,32 64,36 67,42
                     C 71,46 76,52 75,56
                     C 72,60 68,64 71,70
                     C 73,74 74,78 68,82
                     C 62,85 58,88 56,92
                     C 50,94 40,94 38,90
                     C 42,86 48,82 52,80
                     C 54,76 56,72 58,66
                     C 58,60 55,54 53,48
                     C 52,42 50,38 52,32
                     C 50,26 46,20 44,14
                     C 42,10 46,6 50,6 Z"
                  fill="#e0f2fe"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />

                {/* Neighboring Country outlines for geographical context (Laos/Cambodia subtle) */}
                <path
                  d="M 44,14 C 40,18 36,24 38,34 C 40,42 42,48 45,54 C 48,60 48,66 46,72 C 42,76 38,78 36,82"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />

                {/* Sacred Islands: Hoàng Sa (Paracel Islands) */}
                <g
                  id="island-hoang-sa"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    const hs = DESTINATIONS.find((d) => d.id === 'hoang-sa-islands');
                    if (hs) handleSelectDestination(hs, true);
                  }}
                >
                  <circle cx="88" cy="48" r="2.2" fill="#e11d48" />
                  <circle cx="91" cy="47" r="1.5" fill="#e11d48" />
                  <circle cx="86" cy="51" r="1.4" fill="#e11d48" />
                  <text x="80" y="44" fontSize="3" fill="#be123c" fontWeight="bold">
                    QĐ. Hoàng Sa ⭐
                  </text>
                  <text x="80" y="46.5" fontSize="2" fill="#0369a1" fontWeight="bold">
                    (Việt Nam)
                  </text>
                </g>

                {/* Sacred Islands: Trường Sa (Spratly Islands) */}
                <g
                  id="island-truong-sa"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    const ts = DESTINATIONS.find((d) => d.id === 'truong-sa-islands');
                    if (ts) handleSelectDestination(ts, true);
                  }}
                >
                  <circle cx="86" cy="74" r="2.2" fill="#e11d48" />
                  <circle cx="90" cy="77" r="1.6" fill="#e11d48" />
                  <circle cx="84" cy="80" r="1.5" fill="#e11d48" />
                  <circle cx="88" cy="83" r="1.8" fill="#e11d48" />
                  <text x="78" y="70" fontSize="3" fill="#be123c" fontWeight="bold">
                    QĐ. Trường Sa ⭐
                  </text>
                  <text x="78" y="72.5" fontSize="2" fill="#0369a1" fontWeight="bold">
                    (Việt Nam)
                  </text>
                </g>

                {/* East Sea label */}
                <text x="74" y="32" fontSize="3.5" fill="#0369a1" fontWeight="bold" letterSpacing="0.8">
                  BIỂN ĐÔNG VIỆT NAM
                </text>
              </svg>

              {/* Interactive Destination Markers on S-Map */}
              {DESTINATIONS.map((dest) => {
                const isSelected = selectedDest.id === dest.id;
                const isIsland = dest.id === 'hoang-sa-islands' || dest.id === 'truong-sa-islands';
                return (
                  <button
                    key={dest.id}
                    id={`map-pin-${dest.id}`}
                    onClick={() => handleSelectDestination(dest, true)}
                    style={{
                      left: `${dest.mapCoord.x}%`,
                      top: `${dest.mapCoord.y}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 focus:outline-hidden"
                    title={`${dest.vietnameseName} - Bấm để nghe thuyết minh`}
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className={`absolute w-8 h-8 rounded-full animate-ping ${isIsland ? 'bg-red-400/50' : 'bg-sky-400/40'}`} />
                      )}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all ${
                          isSelected
                            ? isIsland
                              ? 'bg-rose-600 text-white scale-125 ring-2 ring-amber-300 shadow-rose-400'
                              : 'bg-sky-600 text-white scale-125 ring-2 ring-white shadow-sky-400'
                            : isIsland
                            ? 'bg-rose-50 text-rose-600 border border-rose-300 hover:bg-rose-600 hover:text-white'
                            : 'bg-white text-sky-600 hover:bg-sky-500 hover:text-white border border-sky-200'
                        }`}
                      >
                        {isIsland ? (
                          <span className="text-[10px] leading-none">⭐</span>
                        ) : (
                          <MapPin className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                    {/* Tooltip on hover/select */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 bottom-7 whitespace-nowrap px-2 py-0.5 rounded-md text-[11px] font-bold transition-all pointer-events-none shadow-xs ${
                        isSelected
                          ? 'bg-slate-900 text-white scale-100 opacity-100 z-20'
                          : 'bg-white text-slate-700 border border-sky-200 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95'
                      }`}
                    >
                      {currentLang === 'vi' ? dest.vietnameseName : dest.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Territory integrity note */}
            <div className="mt-3 text-center text-[11px] text-slate-600 font-semibold bg-rose-50/80 border border-rose-100 py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5">
              <span>🇻🇳</span>
              <span>
                {currentLang === 'vi'
                  ? 'Quần đảo Hoàng Sa và Trường Sa là phần lãnh thổ và biển đảo thiêng liêng bất khả xâm phạm của Tổ quốc Việt Nam.'
                  : currentLang === 'ko'
                  ? '호앙사(Hoàng Sa)와 쯔엉사(Trường Sa) 군도는 베트남 조국의 신성하고 불가침인 영토이자 영해입니다.'
                  : 'The Paracel and Spratly Islands are an sacred and inviolable territory of Vietnam.'}
              </span>
            </div>
          </div>

          {/* Selected Landmark Details Card on Right */}
          <div className="lg:col-span-6 space-y-4">
            {/* Active Destination Detail Box */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-xs">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4 group">
                <img
                  src={selectedDest.imageUrl}
                  alt={currentLang === 'vi' ? selectedDest.vietnameseName : currentLang === 'ko' ? activeDestKo?.nameKo || selectedDest.name : selectedDest.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500/90 backdrop-blur-sm text-white text-xs font-bold">
                    {selectedDest.region === 'North'
                      ? tr(currentLang, 'Miền Bắc', 'North', '북부')
                      : selectedDest.region === 'Central'
                      ? tr(currentLang, 'Miền Trung', 'Central', '중부')
                      : tr(currentLang, 'Miền Nam', 'South', '남부')}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                    {selectedDest.province}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xl sm:text-2xl font-black">
                    {currentLang === 'vi'
                      ? selectedDest.vietnameseName
                      : currentLang === 'ko'
                      ? activeDestKo?.nameKo || selectedDest.name
                      : selectedDest.name}
                  </h3>
                  <p className="text-xs text-sky-200 font-medium line-clamp-1 mt-0.5">
                    {currentLang === 'ko' && activeDestKo?.travelTypeKo
                      ? activeDestKo.travelTypeKo
                      : selectedDest.travelType}
                  </p>
                </div>
              </div>

              {/* Cultural & Travel Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentLang === 'ko' && activeDestKo?.descKo
                  ? activeDestKo.descKo
                  : selectedDest.description}
              </p>

              {/* Earthy Clay & Teak Warmth Cultural Box */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#faf6f0] border border-[#e8ded1]">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#78350f] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#5c3826] leading-relaxed font-medium">
                    <strong className="text-[#78350f]">
                      {currentLang === 'vi'
                        ? '🏛️ Ý nghĩa văn hóa - lịch sử: '
                        : currentLang === 'ko'
                        ? '🏛️ 문화 및 역사적 의미: '
                        : '🏛️ Cultural Heritage Story: '}
                    </strong>
                    {currentLang === 'ko' && activeDestKo?.culturalSignificanceKo
                      ? activeDestKo.culturalSignificanceKo
                      : selectedDest.culturalSignificance}
                  </p>
                </div>
              </div>

              {/* Quick Info Grid (Best time, Costs) */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block font-medium">
                      {currentLang === 'vi'
                        ? 'Thời điểm đẹp nhất'
                        : currentLang === 'ko'
                        ? '최적 여행 시기'
                        : 'Best time'}
                    </span>
                    <span className="text-slate-800 font-bold">
                      {currentLang === 'ko' && activeDestKo?.bestTimeKo
                        ? activeDestKo.bestTimeKo
                        : selectedDest.bestTime}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <span className="text-amber-800/80 block font-medium">
                      {currentLang === 'vi'
                        ? 'Chi phí ước tính'
                        : currentLang === 'ko'
                        ? '예상 경비'
                        : 'Estimated cost'}
                    </span>
                    <span className="text-amber-950 font-black">
                      {currentLang === 'vi'
                        ? selectedDest.estimatedCostVND
                        : currentLang === 'ko'
                        ? activeDestKo?.costKo || selectedDest.estimatedCostUSD
                        : selectedDest.estimatedCostUSD}
                    </span>
                  </div>
                </div>
              </div>

              {/* Audio Player Action Button inside Card */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {selectedDest.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-medium border border-sky-100">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  id="card-btn-listen"
                  onClick={() => handlePlayVoice(selectedDest, voiceLang)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    isPlayingAudio
                      ? 'bg-red-700 hover:bg-red-800 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>
                        {currentLang === 'vi'
                          ? 'Dừng đọc'
                          : currentLang === 'ko'
                          ? '음성 중지'
                          : 'Stop'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>
                        {currentLang === 'vi'
                          ? 'Nghe thuyết minh'
                          : currentLang === 'ko'
                          ? '음성 해설 듣기'
                          : 'Listen'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Destination Selector */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {currentLang === 'vi'
                  ? 'Chọn nhanh danh thắng du lịch:'
                  : currentLang === 'ko'
                  ? '주요 명소 빠른 선택:'
                  : 'Quick select destinations:'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DESTINATIONS.map((d) => {
                  const isActive = selectedDest.id === d.id;
                  const dKo = KO_DESTINATIONS[d.id] || KO_DESTINATIONS[d.id.replace(/-.*/, '')];
                  return (
                    <button
                      key={d.id}
                      id={`quick-dest-${d.id}`}
                      onClick={() => handleSelectDestination(d, true)}
                      className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                          : 'bg-white text-slate-700 border-sky-100 hover:bg-sky-50'
                      }`}
                    >
                      <p className="text-xs font-bold line-clamp-1">
                        {currentLang === 'vi'
                          ? d.vietnameseName
                          : currentLang === 'ko'
                          ? dKo?.nameKo || d.name
                          : d.name}
                      </p>
                      <p className={`text-[11px] ${isActive ? 'text-sky-100' : 'text-slate-400'}`}>
                        {d.province}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
