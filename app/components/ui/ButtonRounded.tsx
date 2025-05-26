import { forwardRef } from 'react';
import { Loading } from '@/components/UI';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: '1' | '2';
  loading?: boolean;
  active?: boolean;
}
type Ref = HTMLButtonElement;

const variantStyles: Record<'1' | '2', string> = {
  '1': 'bg-transparent text-[var(--clr-char-correct)]',
  '2': 'bg-[var(--clr-tooltip-bg)] text-[var(--clr-tooltip-text)]',
};

export default forwardRef<Ref, Props>(function ButtonRounded(props, ref) {
  const {
    variant = '1',
    loading,
    className = '',
    children,
    disabled,
    active,
    ...restProps
  } = props;

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={`
        relative rounded-[10px] px-4 py-2 transition-opacity duration-200
        ${variantStyles[variant]}
        ${isDisabled ? 'cursor-default opacity-50' : 'cursor-pointer opacity-70 hover:opacity-100 focus-visible:opacity-100'}
        ${active || (!isDisabled && variant === '1') ? 'bg-[var(--clr-tooltip-bg)] text-[var(--clr-tooltip-text)] opacity-100' : ''}
        ${loading ? 'text-transparent opacity-100' : ''}
        ${className}
      `}
      {...restProps}
    >
      {loading && (
        <Loading
          type="spinner"
          className="absolute text-[9px] top-[calc(50%+2px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
      {children}
    </button>
  );
});
