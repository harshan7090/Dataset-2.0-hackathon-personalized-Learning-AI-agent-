import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ConsoleOutput = ({ output, testResults, isExpanded, onToggleExpand }) => {
  const [activeTab, setActiveTab] = useState('output');

  const tabs = [
    { id: 'output', label: 'Output', icon: 'Terminal' },
    { id: 'testcases', label: 'Test Cases', icon: 'CheckCircle2' },
  ];

  return (
    <div className={`bg-card border-t border-border transition-all duration-300 ${
      isExpanded ? 'h-80' : 'h-12'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-border">
        <div className="flex items-center space-x-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onToggleExpand}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring"
          aria-label={isExpanded ? 'Collapse console' : 'Expand console'}
        >
          <Icon name={isExpanded ? 'ChevronDown' : 'ChevronUp'} size={20} />
        </button>
      </div>
      {/* Content */}
      {isExpanded && (
        <div className="h-[calc(100%-3rem)] overflow-y-auto p-4">
          {activeTab === 'output' && (
            <div className="space-y-2">
              {output?.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Icon name="Terminal" size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Run your code to see output here</p>
                  </div>
                </div>
              ) : (
                output?.map((line, index) => (
                  <div key={index} className={`text-sm font-mono ${
                    line?.type === 'error' ? 'text-error' :
                    line?.type === 'success'? 'text-success' : 'text-foreground'
                  }`}>
                    {line?.content}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'testcases' && (
            <div className="space-y-3">
              {testResults?.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Icon name="CheckCircle2" size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Submit your solution to see test results</p>
                  </div>
                </div>
              ) : (
                testResults?.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      result?.passed
                        ? 'bg-success/5 border-success/20' :'bg-error/5 border-error/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Test Case {index + 1}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Icon
                          name={result?.passed ? 'CheckCircle2' : 'XCircle'}
                          size={16}
                          className={result?.passed ? 'text-success' : 'text-error'}
                        />
                        <span className={`text-xs font-medium ${
                          result?.passed ? 'text-success' : 'text-error'
                        }`}>
                          {result?.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span className="text-foreground">{result?.input}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected: </span>
                        <span className="text-foreground">{result?.expected}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Output: </span>
                        <span className={result?.passed ? 'text-success' : 'text-error'}>
                          {result?.output}
                        </span>
                      </div>
                      {result?.executionTime && (
                        <div>
                          <span className="text-muted-foreground">Time: </span>
                          <span className="text-foreground">{result?.executionTime}ms</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsoleOutput;