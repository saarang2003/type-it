'use client';

import { useState, useEffect } from 'react';
import Tooltip from './Tooltip';
import ButtonRounded from './ButtonRounded';
import { IconContentCopy } from '@/public/assets';


interface Props {
  value: string;
  className?: string;
}

export default function CopyButton({ value, className = '' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    if (!value || copied) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
    });
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Tooltip
      text={copied ? 'Copied!' : 'Copy'}
      position="top"
      showOnHover
      className={className}
    >
      <ButtonRounded
        variant="1"
        onClick={handleCopyClick}
        className="flex items-center justify-center w-7 h-7 p-1 rounded-[5px]"
      >
        <IconContentCopy className="block h-full" />
      </ButtonRounded>
    </Tooltip>
  );
}
