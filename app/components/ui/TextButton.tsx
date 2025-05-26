'use client';

import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export default function TextButton({
  isActive,
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`
        font-inherit text-inherit cursor-pointer transition-colors duration-125
        flex items-center
        hover:text-green-500 focus-visible:text-green-500
        ${isActive ? 'text-emerald-500' : 'text-gray-700'}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
