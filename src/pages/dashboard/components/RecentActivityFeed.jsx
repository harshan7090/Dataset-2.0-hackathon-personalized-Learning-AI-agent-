import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      challenge: 'Code2',
      badge: 'Award',
      milestone: 'Trophy',
      streak: 'Flame'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      challenge: 'text-primary bg-primary/10',
      badge: 'text-warning bg-warning/10',
      milestone: 'text-success bg-success/10',
      streak: 'text-error bg-error/10'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="card-elevated p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity?.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{formatTimestamp(activity?.timestamp)}</p>
            </div>
            {activity?.points && (
              <div className="flex items-center space-x-1 text-primary">
                <Icon name="Plus" size={14} />
                <span className="text-sm font-medium">{activity?.points}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;