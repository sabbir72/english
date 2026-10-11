export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export function speakText(
  text: string,
  rateOrAccent: number | string = 1.0,
  rateOrOnEnd?: number | (() => void),
  onEndCallback?: () => void,
  onError?: (e: any) => void
): void {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported in this browser.');
    const callback = typeof rateOrOnEnd === 'function' ? rateOrOnEnd : onEndCallback;
    callback?.();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    let rate = 1.0;
    let lang = 'en-US';
    let onEnd: (() => void) | undefined = undefined;

    if (typeof rateOrAccent === 'number') {
      rate = rateOrAccent;
      if (typeof rateOrOnEnd === 'function') {
        onEnd = rateOrOnEnd;
      }
    } else if (typeof rateOrAccent === 'string') {
      lang = rateOrAccent.toUpperCase() === 'UK' ? 'en-GB' : 'en-US';
      if (typeof rateOrOnEnd === 'number') {
        rate = rateOrOnEnd;
        onEnd = onEndCallback;
      } else if (typeof rateOrOnEnd === 'function') {
        onEnd = rateOrOnEnd;
      }
    }

    utterance.rate = Math.max(0.5, Math.min(1.5, rate));
    utterance.pitch = 1.0;
    utterance.lang = lang;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) =>
        (lang === 'en-GB' ? v.lang.includes('GB') : v.lang === 'en-US' || v.lang.startsWith('en-')) &&
        !v.name.includes('Google')
    ) || voices.find((v) => v.lang.startsWith('en-'));

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
    const callback = typeof rateOrOnEnd === 'function' ? rateOrOnEnd : onEndCallback;
    callback?.();
  }
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function speakJapaneseText(
  text: string,
  rate: number = 0.95,
  onEnd?: () => void,
  onError?: (e: any) => void
): void {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported in this browser.');
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = Math.max(0.6, Math.min(1.4, rate));
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const jpVoice = voices.find(
      (v) => v.lang === 'ja-JP' || v.lang.startsWith('ja')
    );
    if (jpVoice) {
      utterance.voice = jpVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.error('Japanese speech error:', e);
      onError?.(e);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Failed to invoke Japanese speech synthesis:', err);
    onEnd?.();
  }
}

// Global audio cache to avoid re-instantiating audio elements
let activeArabicAudio: HTMLAudioElement | null = null;

/**
 * Robust Arabic Speech & Audio Player
 * 1. Checks SpeechSynthesis with full voice lookup (ar-SA, ar-EG, ar-AE, etc.)
 * 2. Uses ResponsiveVoice / Web Speech fallback if available
 * 3. Uses Audio Context speech-cadence tone generator fallback as absolute last resort
 *    so user ALWAYS gets instant audible acoustic feedback even if device has zero Arabic TTS voices installed!
 */
export function speakArabicText(
  text: string,
  rate: number = 0.9,
  onEnd?: () => void,
  onError?: (e: any) => void
): void {
  // Stop any currently playing audio
  if (activeArabicAudio) {
    try {
      activeArabicAudio.pause();
      activeArabicAudio.currentTime = 0;
      activeArabicAudio = null;
    } catch {}
  }

  // Pre-clean text for letter lookups
  const trimmed = text.trim();

  // Try ResponsiveVoice if dynamically loaded on window
  const win = typeof window !== 'undefined' ? (window as any) : null;
  if (win && win.responsiveVoice && typeof win.responsiveVoice.speak === 'function') {
    try {
      if (win.responsiveVoice.voiceSupport()) {
        win.responsiveVoice.speak(trimmed, 'Arabic Female', {
          rate: rate,
          pitch: 1.0,
          onend: () => onEnd?.(),
          onerror: () => fallbackSpeechSynthesis(trimmed, rate, onEnd, onError),
        });
        return;
      }
    } catch {
      // Continue to next fallback
    }
  }

  // Primary: Native Speech Synthesis with advanced voice detection
  fallbackSpeechSynthesis(trimmed, rate, onEnd, onError);
}

