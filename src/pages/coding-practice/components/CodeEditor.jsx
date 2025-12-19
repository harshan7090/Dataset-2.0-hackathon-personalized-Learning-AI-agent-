import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import LanguageSelector from '../../../components/ui/LanguageSelector';

const CodeEditor = ({ 
  initialCode, 
  language, 
  onLanguageChange, 
  onCodeChange,
  isRunning,
  onRun,
  onSubmit,
  onReset 
}) => {
  const [code, setCode] = useState(initialCode);
  const [lineNumbers, setLineNumbers] = useState([]);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const lines = code?.split('\n');
    setLineNumbers(Array.from({ length: lines?.length }, (_, i) => i + 1));
  }, [code]);

  const handleCodeChange = (e) => {
    const newCode = e?.target?.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Tab') {
      e?.preventDefault();
      const start = e?.target?.selectionStart;
      const end = e?.target?.selectionEnd;
      const newCode = code?.substring(0, start) + '    ' + code?.substring(end);
      setCode(newCode);
      if (onCodeChange) {
        onCodeChange(newCode);
      }
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <LanguageSelector value={language} onChange={onLanguageChange} />
          <div className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">
            {code?.split('\n')?.length} lines
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onReset}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-background hover:bg-muted text-sm font-medium transition-colors focus-ring"
            aria-label="Reset code"
          >
            <Icon name="RotateCcw" size={16} />
            <span>Reset</span>
          </button>
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Run code"
          >
            <Icon name={isRunning ? "Loader2" : "Play"} size={16} className={isRunning ? "animate-spin" : ""} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
          <button
            onClick={onSubmit}
            disabled={isRunning}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Submit solution"
          >
            <Icon name="Send" size={16} />
            <span>Submit</span>
          </button>
        </div>
      </div>
      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="bg-muted/50 px-3 py-4 text-right select-none border-r border-border">
          {lineNumbers?.map((num) => (
            <div key={num} className="text-xs text-muted-foreground font-mono leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <textarea
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          className="flex-1 p-4 bg-background text-foreground font-mono text-sm leading-6 resize-none focus:outline-none"
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="Code editor"
        />
      </div>
    </div>
  );
};

export default CodeEditor;