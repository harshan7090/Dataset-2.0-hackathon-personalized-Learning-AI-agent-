import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onReset, isOpen, onClose }) => {
  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'arrays', label: 'Arrays' },
    { value: 'strings', label: 'Strings' },
    { value: 'linked-lists', label: 'Linked Lists' },
    { value: 'trees', label: 'Trees' },
    { value: 'graphs', label: 'Graphs' },
    { value: 'dynamic-programming', label: 'Dynamic Programming' },
    { value: 'sorting', label: 'Sorting' },
    { value: 'searching', label: 'Searching' }
  ];

  const companyOptions = [
    { value: 'all', label: 'All Companies' },
    { value: 'google', label: 'Google' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'facebook', label: 'Meta' },
    { value: 'apple', label: 'Apple' },
    { value: 'netflix', label: 'Netflix' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: '0-15', label: '0-15 minutes' },
    { value: '15-30', label: '15-30 minutes' },
    { value: '30-60', label: '30-60 minutes' },
    { value: '60+', label: '60+ minutes' }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        w-80 lg:w-full bg-card border-r lg:border-r-0 lg:border border-border
        transform transition-transform duration-300 ease-in-out z-50 lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Close filters"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <Select
                label="Difficulty"
                options={difficultyOptions}
                value={filters?.difficulty}
                onChange={(value) => onFilterChange('difficulty', value)}
              />
            </div>

            <div>
              <Select
                label="Programming Language"
                options={languageOptions}
                value={filters?.language}
                onChange={(value) => onFilterChange('language', value)}
              />
            </div>

            <div>
              <Select
                label="Category"
                options={categoryOptions}
                value={filters?.category}
                onChange={(value) => onFilterChange('category', value)}
                searchable
              />
            </div>

            <div>
              <Select
                label="Company"
                options={companyOptions}
                value={filters?.company}
                onChange={(value) => onFilterChange('company', value)}
                searchable
              />
            </div>

            <div>
              <Select
                label="Estimated Time"
                options={timeRangeOptions}
                value={filters?.timeRange}
                onChange={(value) => onFilterChange('timeRange', value)}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium text-foreground mb-3">Status</h3>
              <div className="space-y-2">
                <Checkbox
                  label="Show only unsolved"
                  checked={filters?.showUnsolved}
                  onChange={(e) => onFilterChange('showUnsolved', e?.target?.checked)}
                />
                <Checkbox
                  label="Show only bookmarked"
                  checked={filters?.showBookmarked}
                  onChange={(e) => onFilterChange('showBookmarked', e?.target?.checked)}
                />
                <Checkbox
                  label="Show only attempted"
                  checked={filters?.showAttempted}
                  onChange={(e) => onFilterChange('showAttempted', e?.target?.checked)}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={onReset}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;