import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const EvaluationPanel = ({ evaluation }) => {
  if (!evaluation) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <Icon name="FileQuestion" size={48} className="text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">
          Submit your answer to receive detailed evaluation and feedback
        </p>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreVariant = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="ClipboardCheck" size={18} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Evaluation Results</h3>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className={`text-5xl font-bold mb-2 ${getScoreColor(evaluation?.overallScore)}`}>
            {evaluation?.overallScore}%
          </div>
          <p className="text-sm text-muted-foreground">Overall Score</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Code Quality</span>
              <span className={`text-sm font-semibold ${getScoreColor(evaluation?.codeQuality)}`}>
                {evaluation?.codeQuality}%
              </span>
            </div>
            <ProgressIndicator 
              value={evaluation?.codeQuality} 
              variant={getScoreVariant(evaluation?.codeQuality)}
              showLabel={false}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Efficiency</span>
              <span className={`text-sm font-semibold ${getScoreColor(evaluation?.efficiency)}`}>
                {evaluation?.efficiency}%
              </span>
            </div>
            <ProgressIndicator 
              value={evaluation?.efficiency} 
              variant={getScoreVariant(evaluation?.efficiency)}
              showLabel={false}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Correctness</span>
              <span className={`text-sm font-semibold ${getScoreColor(evaluation?.correctness)}`}>
                {evaluation?.correctness}%
              </span>
            </div>
            <ProgressIndicator 
              value={evaluation?.correctness} 
              variant={getScoreVariant(evaluation?.correctness)}
              showLabel={false}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="MessageSquare" size={16} />
            Feedback
          </h4>
          <div className="space-y-2">
            {evaluation?.feedback?.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <Icon 
                  name={item?.type === 'positive' ? 'CheckCircle2' : 'AlertCircle'} 
                  size={16} 
                  className={`mt-0.5 flex-shrink-0 ${item?.type === 'positive' ? 'text-success' : 'text-warning'}`}
                />
                <p className="text-sm text-foreground">{item?.message}</p>
              </div>
            ))}
          </div>
        </div>

        {evaluation?.suggestions && evaluation?.suggestions?.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Icon name="Lightbulb" size={16} />
              Suggestions for Improvement
            </h4>
            <ul className="space-y-2">
              {evaluation?.suggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name="ChevronRight" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationPanel;