"use client";

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  name: string;
  value: string | number;
  className?: string;
}

export default function NameAndValue({ name, value, className = '', ...restProps }: Props) {
  return (
    <div className={className} {...restProps}>
      <div className="text-sm opacity-60">{name}</div>
      <div className="text-2xl">{value}</div>
    </div>
  );
}
