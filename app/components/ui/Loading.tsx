'use client';

import React from 'react';

interface Props {
  type: 'spinner' | 'dot-flashing';
  className?: string;
}

export default function Loading({ type, className = '' }: Props) {
  if (type === 'spinner') {
    return (
      <div
        className={`w-8 h-8 border-[0.3em] border-[var(--clr-main)] border-b-transparent rounded-full animate-spin ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative w-[10px] h-[10px] rounded-full bg-[var(--clr-main)] text-[var(--clr-main)] animate-dot-flashing
        before:content-[''] before:absolute before:top-0 before:left-[-15px] before:w-[10px] before:h-[10px] before:rounded-full before:bg-[var(--clr-main)] before:animate-dot-flashing before:delay-0
        after:content-[''] after:absolute after:top-0 after:left-[15px] after:w-[10px] after:h-[10px] after:rounded-full after:bg-[var(--clr-main)] after:animate-dot-flashing after:delay-[1000ms]
        ${className}`}
    />
  );
}
