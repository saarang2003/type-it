'use client';

import { useRef } from 'react';
import Tooltip from '../ui/Tooltip';
import ButtonRounded from '../ui/ButtonRounded';
import { IconRefresh } from '@/public/assets';


interface Props {
  onRestart: () => void;
  className?: string;
}

export default function Restart({ onRestart, className }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  const resetHandler = () => {
    onRestart();
    divRef.current?.focus();
    resetRef.current?.blur();
  };

  return (
    <>
      <div ref={divRef} tabIndex={-1} />
      <Tooltip
        text="restart"
        showOnHover
        className={`${className ?? ''} text-[var(--clr-char-correct)]`}
      >
        <ButtonRounded ref={resetRef} onClick={resetHandler}>
          <IconRefresh className="w-[30px] h-[30px]" />
        </ButtonRounded>
      </Tooltip>
    </>
  );
}
