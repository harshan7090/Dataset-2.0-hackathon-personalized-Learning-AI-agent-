import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PuzzleCard = ({ puzzle, onStart, onContinue }) => {
  const difficultyColors = {
    easy: 'bg-success/10 text-success',
    medium: 'bg-warning/10 text-warning',
    hard: 'bg-error/10 text-error'
  };

  const statusIcons = {
    completed: { name: 'CheckCircle2', color: 'var(--color-success)' },
    in_progress: { name: 'Clock', color: 'var(--color-warning)' },
    locked: { name: 'Lock', color: 'var(--color-muted-foreground)' },
    available: { name: 'Circle', color: 'var(--color-muted-foreground)' }
  };

  const status = statusIcons?.[puzzle?.status];

  return (
    <div className={`card-elevated p-5 ${puzzle?.status === 'locked' ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Icon 
            name={status?.name} 
            size={20} 
            color={status?.color}
          />
          <h4 className="font-semibold text-foreground">
            {puzzle?.title}
          </h4>
        </div>
        
        <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors?.[puzzle?.difficulty]}`}>
          {puzzle?.difficulty?.charAt(0)?.toUpperCase() + puzzle?.difficulty?.slice(1)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {puzzle?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{puzzle?.estimatedTime} min</span>
          </div>
          
          {puzzle?.attempts > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="RotateCcw" size={14} />
              <span>{puzzle?.attempts} attempts</span>
            </div>
          )}
        </div>

        {puzzle?.status === 'locked' ? (
          <Button variant="ghost" size="sm" disabled>
            <Icon name="Lock" size={16} />
            Locked
          </Button>
        ) : puzzle?.status === 'in_progress' ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onContinue(puzzle)}
          >
            Continue
          </Button>
        ) : puzzle?.status === 'completed' ? (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onStart(puzzle)}
          >
            Retry
          </Button>
        ) : (
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onStart(puzzle)}
          >
            Start
          </Button>
        )}
      </div>
      {puzzle?.score !== null && puzzle?.status === 'completed' && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Score</span>
            <span className="font-semibold text-foreground">{puzzle?.score}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleCard;