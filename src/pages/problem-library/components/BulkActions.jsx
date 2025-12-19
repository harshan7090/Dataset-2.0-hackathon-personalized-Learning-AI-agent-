import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedCount, onAddToSession, onExport, onClearSelection }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
      <div className="bg-card border border-border rounded-lg shadow-lg px-6 py-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">
            {selectedCount} problem{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAddToSession}
            iconName="Plus"
            iconPosition="left"
          >
            Add to Session
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
          
          <button
            onClick={onClearSelection}
            className="p-2 rounded-md hover:bg-muted transition-colors focus-ring"
            aria-label="Clear selection"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;