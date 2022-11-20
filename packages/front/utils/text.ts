const DEFAULT_MAX_LENGTH = 15;
const DOT_COUNT = 3;

const truncate = (text: string, maxLength: number = DEFAULT_MAX_LENGTH) => {
  if (text.length <= maxLength) {
    return text;
  }

  const maxTextLength = maxLength - DOT_COUNT;

  return `${text.substring(0, maxTextLength)}...`;
};

const numberToString = (value: number): string => {
  if (value === 0) {
    return 'No';
  }

  return value < 10 ? `0${value}` : value.toString();
};

const displayItemLabel = (itemCount: number, itemLabel: string) => {
  const label = itemCount < 2 ? itemLabel : `${itemLabel}s`;

  return `${numberToString(itemCount)} ${label}`;
};

export { truncate, displayItemLabel };
