import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SessionTimer from '../../components/ui/SessionTimer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InterviewQuestion from './components/InterviewQuestion';
import CodeEditor from './components/CodeEditor';
import InterviewNotes from './components/InterviewNotes';
import QuestionNavigation from './components/QuestionNavigation';
import InterviewControls from './components/InterviewControls';
import EvaluationPanel from './components/EvaluationPanel.jsx';

const MockInterview = () => {
  const navigate = useNavigate();
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [currentCode, setCurrentCode] = useState('');
  const [currentNotes, setCurrentNotes] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [showMobileView, setShowMobileView] = useState('question');

  const mockQuestions = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      company: "Google",
      category: "Array, Hash Table",
      timeLimit: 15,
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹",
        "Only one valid answer exists"
      ],
      starterCode: {
        javascript: "function twoSum(nums, target) {\n    // Write your code here\n    \n}",
        python: "def two_sum(nums, target):\n    # Write your code here\n    pass",
        java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};"
      }
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      company: "Amazon",
      category: "String, Stack",
      timeLimit: 20,
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
      examples: [
        {
          input: "s = \"()\"",
          output: "true",
          explanation: "The string contains valid parentheses."
        },
        {
          input: "s = \"()[]{}\"",
          output: "true",
          explanation: "All brackets are properly closed."
        },
        {
          input: "s = \"(]\"",
          output: "false",
          explanation: "Brackets are not closed in the correct order."
        }
      ],
      constraints: [
        "1 ≤ s.length ≤ 10⁴",
        "s consists of parentheses only '()[]{}'."
      ],
      starterCode: {
        javascript: "function isValid(s) {\n    // Write your code here\n    \n}",
        python: "def is_valid(s):\n    # Write your code here\n    pass",
        java: "class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        \n    }\n};"
      }
    },
    {
      id: 3,
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      company: "Microsoft",
      category: "Linked List, Recursion",
      timeLimit: 25,
      description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
      examples: [
        {
          input: "list1 = [1,2,4], list2 = [1,3,4]",
          output: "[1,1,2,3,4,4]",
          explanation: "The merged list is created by combining both sorted lists."
        },
        {
          input: "list1 = [], list2 = []",
          output: "[]",
          explanation: "Both lists are empty."
        }
      ],
      constraints: [
        "The number of nodes in both lists is in the range [0, 50].",
        "-100 ≤ Node.val ≤ 100",
        "Both list1 and list2 are sorted in non-decreasing order."
      ],
      starterCode: {
        javascript: "function mergeTwoLists(list1, list2) {\n    // Write your code here\n    \n}",
        python: "def merge_two_lists(list1, list2):\n    # Write your code here\n    pass",
        java: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your code here\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your code here\n        \n    }\n};"
      }
    },
    {
      id: 4,
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      company: "Facebook",
      category: "Tree, BFS",
      timeLimit: 30,
      description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
      examples: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "[[3],[9,20],[15,7]]",
          explanation: "Level order traversal groups nodes by their depth."
        }
      ],
      constraints: [
        "The number of nodes in the tree is in the range [0, 2000].",
        "-1000 ≤ Node.val ≤ 1000"
      ],
      starterCode: {
        javascript: "function levelOrder(root) {\n    // Write your code here\n    \n}",
        python: "def level_order(root):\n    # Write your code here\n    pass",
        java: "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your code here\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write your code here\n        \n    }\n};"
      }
    },
    {
      id: 5,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      company: "Apple",
      category: "String, Sliding Window",
      timeLimit: 35,
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      examples: [
        {
          input: "s = \"abcabcbb\"",
          output: "3",
          explanation: "The answer is \"abc\", with the length of 3."
        },
        {
          input: "s = \"bbbbb\"",
          output: "1",
          explanation: "The answer is \"b\", with the length of 1."
        }
      ],
      constraints: [
        "0 ≤ s.length ≤ 5 * 10⁴",
        "s consists of English letters, digits, symbols and spaces."
      ],
      starterCode: {
        javascript: "function lengthOfLongestSubstring(s) {\n    // Write your code here\n    \n}",
        python: "def length_of_longest_substring(s):\n    # Write your code here\n    pass",
        java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        \n    }\n};"
      }
    }
  ];

  const currentQuestion = mockQuestions?.[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion && currentQuestion?.starterCode) {
      setCurrentCode(currentQuestion?.starterCode?.[selectedLanguage] || '');
    }
  }, [currentQuestionIndex, selectedLanguage, currentQuestion]);

  const handleStartInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions([]);
    setEvaluation(null);
  };

  const handleSubmitAnswer = () => {
    if (!answeredQuestions?.includes(currentQuestionIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    }

    const mockEvaluation = {
      overallScore: Math.floor(Math.random() * 30) + 70,
      codeQuality: Math.floor(Math.random() * 30) + 70,
      efficiency: Math.floor(Math.random() * 30) + 65,
      correctness: Math.floor(Math.random() * 20) + 80,
      feedback: [
        { type: 'positive', message: 'Good use of appropriate data structures' },
        { type: 'positive', message: 'Code is well-structured and readable' },
        { type: 'improvement', message: 'Consider edge cases for empty inputs' },
        { type: 'improvement', message: 'Time complexity could be optimized' }
      ],
      suggestions: [
        'Try using a hash map for O(1) lookup time',
        'Add input validation at the beginning',
        'Consider using early returns to simplify logic',
        'Add comments for complex algorithmic sections'
      ]
    };

    setEvaluation(mockEvaluation);
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < mockQuestions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setEvaluation(null);
    }
  };

  const handleEndSession = () => {
    navigate('/dashboard');
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
    setEvaluation(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="content-container">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Mock Interview</h1>
                <p className="text-muted-foreground">
                  Simulate real technical interviews with timed coding challenges
                </p>
              </div>
              
              {isInterviewActive && (
                <div className="flex items-center gap-4">
                  <SessionTimer
                    initialTime={currentQuestion?.timeLimit * 60}
                    mode="countdown"
                    warningThreshold={300}
                    criticalThreshold={60}
                    onTimeUpdate={() => {}}
                    onComplete={() => {}}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowLeft"
                    iconPosition="left"
                    onClick={() => navigate('/dashboard')}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              )}
            </div>

            {isInterviewActive && (
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={18} className="text-success" />
                      <span className="text-sm font-medium text-foreground">
                        {answeredQuestions?.length} Answered
                      </span>
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-2">
                      <Icon name="Circle" size={18} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {mockQuestions?.length - answeredQuestions?.length} Remaining
                      </span>
                    </div>
                  </div>
                  
                  <div className="lg:hidden flex gap-2">
                    <button
                      onClick={() => setShowMobileView('question')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        showMobileView === 'question' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      Question
                    </button>
                    <button
                      onClick={() => setShowMobileView('editor')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        showMobileView === 'editor' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      Editor
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isInterviewActive ? (
            <div className="max-w-2xl mx-auto">
              <InterviewControls
                onStart={handleStartInterview}
                isInterviewActive={isInterviewActive}
                onSubmitAnswer={() => {}}
                onSkip={() => {}}
                onEnd={() => {}}
                currentQuestionIndex={0}
                totalQuestions={0}
                hasAnswered={false}
              />
              
              <div className="mt-8 bg-card rounded-lg border border-border p-6 space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Info" size={20} className="text-primary" />
                  Interview Guidelines
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Icon name="Clock" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Time Management</p>
                      <p className="text-sm text-muted-foreground">Each question has a specific time limit. Manage your time wisely.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Code2" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Code Quality</p>
                      <p className="text-sm text-muted-foreground">Write clean, efficient, and well-commented code.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="MessageSquare" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Document Your Approach</p>
                      <p className="text-sm text-muted-foreground">Use the notes section to explain your thought process.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="TestTube" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Test Your Code</p>
                      <p className="text-sm text-muted-foreground">Run and verify your solution before submitting.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <QuestionNavigation
                questions={mockQuestions}
                currentIndex={currentQuestionIndex}
                onQuestionSelect={handleQuestionSelect}
                answeredQuestions={answeredQuestions}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 space-y-6 ${showMobileView === 'editor' ? 'hidden lg:block' : ''}`}>
                  <InterviewQuestion
                    question={currentQuestion}
                    currentIndex={currentQuestionIndex}
                    totalQuestions={mockQuestions?.length}
                  />
                  
                  <InterviewNotes
                    initialNotes={currentNotes}
                    onNotesChange={setCurrentNotes}
                  />
                </div>

                <div className={`space-y-6 ${showMobileView === 'question' ? 'hidden lg:block' : ''}`}>
                  <div className="lg:sticky lg:top-20 space-y-6">
                    <div className="h-[600px]">
                      <CodeEditor
                        initialCode={currentCode}
                        language={selectedLanguage}
                        onLanguageChange={setSelectedLanguage}
                        onCodeChange={setCurrentCode}
                        onRun={() => {}}
                        onSubmit={handleSubmitAnswer}
                        isRunning={false}
                      />
                    </div>
                    
                    <EvaluationPanel evaluation={evaluation} />
                  </div>
                </div>
              </div>

              <InterviewControls
                onSubmitAnswer={handleSubmitAnswer}
                onSkip={handleSkipQuestion}
                onEnd={handleEndSession}
                isInterviewActive={isInterviewActive}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={mockQuestions?.length}
                hasAnswered={currentCode?.trim()?.length > 0}
                onStart={handleStartInterview}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MockInterview;