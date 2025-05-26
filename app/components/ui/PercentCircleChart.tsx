'use client';

import React from 'react';

interface Props {
  percentage: number;
  className?: string;
}

export default function PercentCircleChart({ percentage, className }: Props) {
  const isSuccess = percentage >= 75;

  return (
    <div
      className={`relative w-[120px] h-[120px] text-[24px] ${className}`}
    >
      {/* Empty Background Circle */}
      <div className="absolute inset-0 rounded-full bg-red-500 z-10" />

      {/* Filled Arc using conic-gradient */}
      <div
        className="absolute inset-0 rounded-full z-20"
        style={{
          background: `conic-gradient(#10b981 ${percentage}%, transparent 0%)`, // Tailwind emerald-500
        }}
      />

      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 z-30 bg-gray-900 w-[96px] h-[96px] rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 font-bold">
        <p className={isSuccess ? 'text-green-400' : 'text-red-400'}>
          {percentage}%
        </p>
      </div>
    </div>
  );
}
