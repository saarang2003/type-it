'use client';

import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

type Props = TooltipProps<ValueType, NameType>;

export default function ResultCustomTooltip(props: Props) {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--clr-tooltip-bg)] text-[var(--clr-tooltip-text)] p-[10px] px-[15px] rounded-lg">
        <p className="mb-2">{label}</p>
        <div>
          {payload.map((pld) => (
            <div key={pld.dataKey} className="flex items-center mb-1">
              <div
                className="w-[15px] h-[15px] rounded-sm border border-[var(--clr-tooltip-text)] mr-2"
                style={{ backgroundColor: pld.color }}
              />
              <p className="mb-[4px]">
                <span>{pld.dataKey}: </span>
                <span className="font-bold">{pld.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
