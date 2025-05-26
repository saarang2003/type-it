'use client';

import { useContext } from 'react';
import { TypeModeContext } from './typemode';
import Modal from '../components/ui/Modal';
import { IconTags } from '@/public/assets';
import ButtonRounded from '../components/ui/ButtonRounded';

interface Props {
  onClose: () => void;
}

export default function QuoteTagsModal({ onClose }: Props) {
  const {
    quoteTags,
    quoteTagsMode,
    onToggleQuoteTag,
    onUpdateQuoteTagsMode,
    onClearSelectedQuoteTags,
  } = useContext(TypeModeContext);

  const onQuoteSelectionChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const checkbox = e.target as unknown as HTMLInputElement;
    onToggleQuoteTag(Number(checkbox.value));
  };

  return (
    <Modal HeadingIcon={IconTags} heading="Quote Tags" onClose={onClose}>
      <div className="mb-6 flex">
        <ButtonRounded
          variant="2"
          className={`text-base border-2 border-[var(--clr-char)] opacity-50 rounded-r-none border-r border-r-[1px] ${
            quoteTagsMode === 'all' ? 'active' : ''
          }`}
          active={quoteTagsMode === 'all'}
          onClick={() => onUpdateQuoteTagsMode('all')}
        >
          All
        </ButtonRounded>
        <ButtonRounded
          variant="2"
          className={`text-base border-2 border-[var(--clr-char)] opacity-50 rounded-l-none border-l border-l-[1px] ${
            quoteTagsMode === 'only selected' ? 'active' : ''
          }`}
          active={quoteTagsMode === 'only selected'}
          onClick={() => onUpdateQuoteTagsMode('only selected')}
        >
          Only Selected
        </ButtonRounded>
      </div>

      <form
        className={`transition-opacity duration-200 ${
          quoteTagsMode === 'all' ? 'opacity-50 pointer-events-none' : ''
        }`}
        onChange={onQuoteSelectionChange}
      >
        <span className="font-semibold text-[var(--clr-main)]">Tags</span>

        <div className="flex flex-wrap mt-2">
          {quoteTags.map((tag, index) => (
            <label
              key={tag.name}
              className={`bg-black text-[var(--clr-tooltip-text)] opacity-50 mr-1.5 mt-1.5 user-select-none flex items-center px-2 py-2 cursor-pointer ${
                tag.isSelected ? 'opacity-100 bg-[var(--clr-bg)]' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={tag.isSelected}
                value={index}
                className="appearance-none w-[15px] h-[15px] rounded bg-white mr-2.5 checked:bg-[var(--clr-bg)] flex items-center justify-center relative"
              />
              {tag.name}

              {/* Show checkmark if selected */}
              {tag.isSelected && (
                <span className="absolute ml-[2px] mt-[2px] block w-[5px] h-[10px] border-solid border-[var(--clr-main)] border-r-[3px] border-b-[3px] transform rotate-45" />
              )}
            </label>
          ))}
        </div>

        <ButtonRounded
          variant="2"
          className="mt-6"
          onClick={() => onClearSelectedQuoteTags()}
          type="button"
        >
          Clear tags
        </ButtonRounded>
      </form>
    </Modal>
  );
}
