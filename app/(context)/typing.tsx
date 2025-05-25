'use client';

import { TypingResult } from "../types";


interface Context {
  typingStarted: boolean;
  typingFocused: boolean;
  typingDisabled: boolean;
  resultPreview: { state: TypingResult; options?: ResultOptions } | null;
  lineHeight: number;
  setLineHeight: React.Dispatch<React.SetStateAction<number>>;
  typemodeVisible: boolean;
  setTypemodeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onTypingStarted: () => void;
  onTypingEnded: () => void;
  onTypingDisable: () => void;
  onTypingAllow: () => void;
  onPreviewResult: (result: TypingResult | null, options?: ResultOptions) => void;
  onUpdateTypingFocus: (bool: boolean) => void;
}