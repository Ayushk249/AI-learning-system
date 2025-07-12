import React from 'react';
import type { CardProps } from '../../types';


const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'soft',
}) => {
  const baseClasses = 'bg-white rounded-xl border border-neutral-200';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const shadowClasses = {
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large',
  };
  
  return (
    <div className={`${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`}>
      {children}
    </div>
  );
};


export default Card;