"use client";

import { useEffect, useState } from 'react';
import TextButton from './ui/TextButton';
import Image from 'next/image';

export interface ColumnProps {
  buttons: {
    text: string | number;
    active: boolean;
    action: () => void;
    iconSrc?: string; // Changed from Icon to iconSrc
  }[];
}

export default function Column({ buttons }: ColumnProps) {
  const [containerSize, setContainerSize] = useState(() => ({
    width: 0,
    height: 0,
  }));
  const [hasUpdatedSize, setHasUpdatedSize] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasUpdatedSize(false);
    }, 200);
  }, []);

  useEffect(() => {
    setHasUpdatedSize(false);
  }, [buttons]);

  return (
    <div
      className="relative overflow-hidden transition-[width] duration-200 w-max"
      style={{ width: containerSize.width, height: containerSize.height }}
    >
      <div
        className="absolute top-0 left-0 flex"
        ref={(node) => {
          if (node && !hasUpdatedSize) {
            setHasUpdatedSize(true);
            setContainerSize({
              width: node.clientWidth,
              height: node.clientHeight,
            });
          }
        }}
      >
        {buttons.map(({ text, active, action, iconSrc }, index) => (
          <TextButton
            key={text}
            className={`
              py-[0.6rem] px-2
              ${index === 0 ? 'pl-4' : ''}
              ${index === buttons.length - 1 ? 'pr-4' : ''}
              flex items-center
            `}
            isActive={active}
            onClick={action}
          >
            {iconSrc && (
              <Image
                src={iconSrc}
                alt={String(text)}
                width={14}
                height={14}
                className="w-[0.9rem] h-[0.9rem] mt-[3px] mr-[5px] flex-shrink-0"
              />
            )}
            <span>{text}</span>
          </TextButton>
        ))}
      </div>
    </div>
  );
}