"use client";

import { useContext, useMemo, useEffect, useState } from 'react';
import { TypeModeContext } from '../(context)/typemode';
import { ModalContext } from '../(context)/modal';
import { TypemodeType } from '../(data)/types';
import Column, { ColumnProps } from './Column';
import { data } from '../(data)';
import { IconNumbers, IconPunctuation, IconQuote, IconTags, IconTime, IconWords } from '@/public/assets';
import { QouteLengthType } from '../types';

interface Props {
  className?: string;
}

export default function Typemode({ className }: Props) {
  const {
    mode,
    time,
    quote,
    words,
    quoteTagsMode,
    punctuation,
    numbers,
    onMode,
    onTime,
    onQuote,
    onWords,
    onPunctuationToggle,
    onNumbersToggle,
  } = useContext(TypeModeContext);
  const { onOpenModal } = useContext(ModalContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const typemodeKeys = Object.keys(data.typemode) as TypemodeType[];

  const colFirstButtons = useMemo<ColumnProps['buttons']>(() => {
    if (!isClient) {
      return [
        {
          Icon: IconTags,
          text: 'tags',
          action: () => {},
          active: false,
        },
      ]; // SSR default
    }
    if (mode === 'words' || mode === 'time') {
      return [
        {
          Icon: IconPunctuation,
          text: 'punctuation',
          action: () => onPunctuationToggle(),
          active: punctuation,
        },
        {
          Icon: IconNumbers,
          text: 'numbers',
          action: () => onNumbersToggle(),
          active: numbers,
        },
      ];
    }
    return [
      {
        Icon: IconTags,
        text: 'tags',
        action: () => onOpenModal({ modal: 'quoteTags' }),
        active: quoteTagsMode === 'only selected',
      },
    ];
  }, [isClient, mode, punctuation, numbers, quoteTagsMode, onPunctuationToggle, onNumbersToggle, onOpenModal]);

  const colSecondButtons = useMemo<ColumnProps['buttons']>(() => {
    const modeIcons: Record<TypemodeType, React.FC<React.SVGProps<SVGSVGElement>>> = {
      time: IconTime,
      words: IconWords,
      qoute: IconQuote,
    };
    return typemodeKeys.map((modeLocal) => ({
      Icon: modeIcons[modeLocal],
      text: modeLocal,
      action: () => onMode(modeLocal),
      active: modeLocal === mode,
    }));
  }, [mode, onMode, typemodeKeys]);

  const colThirdButtons = useMemo<ColumnProps['buttons']>(() => {
    if (mode === 'time') {
      return data.typemode.time.map((timeLocal) => ({
        text: timeLocal,
        action: () => onTime(timeLocal),
        active: timeLocal === time,
      }));
    }
    if (mode === 'words') {
      return data.typemode.words.map((wordsLocal) => ({
        text: wordsLocal,
        action: () => onWords(wordsLocal),
        active: wordsLocal === words,
      }));
    }
    return data.typemode.qoute.map((quoteLocal: string) => ({
      text: quoteLocal,
      action: () => onQuote(quoteLocal as QouteLengthType),
      active: quote === 'all' ? quoteLocal !== 'all' : quoteLocal === quote,
    }));
  }, [mode, time, words, quote, onTime, onWords, onQuote]);

  return (
    <div
      className={`
        bg-[var(--typemode-bg)] rounded-md mx-auto flex items-center h-full
        w-max
        ${className || ''}
        max-[725px]:flex-col
      `}
    >
      <Column buttons={colFirstButtons} />
      {!!colFirstButtons.length && (
        <div
          className={`
            self-stretch w-[3px] bg-[var(--clr-char)] my-[9px] opacity-20
            max-[725px]:self-center max-[725px]:h-[2px] max-[725px]:w-[35px]
            max-[725px]:my-[3px]
          `}
        />
      )}
      <Column buttons={colSecondButtons} />
      {!!colThirdButtons.length && (
        <div
          className={`
            self-stretch w-[3px] bg-[var(--clr-char)] my-[9px] opacity-20
            max-[725px]:self-center max-[725px]:h-[2px] max-[725px]:w-[35px]
            max-[725px]:my-[3px]
          `}
        />
      )}
      <Column buttons={colThirdButtons} />
    </div>
  );
}