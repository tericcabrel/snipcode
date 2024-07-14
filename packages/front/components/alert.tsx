import { classNames } from '../lib/classnames';

type AlertType = 'success' | 'error' | 'info';

type Props = {
  message: string;
  title?: string;
  type?: AlertType;
};

const alertTypeMapToString: Record<AlertType, string> = {
  error: 'Error',
  info: 'Info',
  success: 'Success',
};

const alertStyleMap: Record<AlertType, string> = {
  error: 'bg-red-200 border-red-600 text-red-600',
  info: 'bg-blue-200 border-blue-600 text-blue-600',
  success: 'bg-green-200 border-green-600 text-green-600',
};

const Alert = ({ message, title, type = 'info' }: Props) => {
  const classes = classNames('border-l-4 p-4 mb-8', alertStyleMap[type]);

  return (
    <div className={classes} role="alert">
      <p className="font-bold">{title ?? alertTypeMapToString[type]}</p>
      <p>{message}</p>
    </div>
  );
};

export { Alert };
