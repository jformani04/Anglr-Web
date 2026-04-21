import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-5',
  md: 'p-7',
  lg: 'p-10',
};

export default function Card({ padding = 'md', className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`glass-card rounded-2xl ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
