import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren, forwardRef } from 'react';

import SpinnerIcon from '../icons/spinner';
import { ColorVariants } from '../typings/components';

const colors: Record<ColorVariants, string> = {
  primary: 'text-white bg-gray-900 hover:bg-gray-600',
  red: 'text-white bg-red-500 hover:bg-red-600',
  'white-gray': 'text-gray-900 bg-gray-100 hover:bg-gray-200',
};

type ButtonProps = PropsWithChildren<
  {
    color?: ColorVariants;
    isLoading?: boolean;
  } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { children, className, color = 'primary', isLoading, ...buttonProps } = props;
  const buttonClasses = classNames(
    className,
    'flex items-center justify-center w-full px-8 py-2 mt-6 text-base font-bold transition-all duration-200 border border-transparent rounded-xl',
    colors[color],
    {
      'cursor-not-allowed': Boolean(buttonProps.disabled) || isLoading,
    },
  );

  return (
    <button disabled={buttonProps.disabled} type="button" className={buttonClasses} {...buttonProps} ref={ref}>
      {isLoading && <SpinnerIcon />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
