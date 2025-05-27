'use client';

import { ModalContext } from '@/app/(context)/modal';
import { TypeModeContext } from '@/app/(context)/typemode';
import { useContext, Fragment } from 'react';
import Tooltip from '../ui/Tooltip';
import { IconRedirect, IconTags } from '@/public/assets';
import Image from 'next/image';
import { data } from '@/app/(data)';
import ButtonRounded from '../ui/ButtonRounded';

interface Props {
  status: 404 | 500;
}

export default function LoadingError({ status }: Props) {
  const { mode, quote, onMode } = useContext(TypeModeContext);
  const { onOpenModal } = useContext(ModalContext);

  return (
    <div className="text-center text-[var(--clr-char-incorrect)] text-[18px]">
      {status === 500 ? (
        <>
          <div>
            Failed to load quotes from a{' '}
            <span className="inline-block">
              <Tooltip
                text={
                  <div className="flex items-center">
                    <span>quotable API</span>
                    <Image
                     src={IconRedirect}
                     alt='Icon redirect'
                    className="w-[15px] h-[15px] ml-[10px]"
                    />
                  </div>
                }
                position="top"
                showOnHover
              >
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/lukePeavey/quotable"
                  className="text-current"
                >
                  third-party API
                </a>
              </Tooltip>
            </span>
            . Try again later.
          </div>

          <p className="text-[var(--clr-text)] opacity-75 mt-[5px] text-[16px]">
            For now you can try other type modes
          </p>

          <div className="mt-[20px] flex justify-center flex-wrap gap-x-[10px]">
            {Object.keys(data.typemode).map((mapMode) =>
              mapMode === mode ? (
                <Fragment key={mapMode} />
              ) : (
                <ButtonRounded
                  key={mapMode}
                  variant="2"
                  className="text-[16px] flex items-center"
                  onClick={() => onMode(mapMode as typeof mode)}
                >
                  {mapMode}
                </ButtonRounded>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <p>
              Couldn&#39;t find a {quote !== 'all' && quote} quote with selected tags.
            </p>

            <p className="text-[var(--clr-text)] opacity-75 mt-[5px] text-[16px]">
              Try changing quote length to <span className="font-bold">&#39;all&#39;</span> or update quote tags.
            </p>

            <div className="mt-[20px] flex justify-center">
              <ButtonRounded
                variant="2"
                className="text-[16px] flex items-center"
                onClick={() => onOpenModal({ modal: 'quoteTags' })}
              >
                <Image 
                src={IconTags}
                alt='icon tags'
                 className="w-[20px] mr-[10px]"
                />
                <span>Update Tags</span>
              </ButtonRounded>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
