/**
 * Utility for Speech-to-Text in Vietnamese
 */

export const startListening = (onResult: (text: string) => void, onEnd?: () => void) => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('Trình duyệt không hỗ trợ nhận diện giọng nói.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'vi-VN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const text = event.results[0][0].transcript;
    onResult(text);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.onerror = (event: any) => {
    console.error('Lỗi nhận diện giọng nói:', event.error);
    if (onEnd) onEnd();
  };

  recognition.start();
  return recognition;
};
