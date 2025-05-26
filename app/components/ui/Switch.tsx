'use client';

import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state: boolean;
  onToggle: () => void;
}

export default function Switch({
  state,
  onToggle,
  className = '',
  onClick,
  ...restProps
}: Props) {
  return (
    <button
      onClick={(e) => {
        onToggle();
        if (onClick) onClick(e);
      }}
      className={`
        relative w-[50px] h-[27px] rounded-full border-2 border-emerald-500 transition-colors duration-200
        ${state ? 'bg-emerald-500' : 'bg-transparent'}
        ${className}
      `}
      {...restProps}
    >
      <span
        className={`
          absolute top-1/2 left-[3px] h-[20px] w-[20px] rounded-full bg-emerald-500 transform transition-all duration-300
          ${state ? 'translate-x-[100%] bg-gray-900' : 'translate-x-0'}
          -translate-y-1/2
        `}
      />
    </button>
  );
}