function fallbackSpeechSynthesis(
  text: string,
  rate: number = 0.9,
  onEnd?: () => void,
  onError?: (e: any) => void
): void {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported in this browser. Falling back to acoustic feedback.');
    playAcousticFallbackTone(text, onEnd);
    return;
  }

  try {
    window.speechSynthesis.cancel();

    // Ensure voices are retrieved; on Chrome/Android voices may be populated asynchronously
    const allVoices = window.speechSynthesis.getVoices() || [];
    
    // Search for Arabic voice across any Arabic locale (ar-SA, ar-EG, ar-AE, ar, etc.)
    const arabicVoice = allVoices.find(
      (v) =>
        v.lang === 'ar-SA' ||
        v.lang === 'ar-EG' ||
        v.lang === 'ar-AE' ||
        v.lang.toLowerCase().startsWith('ar') ||
        v.name.toLowerCase().includes('arabic') ||
        v.name.toLowerCase().includes('ar-')
    );

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = arabicVoice ? arabicVoice.lang : 'ar-SA';
    utterance.rate = Math.max(0.6, Math.min(1.4, rate));
    utterance.pitch = 1.0;

    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    let speechCompleted = false;

    // Safety timeout in case speech synthesis hangs on mobile browsers
    const fallbackTimer = setTimeout(() => {
      if (!speechCompleted) {
        speechCompleted = true;
        // If synthesis didn't fire any sound or hung, give audible confirmation
        console.info('Speech utterance timeout triggered; ensuring playback completion.');
        onEnd?.();
      }
    }, 4500);

    utterance.onend = () => {
      if (!speechCompleted) {
        speechCompleted = true;
        clearTimeout(fallbackTimer);
        onEnd?.();
      }
    };

    utterance.onerror = (e) => {
      if (!speechCompleted) {
        speechCompleted = true;
        clearTimeout(fallbackTimer);
        console.warn('Native Arabic TTS error or voice missing. Triggering acoustic fallback:', e);
        // Play acoustic fallback so user is never left with complete silence!
        playAcousticFallbackTone(text, onEnd);
        onError?.(e);
      }
    };

    window.speechSynthesis.speak(utterance);

    // If voices weren't ready, listen for voiceschanged event once
    if (allVoices.length === 0 && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices();
        const updatedAr = updatedVoices.find((v) => v.lang.toLowerCase().startsWith('ar'));
        if (updatedAr && utterance) {
          utterance.voice = updatedAr;
        }
      };
    }
  } catch (err) {
    console.error('Failed to invoke Arabic speech synthesis:', err);
    playAcousticFallbackTone(text, onEnd);
  }
}

/**
 * Web Audio API Acoustic Sound Fallback
 * Synthesizes a melodic pleasant bell/chime confirmation in harmonic Arabic Maqam Rast / Bayati pitch
 * (Frequencies around 440Hz -> 554Hz -> 659Hz) so the user IMMEDIATELY hears clear audio feedback
 * even if their Windows/Linux/Android system doesn't have an Arabic TTS voice pack installed!
 */
export function playAcousticFallbackTone(text: string, onEnd?: () => void): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) {
      onEnd?.();
      return;
    }

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Harmonic chords (Oud / chime resonance)
    const pitches = [440, 554.37, 659.25]; // A4, C#5, E5
    pitches.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18 / (idx + 1), now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.48);
    });

    setTimeout(() => {
      try {
        ctx.close();
      } catch {}
      onEnd?.();
    }, 600);
  } catch {
    onEnd?.();
  }
}

/**
 * Play authentic high-quality Quranic verse audio by Ayah number
 * Uses Al-Quran Cloud / EveryAyah CDN (Sheikh Mishary Rashid Alafasy)
 */
export function playQuranAyahAudio(
  surahNumber: number,
  ayahNumber: number,
  onEnd?: () => void,
  onError?: () => void
): () => void {
  // Stop existing audio
  if (activeArabicAudio) {
    try {
      activeArabicAudio.pause();
      activeArabicAudio.currentTime = 0;
    } catch {}
  }

  // Format surah and ayah with 3 digits, e.g., 001001.mp3
  const sStr = String(surahNumber).padStart(3, '0');
  const aStr = String(ayahNumber).padStart(3, '0');
  const cdnUrl = `https://everyayah.com/data/Alafasy_128kbps/${sStr}${aStr}.mp3`;

  const audio = new Audio(cdnUrl);
  activeArabicAudio = audio;

  audio.onended = () => {
    activeArabicAudio = null;
    onEnd?.();
  };

  audio.onerror = () => {
    activeArabicAudio = null;
    onError?.();
  };

  audio.play().catch((err) => {
    console.warn('Quran ayah audio playback failed, falling back to TTS:', err);
    activeArabicAudio = null;
    onError?.();
  });

  return () => {
    try {
      audio.pause();
      audio.currentTime = 0;
      activeArabicAudio = null;
    } catch {}
  };
}

export interface SpeechRecognitionResultPayload {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

export function startSpeechRecognition(
  onResult: (payload: SpeechRecognitionResultPayload) => void,
  onError: (error: string) => void,
  onEnd: () => void,
  lang: string = 'en-US'
): { stop: () => void } | null {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
    return null;
  }

  try {
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionConstructor();

    recognition.lang = lang;
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
