import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProblemNavigation = ({ 
  currentProblem, 
  totalProblems, 
  onPrevious, 
  onNext,
  onProblemSelect,
  problems 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 border-b border-border">
      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevious}
          disabled={currentProblem === 1}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous problem"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-background hover:bg-muted text-sm font-medium transition-colors focus-ring"
            aria-label="Select problem"
          >
            <span className="text-foreground">
              Problem {currentProblem} of {totalProblems}
            </span>
            <Icon name="ChevronDown" size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute top-full mt-2 left-0 z-50 w-64 bg-popover border border-border rounded-md shadow-elevation-2 max-h-80 overflow-y-auto">
                <div className="py-1">
                  {problems?.map((problem, index) => (
                    <button
                      key={problem?.id}
                      onClick={() => {
                        onProblemSelect(index + 1);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors ${
                        currentProblem === index + 1 ? 'bg-primary/10 text-primary' : 'text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{problem?.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          problem?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                          problem?.difficulty === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                        }`}>
                          {problem?.difficulty}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onNext}
          disabled={currentProblem === totalProblems}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next problem"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Trophy" size={16} />
          <span className="font-medium">
            {problems?.filter(p => p?.solved)?.length}/{totalProblems} Solved
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProblemNavigation;