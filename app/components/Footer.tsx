// components/Footer.tsx
"use client";
import { useContext } from 'react';
import { TypingContext } from '../(context)/typing';
import Tooltip from './ui/Tooltip';
import { IconGithub, IconRedirect } from '@/public/assets';

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
              <IconRedirect className="w-[15px] h-[15px] ml-2.5" />
            </div>
          }
          position="right"
          showOnHover
        >
          <a
            href="https://github.com/LukaKobaidze/typing-app"
            rel="noreferrer"
            target="_blank"
            className="text-inherit"
            tabIndex={typingFocused ? -1 : undefined}
          >
            <IconGithub />
          </a>
        </Tooltip>
      </div>
    </footer>
  );
}
