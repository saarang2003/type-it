"use client";

import { IconEyeOff, IconEyeOn } from "@/public/assets";
import Image from "next/image";
import Tooltip from "./Tooltip";



interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string | undefined }
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
    className = '',
    classNameContainer = '',
    wrapperChildren,
    showPassword,
    ...restProps
  } = props;

  const isPasswordVisible = showPassword?.bool === true;

  return (
    <div className={`relative w-full ${classNameContainer}`}>
      <input
        {...restProps}
        type={isPasswordVisible ? 'text' : type}
        className={`
          w-full font-inherit px-3 py-2 pl-9 rounded-[10px] bg-[var(--clr-bg)] text-inherit text-base outline-none
          border ${error ? 'border-[var(--clr-char-incorrect)]' : 'border-transparent'} 
          focus:border-[var(--clr-main)]
          ${showPassword ? 'pr-10' : ''} 
          ${className}
        `}
      />

      <Icon className="w-5 absolute top-1/2 left-[7px] -translate-y-1/2 opacity-60 pointer-events-none" />

      {showPassword && (
        <Tooltip
          position="left"
          text={isPasswordVisible ? 'hide password' : 'show password'}
          showOnHover
          className="absolute right-[10px] top-1/2 -translate-y-1/2"
        >
          <button type="button" onClick={showPassword.onToggle}>
            {isPasswordVisible ? (
                <Image 
              src={IconEyeOn}
              alt="Icon Eye On"
              className="w-5 opacity-50"
              />
            ) : (
                <Image 
              src={IconEyeOff}
              alt="Icon Eye Off"
              className="w-5 opacity-50"
              />
            )}
          </button>
        </Tooltip>
      )}

      {wrapperChildren}
    </div>
  );
}
