import { Switch } from '@headlessui/react';
import { forwardRef, useState } from 'react';

import { classNames } from '../utils/classnames';

type Props = {
  className?: string;
  defaultValue?: boolean;
  label?: string;
  onChange: (value: boolean) => void;
};

const SwitchInput = forwardRef<HTMLDivElement, Props>(
  ({ className = '', defaultValue = false, label, onChange }: Props, ref) => {
    const [enabled, setEnabled] = useState(defaultValue);

    const handleValueChange = (value: boolean) => {
      setEnabled(value);
      onChange(value);
    };

    return (
      <div ref={ref} className={className}>
        <Switch.Group as="div" className="flex items-center">
          {label && (
            <Switch.Label as="span" className="mr-3">
              <span className="text-sm font-medium text-gray-900">{label}</span>
            </Switch.Label>
          )}
          <Switch
            checked={enabled}
            onChange={handleValueChange}
            className={classNames(
              enabled ? 'bg-gray-900' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
              )}
            />
          </Switch>
        </Switch.Group>
      </div>
    );
  },
);

SwitchInput.displayName = 'SwitchInput';

export { SwitchInput };
