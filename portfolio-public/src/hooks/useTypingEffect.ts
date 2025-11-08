import { useState, useEffect } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // initial delay before typing starts
  enabled?: boolean; // whether typing effect is enabled
}

export const useTypingEffect = ({
  text,
  speed = 50,
  delay = 0,
  enabled = true,
}: UseTypingEffectOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // If typing effect is disabled, show full text immediately
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    // Reset state when text changes
    setDisplayedText('');
    setIsComplete(false);

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    // Initial delay before starting
    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
        }
      };

      timeoutId = setTimeout(typeNextChar, delay);
    };

    startTyping();

    // Cleanup timeout on unmount or text change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed, delay, enabled]);

  return { displayedText, isComplete };
};
