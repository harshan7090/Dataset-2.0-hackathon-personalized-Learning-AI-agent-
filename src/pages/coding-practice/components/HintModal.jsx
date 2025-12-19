import React from 'react';
import Icon from '../../../components/AppIcon';

const HintModal = ({ isOpen, onClose, hint, hintNumber, totalHints }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg border border-border shadow-elevation-2 w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={20} className="text-warning" />
            <h3 className="text-lg font-semibold text-foreground">
              Hint {hintNumber} of {totalHints}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring"
            aria-label="Close hint"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {hint}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-border bg-muted/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors focus-ring"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HintModal;