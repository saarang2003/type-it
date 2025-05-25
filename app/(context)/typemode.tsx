'use client';

import { createContext, useEffect, useState } from 'react';
import { TypemodeTime, TypemodeType, TypemodeWords } from '../(data)/types';
import { QouteLengthType } from '../types';
import useLocalStorageState from '../(hooks)/useLocalStorageState';
import { getQuoteTagList } from '../(services)/qouteable';

type QuoteTagsType = { name: string; isSelected: boolean }[];
type QuoteTagsModeType = 'all' | 'only selected';

interface Context {
  mode: TypemodeType;
  time: TypemodeTime;
  words: TypemodeWords;
  quote: QouteLengthType;
  punctuation: boolean;
  numbers: boolean;
  quoteTagsMode: QuoteTagsModeType;
  quoteTags: QuoteTagsType;
  onMode: (mode: TypemodeType) => void;
  onTime: (time: TypemodeTime) => void;
  onWords: (words: TypemodeWords) => void;
  onQuote: (quote: QouteLengthType) => void;
  onPunctuationToggle: () => void;
  onNumbersToggle: () => void;
  onToggleQuoteTag: (index: number) => void;
  onUpdateQuoteTagsMode: (mode: QuoteTagsModeType) => void;
  onClearSelectedQuoteTags: () => void;
}

const initial: Context = {
  mode: 'qoute',
  time: 30,
  words: 30,
  quote: 'short',
  punctuation: true,
  numbers: false,
  quoteTagsMode: 'all',
  quoteTags: [],
  onMode: () => {},
  onTime: () => {},
  onWords: () => {},
  onQuote: () => {},
  onPunctuationToggle: () => {},
  onNumbersToggle: () => {},
  onToggleQuoteTag: () => {},
  onUpdateQuoteTagsMode: () => {},
  onClearSelectedQuoteTags: () => {},
};

export const TypeModeContext = createContext<Context>(initial);

interface Props {
  children: React.ReactNode;
}

export const TypeModeContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useLocalStorageState('typing-mode', initial.mode);
  const [quote, setQuote] = useLocalStorageState('typing-quote', initial.quote);
  const [time, setTime] = useLocalStorageState('typing-time', initial.time);
  const [words, setWords] = useLocalStorageState('typing-words', initial.words);
  const [punctuation, setPunctuation] = useLocalStorageState('punctuation', initial.punctuation);
  const [numbers, setNumbers] = useLocalStorageState('numbers', initial.numbers);
  const [quoteTags, setQuoteTags] = useState<QuoteTagsType>(initial.quoteTags);
  const [quoteTagsMode, setQuoteTagsMode] = useState<QuoteTagsModeType>(initial.quoteTagsMode);

  useEffect(() => {
    getQuoteTagList().then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const quoteTagsData: QuoteTagsType = data.map((tag: any) => ({
        name: tag.name,
        isSelected: false,
      }));
      setQuoteTags(quoteTagsData);
    });
  }, []);

  const onMode: Context['onMode'] = (mode) => setMode(mode);
  const onTime: Context['onTime'] = (time) => setTime(time);
  const onWords: Context['onWords'] = (words) => setWords(words);
  const onQuote: Context['onQuote'] = (quote) => setQuote(quote);
  const onPunctuationToggle: Context['onPunctuationToggle'] = () => setPunctuation((prev) => !prev);
  const onNumbersToggle: Context['onNumbersToggle'] = () => setNumbers((prev) => !prev);

  const onToggleQuoteTag: Context['onToggleQuoteTag'] = (index) => {
    setQuoteTags((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        isSelected: !prev[index].isSelected,
      },
      ...prev.slice(index + 1),
    ]);
  };

  const onUpdateQuoteTagsMode: Context['onUpdateQuoteTagsMode'] = (mode) => {
    setQuoteTagsMode(mode);
  };

  const onClearSelectedQuoteTags: Context['onClearSelectedQuoteTags'] = () => {
    setQuoteTags((prev) =>
      prev.map((tag) => ({ ...tag, isSelected: false }))
    );
  };

  return (
    <TypeModeContext.Provider
      value={{
        mode,
        time,
        words,
        quote,
        punctuation,
        numbers,
        quoteTagsMode,
        quoteTags,
        onMode,
        onTime,
        onWords,
        onQuote,
        onPunctuationToggle,
        onNumbersToggle,
        onToggleQuoteTag,
        onUpdateQuoteTagsMode,
        onClearSelectedQuoteTags,
      }}
    >
      {children}
    </TypeModeContext.Provider>
  );
};
