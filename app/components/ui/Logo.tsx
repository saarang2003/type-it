'use client';

import { IconKeyboard } from "@/public/assets";



interface Props {
  colored: boolean;
}

export default function Logo({ colored }: Props) {
  const textColor = colored ? 'text-[var(--clr-char-correct)]' : 'text-[var(--clr-char)]';
  const iconFill = colored ? 'fill-[var(--clr-main)]' : 'fill-[var(--clr-char)]';

  return (
    <div className={`flex items-center select-none min-w-[255px] cursor-pointer max-[980px]:min-w-0`}>
      <IconKeyboard className={`w-[50px] h-[50px] mr-2 transition-colors ${iconFill}`} />
      <div className={`flex flex-col transition-colors ${textColor} max-[980px]:hidden`}>
        <span className="font-bold text-[35px] whitespace-nowrap">Typing app</span>
        <span className="text-[13px] mt-[2px] opacity-75 indent-[5px]">
          Test your typing speed
        </span>
      </div>
    </div>
  );
}
