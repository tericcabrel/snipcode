import classNames from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import { getInputErrorMessage } from '../utils/forms';

type TextInputProps = {
  isRequired?: boolean;
  label?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = (props: TextInputProps) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const { className, isRequired, label, ...inputProps } = props;
  const errorMessage = getInputErrorMessage(errors, inputProps.name);

  const inputClasses = classNames(
    'block w-full px-4 py-2 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-lg caret-gray-900',
    className,
  );
  const inputLabel = label ? `${label}${isRequired ? '*' : ''}` : undefined;

  return (
    <div className="mb-4">
      {inputLabel && (
        <label htmlFor={inputProps.name} className="text-base font-medium text-gray-900">
          {inputLabel}
        </label>
      )}
      <div className="mt-1">
        <input
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

export default TextInput;
