import React from 'react';
import Icon from '../../../components/AppIcon';

const SolutionModal = ({ isOpen, onClose, solution, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg border border-border shadow-elevation-2 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Solution</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring"
            aria-label="Close solution"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          {/* Explanation */}
          <div className="p-6 border-b border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Approach</h4>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {solution?.explanation}
            </p>
          </div>

          {/* Code */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">Code Solution</h4>
              <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded">
                {language}
              </span>
            </div>
            <div className="bg-background rounded-lg border border-border overflow-hidden">
              <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto">
                {solution?.code}
              </pre>
            </div>
          </div>

          {/* Complexity */}
          <div className="p-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Complexity Analysis</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <span className="text-xs text-muted-foreground">Time Complexity</span>
                <p className="text-lg font-mono font-semibold text-foreground mt-1">
                  {solution?.timeComplexity}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <span className="text-xs text-muted-foreground">Space Complexity</span>
                <p className="text-lg font-mono font-semibold text-foreground mt-1">
                  {solution?.spaceComplexity}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2 text-sm text-warning">
            <Icon name="AlertTriangle" size={16} />
            <span>Viewing solution will mark this problem as assisted</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors focus-ring"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;