'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { TypingContext } from '@/app/(context)/typing';
import { ProfileContext } from '@/app/(context)/profile.context';
import Caret from './Caret';
import { TypingWords } from './types';

interface Props {
  words: TypingWords;
  wordIndex: number;
  charIndex: number;
  secondCaret?: { wordIndex: number; charIndex: number };
}

export default function Input(props: Props) {
  const { words, wordIndex, charIndex, secondCaret } = props;
  const { typingStarted, typingFocused, lineHeight, setLineHeight } =
    useContext(TypingContext);
  const { profile } = useContext(ProfileContext);
  const [wordsOffset, setWordsOffset] = useState(0);

  // const wordWrapperRef = useRef<HTMLDivElement>(null);
  // const wordRef = useRef<HTMLDivElement | null>(null);
  // const charRef = useRef<HTMLSpanElement | null>(null);
  // const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  // const secondCaretWordRef = useRef<HTMLDivElement | null>(null);
  // const secondCaretCharRef = useRef<HTMLSpanElement | null>(null;

  const wordRef = useRef<HTMLDivElement | undefined>(undefined);
  const wordWrapperRef = useRef<HTMLDivElement | null>(null);
const charRef = useRef<HTMLSpanElement | undefined>(undefined);
const secondCaretWordRef = useRef<HTMLDivElement | undefined>(undefined);
const secondCaretCharRef = useRef<HTMLSpanElement | undefined>(undefined);
const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typingStarted) hiddenInputRef.current?.focus();
  }, [typingStarted]);

  useEffect(() => {
    if (!wordWrapperRef.current) return;
    const { offsetTop, clientHeight } = wordWrapperRef.current;
    setWordsOffset(Math.max(offsetTop - clientHeight, 0));
  }, [charIndex]);

  const firstWord = words[0]?.chars.join('');

  useEffect(() => {
    setLineHeight((state) => wordWrapperRef.current?.clientHeight || state);

    const interval = setInterval(() => {
      setLineHeight((state) => {
        if (state === 0 || wordWrapperRef.current?.clientHeight !== state) {
          return wordWrapperRef.current?.clientHeight || state;
        }
        clearInterval(interval);
        return state;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [profile.customize.fontSize]);

  return (
    <div className="relative overflow-hidden" style={{ height: lineHeight * 3 }}>
      {words.length !== 0 && profile.customize.caretStyle !== 'off' && (
        <Caret
          lineHeight={lineHeight}
          wordIndex={wordIndex}
          charIndex={charIndex}
          wordsOffset={wordsOffset}
          firstWord={firstWord}
          wordRef={wordRef}
          charRef={charRef}
        />
      )}

      {typingStarted && secondCaret && (
        <Caret
          lineHeight={lineHeight}
          wordIndex={secondCaret.wordIndex}
          charIndex={secondCaret.charIndex}
          wordRef={secondCaretWordRef}
          charRef={secondCaretCharRef}
          firstWord={firstWord}
          wordsOffset={wordsOffset}
          className="opacity-40"
        />
      )}

      <input
        type="text"
        className={`absolute inset-0 opacity-0 z-10 select-none text-base ${
          typingFocused ? 'cursor-none' : 'cursor-default'
        }`}
        autoCapitalize="off"
        ref={hiddenInputRef}
        tabIndex={-1}
      />

      <div
        className="flex flex-wrap select-none transition-transform duration-75"
        style={{
          transform:
            secondCaret || typingStarted
              ? `translateY(-${wordsOffset}px)`
              : undefined,
          fontSize: profile.customize.fontSize,
        }}
      >
        {words.map((word, index) => {
          const isCurrentWord = index === wordIndex;
          const isSecondCaretWord =
            secondCaret && index === secondCaret.wordIndex;

          return (
            <div
              key={index}
              className="px-1 py-0.5"
              ref={isCurrentWord ? wordWrapperRef : undefined}
            >
              <div
                className={`relative border-r border-transparent ${
                  word.isIncorrect
                    ? 'after:content-[""] after:absolute after:bottom-[1px] after:w-full after:h-[2px] after:bg-red-500 after:opacity-75 after:animate-line'
                    : ''
                }`}
                ref={(node) => {
                  if (isCurrentWord && node) wordRef.current = node;
                  if (isSecondCaretWord && node) secondCaretWordRef.current = node;
                }}
              >
                {word.chars.map((char, idx) => (
                  <span
                    key={idx}
                    className={`inline-block border-l border-transparent ${
                      char.type === 'correct'
                        ? 'text-green-500'
                        : char.type === 'incorrect'
                        ? 'text-red-500'
                        : char.type === 'extra'
                        ? 'text-yellow-500'
                        : 'text-gray-800'
                    }`}
                    ref={(node) => {
                      if (isCurrentWord && idx === charIndex) {
                        charRef.current = node ?? undefined;
                      }
                      if (
                        isSecondCaretWord &&
                        idx === secondCaret.charIndex
                      ) {
                        secondCaretCharRef.current = node ?? undefined;
                      }
                    }}
                  >
                    {char.content}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
