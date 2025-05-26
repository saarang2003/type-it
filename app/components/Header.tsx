"use client";

import { useContext } from 'react';
import { ModalContext } from '../(context)/modal';
import { TypingContext } from '../(context)/typing';
import Logo from './ui/Logo';
import ButtonRounded from './ui/ButtonRounded';
import { IconAccount, IconCustomize } from '@/public/assets';
import Loading from './ui/Loading';

interface Props {
  windowWidth: number;
  onLogoClick: () => void;
}

export default function Header({ windowWidth, onLogoClick }: Props) {
  const { activeModal, onOpenModal } = useContext(ModalContext);
  const { typingFocused } = useContext(TypingContext);

  const loadingUser = false; // Replace with real loading state
  const profile = { username: 'User' }; // Replace with actual user data

  return (
    <header
      className={`flex justify-between items-center px-8 py-8 overflow-hidden transition-opacity ${
        typingFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } max-[550px]:flex-col max-[550px]:pt-4 max-[550px]:pb-8`}
    >
      <div className="flex items-center w-full">
        <div onClick={onLogoClick}>
          <Logo colored={!typingFocused} />
        </div>

        <div
          className={`flex relative ml-[30px] pl-[10px] w-full transition-opacity ${
            typingFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } max-[800px]:ml-[15px] max-[650px]:ml-[10px] max-[650px]:pl-[5px] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-[75%] before:w-[2px] before:bg-[var(--clr-char)] before:rounded-full`}
        >
          <ButtonRounded
            className="flex items-center text-base space-x-2 max-[1040px]:px-[10px]"
            onClick={() => onOpenModal({ modal: 'customize' })}
            active={activeModal?.modal === 'customize'}
          >
            <IconCustomize />
            {windowWidth > 600 && <span>Customize</span>}
          </ButtonRounded>

          {profile.username ? (
            <ButtonRounded
              className="flex items-center ml-auto min-w-0 overflow-hidden"
              onClick={() => onOpenModal({ modal: 'user' })}
            >
              <IconAccount className="flex-shrink-0" />
              <span className="overflow-hidden whitespace-nowrap text-ellipsis block ml-2">
                {profile.username}
              </span>
            </ButtonRounded>
          ) : (
            <ButtonRounded
              className="flex items-center ml-auto min-w-0 overflow-hidden"
              onClick={() => onOpenModal({ modal: 'account' })}
              active={activeModal?.modal === 'account'}
              disabled={loadingUser}
            >
              <IconAccount className="flex-shrink-0" />
              {windowWidth > 575 &&
                (loadingUser ? (
                  <Loading type="spinner" className="text-[9px] ml-[7px] mt-[5px]" />
                ) : (
                  <span className="ml-2">Account</span>
                ))}
            </ButtonRounded>
          )}
        </div>
      </div>
    </header>
  );
}
