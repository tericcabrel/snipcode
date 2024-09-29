import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border border-slate-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950 dark:border-slate-800 dark:[&>svg]:text-slate-50',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50',
        destructive:
          'border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900',
        info: 'border-blue-500/50 text-blue-500 dark:border-blue-500 [&>svg]:text-blue-500 dark:border-blue-900/50 dark:text-blue-900 dark:dark:border-blue-900 dark:[&>svg]:text-blue-900',
        success:
          'border-green-500/50 text-green-500 dark:border-green-500 [&>svg]:text-green-500 dark:border-green-900/50 dark:text-green-900 dark:dark:border-green-900 dark:[&>svg]:text-green-900',
      },
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  ),
);

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  ),
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
