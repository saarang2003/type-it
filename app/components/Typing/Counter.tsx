'use client';

import { TypemodeType } from '@/app/(data)/types';

interface Props {
  mode: TypemodeType;
  counter: number;
  wordsLength: number;
}

export default function Counter({ mode, counter, wordsLength }: Props) {
  const calcSeconds =
    mode === 'time' ? String(counter % 60).padStart(2, '0') : null;

  return (
    <div className="text-[22px] text-[var(--clr-main)] mb-[10px] min-h-[29px]">
      {mode === 'time' ? (
        <p>
          {+counter < 60
            ? calcSeconds
            : `${String(Math.floor(counter / 60)).padStart(2, '0')}:${calcSeconds}`}
        </p>
      ) : wordsLength !== 0 ? (
        <p>
          {counter} / {wordsLength}
        </p>
      ) : null}
    </div>
  );
}
