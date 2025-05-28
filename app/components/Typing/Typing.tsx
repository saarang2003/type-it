"use client";

import { TypingContext } from '@/app/(context)/typing';
import { TypingResult } from '@/app/types';
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import typingReducer, { initialState } from './actions/typing.reducer';
import { TypeModeContext } from '@/app/(context)/typemode';
import { ProfileContext } from '@/app/(context)/profile.context';
import useSound from '@/app/(hooks)/useSound';
import { getRandomWords, getTypingWords } from '@/app/helper';
import { getRandomQuoteByLength } from '@/app/(services)/qouteable';
import Counter from './Counter';
import Image from 'next/image';
import { IconLock } from '@/public/assets';
import LoadingError from './LoadingError';
import Input from './Input';
import Restart from './Restart';
import Result from './Result';
import Loading from '../ui/Loading';
// Import your typewriter sound file (adjust the path as needed)


interface Props {
  testText?: string;
  secondCaret?: { wordIndex: number; charIndex: number };
  oneVersusOne?: boolean;
  typeModeCustom?: string;
  onCaretPositionChange?: (wordIndex: number, charIndex: number) => void;
  onResult?: (result: TypingResult) => void;
}

// Used to abort previous fetch call if new one is called
let quoteAbortController: AbortController | null = null;

