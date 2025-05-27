'use client';

import { TypingContext } from '@/app/(context)/typing';
import { TypingResult } from '@/app/types';
import { useContext, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip as RechartsTooltip,
  Legend,
  Line,
} from 'recharts';
import Tooltip from '../ui/Tooltip';
import PercentCircleChart from '../ui/PercentCircleChart';
import { getTimeSince } from '@/app/helper';
import ButtonRounded from '../ui/ButtonRounded';
import Image from 'next/image';
import { IconKeyboardArrowLeft, IconLoop } from '@/public/assets';
import ResultCustomTooltip from './ResultCustomTooltip';

interface Props {
  result: TypingResult;
  includeDate?: boolean;
  onRestart?: () => void;
  onRepeat?: () => void;
  onGoBack?: () => void;
}

export default function Result({
  result,
  includeDate,
  onRestart,
  onRepeat,
  onGoBack,
}: Props) {
  const { onTypingEnded } = useContext(TypingContext);

  useEffect(() => {
    onTypingEnded();
  }, [onTypingEnded]);

  const textColorFromCSS = window
    .getComputedStyle(document.body)
    .getPropertyValue('--clr-text');
  const config = {
    colorWpm: textColorFromCSS,
    colorAccuracy: window
      .getComputedStyle(document.body)
      .getPropertyValue('--clr-char-incorrect'),
    colorRaw: window
      .getComputedStyle(document.body)
      .getPropertyValue('--clr-raw'),
    labelOffset: -40,
    labelFontSize: 14,
  };

  const lastTimeline =
    Array.isArray(result.timeline) && result.timeline.length > 0
      ? result.timeline[result.timeline.length - 1]
      : { wpm: 0, raw: 0, accuracy: 0, second: 0 };
  const { wpm, raw, accuracy, second: timeTook } = lastTimeline;

  return (
    <div className="relative">
      {includeDate && result.date && (
        <Tooltip text={result.date.toLocaleString()} position="top" showOnHover>
          <div className="text-center opacity-80">{getTimeSince(result.date)}</div>
        </Tooltip>
      )}

      <div className="flex flex-col w-[90%] min-w-[335px] mx-auto mt-5 max-[650px]:w-full max-[385px]:w-[90%] max-[385px]:min-w-0">
        <div className="flex justify-between w-1/2 min-w-[260px] mx-auto mb-5 max-[650px]:flex-col max-[385px]:min-w-[200px]">
          <div className="text-center mb-6 max-[385px]:text-sm">
            <p>WPM</p>
            <p className="text-[50px] font-bold mt-5 max-[385px]:text-[40px]">{wpm}</p>
          </div>
          <div className="text-center max-[385px]:text-sm">
            <p>Accuracy</p>
            <PercentCircleChart
              percentage={accuracy}
              className="mt-2 text-[20px] w-[100px] h-[100px]"
            />
          </div>
        </div>

        <div className="w-[90%] h-[275px] max-[700px]:w-[85%] max-[650px]:w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Array.isArray(result.timeline) ? result.timeline : []}>
              <XAxis dataKey="second" />
              <YAxis dataKey="raw" yAxisId="left">
                <Label
                  value="Words per Minute"
                  angle={-90}
                  fill={config.colorWpm}
                  fontSize={config.labelFontSize}
                  position="right"
                  offset={config.labelOffset}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <YAxis
                domain={[0, 100]}
                dataKey="accuracy"
                yAxisId="right"
                orientation="right"
              >
                <Label
                  value="Accuracy"
                  angle={-90}
                  fill={config.colorAccuracy}
                  fontSize={config.labelFontSize}
                  position="left"
                  offset={config.labelOffset}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <CartesianGrid stroke={config.colorWpm} strokeOpacity={0.07} />
              <RechartsTooltip content={<ResultCustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="wpm"
                yAxisId="left"
                dot={{ stroke: config.colorWpm, strokeWidth: 5, r: 1 }}
                strokeWidth={2}
                stroke={config.colorWpm}
              />
              <Line
                type="monotone"
                dataKey="raw"
                yAxisId="left"
                dot={{ stroke: config.colorRaw, strokeWidth: 5, r: 1 }}
                strokeWidth={2}
                stroke={config.colorRaw}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                yAxisId="right"
                dot={{ stroke: config.colorAccuracy, strokeWidth: 5, r: 1 }}
                strokeWidth={2}
                stroke={config.colorAccuracy}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col-reverse max-[650px]:flex-col-reverse">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 justify-items-center w-[90%] max-w-[800px] mx-auto mt-5 max-[650px]:w-3/4 max-[650px]:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-[460px]:w-[90%]">
          {result.testType && (
            <div className="text-center">
              <p className="text-[var(--clr-char)]">test type</p>
              <p className="mt-1 text-[20px] font-bold">{result.testType}</p>
            </div>
          )}
          <div className="text-center">
            <p className="text-[var(--clr-raw)]">raw</p>
            <p className="mt-1 text-[20px] font-bold">{raw}</p>
          </div>
          <div className="text-center">
            <p
              className={`${
                result.error === 0
                  ? 'text-[var(--clr-char-correct)]'
                  : 'text-[var(--clr-char-incorrect)]'
              }`}
            >
              errors
            </p>
            <p className="mt-1 text-[20px] font-bold">{result.error}</p>
          </div>
          <div className="text-center">
            <p>time</p>
            <p className="mt-1 text-[20px] font-bold">{timeTook}s</p>
          </div>
          {result.qouteAuthor && (
            <div className="text-center">
              <p>quote author</p>
              <p className="mt-1 text-[20px] font-bold">{result.qouteAuthor}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center flex-wrap mt-2.5 space-x-5">
          {onRestart && (
            <ButtonRounded onClick={onRestart} className="flex items-center font-bold text-lg mt-2.5">
              <Image
               src={IconKeyboardArrowLeft}
               alt='Icon keyword'
              className="w-[15px] h-[15px] mr-2.5 scale-[1.75]"
              />
              <span>Next Test</span>
            </ButtonRounded>
          )}
          {onRepeat && (
            <ButtonRounded onClick={onRepeat} className="flex items-center font-bold text-lg mt-2.5">
              <IconLoop className="w-[15px] h-[15px] mr-2.5" />
              <span>Repeat</span>
            </ButtonRounded>
          )}
          {onGoBack && (
            <ButtonRounded onClick={onGoBack} className="flex items-center font-bold text-lg mt-2.5">
              <IconKeyboardArrowLeft className="w-[15px] h-[15px] mr-2.5 scale-[1.75]" />
              <span>Go Back</span>
            </ButtonRounded>
          )}
        </div>
      </div>
    </div>
  );
}
