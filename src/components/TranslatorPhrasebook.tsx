import React, { useState } from 'react';
import {
  Languages,
  Volume2,
  ArrowRightLeft,
  Sparkles,
  HelpCircle,
  Search,
  MessageCircle,
  Copy,
  Check,
  Send,
  Loader2,
  Bot,
  AlertTriangle,
} from 'lucide-react';
import { PHRASEBOOK } from '../data/travelData';
import { PhraseBookItem, Language } from '../types';
import { playVoiceGuide } from '../utils/speech';
import { KO_PHRASEBOOK_ITEMS } from '../data/koreanTranslations';

interface TranslatorPhrasebookProps {
  currentLang: Language;
}

export const TranslatorPhrasebook: React.FC<TranslatorPhrasebookProps> = ({ currentLang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [translateInput, setTranslateInput] = useState('');
  const [translatedResult, setTranslatedResult] = useState<{
    text: string;
    phonetics: string;
    tip: string;
  } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Q&A assistant state
  const [qaQuestion, setQaQuestion] = useState('');
  const [qaAnswer, setQaAnswer] = useState<string | null>(null);
  const [isQaLoading, setIsQaLoading] = useState(false);

  // Filter phrases
  const filteredPhrases = PHRASEBOOK.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!translateInput.trim()) return;

    setIsTranslating(true);
    try {
      const res = await fetch('/api/gemini/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: translateInput,
          targetLang: 'vi',
          userLang: currentLang,
        }),
      });
      const data = await res.json();
      setTranslatedResult({
        text: data.translatedText || translateInput,
        phonetics: data.pronunciation || '',
        tip: data.culturalTip || (
          currentLang === 'ko'
            ? '따뜻한 미소와 친절한 인사는 베트남 현지인들과 기분 좋게 소통하는 최고의 방법입니다!'
            : currentLang === 'vi'
            ? 'Mỉm cười thân thiện sẽ giúp bạn kết nối dễ dàng với người bản địa!'
            : 'A warm smile helps you easily connect with locals!'
        ),
      });
    } catch (err) {
      console.error(err);
      // Fallback
      setTranslatedResult({
        text: translateInput,
        phonetics: '',
        tip: currentLang === 'ko'
          ? '아래 준비된 필수 여행 회화 목록을 사용하여 현지인과 원활하게 대화해 보세요.'
          : currentLang === 'vi'
          ? 'Bạn có thể dùng danh sách các câu giao tiếp chuẩn mực bên dưới để nói chuyện trực tiếp.'
          : 'You can use the standard phrasebook items below to communicate directly.',
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaQuestion.trim()) return;

    setIsQaLoading(true);
    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: qaQuestion,
          language: currentLang,
        }),
      });
      const data = await res.json();
      setQaAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setQaAnswer(
        currentLang === 'vi'
          ? 'Việt Nam là điểm đến rất an toàn, người dân hiếu khách. Nếu có tình huống khẩn cấp, bạn có thể gọi 113 (Công an) hoặc liên hệ trung tâm hỗ trợ khách du lịch.'
          : currentLang === 'ko'
          ? '베트남은 치안이 우수하고 친절한 나라입니다. 긴급 상황 발생 시 113(경찰) 또는 관광 지원 핫라인 1800 599 977로 문의하세요.'
          : 'Vietnam is a very safe and hospitable country. You can contact local tourism desks or dial 113 for emergency assistance.'
      );
    } finally {
      setIsQaLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="translator" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Languages className="w-3.5 h-3.5" />
            <span>
              {currentLang === 'vi'
                ? 'Công Cụ Phiên Dịch & Giải Đáp Du Khách'
                : currentLang === 'ko'
                ? '여행자 번역기 & 문화 Q&A 도우미'
                : 'Translation & Cultural Q&A for Tourists'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'vi'
              ? 'Cầu Nối Ngôn Ngữ & Sổ Tay Giao Tiếp Thiết Yếu'
              : currentLang === 'ko'
              ? '언어의 다리 & 필수 여행 회화 핸드북'
              : 'Travel Phrasebook & Instant Translator'}
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            {currentLang === 'vi'
              ? 'Thiết kế riêng cho du khách quốc tế và người Việt đi du lịch: phát âm mẫu chuẩn xác, hướng dẫn mặc cả, gọi món không cay và trợ lý giải đáp mọi thắc mắc văn hóa.'
              : currentLang === 'ko'
              ? '베트남을 여행하는 관광객을 위한 맞춤형 회화 도구: 정확한 원어민 음성 발음, 정중한 가격 흥정 팁, 안 매운 요리 주문법 및 현지 문화 Q&A를 지원합니다.'
              : 'Designed for international travelers in Vietnam: audio pronunciations, dining allergy tips, polite bargaining, and AI-powered cultural answers.'}
          </p>
        </div>

        {/* Top Grid: Quick Translator Tool & AI Cultural Q&A */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Quick Bilingual Translator Box */}
          <div className="bg-sky-50/50 rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                    <ArrowRightLeft className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentLang === 'vi'
                      ? 'Dịch Nhanh Sang Tiếng Việt'
                      : currentLang === 'ko'
                      ? '베트남어 실시간 번역'
                      : 'Translate to Vietnamese'}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-full">
                  {currentLang === 'vi' ? 'Có Audio Phát Âm' : currentLang === 'ko' ? '원어민 음성 지원' : 'Audio Included'}
                </span>
              </div>

              <form onSubmit={handleTranslate}>
                <textarea
                  rows={3}
                  value={translateInput}
                  onChange={(e) => setTranslateInput(e.target.value)}
                  placeholder={
                    currentLang === 'vi'
                      ? 'Nhập câu tiếng Anh hoặc bất kỳ ngôn ngữ nào cần dịch sang tiếng Việt (VD: "How much is this bowl of pho?")...'
                      : currentLang === 'ko'
                      ? '베트남어로 번역하고 싶은 말을 입력하세요 (예: "안 매운 쌀국수로 주세요", "가장 가까운 약국이 어디인가요?")...'
                      : 'Type anything you want to say in Vietnam (e.g. "I cannot eat spicy food", "Where is the nearest pharmacy?")...'
                  }
                  className="w-full p-3.5 rounded-2xl bg-white border border-sky-100 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={isTranslating || !translateInput.trim()}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{currentLang === 'vi' ? 'Đang dịch...' : currentLang === 'ko' ? '번역 중...' : 'Translating...'}</span>
                      </>
                    ) : (
                      <>
                        <Languages className="w-4 h-4" />
                        <span>{currentLang === 'vi' ? 'Dịch & Phiên Âm' : currentLang === 'ko' ? '번역 & 발음 듣기' : 'Translate & Pronounce'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Translation Output */}
              {translatedResult && (
                <div className="mt-4 p-4 rounded-2xl bg-white border border-sky-200 shadow-xs animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                        {currentLang === 'vi' ? 'Tiếng Việt:' : currentLang === 'ko' ? '베트남어 번역:' : 'Vietnamese Translation:'}
                      </span>
                      <p className="text-base font-black text-sky-800 mt-0.5">
                        {translatedResult.text}
                      </p>
                      {translatedResult.phonetics && (
                        <p className="text-xs text-slate-500 italic mt-0.5">
                          {currentLang === 'ko' ? '발음: ' : 'Phát âm: '} "{translatedResult.phonetics}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => playVoiceGuide(translatedResult.text, 'vi')}
                      className="p-2 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors shrink-0 cursor-pointer"
                      title={currentLang === 'vi' ? 'Phát âm câu này' : currentLang === 'ko' ? '발음 듣기' : 'Play voice'}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {translatedResult.tip && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{translatedResult.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* AI Cultural Q&A Assistant ("Giải đáp thắc mắc") */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {currentLang === 'vi'
                      ? 'Giải Đáp Thắc Mắc Văn Hóa & Du Lịch'
                      : currentLang === 'ko'
                      ? '베트남 문화 & 여행 실시간 Q&A'
                      : 'Travel & Cultural Assistant'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {currentLang === 'vi'
                      ? 'Hỏi bất kỳ điều gì về phong tục, tiền tệ, trang phục, SIM card...'
                      : currentLang === 'ko'
                      ? '현지 에티켓, 팁 문화, 사원 복장 규정, 유심 구매, 택시 이용 팁 등을 자유롭게 물어보세요...'
                      : 'Ask about local etiquette, tipping, temple dress code, taxi tips...'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleAskQuestion}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={qaQuestion}
                    onChange={(e) => setQaQuestion(e.target.value)}
                    placeholder={
                      currentLang === 'vi'
                        ? 'VD: Vào chùa ở Việt Nam cần lưu ý trang phục gì?'
                        : currentLang === 'ko'
                        ? '예: 베트남 사원 방문 시 복장 규정이 어떻게 되나요?'
                        : 'e.g. What is the dress code when visiting pagodas in Vietnam?'
                    }
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                  />
                  <button
                    type="submit"
                    disabled={isQaLoading || !qaQuestion.trim()}
                    className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isQaLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </form>

              {/* Sample Quick Questions */}
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                {[
                  currentLang === 'vi' ? 'Có cần tiền boa (tip) không?' : currentLang === 'ko' ? '베트남에서 팁을 주어야 하나요?' : 'Do I need to tip in Vietnam?',
                  currentLang === 'vi' ? 'Mua SIM 4G ở đâu uy tín?' : currentLang === 'ko' ? '안전한 4G 유심은 어디서 사나요?' : 'Where to buy reliable 4G SIM?',
                  currentLang === 'vi' ? 'Quy tắc trang phục chùa chiền?' : currentLang === 'ko' ? '사원 방문 시 복장 예절은?' : 'Temple dress codes?',
                ].map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQaQuestion(q);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {qaAnswer && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs leading-relaxed text-slate-200 max-h-56 overflow-y-auto">
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentLang === 'vi' ? 'Giải đáp từ đại sứ du lịch:' : currentLang === 'ko' ? '베트남 여행 대사 답변:' : 'Travel Ambassador Advice:'}</span>
                  </div>
                  {qaAnswer}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Travel Phrasebook by Category */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-sky-600" />
                <span>
                  {currentLang === 'vi'
                    ? 'Sổ Tay Mẫu Câu Thiết Yếu Có Âm Thanh'
                    : currentLang === 'ko'
                    ? '음성 지원 필수 여행 회화 사전'
                    : 'Essential Travel Phrasebook with Audio'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentLang === 'vi'
                  ? 'Bấm vào biểu tượng loa để phát âm mẫu câu cho người bán hàng hoặc tài xế nghe trực tiếp.'
                  : currentLang === 'ko'
                  ? '스피커 아이콘을 누르면 현지 상인이나 택시 기사님에게 정확한 베트남어 원어민 발음으로 직접 들려줄 수 있습니다.'
                  : 'Tap the audio button to play accurate native pronunciation directly to vendors or drivers.'}
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', labelVi: 'Tất cả', labelEn: 'All', labelKo: '전체' },
                { id: 'greeting', labelVi: 'Chào hỏi', labelEn: 'Greetings', labelKo: '기본 인사' },
                { id: 'dining', labelVi: 'Gọi món', labelEn: 'Dining', labelKo: '식당 주문' },
                { id: 'shopping', labelVi: 'Mua sắm', labelEn: 'Shopping', labelKo: '쇼핑·흥정' },
                { id: 'direction', labelVi: 'Hỏi đường', labelEn: 'Directions', labelKo: '길 찾기' },
                { id: 'emergency', labelVi: 'Khẩn cấp', labelEn: 'Emergency', labelKo: '긴급 상황' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {currentLang === 'vi' ? cat.labelVi : currentLang === 'ko' ? cat.labelKo : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Phrasebook Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhrases.map((phrase) => {
              const koItem = KO_PHRASEBOOK_ITEMS[phrase.id];
              const displayMeaning = currentLang === 'ko' && koItem ? koItem.korean : phrase.english;
              const displayTip = currentLang === 'ko' && koItem ? koItem.tipKo : phrase.contextNote;
              const displayPronun = currentLang === 'ko' && koItem ? koItem.pronunciationKo : phrase.pronunciation;

              return (
                <div
                  key={phrase.id}
                  className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs hover:border-sky-200 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs text-slate-700 font-semibold">
                        {displayMeaning}
                      </span>
                      <button
                        onClick={() => copyToClipboard(phrase.vietnamese, phrase.id)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                        title={currentLang === 'vi' ? 'Sao chép câu này' : currentLang === 'ko' ? '문장 복사' : 'Copy phrase'}
                      >
                        {copiedId === phrase.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <h4 className="text-base font-black text-sky-900 leading-snug">
                      {phrase.vietnamese}
                    </h4>

                    <p className="text-xs text-slate-500 italic mt-1 font-mono">
                      🗣️ "{displayPronun}"
                    </p>

                    <p className="text-[11px] text-slate-600 mt-2 p-2 rounded-lg bg-sky-50/50 border border-sky-100">
                      💡 {displayTip}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => playVoiceGuide(phrase.vietnamese, 'vi')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                      <span>{currentLang === 'vi' ? 'Phát âm' : currentLang === 'ko' ? '원어민 발음' : 'Listen'}</span>
                    </button>
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
