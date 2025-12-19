import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InterviewNotes = ({ initialNotes, onNotesChange }) => {
  const [notes, setNotes] = useState(initialNotes || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNotesChange = (e) => {
    const newNotes = e?.target?.value;
    setNotes(newNotes);
    if (onNotesChange) {
      onNotesChange(newNotes);
    }
  };

  const handleClear = () => {
    setNotes('');
    if (onNotesChange) {
      onNotesChange('');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon name="FileText" size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Interview Notes</span>
          <span className="text-xs text-muted-foreground">
            (Document your approach and thought process)
          </span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={18} 
          className="text-muted-foreground"
        />
      </button>
      {isExpanded && (
        <div className="p-4 space-y-3">
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Write your notes here...\n\n• Problem understanding\n• Approach and algorithm\n• Time and space complexity\n• Edge cases to consider\n• Alternative solutions"
            className="w-full h-48 p-3 bg-background border border-border rounded-md text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {notes?.length} characters
            </span>
            {notes?.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={handleClear}
              >
                Clear Notes
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewNotes;