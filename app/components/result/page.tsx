"use client";

import { TypingContext } from "@/app/(context)/typing";
import { TypingResult } from "@/app/types";
import { useContext, useEffect } from "react";
import Tooltip from "../ui/Tooltip";
import PercentCircleChart from "../ui/PercentCircleChart";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";
import ResultCustomTooltip from "../Typing/ResultCustomTooltip";
import { IconKeyboardArrowLeft, IconLoop } from "@/public/assets";
import Image from "next/image";
import ButtonRounded from "../ui/ButtonRounded";

export type ResultOptions = {
  includeDate?: boolean;
};

interface Props extends ResultOptions {
  result: TypingResult;
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
    .getPropertyValue("--clr-text");
  const config = {
    colorWpm: textColorFromCSS,
    colorAccuracy: window
      .getComputedStyle(document.body)
      .getPropertyValue("--clr-char-incorrect"),
    colorRaw: textColorFromCSS + "99", // opacity approx 60%
    labelOffset: -40,
    labelFontSize: 14,
  };

  // Define the type for timeline entries
  type TimelineEntry = {
    wpm: number;
    raw: number;
    accuracy: number;
    second: number;
  };

  // Fix timeline access: last element is an object with known keys, not indexed by number
  const timelineArray: TimelineEntry[] = Array.isArray(result.timeline)
      ? result.timeline as TimelineEntry[]
      : Object.values(result.timeline || {}) as TimelineEntry[];
  const lastResult = timelineArray[timelineArray.length - 1];
  if (!lastResult) return null;
  const { wpm, raw, accuracy, second: timeTook } = lastResult;

  // Helper function (add opacity)
//   function addColorOpacity(color: string, opacity: number) {
//     if (color.startsWith("#")) {
//       const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
//       return color + alpha;
//     }
//     return color; // fallback
//   }

  // Helper for relative time (optional, you can remove if you don't need it)
  function getTimeSince(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return seconds + "s ago";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + "m ago";
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + "h ago";
    const days = Math.floor(hours / 24);
    return days + "d ago";
  }

  return (
    <div className="p-4 space-y-6">
      {includeDate && result.date && (
        <Tooltip text={result.date.toLocaleString()} position="top" showOnHover>
          <div className="text-sm text-gray-400">{getTimeSince(result.date)}</div>
        </Tooltip>
      )}

      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex space-x-12 items-center">
          <div>
            <p className="text-sm text-gray-500">WPM</p>
            <p className="text-4xl font-bold text-[var(--clr-text)]">{wpm}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">Accuracy</p>
            <PercentCircleChart
              percentage={accuracy}
              className="w-16 h-16"
            />
          </div>
        </div>

        <div className="flex-1 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineArray}>
              <XAxis dataKey="second" />
              <YAxis
                yAxisId="left"
                dataKey="raw"
                orientation="left"
                label={{
                  value: "Words per Minute",
                  angle: -90,
                  position: "insideLeft",
                  fill: config.colorWpm,
                  fontSize: config.labelFontSize,
                  offset: config.labelOffset,
                }}
              />
              <YAxis
                yAxisId="right"
                domain={[0, 100]}
                dataKey="accuracy"
                orientation="right"
                label={{
                  value: "Accuracy",
                  angle: -90,
                  position: "insideRight",
                  fill: config.colorAccuracy,
                  fontSize: config.labelFontSize,
                  offset: config.labelOffset,
                }}
              />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <RechartsTooltip content={<ResultCustomTooltip />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="wpm"
                stroke={config.colorWpm}
                strokeWidth={2}
                dot={{ stroke: config.colorWpm, strokeWidth: 2, r: 2 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="raw"
                stroke={config.colorRaw}
                strokeWidth={2}
                dot={{ stroke: config.colorRaw, strokeWidth: 2, r: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="accuracy"
                stroke={config.colorAccuracy}
                strokeWidth={2}
                dot={{ stroke: config.colorAccuracy, strokeWidth: 2, r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <div className="space-y-2 text-sm text-gray-400">
          {result.testType && (
            <div>
              <p className="font-semibold uppercase tracking-wide">Test Type</p>
              <p className="text-white">{result.testType}</p>
            </div>
          )}
          <div>
            <p className="font-semibold uppercase tracking-wide">Raw</p>
            <p className="text-white">{raw}</p>
          </div>
          <div>
            <p
              className={`font-semibold uppercase tracking-wide ${
                result.error === 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              Errors
            </p>
            <p className="text-white">{result.error}</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-wide">Time</p>
            <p className="text-white">{timeTook}s</p>
          </div>
          {result.qouteAuthor && (
            <div>
              <p className="font-semibold uppercase tracking-wide">Quote Author</p>
              <p className="text-white italic">{result.qouteAuthor}</p>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          {onRestart && (
            <ButtonRounded onClick={onRestart} className="flex items-center space-x-1">
              <Image 
              src={IconKeyboardArrowLeft}
              alt="Icon Keyboard Arrow "
             className="w-5 h-5"
              />
              <span>Next Test</span>
            </ButtonRounded>
          )}
          {onRepeat && (
            <ButtonRounded onClick={onRepeat} className="flex items-center space-x-1">
              <Image 
              src={IconLoop}
              alt="Icon Keyboard Arrow "
             className="w-5 h-5"
              />
              <span>Repeat</span>
            </ButtonRounded>
          )}
          {onGoBack && (
            <ButtonRounded onClick={onGoBack} className="flex items-center space-x-1">
             <Image 
              src={IconKeyboardArrowLeft}
              alt="Icon Keyboard Arrow "
             className="w-5 h-5"
              />
              <span>Go Back</span>
            </ButtonRounded>
          )}
        </div>
      </div>
    </div>
  );
}
