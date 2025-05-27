// components/Footer.tsx
"use client";
import { useContext } from 'react';
import { TypingContext } from '../(context)/typing';
import Tooltip from './ui/Tooltip';
import { IconRedirect } from '@/public/assets';
import Image from 'next/image';

export default function Footer() {
  const { typingFocused } = useContext(TypingContext);

  return (
    <footer
      className={`relative flex justify-between items-end px-8 pb-8 transition-opacity duration-200 ${
        typingFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex items-center mr-8 space-x-2">
        <Tooltip
          text={
            <div className="flex items-center">
              <p>repository</p>
              <Image 
              src={IconRedirect}
              alt="Redirect Icon"
              width={15}
              height={15}
              className="w-[15px] h-[15px] ml-2.5"
              />
            </div>
          }
          position="right"
          showOnHover
        >
          <a
            href="https://github.com/saarang2003"
            rel="noreferrer"
            target="_blank"
            className="text-inherit"
            tabIndex={typingFocused ? -1 : undefined}
          >
          </a>
        </Tooltip>
      </div>
    </footer>
  );
}
