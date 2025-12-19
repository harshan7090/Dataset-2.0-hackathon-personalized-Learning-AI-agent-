import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ResultModal = ({ result, onClose, onRetry, onNext }) => {
  const isCorrect = result?.score >= 70;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-elevated max-w-2xl w-full p-8">
        {/* Result Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isCorrect ? 'bg-success/10' : 'bg-error/10'
          }`}>
            <Icon 
              name={isCorrect ? 'CheckCircle2' : 'XCircle'} 
              size={48} 
              color={isCorrect ? 'var(--color-success)' : 'var(--color-error)'}
            />
          </div>
        </div>

        {/* Result Title */}
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">
          {isCorrect ? 'Excellent Work!' : 'Keep Practicing!'}
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          {isCorrect 
            ? 'You solved this puzzle successfully!' :'Don\'t worry, every attempt makes you better!'}
        </p>

        {/* Score Display */}
        <div className="bg-muted rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-foreground">Your Score</span>
            <span className="text-3xl font-bold text-foreground">{result?.score}%</span>
          </div>
          <ProgressIndicator
            value={result?.score}
            max={100}
            showLabel={false}
            variant={isCorrect ? 'success' : 'error'}
          />
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Time Taken</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              {Math.floor(result?.timeSpent / 60)}:{(result?.timeSpent % 60)?.toString()?.padStart(2, '0')}
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Hints Used</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              {result?.hintsUsed}
            </p>
          </div>
        </div>

        {/* Explanation */}
        {result?.explanation && (
          <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} color="var(--color-accent)" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">Explanation</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {result?.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            onClick={onRetry}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Try Again
          </Button>
          
          <Button
            variant="default"
            onClick={onNext}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Next Puzzle
          </Button>
          
          <Button
            variant="ghost"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;