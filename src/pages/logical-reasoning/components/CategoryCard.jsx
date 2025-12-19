import React from 'react';
import Icon from '../../../components/AppIcon';

import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const CategoryCard = ({ category, onSelect, isActive }) => {
  const difficultyColors = {
    beginner: 'text-success',
    intermediate: 'text-warning',
    advanced: 'text-error'
  };

  return (
    <div
      onClick={() => onSelect(category)}
      className={`card-elevated p-6 cursor-pointer transition-all duration-200 ${
        isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={category?.icon} size={32} color="var(--color-primary)" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {category?.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {category?.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                {category?.completed}/{category?.total} puzzles
              </span>
            </div>
            <ProgressIndicator 
              value={category?.completed} 
              max={category?.total}
              showLabel={false}
              size="default"
            />
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                ~{category?.avgTime} min
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className={difficultyColors?.[category?.difficulty]} />
              <span className={`text-sm font-medium ${difficultyColors?.[category?.difficulty]}`}>
                {category?.difficulty?.charAt(0)?.toUpperCase() + category?.difficulty?.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {category?.isNew && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md">
            New
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;