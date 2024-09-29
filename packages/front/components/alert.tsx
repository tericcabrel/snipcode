import { AlertCircle } from 'lucide-react';

import { AlertDescription, Alert as AlertRoot, AlertTitle } from './ui/alert';

type AlertType = 'destructive' | 'info' | 'success';

type Props = {
  message: string;
  type?: AlertType;
};

const alertTypeMap: Record<AlertType, string> = {
  destructive: 'Error',
  info: 'Info',
  success: 'Success',
};

export const Alert = ({ message, type = 'info' }: Props) => {
  return (
    <AlertRoot variant={type} className="mb-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{alertTypeMap[type]}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </AlertRoot>
  );
};
