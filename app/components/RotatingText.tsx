"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes, { object } from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './RotatingText.css';

interface RotatingTextProps {
  texts: string[] | string;
  className?: string;
  options?: {
    start?: number;
    staggerDelay?: number;
    staggers?: number;
    changeDelay?: number;
    duration?: number;
    infinite?: boolean;
    steps?: number | boolean;
    stepWise?: boolean;
    erase?: boolean;
    eraseDelay?: number;
    eraseStaggerDelay?: number;
    eraseStagger?: number;
    random?: boolean;
    useIntersectionObserver?: boolean;
    threshold?: number;
    rootMargin?: string;
    playOnce?: boolean;
    loop?: boolean;
    splitBy?: 'character' | 'word' | 'line' | 'none';
    mode?: 'word' | 'line';
    springConfig?: object;
    classNames?: {
      root?: string;
      text?: string;
      splitElement?: string;
      srOnly?: string;
    };
  };
  onNext?: (index: number, text: string, length: number) => void;
  onPrevious?: (index: number, text: string, length: number) => void;
  onLoop?: (count: number, index: number) => void;
  onComplete?: () => void;
  ariaLabel?: string;
  motion?: any;
  rotationInterval?: number;
  splitBy?: 'character' | 'word' | 'line' | 'none';
  staggerDuration?: number;
  [key: string]: any;
}

interface TextSplitProps {
  text: string;
  mode?: 'word' | 'line';
  className?: string;
  elementClassName?: string;
  ariaLabel?: string;
  [key: string]: any;
}

interface SplitTextProps {
  text: string;
  splitBy?: 'character' | 'word' | 'line' | 'none';
  staggerDelay?: number;
  staggers?: number;
  delay?: number;
  className?: string;
  srClassName?: string;
  elementClassName?: string;
  ariaLabel?: string;
  [key: string]: any;
}

const defaultAnimateText = {
  initial: { 
    opacity: 0, 
    y: 20,
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 20, 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { 
      duration: 0.15 
    } 
  }
};

