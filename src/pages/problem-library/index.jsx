import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import ProblemCard from './components/ProblemCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import BulkActions from './components/BulkActions';
import StatsOverview from './components/StatsOverview';

const ProblemLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    language: 'all',
    category: 'all',
    company: 'all',
    timeRange: 'all',
    showUnsolved: false,
    showBookmarked: false,
    showAttempted: false
  });

  const mockProblems = [
    {
      id: 1,
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
      difficulty: "Easy",
      tags: ["Array", "Hash Table"],
      successRate: 89,
      attempts: 2456,
      estimatedTime: 15,
      isCompleted: true,
      isBookmarked: false,
      companies: ["Google", "Amazon", "Microsoft"],
      category: "arrays",
      language: "javascript"
    },
    {
      id: 2,
      title: "Reverse Linked List",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list. The list should be reversed in-place without using extra space.",
      difficulty: "Medium",
      tags: ["Linked List", "Recursion"],
      successRate: 76,
      attempts: 1823,
      estimatedTime: 20,
      isCompleted: false,
      isBookmarked: true,
      companies: ["Facebook", "Apple"],
      category: "linked-lists",
      language: "python"
    },
    {
      id: 3,
      title: "Binary Tree Maximum Path Sum",
      description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum in a binary tree.",
      difficulty: "Hard",
      tags: ["Tree", "Dynamic Programming", "DFS"],
      successRate: 42,
      attempts: 987,
      estimatedTime: 45,
      isCompleted: false,
      isBookmarked: false,
      companies: ["Google", "Amazon"],
      category: "trees",
      language: "java"
    },
    {
      id: 4,
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if brackets are closed in the correct order.",
      difficulty: "Easy",
      tags: ["String", "Stack"],
      successRate: 92,
      attempts: 3421,
      estimatedTime: 10,
      isCompleted: true,
      isBookmarked: true,
      companies: ["Microsoft", "Netflix"],
      category: "strings",
      language: "javascript"
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      description: "Given a string s, return the longest palindromic substring in s. A palindrome is a string that reads the same backward as forward.",
      difficulty: "Medium",
      tags: ["String", "Dynamic Programming"],
      successRate: 68,
      attempts: 2134,
      estimatedTime: 30,
      isCompleted: false,
      isBookmarked: false,
      companies: ["Amazon", "Apple", "Google"],
      category: "strings",
      language: "cpp"
    },
    {
      id: 6,
      title: "Merge K Sorted Lists",
      description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
      difficulty: "Hard",
      tags: ["Linked List", "Heap", "Divide and Conquer"],
      successRate: 51,
      attempts: 1456,
      estimatedTime: 40,
      isCompleted: false,
      isBookmarked: true,
      companies: ["Facebook", "Google", "Amazon"],
      category: "linked-lists",
      language: "python"
    },
    {
      id: 7,
      title: "Container With Most Water",
      description: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.",
      difficulty: "Medium",
      tags: ["Array", "Two Pointers", "Greedy"],
      successRate: 73,
      attempts: 1987,
      estimatedTime: 25,
      isCompleted: true,
      isBookmarked: false,
      companies: ["Microsoft", "Amazon"],
      category: "arrays",
      language: "java"
    },
    {
      id: 8,
      title: "Climbing Stairs",
      description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      difficulty: "Easy",
      tags: ["Dynamic Programming", "Math"],
      successRate: 87,
      attempts: 2789,
      estimatedTime: 12,
      isCompleted: true,
      isBookmarked: false,
      companies: ["Apple", "Netflix"],
      category: "dynamic-programming",
      language: "javascript"
    },
    {
      id: 9,
      title: "Course Schedule",
      description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Some courses may have prerequisites. Determine if you can finish all courses.",
      difficulty: "Medium",
      tags: ["Graph", "DFS", "BFS", "Topological Sort"],
      successRate: 59,
      attempts: 1654,
      estimatedTime: 35,
      isCompleted: false,
      isBookmarked: true,
      companies: ["Google", "Facebook"],
      category: "graphs",
      language: "python"
    },
    {
      id: 10,
      title: "Word Ladder",
      description: "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord.",
      difficulty: "Hard",
      tags: ["Graph", "BFS", "String"],
      successRate: 38,
      attempts: 876,
      estimatedTime: 50,
      isCompleted: false,
      isBookmarked: false,
      companies: ["Amazon", "Microsoft", "Google"],
      category: "graphs",
      language: "cpp"
    },
    {
      id: 11,
      title: "Binary Search",
      description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index.",
      difficulty: "Easy",
      tags: ["Array", "Binary Search"],
      successRate: 94,
      attempts: 3876,
      estimatedTime: 8,
      isCompleted: true,
      isBookmarked: false,
      companies: ["Apple", "Microsoft"],
      category: "searching",
      language: "java"
    },
    {
      id: 12,
      title: "Merge Sort Implementation",
      description: "Implement the merge sort algorithm to sort an array of integers in ascending order. The algorithm should divide the array into halves recursively and merge them back.",
      difficulty: "Medium",
      tags: ["Sorting", "Divide and Conquer", "Recursion"],
      successRate: 81,
      attempts: 1543,
      estimatedTime: 28,
      isCompleted: false,
      isBookmarked: false,
      companies: ["Netflix", "Amazon"],
      category: "sorting",
      language: "javascript"
    }
  ];

  const searchSuggestions = [
    { type: 'problem', title: 'Two Sum', subtitle: 'Easy • Array, Hash Table' },
    { type: 'problem', title: 'Three Sum', subtitle: 'Medium • Array, Two Pointers' },
    { type: 'tag', title: 'Dynamic Programming', subtitle: '45 problems' },
    { type: 'tag', title: 'Binary Search', subtitle: '32 problems' },
    { type: 'problem', title: 'Valid Parentheses', subtitle: 'Easy • String, Stack' }
  ];

  const stats = {
    total: mockProblems?.length,
    solved: mockProblems?.filter(p => p?.isCompleted)?.length,
    attempted: mockProblems?.filter(p => !p?.isCompleted && p?.attempts > 0)?.length,
    bookmarked: mockProblems?.filter(p => p?.isBookmarked)?.length
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      difficulty: 'all',
      language: 'all',
      category: 'all',
      company: 'all',
      timeRange: 'all',
      showUnsolved: false,
      showBookmarked: false,
      showAttempted: false
    });
  };

  const handleBookmark = (problemId) => {
    console.log('Bookmark toggled for problem:', problemId);
  };

  const handleSelectProblem = (problem) => {
    navigate('/coding-practice', { state: { problem } });
  };

  const handleProblemSelection = (problemId) => {
    setSelectedProblems(prev => 
      prev?.includes(problemId) 
        ? prev?.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProblems(mockProblems?.map(p => p?.id));
    } else {
      setSelectedProblems([]);
    }
  };

  const handleAddToSession = () => {
    console.log('Adding problems to session:', selectedProblems);
    alert(`${selectedProblems?.length} problem(s) added to practice session!`);
  };

  const handleExport = () => {
    console.log('Exporting problems:', selectedProblems);
    alert(`Exporting ${selectedProblems?.length} problem(s)...`);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion?.title);
  };

  const filteredProblems = mockProblems?.filter(problem => {
    const matchesSearch = problem?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         problem?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    
    const matchesDifficulty = filters?.difficulty === 'all' || 
                             problem?.difficulty?.toLowerCase() === filters?.difficulty;
    
    const matchesLanguage = filters?.language === 'all' || 
                           problem?.language === filters?.language;
    
    const matchesCategory = filters?.category === 'all' || 
                           problem?.category === filters?.category;
    
    const matchesCompany = filters?.company === 'all' || 
                          problem?.companies?.some(c => c?.toLowerCase() === filters?.company);
    
    const matchesTimeRange = filters?.timeRange === 'all' || (() => {
      const [min, max] = filters?.timeRange?.split('-')?.map(v => v?.replace('+', ''));
      if (max) {
        return problem?.estimatedTime >= parseInt(min) && problem?.estimatedTime <= parseInt(max);
      }
      return problem?.estimatedTime >= parseInt(min);
    })();
    
    const matchesUnsolved = !filters?.showUnsolved || !problem?.isCompleted;
    const matchesBookmarked = !filters?.showBookmarked || problem?.isBookmarked;
    const matchesAttempted = !filters?.showAttempted || problem?.attempts > 0;

    return matchesSearch && matchesDifficulty && matchesLanguage && 
           matchesCategory && matchesCompany && matchesTimeRange &&
           matchesUnsolved && matchesBookmarked && matchesAttempted;
  });

  const sortedProblems = [...filteredProblems]?.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'popularity':
        comparison = b?.attempts - a?.attempts;
        break;
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        comparison = difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty];
        break;
      case 'recent':
        comparison = b?.id - a?.id;
        break;
      case 'completion':
        comparison = b?.successRate - a?.successRate;
        break;
      case 'title':
        comparison = a?.title?.localeCompare(b?.title);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="content-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-semibold text-foreground">Problem Library</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
                className="hidden sm:flex"
              >
                Back to Dashboard
              </Button>
            </div>
            <p className="text-muted-foreground">
              Browse and solve coding challenges to improve your skills
            </p>
          </div>

          <StatsOverview stats={stats} />

          <div className="mt-8 flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-80 flex-shrink-0">
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setIsFilterOpen(true)}
                  iconName="SlidersHorizontal"
                  iconPosition="left"
                >
                  Filters
                </Button>
              </div>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </aside>

            <main className="flex-1 min-w-0">
              <div className="space-y-6">
                <div className="card-elevated p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        suggestions={searchQuery ? searchSuggestions : []}
                        onSuggestionSelect={handleSuggestionSelect}
                      />
                    </div>
                    <div className="w-full sm:w-64">
                      <SortControls
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSortChange={setSortBy}
                        onOrderChange={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      label={`Select all (${sortedProblems?.length})`}
                      checked={selectedProblems?.length === sortedProblems?.length && sortedProblems?.length > 0}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      Showing {sortedProblems?.length} of {mockProblems?.length} problems
                    </span>
                  </div>
                </div>

                {sortedProblems?.length === 0 ? (
                  <div className="card-elevated p-12 text-center">
                    <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No problems found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleResetFilters}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sortedProblems?.map((problem) => (
                      <div key={problem?.id} className="relative">
                        <div className="absolute top-4 left-4 z-10">
                          <Checkbox
                            checked={selectedProblems?.includes(problem?.id)}
                            onChange={() => handleProblemSelection(problem?.id)}
                            aria-label={`Select ${problem?.title}`}
                          />
                        </div>
                        <div className="pl-10">
                          <ProblemCard
                            problem={problem}
                            onBookmark={handleBookmark}
                            onSelect={handleSelectProblem}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
      <BulkActions
        selectedCount={selectedProblems?.length}
        onAddToSession={handleAddToSession}
        onExport={handleExport}
        onClearSelection={() => setSelectedProblems([])}
      />
    </div>
  );
};

export default ProblemLibrary;