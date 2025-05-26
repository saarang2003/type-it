"use client";

import React, { useState, ReactNode, CSSProperties } from 'react';

interface Props {
  text: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  show?: boolean;
  showOnHover?: boolean;
  offset?: number;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  classNamePopup?: string;
  backgroundColor?: string;
  pointerEvents?: boolean;
  children?: ReactNode;
}

export default function Tooltip({
  text,
  position = 'bottom',
  show,
  showOnHover,
  offset = 6,
  width = 'auto',
  className = '',
  style,
  classNamePopup = '',
  backgroundColor = '#333',
  pointerEvents = false,
  children,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const isVisible = show !== undefined ? show : showOnHover ? hovered : false;

  // Calculate transform style based on position and offset
  const getTransform = () => {
    switch (position) {
      case 'top':
        return `translateY(calc(-100% - ${offset}px))`;
      case 'right':
        return `translateX(${offset}px)`;
      case 'bottom':
        return `translateY(calc(100% + ${offset}px))`;
      case 'left':
        return `translateX(calc(-1 * ${offset}px))`;
      default:
        return '';
    }
  };

  // Pointer position styles
  const pointerBase = `absolute w-3.5 h-3.5 bg-inherit rotate-45 rounded-sm z-[-1]`;

  const pointerPosition = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
    right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
    left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={style}
      onMouseEnter={() => showOnHover && setHovered(true)}
      onMouseLeave={() => showOnHover && setHovered(false)}
    >
      {children}

      <div
        className={`
          absolute 
          whitespace-nowrap 
          rounded 
          px-3 py-1 
          text-sm 
          text-white 
          select-none 
          z-[999] 
          pointer-events-${pointerEvents ? 'auto' : 'none'}
          transition-opacity transition-transform duration-150 ease-in-out
          bg-[${backgroundColor}]
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width,
          transform: isVisible ? getTransform() : undefined,
          backgroundColor,
          pointerEvents: pointerEvents ? 'auto' : 'none',
        }}
      >
        {text}
        <span className={`${pointerBase} ${pointerPosition[position]}`} />
      </div>
    </div>
  );
}
