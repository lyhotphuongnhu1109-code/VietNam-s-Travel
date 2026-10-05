import React, { useState } from 'react';
import {
  Shield,
  Flag,
  Anchor,
  Compass,
  Volume2,
  VolumeX,
  BookOpen,
  MapPin,
  CheckCircle2,
  HeartHandshake,
  Waves,
  Scale,
  Sparkles,
} from 'lucide-react';
import { MARITIME_SOVEREIGNTY_DATA } from '../data/travelData';
import { MaritimeSovereignty, Language } from '../types';

interface SovereigntyAndIslandsProps {
  currentLang: Language;
}

export const SovereigntyAndIslands: React.FC<SovereigntyAndIslandsProps> = ({
  currentLang,
}) => {
  const [selectedItem, setSelectedItem] = useState<MaritimeSovereignty>(
    MARITIME_SOVEREIGNTY_DATA[1] // Default to Trường Sa
  );
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const itemKoMap: Record<string, { titleKo: string; statementKo: string; evidenceKo: string[] }> = {
    'hoang-sa': {
      titleKo: '호앙사 군도 - 베트남 다낭시 호앙사현',
      statementKo: '베트남 국가는 역사적 시기를 거쳐 평화적이고 지속적이며 국제법에 부합하게 호앙사와 쯔엉사 두 군도에 대한 국가 주권을 확립, 행사 및 수호해 왔습니다.',
      evidenceKo: [
        '17세기 응우옌 주 시대부터 호앙사 파견대를 조직하여 수로를 측량하고 주권 표식을 세우며 해양 구조를 지속적으로 실시함.',
        '1686년 도바 편찬 고문헌 전집천남사지로도서에 호앙사가 베트남 영토로 명확히 기록됨.',
        '유네스코 세계기록유산인 응우옌 왕조 어필 문서에 황제가 매년 군사를 파견하여 주권비를 세우게 한 칙령이 보존됨.',
      ],
    },
    'truong-sa': {
      titleKo: '쯔엉사 군도 - 베트남 카인호아성 쯔엉사현',
      statementKo: '쯔엉사와 호앙사는 베트남 조국의 신성한 피와 살입니다. 54개 형제 민족 모두는 선조들이 물려준 신성한 해양 주권과 대륙붕을 온전히 지키기 위해 하나로 굳게 뭉쳐 있습니다.',
      evidenceKo: [
        '응우옌 주 및 자롱, 민망 황제 치하의 호앙사 파견대와 박하이 파견대가 지속적으로 주권을 행사함.',
        '베트남 인민해군과 세대를 거쳐 지켜온 화강암 주권비가 베트남의 확고부동한 불가침 주권을 증명함.',
        '1982년 유엔 해양법 협약(UNCLOS)에 따라 200해리 배타적 경제수역 및 대륙붕에 대한 완전한 주권적 권리 행사.',
      ],
    },
    'dk1-rigs': {
      titleKo: 'DK1 해상 플랫폼 시스템 - 베트남 남부 대륙붕',
      statementKo: 'DK1 해상 플랫폼의 용감한 장병들은 거센 파도를 딛고 청춘을 바쳐 조국의 금성홍기가 신성한 대륙붕 위에 언제나 자랑스럽게 휘날리도록 지켜내고 있습니다.',
      evidenceKo: [
        '1989년 7월 5일 정부 총리 훈령 제180/CT호에 따라 경제-과학기술 서비스 단지(DK1) 설립.',
        '남부 대륙붕 암초에 견고한 강철 기지를 구축하여 국가 주권을 확고히 증명함.',
      ],
    },
  };

  const speakText = (text: string, lang: Language) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'vi' ? 'vi-VN' : lang === 'ko' ? 'ko-KR' : 'en-US';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayActiveDeclaration = () => {
    const koData = itemKoMap[selectedItem.id];
    const text =
      currentLang === 'vi'
        ? `${selectedItem.titleVi}. ${selectedItem.sovereigntyStatementVi} ${selectedItem.historicalEvidence.join('. ')}`
        : currentLang === 'ko' && koData
        ? `${koData.titleKo}. ${koData.statementKo} ${koData.evidenceKo.join('. ')}`
        : `${selectedItem.titleEn}. ${selectedItem.sovereigntyStatementEn} ${selectedItem.historicalEvidence.join('. ')}`;
    speakText(text, currentLang);
  };

  return (
    <section id="sovereignty" className="py-20 bg-linear-to-b from-slate-50 via-sky-50/50 to-white relative overflow-hidden">
      {/* Decorative subtle background waves */}
      <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/90 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-200 shadow-xs">
            <Flag className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>
              {currentLang === 'vi'
                ? 'Tổ Quốc Thiêng Liêng • Chủ Quyền Bất Khả Xâm Phạm'
                : currentLang === 'ko'
                ? '신성한 조국 • 불가침의 국가 주권'
                : 'Sacred Fatherland • Inviolable Sovereignty'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {currentLang === 'vi' ? (
              <>
                Chủ Quyền Biển Đảo &amp; <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-600 via-blue-700 to-rose-600">
                  Độc Lập Dân Tộc Việt Nam
                </span>
              </>
            ) : currentLang === 'ko' ? (
              <>
                베트남의 해양 주권 &amp; <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-600 via-blue-700 to-rose-600">
                  신성한 영토와 민족 독립
                </span>
              </>
            ) : (
              <>
                Maritime Sovereignty &amp; <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-600 via-blue-700 to-rose-600">
                  Vietnamese National Independence
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {currentLang === 'vi'
              ? 'Hoàng Sa, Trường Sa và vùng biển đảo thềm lục địa là một phần máu thịt thiêng liêng không thể tách rời của dải đất hình chữ S. 54 dân tộc anh em chung sức đồng lòng gìn giữ từng tấc đất, từng ngọn sóng quê hương.'
              : currentLang === 'ko'
              ? '호앙사(파라셀)와 쯔엉사(스프래틀리), 그리고 대륙붕 영해는 S자형 베트남의 뗄 수 없는 신성한 피와 살입니다. 54개 형제 민족은 한마음 한뜻으로 조국의 한 뼘 바다와 영토를 지켜내고 있습니다.'
              : 'The Hoang Sa (Paracel) and Truong Sa (Spratly) archipelagos and continental shelves are sacred, inseparable territories of Vietnam. All 54 ethnic groups stand united in defending every inch of our homeland.'}
          </p>

          {/* Quick Voice Declaration Button */}
          <div className="mt-6 flex justify-center">
            <button
              id="btn-voice-sovereignty"
              onClick={handlePlayActiveDeclaration}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-600 text-white animate-pulse shadow-rose-200'
                  : 'bg-white text-slate-800 hover:bg-sky-50 border border-sky-200 hover:border-sky-300 hover:shadow-sky-100'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-white" />
                  <span>{currentLang === 'vi' ? 'Dừng giọng đọc' : currentLang === 'ko' ? '음성 멈춤' : 'Stop Narration'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-rose-600" />
                  <span>
                    {currentLang === 'vi'
                      ? 'Nghe thuyết minh chủ quyền biển đảo'
                      : currentLang === 'ko'
                      ? '해양 주권 음성 성명 듣기'
                      : 'Listen to Maritime Sovereignty Statement'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Selector Tabs for Sovereign Regions */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {MARITIME_SOVEREIGNTY_DATA.map((item) => {
            const isSelected = selectedItem.id === item.id;
            const tabLabel =
              currentLang === 'ko'
                ? item.id === 'hoang-sa'
                  ? '호앙사 군도 (파라셀 제도)'
                  : item.id === 'truong-sa'
                  ? '쯔엉사 군도 (스프래틀리 제도)'
                  : 'DK1 해상 플랫폼 (남부 대륙붕)'
                : item.name;

            return (
              <button
                key={item.id}
                id={`tab-sovereignty-${item.id}`}
                onClick={() => {
                  setSelectedItem(item);
                  if (isSpeaking && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 scale-102'
                    : 'bg-white text-slate-700 hover:bg-sky-50/80 border border-sky-100'
                }`}
              >
                <Anchor className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-sky-500'}`} />
                <span>{tabLabel}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Sovereign Spotlight Card */}
        {(() => {
          const itemKoData = {
            'hoang-sa': {
              titleKo: '호앙사 군도 - 베트남 다낭시 호앙사현',
              locationKo: '동해(남중국해) 북부, 베트남 다낭시 관할',
              statementKo: '베트남 국가는 역사적 시기를 거쳐 평화적이고 지속적이며 국제법에 부합하게 호앙사와 쯔엉사 두 군도에 대한 국가 주권을 확립, 행사 및 수호해 왔습니다.',
              evidenceKo: [
                '17세기 응우옌 주(Chúa Nguyễn) 시대부터 호앙사 파견대(Đội Hoàng Sa)를 조직하여 수로를 측량하고 주권 표식을 세우며 해양 구조를 지속적으로 실시함.',
                '1686년 도바(Đỗ Bá) 편찬 고문헌 "전집천남사지로도서"에 호앙사 황금 모래톱이 꽝응아이현 뚜응이어부에 속한다고 명확히 기록됨.',
                '유네스코 세계기록유산인 응우옌 왕조 어필 문서(Châu Bản)에 자롱, 민망 황제가 매년 군사를 파견하여 주권비를 세우고 나무를 심으며 해도를 제작하게 한 칙령이 보존됨.',
                '1686년 뒤발(Duval), 1827년 필립 반더말렌(Philippe Vandermalen) 등 서구 고지도에서도 호앙사가 안남제국(베트남) 영토임을 명시함.',
              ],
              significanceKo: '세계에서 가장 붐비는 국제 해상 운송로를 관장하는 지정학적 군사 요충지이자 풍부한 수산 및 해양 광물 자원의 보고.',
              islandsKo: ['호앙사 섬 (Pattle)', '푸럼 섬 (Woody)', '케이 섬 (Tree)', '찌똔 섬 (Triton)', '박 암초 (North Reef)'],
            },
            'truong-sa': {
              titleKo: '쯔엉사 군도 - 베트남 카인호아성 쯔엉사현',
              locationKo: '동해(남중국해) 남부, 베트남 카인호아성 관할',
              statementKo: '쯔엉사와 호앙사는 베트남 조국의 신성한 피와 살입니다. 54개 형제 민족 모두는 선조들이 물려준 신성한 해양 주권과 대륙붕을 온전히 지키기 위해 하나로 굳게 뭉쳐 있습니다.',
              evidenceKo: [
                '응우옌 주 및 자롱, 민망 황제 치하의 호앙사 파견대와 박하이 파견대(Đội Bắc Hải)가 지속적으로 주권을 행사하고 영토를 관리함.',
                '베트남 인민해군과 세대를 거쳐 지켜온 화강암 주권비가 베트남의 확고부동한 불가침 주권을 증명함.',
                '1982년 유엔 해양법 협약(UNCLOS)에 따라 200해리 배타적 경제수역 및 대륙붕에 대한 완전한 주권적 권리와 관할권 행사.',
                '섬 내 사찰, 학교, 의료소, 국제 수문기상관측소 및 국제 항로 유도 등대를 갖춘 군민 공동체의 평화로운 일상 영위.',
              ],
              significanceKo: '조국 동쪽의 전초 방어 방패이자 베트남 3,260km 이상의 긴 해안선을 든든하게 수호하는 해양 안보의 핵심 요충지.',
              islandsKo: ['쯔엉사 런 섬', '송뜨떠이 섬', '신똔 섬', '남옛 섬', '선까 섬', '꼬린 암초', '렌다오 암초'],
            },
            'dk1-rigs': {
              titleKo: 'DK1 해상 플랫폼 시스템 - 베트남 남부 대륙붕',
              locationKo: '남부 대륙붕, 베트남 해군 제2지역사령부 관할',
              statementKo: 'DK1 해상 플랫폼의 용감한 장병들은 거센 파도를 딛고 청춘을 바쳐 조국의 금성홍기가 신성한 대륙붕 위에 언제나 자랑스럽게 휘날리도록 지켜내고 있습니다.',
              evidenceKo: [
                '1989년 7월 5일 정부 총리(당시 각료회의 의장) 훈령 제180/CT호에 따라 경제-과학기술 서비스 단지(약칭 DK1) 설립.',
                '푹떤(Phúc Tần), 바께(Ba Kè), 후옌쩐(Huyền Trân), 꿰드엉(Quế Đường), 뜨찐(Tư Chính), 까마우 등 베트남 남부 대륙붕 암초에 견고한 강철 기지 구축.',
                'UNCLOS 1982에 규정된 200해리 배타적 경제수역 및 대륙붕에서 국가 주권을 입증하는 바다 위의 강철 전초 기지.',
              ],
              significanceKo: '대양 한가운데 우뚝 솟은 강철 요새로서 국가 주권 수호는 물론 어민들의 안전한 원양 조업 지원과 해양 과학 연구의 든든한 버팀목.',
              islandsKo: ['푹떤 해상 플랫폼 (DK1/2, DK1/16)', '바께 해상 플랫폼 (DK1/9, DK1/21)', '후옌쩐 해상 플랫폼 (DK1/7)', '꿰드엉 해상 플랫폼 (DK1/8)'],
            },
          }[selectedItem.id];

          const activeTitle = currentLang === 'vi' ? selectedItem.titleVi : currentLang === 'ko' && itemKoData ? itemKoData.titleKo : selectedItem.titleEn;
          const activeLocation = currentLang === 'ko' && itemKoData ? itemKoData.locationKo : selectedItem.location;
          const activeStatement = currentLang === 'vi' ? selectedItem.sovereigntyStatementVi : currentLang === 'ko' && itemKoData ? itemKoData.statementKo : selectedItem.sovereigntyStatementEn;
          const activeEvidence = currentLang === 'ko' && itemKoData ? itemKoData.evidenceKo : selectedItem.historicalEvidence;
          const activeSignificance = currentLang === 'ko' && itemKoData ? itemKoData.significanceKo : selectedItem.significance;
          const activeIslands = currentLang === 'ko' && itemKoData ? itemKoData.islandsKo : selectedItem.keyIslands;

          return (
            <div className="bg-white rounded-3xl border border-sky-100 shadow-md overflow-hidden mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image Column */}
                <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto min-h-[340px] overflow-hidden group">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                      <Flag className="w-3.5 h-3.5 fill-current" />
                      <span>{currentLang === 'vi' ? 'Chủ Quyền Việt Nam' : currentLang === 'ko' ? '베트남 신성 영토' : 'Vietnam Sovereignty'}</span>
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-sm text-sky-200 text-xs font-semibold">
                      {selectedItem.coordinates}
                    </span>
                  </div>

                  {/* Title & Key Islands overlay on image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="text-2xl sm:text-3xl font-black mb-2 drop-shadow-sm">
                      {activeTitle}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-sky-200 font-medium mb-3">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{activeLocation}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeIslands.map((island, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-white/20 backdrop-blur-md text-[11px] font-medium border border-white/20 text-white"
                        >
                          {island}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content & Evidence Column */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                  <div>
                    {/* Solemn Sovereignty Affirmation Quote */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
                            {currentLang === 'vi'
                              ? 'Khẳng Định Chủ Quyền Bất Khả Xâm Phạm'
                              : currentLang === 'ko'
                              ? '불가침 국가 주권 선언'
                              : 'Solemn Affirmation of National Sovereignty'}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed font-medium">
                            "{activeStatement}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Historical Evidence & Legal Grounds */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-sky-600" />
                        <span>
                          {currentLang === 'vi'
                            ? 'Căn Cứ Lịch Sử & Cơ Sở Pháp Lý Vững Chắc'
                            : currentLang === 'ko'
                            ? '역사적 근거 및 확고한 국제법적 토대'
                            : 'Historical Evidence & International Legal Grounds'}
                        </span>
                      </h4>
                      <ul className="space-y-2.5">
                        {activeEvidence.map((ev, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{ev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Strategic Significance */}
                    <div className="text-xs sm:text-sm text-slate-600 bg-sky-50/60 p-3.5 rounded-xl border border-sky-100">
                      <span className="font-bold text-sky-800">
                        {currentLang === 'vi' ? 'Ý nghĩa chiến lược: ' : currentLang === 'ko' ? '전략적 가치 및 의의: ' : 'Strategic Significance: '}
                      </span>
                      {activeSignificance}
                    </div>
                  </div>

                  {/* Bottom Action / Listen Button */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Waves className="w-4 h-4 text-sky-500" />
                      <span>
                        {currentLang === 'vi'
                          ? 'UNCLOS 1982 • Luật Biển Việt Nam'
                          : currentLang === 'ko'
                          ? 'UNCLOS 1982 • 베트남 해양법'
                          : 'UNCLOS 1982 • Vietnam Law of the Sea'}
                      </span>
                    </div>
                    <button
                      id={`btn-read-${selectedItem.id}`}
                      onClick={handlePlayActiveDeclaration}
                      className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{currentLang === 'vi' ? 'Nghe mục này' : currentLang === 'ko' ? '이 항목 청취' : 'Listen'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 4 Pillars of National Sovereignty & 54 Ethnic Unity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              {currentLang === 'vi' ? 'Châu Bản Triều Nguyễn' : currentLang === 'ko' ? '응우옌 왕조 어필 문서' : 'Nguyen Dynasty Imperial Archives'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentLang === 'vi'
                ? 'Di sản Tư liệu Thế giới của UNESCO ghi chép chỉ dụ cử các đội thủy quân hàng năm ra Hoàng Sa cắm mốc, đo thủy trình và khai thác hải sản.'
                : currentLang === 'ko'
                ? '유네스코 세계기록유산으로, 매년 수군을 파견해 호앙사에 영토 표식을 세우고 수로를 측량하며 수산물을 채취하도록 명한 황실 칙령이 명시되어 있습니다.'
                : 'UNESCO Memory of the World documents proving continuous royal decrees sending naval flotillas to demarcate sovereignty.'}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              {currentLang === 'vi' ? 'Công Ước UNCLOS 1982' : currentLang === 'ko' ? '1982 UNCLOS 준수' : '1982 UNCLOS Compliance'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentLang === 'vi'
                ? 'Việt Nam là quốc gia thành viên gương mẫu, khẳng định chủ quyền, quyền chủ quyền và quyền tài phán trên 200 hải lý vùng đặc quyền kinh tế và thềm lục địa.'
                : currentLang === 'ko'
                ? '베트남은 모범적 당사국으로서 200해리 배타적 경제수역(EEZ) 및 대륙붕에 대한 주권, 주권적 권리 및 관할권을 확고히 행사하고 있습니다.'
                : 'Vietnam is a responsible member state strictly upholding international law, exclusive economic zones, and continental shelves.'}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              {currentLang === 'vi' ? '54 Dân Tộc Đại Đoàn Kết' : currentLang === 'ko' ? '54개 민족 대단결' : '54 Ethnic Groups United'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentLang === 'vi'
                ? 'Đồng bào Kinh, Tày, Thái, Mường, H’Mông, Dao, Khmer, Chăm, Ba Na, Gia Rai... muôn người như một kết thành khối đại đoàn kết giữ vững biên cương và hải đảo.'
                : currentLang === 'ko'
                ? '킨(Kinh), 따이, 타이, 므엉, 흐몽, 자오, 크메르, 참, 바나, 자라이 등 54개 민족이 하나로 뭉쳐 조국의 국경과 해양 영토를 굳건히 수호합니다.'
                : 'All 54 ethnic brotherhoods stand shoulder-to-shoulder, forging an unbreakable shield defending mountains, borders, and seas.'}
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              {currentLang === 'vi' ? 'Du Lịch Biển Đảo Tự Hào' : currentLang === 'ko' ? '자랑스러운 해양 관광' : 'Proud Sustainable Maritime Travel'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentLang === 'vi'
                ? 'Mỗi chuyến đi của du khách là sự tri ân những người lính đảo kiên trung, bảo tồn rạn san hô sinh thái và khẳng định niềm tự hào dân tộc Việt Nam.'
                : currentLang === 'ko'
                ? '여행자의 발걸음 하나하나는 섬을 지키는 늠름한 장병들에 대한 감사의 마음이자, 산호초 생태계를 보존하고 민족적 자긍심을 확인하는 여정입니다.'
                : 'Every traveler trip pays homage to brave island guards, protects marine ecosystems, and celebrates deep national pride.'}
            </p>
          </div>
        </div>

        {/* Patriotic Quote Banner */}
        <div className="mt-12 rounded-3xl bg-linear-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 text-center relative overflow-hidden shadow-lg">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-rose-400 font-bold text-xs uppercase tracking-widest block mb-2">
              {currentLang === 'vi' ? 'Lời thề non nước Việt Nam' : currentLang === 'ko' ? '베트남 조국의 영원한 맹세' : 'Eternal Oath of the Vietnamese Homeland'}
            </span>
            <blockquote className="text-base sm:text-xl font-extrabold italic leading-relaxed text-sky-100 mb-3">
              {currentLang === 'vi'
                ? '“Nam quốc sơn hà Nam đế cư - Tiệt nhiên định phận tại thiên thư... Một tấc đất của tiền nhân để lại cũng quyết không để lọt vào tay kẻ khác.”'
                : currentLang === 'ko'
                ? '“남국의 산하는 남쪽 황제가 다스리니, 천상의 책에 명백히 정해져 있도다... 선조가 물려준 조국의 단 한 뼘 땅도 결코 남의 손에 넘겨주지 않으리라.”'
                : '“Over the mountains and rivers of the South, the Southern Emperor reigns — such is firmly written in the Celestial Book... Not a single inch of the land bequeathed by our ancestors shall ever be surrendered.”'}
            </blockquote>
            <p className="text-xs text-sky-300 font-medium">
              {currentLang === 'vi'
                ? 'Bản trường ca giữ nước ngàn năm của dân tộc Việt Nam'
                : currentLang === 'ko'
                ? '베트남 민족 천년 영토 수호의 대서사시'
                : 'The thousand-year anthem of safeguarding Vietnam’s sovereignty'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
