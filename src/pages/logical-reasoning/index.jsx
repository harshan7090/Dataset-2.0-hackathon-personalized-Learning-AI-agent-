import React, { useState } from 'react';
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import CategoryCard from './components/CategoryCard.jsx';
import PuzzleCard from './components/PuzzleCard';
import PuzzleInterface from './components/PuzzleInterface';
import StatsPanel from './components/StatsPanel';
import ResultModal from './components/ResultModal';

const LogicalReasoning = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activePuzzle, setActivePuzzle] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // Mock user statistics
  const userStats = {
    totalSolved: 47,
    totalPuzzles: 120,
    successRate: 78,
    avgTime: 12,
    currentStreak: 5
  };

  // Mock puzzle categories
  const categories = [
    {
      id: 1,
      name: "Pattern Recognition",
      description: "Identify patterns in sequences, shapes, and numbers to develop analytical thinking skills",
      icon: "Grid3x3",
      difficulty: "beginner",
      completed: 12,
      total: 20,
      avgTime: 8,
      isNew: false
    },
    {
      id: 2,
      name: "Mathematical Reasoning",
      description: "Solve complex mathematical problems using logical deduction and numerical analysis",
      icon: "Calculator",
      difficulty: "intermediate",
      completed: 15,
      total: 25,
      avgTime: 15,
      isNew: false
    },
    {
      id: 3,
      name: "Spatial Visualization",
      description: "Manipulate and analyze 3D objects mentally to enhance spatial reasoning abilities",
      icon: "Box",
      difficulty: "advanced",
      completed: 8,
      total: 18,
      avgTime: 20,
      isNew: true
    },
    {
      id: 4,
      name: "Logical Deduction",
      description: "Draw valid conclusions from given premises using formal logic principles",
      icon: "Brain",
      difficulty: "intermediate",
      completed: 12,
      total: 22,
      avgTime: 12,
      isNew: false
    },
    {
      id: 5,
      name: "Verbal Reasoning",
      description: "Analyze relationships between words and concepts to improve comprehension skills",
      icon: "MessageSquare",
      difficulty: "beginner",
      completed: 0,
      total: 15,
      avgTime: 10,
      isNew: true
    },
    {
      id: 6,
      name: "Critical Thinking",
      description: "Evaluate arguments and identify logical fallacies in complex scenarios",
      icon: "Lightbulb",
      difficulty: "advanced",
      completed: 0,
      total: 20,
      avgTime: 18,
      isNew: false
    }
  ];

  // Mock puzzles for selected category
  const puzzles = [
    {
      id: 1,
      title: "Number Sequence Challenge",
      description: "Find the pattern in this sequence and determine the next three numbers",
      difficulty: "easy",
      estimatedTime: 5,
      status: "completed",
      attempts: 2,
      score: 95,
      type: "sequence",
      category: "Pattern Recognition",
      sequence: [2, 4, 8, 16, 32],
      problemStatement: "Analyze the given sequence and identify the pattern. What are the next three numbers in this sequence?\n\nSequence: 2, 4, 8, 16, 32, ?, ?, ?",
      hints: [
        "Look at how each number relates to the previous one",
        "Try dividing each number by the previous number",
        "The pattern involves multiplication by a constant factor"
      ]
    },
    {
      id: 2,
      title: "Logic Grid Puzzle",
      description: "Use the given clues to determine the correct arrangement",
      difficulty: "medium",
      estimatedTime: 12,
      status: "in_progress",
      attempts: 1,
      score: null,
      type: "multiple_choice",
      category: "Logical Deduction",
      problemStatement: "Five friends - Alice, Bob, Carol, David, and Emma - are sitting in a row. Use these clues to determine their seating order:\n\n1. Alice is not at either end\n2. Bob is sitting next to Carol\n3. David is sitting two seats away from Emma\n4. Carol is not sitting next to Alice\n\nWho is sitting in the middle?",
      options: [
        { value: "alice", label: "Alice", description: "Alice is in the middle position" },
        { value: "bob", label: "Bob", description: "Bob is in the middle position" },
        { value: "carol", label: "Carol", description: "Carol is in the middle position" },
        { value: "david", label: "David", description: "David is in the middle position" },
        { value: "emma", label: "Emma", description: "Emma is in the middle position" }
      ],
      multipleAnswers: false,
      hints: [
        "Start by placing the people mentioned in the most specific clues",
        "Alice cannot be at positions 1 or 5",
        "Try different arrangements that satisfy Bob and Carol being adjacent"
      ]
    },
    {
      id: 3,
      title: "Pattern Matrix",
      description: "Complete the 3x3 matrix by identifying the missing element",
      difficulty: "medium",
      estimatedTime: 10,
      status: "available",
      attempts: 0,
      score: null,
      type: "pattern_matching",
      category: "Pattern Recognition",
      patternElements: ["△", "○", "□", "○", "□", "△", "□", "△", "?"],
      problemStatement: "Study the pattern in the 3x3 grid. Each row and column follows a specific rule. What shape should replace the question mark?",
      hints: [
        "Look at each row independently first",
        "Check if columns follow the same pattern as rows",
        "Each shape appears exactly once in each row and column"
      ]
    },
    {
      id: 4,
      title: "Cube Rotation Challenge",
      description: "Determine the correct orientation after multiple rotations",
      difficulty: "hard",
      estimatedTime: 15,
      status: "available",
      attempts: 0,
      score: null,
      type: "multiple_choice",
      category: "Spatial Visualization",
      problemStatement: "A cube has different symbols on each face: ★ (top), ● (bottom), ■ (front), ▲ (back), ◆ (left), ✦ (right).\n\nThe cube is rotated 90° clockwise around its vertical axis, then 90° forward around its horizontal axis.\n\nWhich symbol is now on top?",
      options: [
        { value: "star", label: "★ (Star)" },
        { value: "circle", label: "● (Circle)" },
        { value: "square", label: "■ (Square)" },
        { value: "triangle", label: "▲ (Triangle)" },
        { value: "diamond", label: "◆ (Diamond)" },
        { value: "flower", label: "✦ (Flower)" }
      ],
      multipleAnswers: false,
      hints: [
        "Visualize or draw the cube after the first rotation",
        "Remember that vertical axis rotation affects horizontal faces",
        "The forward rotation brings the front face to the top"
      ]
    },
    {
      id: 5,
      title: "Syllogism Solver",
      description: "Determine the valid conclusion from given premises",
      difficulty: "easy",
      estimatedTime: 8,
      status: "locked",
      attempts: 0,
      score: null,
      type: "multiple_choice",
      category: "Logical Deduction",
      problemStatement: "Given the following premises:\n\n1. All programmers are problem solvers\n2. Some problem solvers are mathematicians\n3. No mathematician is a musician\n\nWhich conclusion is definitely true?",
      options: [
        { value: "a", label: "All programmers are mathematicians" },
        { value: "b", label: "Some programmers are mathematicians" },
        { value: "c", label: "No programmer is a musician" },
        { value: "d", label: "Some problem solvers are not musicians" },
        { value: "e", label: "None of the above can be concluded with certainty" }
      ],
      multipleAnswers: false,
      hints: [
        "Draw Venn diagrams to visualize the relationships",
        "Be careful about \'some\' vs \'all\' statements",
        "Look for what must be true, not what could be true"
      ]
    },
    {
      id: 6,
      title: "Analogy Challenge",
      description: "Complete the analogy by finding the relationship pattern",
      difficulty: "medium",
      estimatedTime: 7,
      status: "locked",
      attempts: 0,
      score: null,
      type: "text_input",
      category: "Verbal Reasoning",
      problemStatement: "Complete the analogy:\n\nBook : Library :: Painting : ?\n\nExplain the relationship and provide your answer.",
      hints: [
        "Think about where each item is typically found or stored",
        "Consider the primary function or purpose of each location",
        "The relationship involves a collection or display space"
      ]
    }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'difficulty_asc', label: 'Difficulty: Easy to Hard' },
    { value: 'difficulty_desc', label: 'Difficulty: Hard to Easy' },
    { value: 'time_asc', label: 'Time: Shortest First' },
    { value: 'time_desc', label: 'Time: Longest First' }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleStartPuzzle = (puzzle) => {
    setActivePuzzle(puzzle);
  };

  const handleContinuePuzzle = (puzzle) => {
    setActivePuzzle(puzzle);
  };

  const handleSubmitAnswer = (submission) => {
    // Mock result calculation
    const mockResult = {
      score: Math.floor(Math.random() * 30) + 70,
      timeSpent: submission?.timeSpent,
      hintsUsed: submission?.hintsUsed,
      explanation: "The correct answer follows the pattern where each number is double the previous number. This is a geometric sequence with a common ratio of 2.\n\nThe sequence continues: 64, 128, 256\n\nThis type of pattern is commonly used in computer science, particularly in binary systems and algorithm complexity analysis."
    };

    setCurrentResult(mockResult);
    setShowResult(true);
    setActivePuzzle(null);
  };

  const handleClosePuzzle = () => {
    setActivePuzzle(null);
  };

  const handleHintRequest = () => {
    // Mock hint request handler
    // In real app, would track hint usage
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setCurrentResult(null);
  };

  const handleRetryPuzzle = () => {
    setShowResult(false);
    // In real app, would reload the same puzzle
  };

  const handleNextPuzzle = () => {
    setShowResult(false);
    setCurrentResult(null);
    // In real app, would load next puzzle
  };

  const filteredPuzzles = puzzles?.filter(puzzle => 
    filterDifficulty === 'all' || puzzle?.difficulty === filterDifficulty
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="content-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Brain" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Logical Reasoning
                </h1>
                <p className="text-muted-foreground">
                  Enhance your problem-solving skills with interactive puzzles
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Panel */}
          <StatsPanel stats={userStats} />

          {/* Category View */}
          {!selectedCategory ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Puzzle Categories
                </h2>
                <Button
                  variant="outline"
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  View Analytics
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories?.map(category => (
                  <CategoryCard
                    key={category?.id}
                    category={category}
                    onSelect={handleCategorySelect}
                    isActive={false}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Category Header */}
              <div className="mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  className="mb-4"
                >
                  Back to Categories
                </Button>

                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={selectedCategory?.icon} size={32} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-1">
                        {selectedCategory?.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {selectedCategory?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <Select
                    options={difficultyOptions}
                    value={filterDifficulty}
                    onChange={setFilterDifficulty}
                    placeholder="Filter by difficulty"
                    className="w-full sm:w-48"
                  />
                  
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="Sort by"
                    className="w-full sm:w-48"
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="CheckCircle2" size={16} />
                  <span>{selectedCategory?.completed} of {selectedCategory?.total} completed</span>
                </div>
              </div>

              {/* Puzzles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPuzzles?.map(puzzle => (
                  <PuzzleCard
                    key={puzzle?.id}
                    puzzle={puzzle}
                    onStart={handleStartPuzzle}
                    onContinue={handleContinuePuzzle}
                  />
                ))}
              </div>

              {filteredPuzzles?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No puzzles found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more puzzles
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Active Puzzle Interface */}
      {activePuzzle && (
        <PuzzleInterface
          puzzle={activePuzzle}
          onSubmit={handleSubmitAnswer}
          onClose={handleClosePuzzle}
          onHint={handleHintRequest}
        />
      )}
      {/* Result Modal */}
      {showResult && currentResult && (
        <ResultModal
          result={currentResult}
          onClose={handleCloseResult}
          onRetry={handleRetryPuzzle}
          onNext={handleNextPuzzle}
        />
      )}
    </div>
  );
};

export default LogicalReasoning;