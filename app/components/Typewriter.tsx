"use client";

import { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
  cursorChar?: string;
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
}

const Typewriter = ({
  text,
  className = '',
  delay = 100,
  startDelay = 0,
  cursorChar = '|',
  showCursor = true,
  cursorBlinkSpeed = 500,
  onComplete,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const charIndex = useRef(0);

  const { opacity } = useSpring({
    opacity: showCursor && showCursorState ? 1 : 0,
    config: { duration: 0 }
  });

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    charIndex.current = 0;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start the typewriter after the startDelay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, startDelay]);

  // Handle the typing animation
  useEffect(() => {
    if (!isTyping) return;

    if (charIndex.current < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(charIndex.current));
        charIndex.current += 1;
      }, delay);
      
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [text, delay, isTyping, displayedText, onComplete]);

  // Handle cursor blinking
  useEffect(() => {
    if (showCursor) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursorState(prev => !prev);
      }, cursorBlinkSpeed);

      return () => {
        if (cursorIntervalRef.current) {
          clearInterval(cursorIntervalRef.current);
        }
      };
    }
  }, [showCursor, cursorBlinkSpeed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <animated.span style={{ opacity }}>{cursorChar}</animated.span>
      )}
    </span>
  );
};

export default Typewriter; 