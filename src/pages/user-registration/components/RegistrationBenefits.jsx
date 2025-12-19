import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationBenefits = () => {
  const benefits = [
    {
      icon: 'Target',
      title: 'Personalized Learning Path',
      description: 'Get customized coding challenges based on your skill level and goals'
    },
    {
      icon: 'TrendingUp',
      title: 'Track Your Progress',
      description: 'Monitor your improvement with detailed analytics and performance metrics'
    },
    {
      icon: 'Award',
      title: 'Earn Achievements',
      description: 'Unlock badges and milestones as you master new concepts and skills'
    },
    {
      icon: 'Users',
      title: 'Join Community',
      description: 'Connect with fellow developers and learn from shared experiences'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Why Join CodeMaster Pro?
        </h3>
        <p className="text-muted-foreground">
          Start your journey to becoming a better developer with our comprehensive learning platform
        </p>
      </div>
      <div className="space-y-4">
        {benefits?.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={benefit?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">{benefit?.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Sparkles" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Free to start, upgrade anytime
            </p>
            <p className="text-xs text-muted-foreground">
              Begin with our free tier and unlock premium features as you grow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBenefits;