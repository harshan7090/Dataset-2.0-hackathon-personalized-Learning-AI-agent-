import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const StatsPanel = ({ stats }) => {
  const statCards = [
    {
      icon: 'Target',
      label: 'Total Solved',
      value: stats?.totalSolved,
      total: stats?.totalPuzzles,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'TrendingUp',
      label: 'Success Rate',
      value: `${stats?.successRate}%`,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Clock',
      label: 'Avg Time',
      value: `${stats?.avgTime} min`,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: 'Award',
      label: 'Current Streak',
      value: `${stats?.currentStreak} days`,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards?.map((stat, index) => (
        <div key={index} className="card-elevated p-5">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
          </div>

          {stat?.total && (
            <div className="mt-3">
              <ProgressIndicator
                value={stat?.value}
                max={stat?.total}
                showLabel={false}
                size="sm"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;