function TextSplit({ text, mode = 'word', className = '', elementClassName = '', ariaLabel, ...rest }: TextSplitProps) {
  const rootClass = `text-rotate-${mode}${className ? ` ${className}` : ''}`;
  const elementClass = `text-rotate-element${elementClassName ? ` ${elementClassName}` : ''}`;

  const words = useMemo(() => {
    if (!text) return [];
    return text.split(' ').filter(Boolean);
  }, [text]);
  
  return (
    <span className={rootClass} role="text" aria-label={ariaLabel || text} {...rest}>
      <span className="text-rotate-sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={elementClass}>
          {word}
          {i < words.length - 1 && <span className="text-rotate-space">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

function SplitText({ 
  text, 
  splitBy = 'character', 
  staggerDelay = 0.025, 
  staggers = 1, 
  delay = 0, 
  className = '', 
  srClassName = 'text-rotate-sr-only', 
  elementClassName = '', 
  ariaLabel, 
  ...rest 
}: SplitTextProps) {
  const getDelay = useCallback((index: number) => {
    if (staggers === 1) return delay + index * staggerDelay;
    const staggerIndex = index % staggers;
    return delay + staggerIndex * staggerDelay;
  }, [delay, staggers, staggerDelay]);

  if (splitBy === 'none') {
    return (
      <motion.span
        className={className}
        aria-label={ariaLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        {...rest}
      >
        {text}
      </motion.span>
    );
  }

  if (splitBy === 'word') {
    return (
      <span className={className} role="text" aria-label={ariaLabel || text}>
        <span className={srClassName}>{text}</span>
        {text.split(' ').map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <motion.span
              className={elementClassName}
              initial={{ opacity: 0, y: '0.35em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: getDelay(i), 
                duration: 0.3,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              {...rest}
            >
              {word}
            </motion.span>
            {i < text.split(' ').length - 1 && (
              <span className="text-rotate-space">&nbsp;</span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  }

  if (splitBy === 'line') {
    return (
      <TextSplit
        text={text}
        mode="line"
        className={className}
        elementClassName={elementClassName}
        ariaLabel={ariaLabel}
        {...rest}
      />
    );
  }

  // By character
  return (
    <span className={className} role="text" aria-label={ariaLabel || text}>
      <span className={srClassName}>{text}</span>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className={elementClassName}
          initial={{ opacity: 0, y: '0.35em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: getDelay(i), 
            duration: 0.3,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          {...rest}
        >
          {char === ' ' ? <span className="text-rotate-space">&nbsp;</span> : char}
        </motion.span>
      ))}
    </span>
  );
}

const RotatingText = ({ 
  texts, 
  className = '', 
  options = {}, 
  onNext, 
  onPrevious, 
  onLoop, 
  onComplete, 
  ariaLabel,
  motion: motionProps,
  rotationInterval,
  splitBy,
  staggerDuration,
  ...rest 
}: RotatingTextProps) => {
  // Remove these props from rest to prevent them from being passed to DOM elements
  const { rotationInterval: _, splitBy: __, staggerDuration: ___, ...domProps } = rest;

  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textArray = useMemo(() => {
    return Array.isArray(texts) ? texts : [texts];
  }, [texts]);
  
  const {
    start = 0,
    staggerDelay = 0.025,
    staggers = 1,
    changeDelay = 3000,
    duration = 500,
    infinite = true,
    steps = false,
    stepWise = false,
    erase = false,
    eraseDelay = 1000,
    eraseStaggerDelay = 0.025,
    eraseStagger = 1,
    random = false,
    useIntersectionObserver = true,
    threshold = 0.5,
    rootMargin = '0px',
    playOnce = false,
    loop = true,
    mode = 'word',
    springConfig = {},
    classNames = {},
  } = options;

  const [currentTextIndex, setCurrentTextIndex] = useState(start);
  const [currentText, setCurrentText] = useState(textArray[currentTextIndex] || '');
  const [isActive, setIsActive] = useState(!useIntersectionObserver);
  const [inView, setInView] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActionTimeRef = useRef<number>(0);
  const staggeredAnimationRef = useRef(0);
  
  // Detect mobile device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Intersection observer
  useEffect(() => {
    if (!useIntersectionObserver || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);
        if (isIntersecting) {
          setIsActive(true);
          if (playOnce && !completed) {
            observer.unobserve(containerRef.current!);
          }
        } else {
          if (!playOnce) {
            setIsActive(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [useIntersectionObserver, threshold, rootMargin, playOnce, completed]);

  // Select text method
  const next = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 500) return; // Debounce
    lastActionTimeRef.current = now;

    let nextIndex;
    if (random) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * textArray.length);
      } while (randomIndex === currentTextIndex && textArray.length > 1);
      nextIndex = randomIndex;
    } else {
      nextIndex = (currentTextIndex + 1) % textArray.length;
    }

    setCurrentTextIndex(nextIndex);
    setCurrentText(textArray[nextIndex] || '');

    if (nextIndex === 0 || (nextIndex < currentTextIndex && !random)) {
      setLoopCount(prevCount => prevCount + 1);
      if (onLoop) onLoop(loopCount + 1, nextIndex);
      if (infinite === false && loopCount >= 0) {
        setCompleted(true);
        setIsActive(false);
        if (onComplete) onComplete();
      }
    }

    if (onNext) onNext(nextIndex, textArray[nextIndex] || '', textArray.length);
  }, [currentTextIndex, textArray, random, infinite, loopCount, onNext, onLoop, onComplete]);

  const previous = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 500) return; // Debounce
    lastActionTimeRef.current = now;

    let prevIndex;
    if (random) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * textArray.length);
      } while (randomIndex === currentTextIndex && textArray.length > 1);
      prevIndex = randomIndex;
    } else {
      prevIndex = currentTextIndex === 0 ? textArray.length - 1 : currentTextIndex - 1;
    }

    setCurrentTextIndex(prevIndex);
    setCurrentText(textArray[prevIndex] || '');

    if (onPrevious) onPrevious(prevIndex, textArray[prevIndex] || '', textArray.length);
  }, [currentTextIndex, textArray, random, onPrevious]);

  const jumpTo = useCallback((index: number) => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 500) return; // Debounce
    lastActionTimeRef.current = now;

    if (index >= 0 && index < textArray.length) {
      setCurrentTextIndex(index);
      setCurrentText(textArray[index] || '');
    }
  }, [textArray]);

  const reset = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 500) return; // Debounce
    lastActionTimeRef.current = now;

    setCurrentTextIndex(start);
    setCurrentText(textArray[start] || '');
    setLoopCount(0);
    setCompleted(false);
    setIsActive(true);
  }, [start, textArray]);

  // Autoplaying effect
  useEffect(() => {
    if (isActive && !completed && loop && !steps && textArray.length > 1) {
      const mobileAdjustedChangeDelay = isMobile ? Math.max(changeDelay / 1.5, 1000) : changeDelay;
      
      timerRef.current = setTimeout(() => {
        next();
      }, mobileAdjustedChangeDelay);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, completed, loop, steps, textArray.length, currentTextIndex, next, changeDelay, isMobile]);

  // Expose methods to parent
  useEffect(() => {
    if (typeof rest.ref === 'function') {
      rest.ref({ next, previous, jumpTo, reset });
    } else if (rest.ref) {
      rest.ref.current = { next, previous, jumpTo, reset };
    }
  }, [next, previous, jumpTo, reset, rest.ref]);

  // Animation properties
  const mergedMotionProps = useMemo(() => {
    return {
      ...defaultAnimateText,
      ...(motionProps || {}),
    };
  }, [motionProps]);

  // Adjust staggerDelay for mobile
  const mobileAdjustedStaggerDelay = isMobile ? Math.min(staggerDelay, 0.015) : staggerDelay;

  return (
    <div 
      ref={containerRef} 
      className={`text-rotate${className ? ` ${className}` : ''}${classNames.root ? ` ${classNames.root}` : ''}`}
      style={{ willChange: 'transform' }}
      {...domProps}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          {...mergedMotionProps}
          className={classNames.text || ''}
        >
          <SplitText
            text={currentText}
            splitBy={splitBy}
            staggerDelay={mobileAdjustedStaggerDelay}
            staggers={staggers}
            className=""
            elementClassName={classNames.splitElement || ''}
            srClassName={classNames.srOnly || 'text-rotate-sr-only'}
            ariaLabel={ariaLabel || currentText}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

RotatingText.propTypes = {
  texts: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
  options: PropTypes.object,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onLoop: PropTypes.func,
  onComplete: PropTypes.func,
  ariaLabel: PropTypes.string,
  motion: PropTypes.object,
  rotationInterval: PropTypes.number,
  splitBy: PropTypes.oneOf(['character', 'word', 'line', 'none']),
  staggerDuration: PropTypes.number,
};

export default RotatingText; 