export default function Typing({
  testText,
  secondCaret,
  oneVersusOne,
  typeModeCustom,
  onCaretPositionChange,
  onResult,
}: Props) {
  const {
    typingDisabled,
    typingStarted,
    typingFocused,
    onUpdateTypingFocus,
    onTypingStarted,
    onTypingEnded,
    setTypemodeVisible,
  } = useContext(TypingContext);
  const [state, dispatch] = useReducer(typingReducer, initialState);
  const {
    mode,
    words,
    time,
    quote,
    numbers,
    punctuation,
    quoteTags,
    quoteTagsMode,
  } = useContext(TypeModeContext);
  const { profile, onTestsStartedUpdate, onTestsCompletedUpdate } =
    useContext(ProfileContext);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [timeCountdown, setTimeCountdown] = useState<number>(time);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<404 | 500 | null>(null);
  const playTypingSound = useSound('../../../public/typewriter.wav', 0.3);

  const isTypingDisabled =
    typingDisabled || isLoading || loadingError || (oneVersusOne && !typingStarted);

  useEffect(() => {
    const handleMouseMove = () => {
      onUpdateTypingFocus(false);
    };

    if (typingFocused) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [typingFocused, onUpdateTypingFocus]);

  useEffect(() => {
    const typeHandler = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === 'Escape') {
        onUpdateTypingFocus(false);
      }

      if (event.getModifierState && event.getModifierState('CapsLock')) {
        setIsCapsLock(true);
      } else {
        setIsCapsLock(false);
      }
      if (event.ctrlKey && key === 'Backspace') {
        onUpdateTypingFocus(true);
        if (profile.customize.soundOnClick) playTypingSound();
        return dispatch({ type: 'DELETE_WORD' });
      }
      if (key === 'Backspace') {
        onUpdateTypingFocus(true);
        if (profile.customize.soundOnClick) playTypingSound();
        return dispatch({ type: 'DELETE_KEY' });
      }
      if (key === ' ') {
        event.preventDefault();
        onUpdateTypingFocus(true);
        if (profile.customize.soundOnClick) playTypingSound();
        return dispatch({ type: 'NEXT_WORD' });
      }
      if (key.length === 1) {
        if (!typingStarted && !oneVersusOne) {
          onTypingStarted();
        }
        onUpdateTypingFocus(true);
        if (profile.customize.soundOnClick) playTypingSound();
        return dispatch({ type: 'TYPE', payload: key });
      }
    };
    if (state.result.showResult || isTypingDisabled) {
      document.removeEventListener('keydown', typeHandler);
    } else document.addEventListener('keydown', typeHandler);

    return () => document.removeEventListener('keydown', typeHandler);
  }, [
    typingStarted,
    onTypingStarted,
    state.result.showResult,
    mode,
    quote,
    time,
    words,
    isTypingDisabled,
    playTypingSound,
    profile.customize.soundOnClick,
    oneVersusOne,
    onUpdateTypingFocus,
  ]);

  useEffect(() => {
    if (typingStarted) {
      if (profile.username) {
        onTestsStartedUpdate();
      }

      dispatch({
        type: 'START',
        payload:
          typeModeCustom ||
          `${mode} ${mode === 'time' ? time : mode === 'words' ? words : quote}`,
      });
    }
  }, [typingStarted, profile.username, onTestsStartedUpdate, mode, time, words, quote, typeModeCustom]);

  const onRestart = useCallback(() => {
    onTypingEnded();
    onUpdateTypingFocus(false);

    quoteAbortController?.abort();
    quoteAbortController = new AbortController();
    setIsLoading(false);
    setLoadingError(null);

    if (testText !== undefined) {
      if (!testText.trim().length) {
        setIsLoading(true);
      } else {
        dispatch({ type: 'RESTART', payload: getTypingWords(testText.split(' ')) });
        setIsLoading(false);
      }
    }

    if (!oneVersusOne) {
      if (mode === 'time') {
        dispatch({
          type: 'RESTART',
          payload: getRandomWords(50, punctuation, numbers),
        });
        setTimeCountdown(time);
      } else if (mode === 'words') {
        dispatch({
          type: 'RESTART',
          payload: getRandomWords(words, punctuation, numbers),
        });
      } else {
        dispatch({ type: 'RESTART', payload: [] });

        setIsLoading(true);

        const tags =
          quoteTagsMode === 'only selected' && quoteTags.length
            ? quoteTags.filter((tag) => tag.isSelected).map((tag) => tag.name)
            : undefined;

        getRandomQuoteByLength(quote, tags, quoteAbortController).then((data) => {
          if (
            (data.statusCode && data.statusCode === 404) ||
            data.statusCode === 500
          ) {
            setLoadingError(data.statusCode);
            setIsLoading(false);
            return;
          }

          dispatch({
            type: 'NEW_WORDS',
            payload: {
              words: getTypingWords(
                data.content.replace(/—/g, '-').replace(/…/g, '...').split(' ')
              ),
              author: data.author,
            },
          });

          setIsLoading(false);
          setLoadingError(null);
        });
      }
    }
  }, [
    time,
    mode,
    words,
    quote,
    testText,
    oneVersusOne,
    numbers,
    punctuation,
    quoteTagsMode,
    quoteTags,
    onTypingEnded,
    onUpdateTypingFocus,
  ]);

  const onRepeat = () => {
    onTypingEnded();
    onUpdateTypingFocus(false);
    dispatch({ type: 'RESTART' });

    if (mode === 'time') {
      setTimeCountdown(time);
    }
  };

  useEffect(() => {
    if (!state.words.length || (mode === 'time' && !oneVersusOne)) return;

    const lastWordCorrect =
      state.wordIndex === state.words.length - 1 &&
      state.words[state.wordIndex].chars.every((char) => char.type === 'correct');

    if (state.wordIndex === state.words.length || lastWordCorrect) {
      dispatch({ type: 'RESULT' });
      onUpdateTypingFocus(false);
    }
  }, [mode, state.words, state.charIndex, state.wordIndex, oneVersusOne, onUpdateTypingFocus]);

  useEffect(() => {
    if (oneVersusOne) return;

    if (mode === 'time') {
      if ((state.wordIndex + 1) % 10 === 0) {
        dispatch({
          type: 'ADD_WORDS',
          payload: getRandomWords(10, punctuation, numbers),
        });
      }
    }
  }, [mode, state.wordIndex, oneVersusOne, punctuation, numbers]);

  useEffect(() => {
    onRestart();

    return () => {
      quoteAbortController?.abort();
    };
  }, [onRestart]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (typingStarted) {
      interval = setInterval(() => {
        dispatch({ type: 'TIMELINE' });

        if (mode === 'time' && !oneVersusOne)
          setTimeCountdown((prevState) => prevState - 1);
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [typingStarted, mode, oneVersusOne]);

  useEffect(() => {
    if (timeCountdown === 0) {
      dispatch({ type: 'RESULT', payload: time });
      onUpdateTypingFocus(false);
    }
  }, [timeCountdown, time, onUpdateTypingFocus]);

  useEffect(() => {
    if (state.result.showResult) {
      onTestsCompletedUpdate(state.result);

      if (onResult) {
        onResult(state.result);
        onTypingEnded();
      }

      setTypemodeVisible(false);
    } else {
      setTypemodeVisible(true);
    }
  }, [state.result, state.result.showResult, onResult, onTestsCompletedUpdate, onTypingEnded, setTypemodeVisible]);

  useEffect(() => {
    if (onCaretPositionChange) {
      onCaretPositionChange(state.wordIndex, state.charIndex);
    }
  }, [state.wordIndex, state.charIndex, onCaretPositionChange]);

  const timelineLatest = state.result.timeline[state.result.timeline.length - 1];

  return (
    <div className="relative outline-none h-max">
      {!state.result.showResult || oneVersusOne ? (
        <>
          <div className="flex justify-center items-center mb-4 space-x-12">
            {profile.customize.liveWpm && (
              <div className="flex flex-col items-center">
                <span>wpm</span>
                <span>{timelineLatest?.wpm || '-'}</span>
              </div>
            )}
            {profile.customize.liveAccuracy && (
              <div className="flex flex-col items-center">
                <span>accuracy</span>
                <span>{timelineLatest?.accuracy || '-'}</span>
              </div>
            )}
          </div>

          <div
            className="mx-auto"
            style={{ width: `${profile.customize.inputWidth * 0.95}%` }}
          >
        
              <Counter
                wordsLength={state.words.length}
                mode={mode}
                counter={mode === 'time' ? timeCountdown : state.wordIndex + 1}
              />

            {isCapsLock && (
              <div className="flex items-center bg-[var(--clr-tooltip)] text-[var(--clr-char-correct)] px-2.5 py-2 rounded-md absolute top-[-35px] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <Image 
                src={IconLock}
                alt='Icon lock'
                className="w-[30px] h-[30px]" 
                />
                <p>CAPS LOCK</p>
              </div>
            )}
            {loadingError && state.words.length === 0 ? (
              <LoadingError status={loadingError} />
            ) : (
              <Input
                words={state.words}
                wordIndex={state.wordIndex}
                charIndex={state.charIndex}
                secondCaret={secondCaret}
              />
            )}
            {!oneVersusOne && (
              <Restart onRestart={onRestart} className="relative mt-12 mx-auto" />
            )}
          </div>
        </>
      ) : (
        <Result result={state.result} onRestart={onRestart} onRepeat={onRepeat} />
      )}

      {isLoading && (
        <Loading
          type="spinner"
          className="absolute left-1/2 transform -translate-x-1/2 top-[35%]"
        />
      )}
    </div>
  );
}