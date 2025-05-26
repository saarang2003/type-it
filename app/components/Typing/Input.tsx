'use client';

import { IconEyeOff, IconEyeOn } from "@/public/assets";
import Tooltip from "../ui/Tooltip";

// import { IconEyeOff, IconEyeOn } from '@/assets/image';
// import { Tooltip } from '@/components/UI';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  error?: boolean;
  classNameContainer?: string;
  wrapperChildren?: React.ReactNode;
  showPassword?: { bool: boolean; onToggle: () => void };
}

export default function InputField(props: Props) {
  const {
    Icon,
    error,
    type,
    className,
    classNameContainer,
    wrapperChildren,
    showPassword,
    ...restProps
  } = props;

  return (
    <div className={`relative w-full ${classNameContainer || ''}`}>
      <input
        {...restProps}
        type={showPassword?.bool === true ? 'text' : type}
        className={`
          w-full font-inherit text-base text-inherit 
          bg-[var(--clr-bg)] outline-none rounded-[10px]
          border transition-colors
          px-[35px] py-2
          ${showPassword ? 'pr-[35px]' : ''}
          ${error ? 'border-[var(--clr-char-incorrect)]' : 'border-transparent'}
          focus:border-[var(--clr-main)]
          ${className || ''}
        `}
      />

      {/* Leading Icon */}
      <Icon
        className="absolute top-1/2 left-[7px] w-[20px] -translate-y-1/2 opacity-60 pointer-events-none"
      />

      {/* Password toggle */}
      {showPassword && (
        <Tooltip
          position="left"
          text={showPassword.bool === true ? 'hide password' : 'show password'}
          showOnHover
          className="absolute right-[10px] top-1/2 -translate-y-1/2"
        >
          <button type="button" onClick={() => showPassword.onToggle()}>
            {showPassword.bool === true ? (
              <IconEyeOn className="w-[20px] opacity-50" />
            ) : (
              <IconEyeOff className="w-[20px] opacity-50" />
            )}
          </button>
        </Tooltip>
      )}

      {/* Additional custom content */}
      {wrapperChildren}
    </div>
  );
}
