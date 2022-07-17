import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import { Fragment, forwardRef } from 'react';

import { SelectOption } from '../typings/components';
import { classNames } from '../utils/classnames';

type Props = {
  className?: string;
  label?: string;
  onChange: (value: SelectOption) => void;
  options: SelectOption[];
  value?: SelectOption;
};

const SelectInput = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { className = 'w-40', label, onChange, options, value: selectedValue } = props;

  const generateOptionClasses = (isActive: boolean) => {
    return classNames(
      'cursor-default select-none relative py-2 pl-2 pr-4',
      isActive ? 'text-gray-100 bg-gray-900' : 'text-gray-900',
    );
  };

  const generateOptionLabelClasses = (isSelected: boolean) => {
    return classNames('block', isSelected ? 'font-medium' : 'font-normal');
  };

  return (
    <div ref={ref} className={className}>
      <Listbox value={selectedValue} onChange={onChange}>
        {({ open }) => (
          <>
            {label && <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>}
            <div className="mt-1 relative">
              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm">
                <span className="block truncate">{selectedValue?.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) => generateOptionClasses(active)}
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span className={generateOptionLabelClasses(selected)}>{option.label}</span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
});

SelectInput.displayName = 'SelectInput';

export default SelectInput;
