import classNames from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { getInputErrorMessage } from '../lib/forms';

type Props = {
  groupClassName?: string;
  isRequired?: boolean;
  label?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const TextInput = (props: Props) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const { className, groupClassName = '', isRequired, label, ...inputProps } = props;
  const errorMessage = getInputErrorMessage(errors, inputProps.name);

  const inputClasses = classNames('block w-full', className);
  const inputLabel = label ? `${label}${isRequired ? '*' : ''}` : undefined;
  const formGroupClasses = classNames(inputLabel ? 'mb-4' : '', groupClassName);

  return (
    <div className={formGroupClasses}>
      {inputLabel && (
        <Label htmlFor={inputProps.name} className="text-base font-medium text-gray-900">
          {inputLabel}
        </Label>
      )}
      <div className="mt-1">
        <Input
          autoComplete="off"
          id={inputProps.name}
          className={inputClasses}
          {...inputProps}
          {...(inputProps.name ? register(inputProps.name) : {})}
        />
      </div>
      {errorMessage && <span className="text-xs text-red-600 dark:text-red-400 form-error">{errorMessage}</span>}
    </div>
  );
};
