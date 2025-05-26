"use client";

import { ProfileContext } from '@/app/(context)/profile.context';
import { TypingContext } from '@/app/(context)/typing';
import { useContext, useEffect, useState } from 'react';

interface Props {
  lineHeight: number;
  wordIndex: number;
  charIndex: number;
  wordsOffset: number;
  firstWord: string;
  wordRef: React.MutableRefObject<HTMLDivElement | undefined>;
  charRef: React.MutableRefObject<HTMLSpanElement | undefined>;
  className?: string;
}

export default function Caret(props: Props) {
  const {
    lineHeight,
    wordIndex,
    charIndex,
    wordsOffset,
    firstWord,
    wordRef,
    charRef,
    className,
  } = props;

  const { typingStarted } = useContext(TypingContext);
  const { profile } = useContext(ProfileContext);

  const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });
  const [charWidth, setCharWidth] = useState(0);

  const { caretStyle, fontSize, smoothCaret } = profile.customize;

  useEffect(() => {
    if (!wordRef.current) return;
    const {
      offsetLeft: wordOffsetLeft,
      offsetTop: wordOffsetTop,
      offsetWidth: wordOffsetWidth,
    } = wordRef.current;

    if (!charRef.current) {
      return setCaretPos({
        x: wordOffsetLeft + wordOffsetWidth,
        y: wordOffsetTop - wordsOffset,
      });
    }

    const { offsetLeft: charOffsetLeft } = charRef.current;
    setCaretPos({
      x: wordOffsetLeft + charOffsetLeft,
      y: wordOffsetTop - wordsOffset,
    });
  }, [wordIndex, charIndex, wordsOffset, firstWord, wordRef, charRef, lineHeight]);

  useEffect(() => {
    setCharWidth(charRef.current?.clientWidth || 0);
  }, [lineHeight, charRef]);

  const sizingStyle = (
    caretStyle === 'line'
      ? {
          width: charWidth / 9,
          height: lineHeight - fontSize * 0.4,
          left: 0,
          top: 1,
        }
      : caretStyle === 'underline'
      ? {
          width: charWidth,
          height: lineHeight / 30,
          left: 1,
          top: lineHeight - fontSize * 0.4 - 2,
        }
      : caretStyle === 'block'
      ? {
          width: charWidth,
          height: lineHeight * 0.6,
          left: 0,
          top: fontSize * 0.2,
        }
      : {}
  ) as React.CSSProperties;

  const blinkClass = !typingStarted
    ? smoothCaret
      ? 'animate-pulse'
      : 'animate-blink'
    : '';

  return (
    <div
      className={`
        absolute
        bg-[var(--clr-main)]
        z-10
        ${caretStyle === 'line' ? '' : ''}
        ${caretStyle === 'block' ? 'rounded-sm opacity-60' : ''}
        ${caretStyle === 'underline' ? '' : ''}
        ${smoothCaret ? 'transition-all duration-100 ease-linear' : ''}
        ${blinkClass}
        ${className || ''}
      `}
      style={{
        transform: `translate(${caretPos.x}px, ${caretPos.y}px)`,
        position: 'absolute',
        ...sizingStyle,
      }}
    />
  );
}
