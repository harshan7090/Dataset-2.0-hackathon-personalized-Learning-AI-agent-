import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const PerformanceAnalytics = ({ weeklyPracticeTime, accuracyTrend, achievements }) => {
  return (
    <div className="card-elevated p-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Weekly Practice Time</span>
            </div>
            <span className="text-lg font-bold text-primary">{weeklyPracticeTime}h</span>
          </div>
          <ProgressIndicator 
            value={weeklyPracticeTime} 
            max={20} 
            showLabel={false}
            size="default"
          />
          <p className="text-xs text-muted-foreground">
            Goal: 20 hours per week • {Math.round((weeklyPracticeTime / 20) * 100)}% completed
          </p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={20} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">Accuracy Trend</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              <span className="text-lg font-bold text-success">{accuracyTrend}%</span>
            </div>
          </div>
          <ProgressIndicator 
            value={accuracyTrend} 
            max={100} 
            showLabel={false}
            size="default"
            variant="success"
          />
          <p className="text-xs text-muted-foreground">
            Average accuracy across all challenges this week
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Achievements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements?.map((achievement) => (
              <div
                key={achievement?.id}
                className="group relative p-3 rounded-lg border border-border hover:border-primary transition-all duration-150 cursor-pointer"
                title={achievement?.description}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement?.unlocked ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={achievement?.icon} 
                      size={24} 
                      color={achievement?.unlocked ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-foreground">{achievement?.name}</p>
                    {achievement?.unlocked && (
                      <p className="text-xs text-muted-foreground">{achievement?.date}</p>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-popover border border-border rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <p className="text-xs text-foreground">{achievement?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;