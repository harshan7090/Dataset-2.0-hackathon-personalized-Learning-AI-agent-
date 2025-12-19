import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SessionTimer = ({ 
  initialTime = 0, 
  mode = 'elapsed',
  warningThreshold = 300,
  criticalThreshold = 60,
  onTimeUpdate,
  onComplete,
  autoStart = true,
  className = '' 
}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = mode === 'countdown' ? prevTime - 1 : prevTime + 1;
          
          if (onTimeUpdate) {
            onTimeUpdate(newTime);
          }
          
          if (mode === 'countdown' && newTime <= 0) {
            setIsRunning(false);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode, onTimeUpdate, onComplete]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(Math.abs(seconds) / 3600);
    const mins = Math.floor((Math.abs(seconds) % 3600) / 60);
    const secs = Math.abs(seconds) % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getTimerState = () => {
    if (mode === 'countdown') {
      if (time <= criticalThreshold) return 'critical';
      if (time <= warningThreshold) return 'warning';
    }
    return 'default';
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  return (
    <div className={`session-timer ${getTimerState()} ${className}`}>
      <Icon name="Clock" size={16} />
      <span className="font-mono">{formatTime(time)}</span>
      <button
        onClick={toggleTimer}
        className="ml-2 p-1 rounded hover:bg-muted transition-colors focus-ring"
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        <Icon name={isRunning ? 'Pause' : 'Play'} size={14} />
      </button>
      {mode === 'countdown' && (
        <button
          onClick={resetTimer}
          className="ml-1 p-1 rounded hover:bg-muted transition-colors focus-ring"
          aria-label="Reset timer"
        >
          <Icon name="RotateCcw" size={14} />
        </button>
      )}
    </div>
  );
};

export default SessionTimer;