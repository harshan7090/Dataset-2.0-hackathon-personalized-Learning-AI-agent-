import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


import SessionTimer from '../../../components/ui/SessionTimer';

const PuzzleInterface = ({ puzzle, onSubmit, onClose, onHint }) => {
  const [answer, setAnswer] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const handleHintRequest = () => {
    if (hintsUsed < puzzle?.hints?.length) {
      setShowHint(true);
      setHintsUsed(hintsUsed + 1);
      if (onHint) onHint(hintsUsed);
    }
  };

  const handleSubmit = () => {
    const submission = {
      puzzleId: puzzle?.id,
      answer: puzzle?.type === 'multiple_choice' ? selectedOptions : answer,
      timeSpent,
      hintsUsed
    };
    onSubmit(submission);
  };

  const renderPuzzleContent = () => {
    switch (puzzle?.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {puzzle?.options?.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  if (puzzle?.multipleAnswers) {
                    setSelectedOptions(prev =>
                      prev?.includes(option?.value)
                        ? prev?.filter(v => v !== option?.value)
                        : [...prev, option?.value]
                    );
                  } else {
                    setSelectedOptions([option?.value]);
                  }
                }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedOptions?.includes(option?.value)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selectedOptions?.includes(option?.value)
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                  }`}>
                    {selectedOptions?.includes(option?.value) && (
                      <Icon name="Check" size={12} color="#ffffff" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{option?.label}</p>
                    {option?.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {option?.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'text_input':
        return (
          <Input
            label="Your Answer"
            type="text"
            placeholder="Enter your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e?.target?.value)}
            description="Type your solution to the puzzle"
          />
        );

      case 'pattern_matching':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {puzzle?.patternElements?.map((element, index) => (
                <div
                  key={index}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center text-2xl font-bold text-foreground"
                >
                  {element}
                </div>
              ))}
            </div>
            <Input
              label="Next Element"
              type="text"
              placeholder="What comes next?"
              value={answer}
              onChange={(e) => setAnswer(e?.target?.value)}
            />
          </div>
        );

      case 'sequence':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 p-6 bg-muted rounded-lg">
              {puzzle?.sequence?.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="text-2xl font-bold text-foreground">{item}</span>
                  {index < puzzle?.sequence?.length - 1 && (
                    <Icon name="ArrowRight" size={20} className="text-muted-foreground" />
                  )}
                </React.Fragment>
              ))}
              <Icon name="HelpCircle" size={24} className="text-primary" />
            </div>
            <Input
              label="Missing Value"
              type="text"
              placeholder="Enter the missing value"
              value={answer}
              onChange={(e) => setAnswer(e?.target?.value)}
            />
          </div>
        );

      default:
        return (
          <Input
            label="Your Answer"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e?.target?.value)}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {puzzle?.title}
                  </h2>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    puzzle?.difficulty === 'easy' ? 'bg-success/10 text-success' :
                    puzzle?.difficulty === 'medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }`}>
                    {puzzle?.difficulty?.charAt(0)?.toUpperCase() + puzzle?.difficulty?.slice(1)}
                  </span>
                </div>
                <p className="text-muted-foreground">{puzzle?.category}</p>
              </div>

              <div className="flex items-center space-x-3">
                <SessionTimer
                  mode="elapsed"
                  onTimeUpdate={setTimeSpent}
                  autoStart={true}
                  onComplete={() => {}}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  iconName="X"
                />
              </div>
            </div>

            {/* Problem Statement */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Problem Statement
              </h3>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-foreground whitespace-pre-line">
                  {puzzle?.problemStatement}
                </p>
              </div>
            </div>

            {/* Puzzle Content */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Your Solution
              </h3>
              {renderPuzzleContent()}
            </div>

            {/* Hint Section */}
            {showHint && hintsUsed > 0 && (
              <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      Hint {hintsUsed}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {puzzle?.hints?.[hintsUsed - 1]}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowHint(false)}
                    iconName="X"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleHintRequest}
                  disabled={hintsUsed >= puzzle?.hints?.length}
                  iconName="Lightbulb"
                  iconPosition="left"
                >
                  Get Hint ({hintsUsed}/{puzzle?.hints?.length})
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={onClose}
                >
                  Save & Exit
                </Button>
              </div>

              <Button
                variant="default"
                onClick={handleSubmit}
                disabled={
                  puzzle?.type === 'multiple_choice' 
                    ? selectedOptions?.length === 0 
                    : !answer?.trim()
                }
                iconName="Send"
                iconPosition="right"
              >
                Submit Answer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleInterface;