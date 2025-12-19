import React from 'react';
import Icon from '../../../components/AppIcon';

const QuestionNavigation = ({ questions, currentIndex, onQuestionSelect, answeredQuestions }) => {
  const getQuestionStatus = (index) => {
    if (answeredQuestions?.includes(index)) {
      return 'answered';
    }
    if (index === currentIndex) {
      return 'current';
    }
    return 'unanswered';
  };

  const statusStyles = {
    answered: 'bg-success text-success-foreground border-success',
    current: 'bg-primary text-primary-foreground border-primary',
    unanswered: 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="List" size={18} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Question Navigation</h3>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {questions?.map((question, index) => {
          const status = getQuestionStatus(index);
          return (
            <button
              key={question?.id}
              onClick={() => onQuestionSelect(index)}
              className={`aspect-square rounded-md border-2 text-sm font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring ${statusStyles?.[status]}`}
              aria-label={`Question ${index + 1} - ${status}`}
              aria-current={status === 'current' ? 'true' : undefined}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success border-2 border-success" />
          <span className="text-xs text-muted-foreground">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary border-2 border-primary" />
          <span className="text-xs text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted border-2 border-border" />
          <span className="text-xs text-muted-foreground">Unanswered</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;