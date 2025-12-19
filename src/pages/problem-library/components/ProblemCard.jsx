import React from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const ProblemCard = ({ problem, onBookmark, onSelect }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'hard':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="card-elevated p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary cursor-pointer" onClick={() => onSelect(problem)}>
            {problem?.title}
          </h3>
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem?.difficulty)}`}>
              {problem?.difficulty}
            </span>
            <span className="text-xs text-muted-foreground">
              {problem?.estimatedTime} min
            </span>
          </div>
        </div>
        <button
          onClick={() => onBookmark(problem?.id)}
          className="p-2 rounded-md hover:bg-muted transition-colors focus-ring"
          aria-label={problem?.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon 
            name={problem?.isBookmarked ? 'Bookmark' : 'BookmarkPlus'} 
            size={20} 
            color={problem?.isBookmarked ? 'var(--color-primary)' : 'currentColor'}
          />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {problem?.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {problem?.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-muted text-xs text-foreground rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-sm text-muted-foreground">{problem?.successRate}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} color="var(--color-accent)" />
            <span className="text-sm text-muted-foreground">{problem?.attempts}</span>
          </div>
          {problem?.isCompleted && (
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
              <span className="text-sm text-success">Solved</span>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect(problem)}
          iconName="Code2"
          iconPosition="left"
        >
          Solve
        </Button>
      </div>
      {problem?.companies && problem?.companies?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Building2" size={14} color="var(--color-muted-foreground)" />
            <div className="flex flex-wrap gap-2">
              {problem?.companies?.slice(0, 3)?.map((company, index) => (
                <span key={index} className="text-xs text-muted-foreground">
                  {company}
                </span>
              ))}
              {problem?.companies?.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{problem?.companies?.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;