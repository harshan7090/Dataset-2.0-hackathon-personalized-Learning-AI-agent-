import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, sortOrder, onSortChange, onOrderChange }) => {
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'completion', label: 'Completion Rate' },
    { value: 'title', label: 'Title (A-Z)' }
  ];

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1 min-w-0">
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          placeholder="Sort by..."
        />
      </div>
      <button
        onClick={onOrderChange}
        className="p-2 rounded-md border border-border hover:bg-muted transition-colors focus-ring flex-shrink-0"
        aria-label={sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
      >
        <Icon 
          name={sortOrder === 'asc' ? 'ArrowUpAZ' : 'ArrowDownZA'} 
          size={20} 
        />
      </button>
    </div>
  );
};

export default SortControls;