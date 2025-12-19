import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Practice', path: '/coding-practice', icon: 'Code2' },
    { label: 'Interview Prep', path: '/mock-interview', icon: 'MessageSquare' },
    { label: 'Logic Puzzles', path: '/logical-reasoning', icon: 'Brain' },
    { label: 'Problems', path: '/problem-library', icon: 'Library' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header-nav">
        <div className="header-container">
          <div className="header-content">
            <div className="header-logo" onClick={() => navigate('/dashboard')}>
              <div className="header-logo-icon">
                <Icon name="Code2" size={24} color="#ffffff" />
              </div>
              <span className="header-logo-text">CodeMaster Pro</span>
            </div>

            <nav className="header-nav-links">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`header-nav-link ${isActive(item?.path) ? 'active' : ''}`}
                  aria-current={isActive(item?.path) ? 'page' : undefined}
                >
                  <span className="flex items-center space-x-2">
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </span>
                </button>
              ))}
            </nav>

            <button
              className="header-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="header-mobile-menu" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="header-mobile-menu-content" onClick={(e) => e?.stopPropagation()}>
            <div className="header-mobile-menu-header">
              <div className="header-logo">
                <div className="header-logo-icon">
                  <Icon name="Code2" size={24} color="#ffffff" />
                </div>
                <span className="header-logo-text">CodeMaster Pro</span>
              </div>
              <button
                className="header-mobile-menu-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <nav className="header-mobile-menu-links">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`header-mobile-menu-link ${isActive(item?.path) ? 'active' : ''}`}
                  aria-current={isActive(item?.path) ? 'page' : undefined}
                >
                  <span className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;