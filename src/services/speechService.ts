/**
 * Utility for Text-to-Speech in Vietnamese
 */

export const speak = (text: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Trình duyệt không hỗ trợ đọc văn bản.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  utterance.rate = 1.0;
  utterance.pitch = 1.1; // Slightly higher pitch for a friendly mascot voice

  // Try to find a Vietnamese voice
  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(v => v.lang.includes('vi'));
  if (viVoice) {
    utterance.voice = viVoice;
  }

  window.speechSynthesis.speak(utterance);
};
