import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ProgressSummaryCard = ({ skillLevel, completedChallenges, currentStreak, nextMilestone }) => {
  return (
    <div className="card-elevated p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Your Progress</h2>
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-primary/10 text-primary">
          <Icon name="TrendingUp" size={18} />
          <span className="text-sm font-medium">Level {skillLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="CheckCircle2" size={20} />
            <span className="text-sm font-medium">Completed</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{completedChallenges}</p>
          <p className="text-xs text-muted-foreground">Total challenges solved</p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Flame" size={20} />
            <span className="text-sm font-medium">Current Streak</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{currentStreak}</p>
          <p className="text-xs text-muted-foreground">Days in a row</p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Target" size={20} />
            <span className="text-sm font-medium">Next Milestone</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{nextMilestone}</p>
          <p className="text-xs text-muted-foreground">Challenges to go</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {skillLevel + 1}</span>
          <span className="font-medium text-foreground">{Math.round((completedChallenges % 50) / 50 * 100)}%</span>
        </div>
        <ProgressIndicator 
          value={completedChallenges % 50} 
          max={50} 
          showLabel={false}
          size="default"
        />
        <p className="text-xs text-muted-foreground">
          Complete {50 - (completedChallenges % 50)} more challenges to reach the next level
        </p>
      </div>
    </div>
  );
};

export default ProgressSummaryCard;