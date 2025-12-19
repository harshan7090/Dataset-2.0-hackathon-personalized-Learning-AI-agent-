import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      icon: 'Code2',
      label: 'Total Problems',
      value: stats?.total,
      color: 'var(--color-primary)'
    },
    {
      icon: 'CheckCircle2',
      label: 'Solved',
      value: stats?.solved,
      color: 'var(--color-success)'
    },
    {
      icon: 'Clock',
      label: 'Attempted',
      value: stats?.attempted,
      color: 'var(--color-warning)'
    },
    {
      icon: 'Bookmark',
      label: 'Bookmarked',
      value: stats?.bookmarked,
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((item, index) => (
        <div key={index} className="card-elevated p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-muted">
              <Icon name={item?.icon} size={20} color={item?.color} />
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground">
                {item?.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {item?.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;