import type { ReactNode, JSX } from 'react';
import classes from './alert.module.scss';

interface AlertProps {
  children: ReactNode;
  variant?: 'success' | 'error' | 'info';
}

export function Alert({ children, variant = 'info' }: AlertProps): JSX.Element {
  return (
    <div className={classes.alertInfo}>
      <h3 className={`${classes.alert} ${classes[variant]}`}>{children}</h3>
    </div>
  );
}

export default Alert;
