import React from 'react';

const ProgressIndicator = ({ 
  value = 0, 
  max = 100, 
  showLabel = true, 
  size = 'default',
  variant = 'default',
  className = '' 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: '',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  return (
    <div className={`progress-indicator ${sizeClasses?.[size]} ${className}`}>
      <div 
        className={`progress-indicator-bar ${variantClasses?.[variant]}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
      {showLabel && size !== 'sm' && (
        <span className="progress-indicator-label text-foreground">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

export default ProgressIndicator;