/**
 * Speech synthesis utility for Vietnam's Travel voice guides and phrasebook
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const playVoiceGuide = (
  text: string,
  language: 'vi' | 'en' | 'ko' = 'vi',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === 'vi' ? 'vi-VN' : language === 'ko' ? 'ko-KR' : 'en-US';
  utterance.rate = language === 'vi' ? 0.95 : language === 'ko' ? 0.92 : 0.9;
  utterance.pitch = 1.0;

  // Try to find native voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) =>
    language === 'vi'
      ? v.lang.startsWith('vi')
      : language === 'ko'
      ? v.lang.startsWith('ko')
      : v.lang.startsWith('en')
  );
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    currentUtterance = utterance;
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (onError) onError(e);
  };

  window.speechSynthesis.speak(utterance);
};

export const stopVoiceGuide = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const isSpeaking = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
};
