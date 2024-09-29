import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { SelectOption } from '../types/components';

type Props = {
  className?: string;
  onChange: (value: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  value?: SelectOption;
};

export const SelectInput = ({
  className = 'w-44',
  onChange,
  options,
  placeholder = 'Select value...',
  value: selectedValue,
}: Props) => {
  const handleOnChange = (value: string) => {
    const option = options.find((option) => option.id === value);

    if (!option) {
      console.error(`[Select Input] No option found for the value "${value}"`);

      return;
    }

    onChange(option);
  };

  return (
    <Select onValueChange={handleOnChange} defaultValue={selectedValue?.id}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full">
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
