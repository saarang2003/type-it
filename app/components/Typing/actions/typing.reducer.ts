import { TypingResult } from "@/app/types";
import { TypingWords } from "../types";
import start from "./start.action";
import type from "./type.action";
import nextWord from "./nextWord.action";
import deleteKey from "./deleteKey.action";
import deleteWord from "./deleteWord.action";
import addWords from "./addWords.action";
import restart from "./restart.action";
import timeline from "./timeline.action";
import result from "./result.action";
import newWords from "./newWords.action";

export type TypingResultReducer = TypingResult & { showResult: boolean };

export type TypingState = {
  wordIndex: number;
  charIndex: number;
  words: TypingWords;
  mistype: number;
  typed: number;
  typedCorrectly: number;
  result: TypingResultReducer;
  dateTypingStarted: number | null;
};

export const initialState: TypingState = {
  words: [],
  wordIndex: 0,
  charIndex: 0,
  mistype: 0,
  typed: 0,
  typedCorrectly: 0,
  result: {
    showResult: false,
    timeline: [],
    error: 0,
    testType: null,
    qouteAuthor: "",
  },
  dateTypingStarted: null,
};

export type TypingActions =
  | { type: 'START'; payload: string }
  | { type: 'TYPE'; payload: string }
  | { type: 'NEXT_WORD' }
  | { type: 'DELETE_KEY' }
  | { type: 'DELETE_WORD' }
  | { type: 'ADD_WORDS'; payload: TypingWords }
  | { type: 'RESTART'; payload?: TypingWords }
  | { type: 'TIMELINE' }
  | { type: 'RESULT'; payload?: number }
  | { type: 'NEW_WORDS'; payload: { words: TypingWords; author?: string } };

export default function typingReducer(
  state: TypingState,
  action: TypingActions
): TypingState {
  switch (action.type) {
    case 'START':
      return start(state, action.payload);
    case 'TYPE':
      return type(state, action.payload);
    case 'NEXT_WORD':
      return nextWord(state);
    case 'DELETE_KEY':
      return deleteKey(state);
    case 'DELETE_WORD':
      return deleteWord(state);
    case 'ADD_WORDS':
      return addWords(state, action.payload);
    case 'RESTART':
      return restart(state, action.payload);
    case 'TIMELINE':
      return timeline(state);
    case 'RESULT':
      return result(state, action.payload);
    case 'NEW_WORDS':
      return newWords(state, action.payload);
    default:
      return state;
  }
}