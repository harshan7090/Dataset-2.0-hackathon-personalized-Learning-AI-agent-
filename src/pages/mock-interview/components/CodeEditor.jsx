import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LanguageSelector from '../../../components/ui/LanguageSelector';

const CodeEditor = ({ initialCode, language, onLanguageChange, onCodeChange, onRun, onSubmit, isRunning }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const handleCodeChange = (e) => {
    const newCode = e?.target?.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleRun = () => {
    setShowOutput(true);
    setOutput('Running code...\n\nTest Case 1: Passed ✓\nInput: [2,7,11,15], target = 9\nOutput: [0,1]\nExpected: [0,1]\n\nTest Case 2: Passed ✓\nInput: [3,2,4], target = 6\nOutput: [1,2]\nExpected: [1,2]\n\nAll test cases passed successfully!');
    if (onRun) {
      onRun(code);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(code);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <Icon name="Code2" size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Code Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector value={language} onChange={onLanguageChange} />
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={handleRun}
            disabled={isRunning}
          >
            Run Code
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Send"
            iconPosition="left"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-auto">
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-full min-h-[400px] p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your code here..."
              spellCheck="false"
            />
          </div>
        </div>

        {showOutput && (
          <div className="lg:w-96 border-t lg:border-t-0 lg:border-l border-border flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Icon name="Terminal" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Output</span>
              </div>
              <button
                onClick={() => setShowOutput(false)}
                className="p-1 rounded hover:bg-muted transition-colors"
                aria-label="Close output panel"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;