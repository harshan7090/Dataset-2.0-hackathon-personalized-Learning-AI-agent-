import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { useNavigate } from 'react-router-dom';

const PracticeSessionLauncher = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedTimeLimit, setSelectedTimeLimit] = useState('30');

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'mixed', label: 'Mixed' }
  ];

  const timeLimitOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '60 minutes' },
    { value: 'unlimited', label: 'Unlimited' }
  ];

  const handleStartSession = () => {
    navigate('/coding-practice', {
      state: {
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        timeLimit: selectedTimeLimit
      }
    });
  };

  return (
    <div className="card-elevated p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon name="Play" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Start Practice Session</h2>
          <p className="text-sm text-muted-foreground">Customize your coding practice</p>
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="Programming Language"
          options={languageOptions}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
        />

        <Select
          label="Difficulty Level"
          options={difficultyOptions}
          value={selectedDifficulty}
          onChange={setSelectedDifficulty}
        />

        <Select
          label="Time Limit"
          options={timeLimitOptions}
          value={selectedTimeLimit}
          onChange={setSelectedTimeLimit}
        />
      </div>

      <Button
        variant="default"
        fullWidth
        iconName="Rocket"
        iconPosition="right"
        onClick={handleStartSession}
      >
        Launch Practice Session
      </Button>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Your session will be tailored to your current skill level and preferences
        </p>
      </div>
    </div>
  );
};

export default PracticeSessionLauncher;