import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const SubmissionResultModal = ({ isOpen, onClose, result, onNextProblem }) => {
  if (!isOpen) return null;

  const passedTests = result?.testResults?.filter(t => t?.passed)?.length;
  const totalTests = result?.testResults?.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg border border-border shadow-elevation-2 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`p-6 border-b border-border ${
          result?.accepted ? 'bg-success/5' : 'bg-error/5'
        }`}>
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-3 rounded-full ${
              result?.accepted ? 'bg-success/10' : 'bg-error/10'
            }`}>
              <Icon
                name={result?.accepted ? 'CheckCircle2' : 'XCircle'}
                size={32}
                className={result?.accepted ? 'text-success' : 'text-error'}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {result?.accepted ? 'Accepted!' : 'Wrong Answer'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {passedTests} of {totalTests} test cases passed
              </p>
            </div>
          </div>
          <ProgressIndicator
            value={passedTests}
            max={totalTests}
            variant={result?.accepted ? 'success' : 'error'}
            className="mt-4"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Clock" size={20} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground mb-1">Runtime</p>
              <p className="text-lg font-semibold text-foreground">{result?.runtime}ms</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Database" size={20} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground mb-1">Memory</p>
              <p className="text-lg font-semibold text-foreground">{result?.memory}MB</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Zap" size={20} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground mb-1">Beats</p>
              <p className="text-lg font-semibold text-foreground">{result?.beats}%</p>
            </div>
          </div>

          {/* Test Results */}
          {!result?.accepted && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Failed Test Cases</h4>
              <div className="space-y-3">
                {result?.testResults?.filter(t => !t?.passed)?.map((test, index) => (
                  <div key={index} className="bg-error/5 border border-error/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Test Case {test?.caseNumber}</span>
                      <Icon name="XCircle" size={16} className="text-error" />
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span className="text-foreground">{test?.input}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected: </span>
                        <span className="text-foreground">{test?.expected}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Your Output: </span>
                        <span className="text-error">{test?.output}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {result?.accepted && (
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Trophy" size={20} className="text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Great job!</p>
                  <p className="text-sm text-muted-foreground">
                    Your solution passed all test cases. You've earned 10 XP points!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-border bg-muted/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-background border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors focus-ring"
          >
            Close
          </button>
          {result?.accepted && (
            <button
              onClick={onNextProblem}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors focus-ring"
            >
              Next Problem
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionResultModal;