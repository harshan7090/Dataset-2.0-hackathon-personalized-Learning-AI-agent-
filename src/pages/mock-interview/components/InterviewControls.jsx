import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InterviewControls = ({ 
  onStart, 
  onSubmitAnswer, 
  onSkip, 
  onEnd, 
  isInterviewActive, 
  currentQuestionIndex, 
  totalQuestions,
  hasAnswered 
}) => {
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  const handleEnd = () => {
    setShowEndConfirm(true);
  };

  const confirmEnd = () => {
    setShowEndConfirm(false);
    if (onEnd) {
      onEnd();
    }
  };

  const handleSkip = () => {
    setShowSkipConfirm(true);
  };

  const confirmSkip = () => {
    setShowSkipConfirm(false);
    if (onSkip) {
      onSkip();
    }
  };

  if (!isInterviewActive) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="PlayCircle" size={32} className="text-primary" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Start?</h3>
          <p className="text-sm text-muted-foreground">
            Click below to begin your mock interview session. Timer will start immediately.
          </p>
        </div>
        <Button
          variant="default"
          size="lg"
          iconName="Play"
          iconPosition="left"
          onClick={onStart}
          fullWidth
        >
          Start Interview
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
            onClick={onSubmitAnswer}
            disabled={!hasAnswered}
            className="flex-1"
          >
            Submit Answer
          </Button>
          
          <Button
            variant="outline"
            iconName="SkipForward"
            iconPosition="left"
            onClick={handleSkip}
            disabled={currentQuestionIndex >= totalQuestions - 1}
            className="flex-1"
          >
            Skip Question
          </Button>
          
          <Button
            variant="destructive"
            iconName="StopCircle"
            iconPosition="left"
            onClick={handleEnd}
          >
            End Session
          </Button>
        </div>
      </div>

      {showEndConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-lg border border-border shadow-xl max-w-md w-full mx-4 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">End Interview Session?</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to end this interview? Your progress will be saved, but you won't be able to continue this session.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEndConfirm(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmEnd}
                fullWidth
              >
                End Session
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSkipConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-lg border border-border shadow-xl max-w-md w-full mx-4 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertCircle" size={20} className="text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Skip This Question?</h3>
                <p className="text-sm text-muted-foreground">
                  Skipping will mark this question as unanswered. You can return to it later during the session.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowSkipConfirm(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="warning"
                onClick={confirmSkip}
                fullWidth
              >
                Skip Question
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewControls;