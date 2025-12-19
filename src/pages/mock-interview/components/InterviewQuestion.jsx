import React from 'react';
import Icon from '../../../components/AppIcon';

const InterviewQuestion = ({ question, currentIndex, totalQuestions }) => {
  const difficultyColors = {
    Easy: 'bg-success/10 text-success border-success/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    Hard: 'bg-error/10 text-error border-error/20'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors?.[question?.difficulty]}`}>
              {question?.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              {question?.timeLimit} min
            </span>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {question?.title}
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Building2" size={14} />
            <span>{question?.company}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{question?.category}</span>
          </div>
        </div>
      </div>
      <div className="prose prose-sm max-w-none">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {question?.description}
        </p>
      </div>
      {question?.examples && question?.examples?.length > 0 && (
        <div className="space-y-3 mt-4">
          <h3 className="text-sm font-semibold text-foreground">Examples:</h3>
          {question?.examples?.map((example, idx) => (
            <div key={idx} className="bg-muted/50 rounded-md p-4 space-y-2">
              <div>
                <span className="text-xs font-medium text-muted-foreground">Input:</span>
                <pre className="mt-1 text-sm text-foreground font-mono bg-background/50 p-2 rounded">
                  {example?.input}
                </pre>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Output:</span>
                <pre className="mt-1 text-sm text-foreground font-mono bg-background/50 p-2 rounded">
                  {example?.output}
                </pre>
              </div>
              {example?.explanation && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Explanation:</span>
                  <p className="mt-1 text-sm text-foreground">{example?.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {question?.constraints && question?.constraints?.length > 0 && (
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-semibold text-foreground">Constraints:</h3>
          <ul className="space-y-1">
            {question?.constraints?.map((constraint, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <Icon name="ChevronRight" size={14} className="mt-0.5 flex-shrink-0" />
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestion;