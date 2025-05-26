'use client';

import { useContext, useState } from 'react';
import Modal from '../components/ui/Modal';
import { IconCustomize } from '@/public/assets';
import Tooltip from '../components/ui/Tooltip';
import Switch from '../components/ui/Switch';
import { data } from '../(data)';
import ButtonRounded from '../components/ui/ButtonRounded';
// import { ProfileContext } from '@/context/profile.context';
// import { data } from '@/data';
// import { IconCustomize } from '@/assets/image';
// import { Switch, Tooltip, ButtonRounded } from '@/components/UI';
// import Modal from '@/components/UI/Modal';


interface Props {
  onClose: () => void;
}

const FONT_SIZE_MIN = 16;
const FONT_SIZE_MAX = 50;
const INPUT_WIDTH_MIN = 50;
const INPUT_WIDTH_MAX = 100;

export default function CustomizeModal({ onClose }: Props) {


  const [activeTooltip, setActiveTooltip] = useState<'fontSize' | 'inputWidth' | null>(null);

  const {
    liveWpm,
    liveAccuracy,
    inputWidth,
    fontSize,
    caretStyle,
    smoothCaret,
    soundOnClick,
    theme,
  } = profile.customize;

  const handleClose = () => {
    onClose();
    onCustomizeUpdateServer();
  };

  return (
    <Modal
      onClose={handleClose}
      heading="Customize"
      HeadingIcon={IconCustomize}
      className="max-w-[460px]"
    >
      <div className="w-full">
        {/* Switches */}
        {[
          { label: 'Live WPM', id: 'live-wpm', value: liveWpm, key: 'liveWpm' },
          { label: 'Live Accuracy', id: 'live-accuracy', value: liveAccuracy, key: 'liveAccuracy' },
          { label: 'Smooth Caret', id: 'smooth-caret', value: smoothCaret, key: 'smoothCaret' },
          { label: 'Sound on Click', id: 'sound-on-click', value: soundOnClick, key: 'soundOnClick' },
        ].map(({ label, id, value, key }) => (
          <div className="flex items-center flex-wrap mb-2" key={id}>
            <label
              htmlFor={id}
              className={`mr-4 opacity-75 transition-opacity select-none ${value ? 'opacity-100' : ''}`}
            >
              {label}
            </label>
            <Tooltip text={value ? 'on' : 'off'} position="right" showOnHover>
              <Switch
                id={id}
                state={value}
                onToggle={() => onCustomizeToggleState(key as keyof typeof profile.customize)}
              />
            </Tooltip>
          </div>
        ))}

        {/* Font Size Slider */}
        <div
          className="flex items-center flex-wrap mb-2"
          onMouseEnter={() => setActiveTooltip('fontSize')}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <label htmlFor="font-size" className="mr-4 opacity-100 select-none">Font Size</label>
          <div className="relative w-full">
            <input
              type="range"
              id="font-size"
              min={FONT_SIZE_MIN}
              max={FONT_SIZE_MAX}
              value={fontSize}
              onChange={(e) => onCustomizeUpdateState({ fontSize: Number(e.target.value) })}
              onFocus={() => setActiveTooltip('fontSize')}
              onBlur={() => setActiveTooltip(null)}
              className="w-full mt-1 accent-[var(--clr-main)]"
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[88%] h-full pointer-events-none">
              <div className="relative">
                <Tooltip
                  text={fontSize + 'px'}
                  className="absolute"
                  style={{
                    left:
                      ((fontSize - FONT_SIZE_MIN) / (FONT_SIZE_MAX - FONT_SIZE_MIN)) * 100 + '%',
                  }}
                  position="top"
                  show={activeTooltip === 'fontSize'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input Width Slider */}
        <div
          className="flex items-center flex-wrap mb-2"
          onMouseEnter={() => setActiveTooltip('inputWidth')}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <label htmlFor="input-width" className="mr-4 opacity-100 select-none">Input Width</label>
          <div className="relative w-full">
            <input
              type="range"
              id="input-width"
              min={INPUT_WIDTH_MIN}
              max={INPUT_WIDTH_MAX}
              value={inputWidth}
              onChange={(e) => onCustomizeUpdateState({ inputWidth: Number(e.target.value) })}
              onFocus={() => setActiveTooltip('inputWidth')}
              onBlur={() => setActiveTooltip(null)}
              className="w-full mt-1 accent-[var(--clr-main)]"
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[88%] h-full pointer-events-none">
              <div className="relative">
                <Tooltip
                  text={inputWidth + '%'}
                  className="absolute"
                  style={{
                    left:
                      ((inputWidth - INPUT_WIDTH_MIN) / (INPUT_WIDTH_MAX - INPUT_WIDTH_MIN)) *
                        100 +
                      '%',
                  }}
                  position="top"
                  show={activeTooltip === 'inputWidth'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Caret Style */}
        <div className="flex items-center flex-wrap mb-2">
          <label htmlFor="caret-style" className="mr-4 opacity-100 select-none">Caret Style</label>
          <div className="flex items-center">
            {data.caret.map((caret) => (
              <Tooltip key={caret} text={caret} showOnHover>
                <button
                  onClick={() => onCustomizeUpdateState({ caretStyle: caret })}
                  id={caret === caretStyle ? 'caret-style' : undefined}
                  className={`flex items-end justify-center h-10 w-10 p-[7px] rounded border-2 border-[var(--clr-char)] mr-[5px] ${
                    caret === caretStyle ? 'border-[var(--clr-main)] bg-white/5 brightness-125' : ''
                  }`}
                >
                  <span
                  />
                </button>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="flex items-start flex-wrap mb-2">
          <label htmlFor="theme" className="mr-4 mt-3 opacity-100 select-none">Theme</label>
          <div className="flex flex-wrap">
            {data.theme.map((mapTheme) => (
              <button
                key={mapTheme}
                className={`text-sm font-inherit px-4 py-2 rounded-xl border-2 mt-1 mr-2 capitalize ${
                  mapTheme === theme ? 'border-white' : 'border-transparent'
                }`}
                onClick={() => onCustomizeUpdateState({ theme: mapTheme })}
                style={{
                  backgroundColor: `var(--${mapTheme}-bg)`,
                  color: `var(--${mapTheme}-text)`,
                }}
              >
                {mapTheme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <ButtonRounded
        onClick={() => onCustomizeResetState()}
        variant="2"
        className="mt-10"
      >
        Reset to Default
      </ButtonRounded>
    </Modal>
  );
}
