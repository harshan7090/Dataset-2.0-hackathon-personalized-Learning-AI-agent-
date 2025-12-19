import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ recommendation }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'text-success bg-success/10',
      Medium: 'text-warning bg-warning/10',
      Hard: 'text-error bg-error/10'
    };
    return colors?.[difficulty] || colors?.Medium;
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Coding Challenge': 'Code2',
      'Interview Question': 'MessageSquare',
      'Logic Puzzle': 'Brain'
    };
    return icons?.[type] || 'FileCode';
  };

  return (
    <div className="card-elevated p-5 space-y-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name={getTypeIcon(recommendation?.type)} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{recommendation?.title}</h3>
            <p className="text-sm text-muted-foreground">{recommendation?.type}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(recommendation?.difficulty)}`}>
          {recommendation?.difficulty}
        </span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">{recommendation?.description}</p>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{recommendation?.estimatedTime}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>{recommendation?.points} pts</span>
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate(recommendation?.route)}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;