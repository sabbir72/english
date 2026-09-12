export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export function speakText(
  text: string,
  rate: number = 1.0,
  onEnd?: () => void,
  onError?: (e: any) => void
): void {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported in this browser.');
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.max(0.5, Math.min(1.5, rate));
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-') && !v.name.includes('Google') || v.lang === 'en-US');
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      onError?.(e);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Failed to invoke speech synthesis:', err);
    onEnd?.();
  }
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export interface SpeechRecognitionResultPayload {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

export function startSpeechRecognition(
  onResult: (payload: SpeechRecognitionResultPayload) => void,
  onError: (error: string) => void,
  onEnd: () => void
): { stop: () => void } | null {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
    return null;
  }

  try {
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionConstructor();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        const transcript = item[0].transcript;
        const confidence = item[0].confidence || 0.85;
        onResult({
          transcript,
          isFinal: item.isFinal,
          confidence,
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error event:', event.error);
      onError(event.error === 'not-allowed' ? 'Microphone permission was denied. Please allow microphone access.' : `Error: ${event.error}`);
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {}
      },
    };
  } catch (err: any) {
    onError(err.message || 'Failed to initialize microphone recognition.');
    return null;
  }
}
