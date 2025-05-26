'use client';

import { FocusTrap } from 'focus-trap-react';
import { useEffect } from 'react';
import AlertOutsideClick from './AlertOutsideClick';
import Tooltip from './Tooltip';
import { IconClose } from '@/public/assets';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  ignoreKeyboardEscape?: boolean;
  initialFocus?: boolean;
  heading?: string;
  HeadingIcon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  ignoreOutsideClick?: boolean;
}

export default function Modal({
  onClose,
  ignoreKeyboardEscape,
  initialFocus,
  heading,
  HeadingIcon,
  ignoreOutsideClick,
  className = '',
  children,
  ...restProps
}: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (!ignoreKeyboardEscape) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ignoreKeyboardEscape, onClose]);

  return (
    <FocusTrap
      focusTrapOptions={initialFocus === false ? { initialFocus } : undefined}
    >
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in bg-black/35">
        <AlertOutsideClick
          event="mousedown"
          onOutsideClick={onClose}
          handleWhen={!ignoreOutsideClick}
          id="modal"
          className={`bg-[var(--clr-modal)] rounded-md max-w-[91.47%] max-h-[90%] pt-0 overflow-y-auto overflow-x-hidden relative p-8 sm:p-6 xs:p-4 ${className}`}
          {...restProps}
        >
          <div className="sticky top-[-20px] bg-[var(--clr-modal)] z-10 pt-8 sm:pt-6 xs:pt-4 pb-2 mb-4 flex items-center justify-between">
            {heading && (
              <div className="flex items-center">
                {HeadingIcon && (
                  <HeadingIcon className="w-6 h-6 mr-2 shrink-0" />
                )}
                <h2 className="text-lg font-semibold">{heading}</h2>
              </div>
            )}
            <Tooltip text="close" showOnHover>
              <button
                type="button"
                onClick={onClose}
                aria-label="close"
                className="text-inherit hover:opacity-80 transition"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
          {children}
        </AlertOutsideClick>
      </div>
    </FocusTrap>
  );
}
