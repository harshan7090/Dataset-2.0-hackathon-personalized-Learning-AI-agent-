import React from 'react';
import Header from '../../components/Header';
import ProgressSummaryCard from './components/ProgressSummaryCard';
import RecommendationCard from './components/RecommendationCard';
import QuickAccessPanel from './components/QuickAccessPanel.jsx';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import PracticeSessionLauncher from './components/PracticeSessionLauncher';
import RecentActivityFeed from './components/RecentActivityFeed';

const Dashboard = () => {
  const userProgress = {
    skillLevel: 7,
    completedChallenges: 342,
    currentStreak: 12,
    nextMilestone: 8
  };

  const recommendations = [
    {
      id: 1,
      type: "Coding Challenge",
      title: "Binary Tree Traversal",
      description: "Master tree traversal algorithms with this comprehensive challenge covering inorder, preorder, and postorder techniques.",
      difficulty: "Medium",
      estimatedTime: "45 min",
      points: 150,
      route: "/coding-practice"
    },
    {
      id: 2,
      type: "Interview Question",
      title: "System Design: URL Shortener",
      description: "Design a scalable URL shortening service like bit.ly, focusing on database schema, API design, and caching strategies.",
      difficulty: "Hard",
      estimatedTime: "60 min",
      points: 200,
      route: "/mock-interview"
    },
    {
      id: 3,
      type: "Logic Puzzle",
      title: "River Crossing Problem",
      description: "Solve classic logic puzzles involving constraints and optimal decision-making under specific rules.",
      difficulty: "Easy",
      estimatedTime: "20 min",
      points: 75,
      route: "/logical-reasoning"
    },
    {
      id: 4,
      type: "Coding Challenge",
      title: "Dynamic Programming Mastery",
      description: "Tackle advanced DP problems including knapsack variations, longest common subsequence, and matrix chain multiplication.",
      difficulty: "Hard",
      estimatedTime: "90 min",
      points: 250,
      route: "/coding-practice"
    }
  ];

  const favoriteLanguages = [
    { name: "JavaScript", solved: 127 },
    { name: "Python", solved: 98 },
    { name: "Java", solved: 76 },
    { name: "C++", solved: 41 }
  ];

  const bookmarkedProblems = [
    { id: 1, title: "Two Sum Problem", difficulty: "Easy" },
    { id: 2, title: "Merge K Sorted Lists", difficulty: "Hard" },
    { id: 3, title: "Valid Parentheses", difficulty: "Easy" }
  ];

  const recentSubmissions = [
    {
      id: 1,
      problemTitle: "Longest Palindromic Substring",
      language: "JavaScript",
      status: "Accepted",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      problemTitle: "Container With Most Water",
      language: "Python",
      status: "Accepted",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      problemTitle: "Median of Two Sorted Arrays",
      language: "Java",
      status: "Wrong Answer",
      timestamp: "Yesterday"
    }
  ];

  const performanceData = {
    weeklyPracticeTime: 14.5,
    accuracyTrend: 87,
    achievements: [
      {
        id: 1,
        name: "100 Day Streak",
        icon: "Flame",
        description: "Maintained a 100-day consecutive practice streak",
        unlocked: false,
        date: null
      },
      {
        id: 2,
        name: "Problem Solver",
        icon: "Award",
        description: "Solved 300+ coding challenges",
        unlocked: true,
        date: "Dec 15, 2025"
      },
      {
        id: 3,
        name: "Speed Demon",
        icon: "Zap",
        description: "Completed 10 challenges in under 15 minutes each",
        unlocked: true,
        date: "Dec 10, 2025"
      },
      {
        id: 4,
        name: "Interview Ready",
        icon: "Briefcase",
        description: "Completed 50 mock interview sessions",
        unlocked: false,
        date: null
      },
      {
        id: 5,
        name: "Logic Master",
        icon: "Brain",
        description: "Solved 100 logical reasoning puzzles",
        unlocked: true,
        date: "Dec 5, 2025"
      },
      {
        id: 6,
        name: "Polyglot",
        icon: "Code2",
        description: "Solved problems in 5+ programming languages",
        unlocked: true,
        date: "Nov 28, 2025"
      }
    ]
  };

  const recentActivities = [
    {
      id: 1,
      type: "challenge",
      title: "Completed Challenge",
      description: "Successfully solved \'Binary Search Tree Validation\' in 23 minutes",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      points: 120
    },
    {
      id: 2,
      type: "badge",
      title: "New Achievement Unlocked",
      description: "Earned \'Speed Demon\' badge for completing 10 fast solutions",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      points: null
    },
    {
      id: 3,
      type: "streak",
      title: "Streak Milestone",
      description: "Reached 12-day practice streak! Keep it going!",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      points: 50
    },
    {
      id: 4,
      type: "milestone",
      title: "Level Up!",
      description: "Advanced to Level 7 - Intermediate Developer",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      points: 500
    },
    {
      id: 5,
      type: "challenge",
      title: "Completed Challenge",
      description: "Solved \'Longest Palindromic Substring\' with optimal solution",
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
      points: 150
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="content-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Developer!</h1>
            <p className="text-muted-foreground">Track your progress and continue your learning journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ProgressSummaryCard {...userProgress} />

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Personalized Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations?.map((recommendation) => (
                    <RecommendationCard key={recommendation?.id} recommendation={recommendation} />
                  ))}
                </div>
              </div>

              <PerformanceAnalytics {...performanceData} />
            </div>

            <div className="space-y-6">
              <PracticeSessionLauncher />
              
              <QuickAccessPanel
                favoriteLanguages={favoriteLanguages}
                bookmarkedProblems={bookmarkedProblems}
                recentSubmissions={recentSubmissions}
              />

              <RecentActivityFeed activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;