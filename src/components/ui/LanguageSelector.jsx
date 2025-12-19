import React, { useState } from 'react';
import Icon from '../AppIcon';

const LanguageSelector = ({ 
  value = 'javascript',
  onChange,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: 'FileCode' },
    { value: 'python', label: 'Python', icon: 'FileCode' },
    { value: 'java', label: 'Java', icon: 'FileCode' },
    { value: 'cpp', label: 'C++', icon: 'FileCode' },
    { value: 'csharp', label: 'C#', icon: 'FileCode' },
    { value: 'go', label: 'Go', icon: 'FileCode' },
    { value: 'rust', label: 'Rust', icon: 'FileCode' },
    { value: 'typescript', label: 'TypeScript', icon: 'FileCode' },
  ];

  const selectedLanguage = languages?.find(lang => lang?.value === value) || languages?.[0];

  const handleSelect = (langValue) => {
    if (onChange) {
      onChange(langValue);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-selector focus-ring"
        aria-label="Select programming language"
        aria-expanded={isOpen}
      >
        <Icon name={selectedLanguage?.icon} className="language-selector-icon" size={16} />
        <span>{selectedLanguage?.label}</span>
        <Icon name="ChevronDown" size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full mt-2 right-0 z-50 w-48 bg-popover border border-border rounded-md shadow-elevation-2">
            <div className="py-1">
              {languages?.map((lang) => (
                <button
                  key={lang?.value}
                  onClick={() => handleSelect(lang?.value)}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-muted transition-colors ${
                    lang?.value === value ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon name={lang?.icon} size={16} />
                  <span>{lang?.label}</span>
                  {lang?.value === value && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;