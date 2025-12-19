import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SessionTimer from '../../components/ui/SessionTimer';
import ProblemDescription from './components/ProblemDescription';
import CodeEditor from './components/CodeEditor';
import ConsoleOutput from './components/ConsoleOutput';
import ProblemNavigation from './components/ProblemNavigation';
import HintModal from './components/HintModal';
import SolutionModal from './components/SolutionModal';
import SubmissionResultModal from './components/SubmissionResultModal';

const CodingPractice = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState('problem');

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]"
        }
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹",
        "Only one valid answer exists"
      ],
      tags: ["Array", "Hash Table"],
      acceptanceRate: 49.2,
      submissions: 8234567,
      hints: [
        "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
        "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
        "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
      ],
      starterCode: {
        javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your code here\n    \n};",
        python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your code here\n        pass",
        java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};"
      },
      solution: {
        explanation: "The optimal approach uses a hash map to store the complement of each number as we iterate through the array.\n\nFor each number, we check if its complement (target - current number) exists in the hash map. If it does, we've found our pair. If not, we add the current number and its index to the hash map.\n\nThis approach ensures we only traverse the array once, making it very efficient.",
        code: "var twoSum = function(nums, target) {\n    const map = new Map();\n    \n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        \n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        \n        map.set(nums[i], i);\n    }\n    \n    return [];\n};",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      },
      solved: false
    },
    {
      id: 2,
      title: "Reverse String",
      difficulty: "Easy",
      description: "Write a function that reverses a string. The input string is given as an array of characters s.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
      examples: [
        {
          input: 's = ["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]'
        },
        {
          input: 's = ["H","a","n","n","a","h"]',
          output: '["h","a","n","n","a","H"]'
        }
      ],
      constraints: [
        "1 ≤ s.length ≤ 10⁵",
        "s[i] is a printable ascii character"
      ],
      tags: ["Two Pointers", "String"],
      acceptanceRate: 76.8,
      submissions: 2456789,
      hints: [
        "The entire logic for reversing a string is based on using the opposite directional two-pointer approach!",
        "Use two pointers, one at the start and one at the end, and swap characters while moving towards the center."
      ],
      starterCode: {
        javascript: "/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    // Write your code here\n    \n};",
        python: "class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        # Write your code here\n        pass",
        java: "class Solution {\n    public void reverseString(char[] s) {\n        // Write your code here\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write your code here\n        \n    }\n};"
      },
      solution: {
        explanation: "Use the two-pointer technique with one pointer at the start and another at the end.\n\nSwap the characters at these positions and move the pointers towards the center until they meet.\n\nThis approach modifies the array in-place with O(1) extra space.",
        code: "var reverseString = function(s) {\n    let left = 0;\n    let right = s.length - 1;\n    \n    while (left < right) {\n        [s[left], s[right]] = [s[right], s[left]];\n        left++;\n        right--;\n    }\n};",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      },
      solved: false
    },
    {
      id: 3,
      title: "Valid Palindrome",
      difficulty: "Easy",
      description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string s, return true if it is a palindrome, or false otherwise.",
      examples: [
        {
          input: 's = "A man, a plan, a canal: Panama"',
          output: "true",
          explanation: '"amanaplanacanalpanama" is a palindrome.'
        },
        {
          input: 's = "race a car"',
          output: "false",
          explanation: '"raceacar" is not a palindrome.'
        }
      ],
      constraints: [
        "1 ≤ s.length ≤ 2 * 10⁵",
        "s consists only of printable ASCII characters"
      ],
      tags: ["Two Pointers", "String"],
      acceptanceRate: 44.3,
      submissions: 3567890,
      hints: [
        "Can you solve it in O(n) time and O(1) space?",
        "Use two pointers approach after cleaning the string."
      ],
      starterCode: {
        javascript: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    // Write your code here\n    \n};",
        python: "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write your code here\n        pass",
        java: "class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your code here\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your code here\n        \n    }\n};"
      },
      solution: {
        explanation: "Use two pointers starting from both ends of the string.\n\nSkip non-alphanumeric characters and compare characters after converting to lowercase.\n\nIf all corresponding characters match, the string is a palindrome.",
        code: "var isPalindrome = function(s) {\n    let left = 0;\n    let right = s.length - 1;\n    \n    while (left < right) {\n        while (left < right && !isAlphanumeric(s[left])) left++;\n        while (left < right && !isAlphanumeric(s[right])) right--;\n        \n        if (s[left].toLowerCase() !== s[right].toLowerCase()) {\n            return false;\n        }\n        \n        left++;\n        right--;\n    }\n    \n    return true;\n};\n\nfunction isAlphanumeric(char) {\n    return /[a-zA-Z0-9]/.test(char);\n}",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      },
      solved: false
    }
  ];

  const currentProblem = problems?.[currentProblemIndex];

  useEffect(() => {
    setCode(currentProblem?.starterCode?.[selectedLanguage]);
  }, [currentProblemIndex, selectedLanguage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(currentProblem?.starterCode?.[language]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setIsConsoleExpanded(true);
    setConsoleOutput([]);

    setTimeout(() => {
      const mockOutput = [
        { type: 'info', content: '> Running test cases...' },
        { type: 'success', content: '✓ Test case 1 passed' },
        { type: 'success', content: '✓ Test case 2 passed' },
        { type: 'info', content: '> Execution completed in 42ms' }
      ];
      setConsoleOutput(mockOutput);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setIsConsoleExpanded(true);

    setTimeout(() => {
      const mockTestResults = [
        { caseNumber: 1, input: '[2,7,11,15], 9', expected: '[0,1]', output: '[0,1]', passed: true, executionTime: 12 },
        { caseNumber: 2, input: '[3,2,4], 6', expected: '[1,2]', output: '[1,2]', passed: true, executionTime: 8 },
        { caseNumber: 3, input: '[3,3], 6', expected: '[0,1]', output: '[0,1]', passed: true, executionTime: 10 }
      ];

      setTestResults(mockTestResults);
      
      const allPassed = mockTestResults?.every(t => t?.passed);
      const result = {
        accepted: allPassed,
        testResults: mockTestResults,
        runtime: 15,
        memory: 42.3,
        beats: 87.5
      };

      setSubmissionResult(result);
      setShowResultModal(true);
      setIsRunning(false);

      if (allPassed) {
        const updatedProblems = [...problems];
        updatedProblems[currentProblemIndex].solved = true;
      }
    }, 2000);
  };

  const handleReset = () => {
    setCode(currentProblem?.starterCode?.[selectedLanguage]);
    setConsoleOutput([]);
    setTestResults([]);
  };

  const handleShowHint = () => {
    if (hintsUsed < currentProblem?.hints?.length) {
      setShowHintModal(true);
    }
  };

  const handleCloseHint = () => {
    setShowHintModal(false);
    setHintsUsed(prev => Math.min(prev + 1, currentProblem?.hints?.length));
  };

  const handleProblemChange = (index) => {
    setCurrentProblemIndex(index - 1);
    setHintsUsed(0);
    setConsoleOutput([]);
    setTestResults([]);
  };

  const handleNextProblem = () => {
    if (currentProblemIndex < problems?.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      setHintsUsed(0);
      setConsoleOutput([]);
      setTestResults([]);
      setShowResultModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="content-container">
        {/* Top Bar */}
        <div className="bg-card border-b border-border">
          <div className="max-w-[1920px] mx-auto">
            <ProblemNavigation
              currentProblem={currentProblemIndex + 1}
              totalProblems={problems?.length}
              onPrevious={() => handleProblemChange(currentProblemIndex)}
              onNext={() => handleProblemChange(currentProblemIndex + 2)}
              onProblemSelect={handleProblemChange}
              problems={problems}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1920px] mx-auto">
          {/* Desktop Layout */}
          {!isMobileView ? (
            <div className="flex h-[calc(100vh-8rem)]">
              {/* Left Panel - Problem Description */}
              <div className="w-1/2 border-r border-border overflow-hidden">
                <ProblemDescription
                  problem={currentProblem}
                  onShowHint={handleShowHint}
                  onShowSolution={() => setShowSolutionModal(true)}
                  hintsUsed={hintsUsed}
                />
              </div>

              {/* Right Panel - Code Editor & Console */}
              <div className="w-1/2 flex flex-col">
                {/* Timer Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border">
                  <SessionTimer
                    mode="elapsed"
                    autoStart={true}
                    onTimeUpdate={() => {}}
                    onComplete={() => {}}
                  />
                  <div className="text-xs text-muted-foreground">
                    Auto-save enabled
                  </div>
                </div>

                {/* Code Editor */}
                <div className="flex-1 overflow-hidden">
                  <CodeEditor
                    initialCode={code}
                    language={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={setCode}
                    isRunning={isRunning}
                    onRun={handleRunCode}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                  />
                </div>

                {/* Console */}
                <ConsoleOutput
                  output={consoleOutput}
                  testResults={testResults}
                  isExpanded={isConsoleExpanded}
                  onToggleExpand={() => setIsConsoleExpanded(!isConsoleExpanded)}
                />
              </div>
            </div>
          ) : (
            /* Mobile Layout */
            (<div className="h-[calc(100vh-8rem)] flex flex-col">
              {/* Mobile Tab Switcher */}
              <div className="flex border-b border-border bg-card">
                <button
                  onClick={() => setMobileActiveTab('problem')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    mobileActiveTab === 'problem' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Problem
                </button>
                <button
                  onClick={() => setMobileActiveTab('editor')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    mobileActiveTab === 'editor' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Code
                </button>
              </div>
              {/* Mobile Content */}
              <div className="flex-1 overflow-hidden">
                {mobileActiveTab === 'problem' ? (
                  <ProblemDescription
                    problem={currentProblem}
                    onShowHint={handleShowHint}
                    onShowSolution={() => setShowSolutionModal(true)}
                    hintsUsed={hintsUsed}
                  />
                ) : (
                  <div className="h-full flex flex-col">
                    <div className="px-4 py-2 bg-muted/30 border-b border-border">
                      <SessionTimer mode="elapsed" autoStart={true} onTimeUpdate={() => {}} onComplete={() => {}} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <CodeEditor
                        initialCode={code}
                        language={selectedLanguage}
                        onLanguageChange={handleLanguageChange}
                        onCodeChange={setCode}
                        isRunning={isRunning}
                        onRun={handleRunCode}
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                      />
                    </div>
                    <ConsoleOutput
                      output={consoleOutput}
                      testResults={testResults}
                      isExpanded={isConsoleExpanded}
                      onToggleExpand={() => setIsConsoleExpanded(!isConsoleExpanded)}
                    />
                  </div>
                )}
              </div>
            </div>)
          )}
        </div>
      </div>
      {/* Modals */}
      <HintModal
        isOpen={showHintModal}
        onClose={handleCloseHint}
        hint={currentProblem?.hints?.[hintsUsed]}
        hintNumber={hintsUsed + 1}
        totalHints={currentProblem?.hints?.length}
      />
      <SolutionModal
        isOpen={showSolutionModal}
        onClose={() => setShowSolutionModal(false)}
        solution={currentProblem?.solution}
        language={selectedLanguage}
      />
      {submissionResult && (
        <SubmissionResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          result={submissionResult}
          onNextProblem={handleNextProblem}
        />
      )}
    </div>
  );
};

export default CodingPractice;