import { TypingWords } from "../types";
import { TypingState } from "./typing.reducer";


export default function newWords(
  state: TypingState,
  payload: { words: TypingWords; author?: string }
): TypingState {
  if (state.result.showResult) return state;

  return {
    ...state,
    words: payload.words,
    result: {
      ...state.result,
      qouteAuthor: payload.author ?? "",
    },
  };
}