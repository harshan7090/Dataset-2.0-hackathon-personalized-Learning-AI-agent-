import React from 'react';
import Icon from '../../../components/AppIcon';

const ProblemDescription = ({ problem, onShowHint, onShowSolution, hintsUsed }) => {
  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-foreground">{problem?.title}</h2>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            problem?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
            problem?.difficulty === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
          }`}>
            {problem?.difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onShowHint}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-sm font-medium transition-colors focus-ring"
            aria-label="Show hint"
          >
            <Icon name="Lightbulb" size={16} />
            <span>Hint ({hintsUsed}/{problem?.hints?.length})</span>
          </button>
          <button
            onClick={onShowSolution}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-sm font-medium transition-colors focus-ring"
            aria-label="Show solution"
          >
            <Icon name="Eye" size={16} />
            <span>Solution</span>
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {problem?.description}
          </p>
        </div>

        {/* Examples */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Examples</h3>
          <div className="space-y-4">
            {problem?.examples?.map((example, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Input:</span>
                  <pre className="mt-1 text-sm font-mono text-foreground bg-background rounded p-2">
                    {example?.input}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Output:</span>
                  <pre className="mt-1 text-sm font-mono text-foreground bg-background rounded p-2">
                    {example?.output}
                  </pre>
                </div>
                {example?.explanation && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Explanation:</span>
                    <p className="mt-1 text-sm text-muted-foreground">{example?.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Constraints</h3>
          <ul className="space-y-1">
            {problem?.constraints?.map((constraint, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
                <Icon name="ChevronRight" size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {problem?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Acceptance Rate</span>
            <p className="text-lg font-semibold text-foreground">{problem?.acceptanceRate}%</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Submissions</span>
            <p className="text-lg font-semibold text-foreground">{problem?.submissions?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;