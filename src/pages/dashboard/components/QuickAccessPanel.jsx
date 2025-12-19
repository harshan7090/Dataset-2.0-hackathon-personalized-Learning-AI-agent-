import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessPanel = ({ favoriteLanguages, bookmarkedProblems, recentSubmissions }) => {
  const navigate = useNavigate();

  const languageIcons = {
    JavaScript: 'FileCode',
    Python: 'FileCode',
    Java: 'FileCode',
    'C++': 'FileCode'
  };

  return (
    <div className="card-elevated p-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Favorite Languages</h3>
          <div className="grid grid-cols-2 gap-3">
            {favoriteLanguages?.map((lang) => (
              <button
                key={lang?.name}
                onClick={() => navigate('/coding-practice', { state: { language: lang?.name } })}
                className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-150 text-left space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Icon name={languageIcons?.[lang?.name]} size={20} color="var(--color-primary)" />
                  <span className="text-xs font-medium text-muted-foreground">{lang?.solved} solved</span>
                </div>
                <p className="text-sm font-medium text-foreground">{lang?.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Bookmarked Problems</h3>
            <button 
              onClick={() => navigate('/problem-library')}
              className="text-xs text-primary hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {bookmarkedProblems?.map((problem) => (
              <button
                key={problem?.id}
                onClick={() => navigate('/coding-practice', { state: { problemId: problem?.id } })}
                className="w-full p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-150 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Bookmark" size={16} color="var(--color-accent)" />
                    <span className="text-sm font-medium text-foreground">{problem?.title}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    problem?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                    problem?.difficulty === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }`}>
                    {problem?.difficulty}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Submissions</h3>
          <div className="space-y-2">
            {recentSubmissions?.map((submission) => (
              <div
                key={submission?.id}
                className="p-3 rounded-lg bg-muted/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{submission?.problemTitle}</span>
                  <Icon 
                    name={submission?.status === 'Accepted' ? 'CheckCircle2' : 'XCircle'} 
                    size={16} 
                    color={submission?.status === 'Accepted' ? 'var(--color-success)' : 'var(--color-error)'}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{submission?.language}</span>
                  <span>{submission?.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessPanel;