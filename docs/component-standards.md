# Component Standards Guide

This document outlines the standards and conventions for React components in this portfolio project.

## Component Structure

### Basic Component Template

```javascript
/**
 * Brief description of what the component does
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.children - Child elements
 * @param {Function} [props.onClick] - Click handler function
 * @returns {JSX.Element} Rendered component
 */
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ className = '', children, onClick, ...props }) => {
  // Component logic here
  
  return (
    <div className={`component-name ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

ComponentName.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default ComponentName;
```

### File Naming Conventions

- **Components**: PascalCase.js (e.g., `LoadingScreen.js`)
- **Tests**: ComponentName.test.js (co-located)
- **Styles**: ComponentName.css (if separate)
- **Stories**: ComponentName.stories.js (if using Storybook)

### Folder Structure

```
components/
├── ComponentName/
│   ├── ComponentName.js
│   ├── ComponentName.test.js
│   ├── ComponentName.css (optional)
│   └── index.js (export barrel)
├── AnotherComponent/
│   ├── AnotherComponent.js
│   └── AnotherComponent.test.js
└── index.js
```

## Coding Standards

### Import Order

1. React imports
2. Third-party libraries
3. Internal components (relative imports)
4. Utility functions
5. Styles and assets

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { UtilityFunction } from '../utils/helpers';
import ComponentName from './ComponentName';

import './ComponentName.css';
```

### State Management

- Use `useState` for local component state
- Use `useEffect` for side effects
- Use `useContext` for global state when needed
- Avoid direct state mutations

```javascript
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState(null);

useEffect(() => {
  // Side effect logic
}, [dependencies]);
```

### Props Destructuring

```javascript
// Good
const ComponentName = ({ title, description, isActive, onClick }) => {
  // Component logic
};

// Also good (with defaults)
const ComponentName = ({ 
  title = '', 
  description = '', 
  isActive = false, 
  onClick 
}) => {
  // Component logic
};
```

### Conditional Rendering

```javascript
// Good - Early returns
const ComponentName = ({ showContent }) => {
  if (!showContent) {
    return null;
  }
  
  return <div>Content</div>;
};

// Good - Ternary for simple conditions
const ComponentName = ({ isActive }) => (
  <div className={isActive ? 'active' : 'inactive'}>
    Content
  </div>
);

// Good - Logical AND for optional elements
const ComponentName = ({ subtitle }) => (
  <div>
    <h1>Title</h1>
    {subtitle && <h2>{subtitle}</h2>}
  </div>
);
```

## Styling Conventions

### Tailwind CSS Classes

- Use utility classes for styling
- Group related classes together
- Use consistent spacing and color patterns

```javascript
const ComponentName = ({ isActive }) => (
  <div className="
    flex 
    items-center 
    justify-center 
    p-4 
    bg-blue-500 
    text-white 
    rounded-lg
    transition-colors
    duration-200
    hover:bg-blue-600
  ">
    Content
  </div>
);
```

### Conditional Classes

```javascript
const ComponentName = ({ isActive, size = 'medium' }) => {
  const baseClasses = 'flex items-center justify-center transition-all duration-200';
  const sizeClasses = {
    small: 'p-2 text-sm',
    medium: 'p-4 text-base',
    large: 'p-6 text-lg',
  };
  
  return (
    <div className={`
      ${baseClasses}
      ${sizeClasses[size]}
      ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
    `}>
      Content
    </div>
  );
};
```

## Accessibility Standards

### Semantic HTML

```javascript
// Good - Use semantic elements
const ComponentName = () => (
  <main>
    <header>
      <h1>Page Title</h1>
    </header>
    <section>
      <h2>Section Title</h2>
      <p>Content</p>
    </section>
    <footer>
      <p>Footer content</p>
    </footer>
  </main>
);
```

### ARIA Attributes

```javascript
const Button = ({ isLoading, children, ...props }) => (
  <button
    {...props}
    disabled={isLoading}
    aria-busy={isLoading}
    aria-describedby={isLoading ? 'loading-text' : undefined}
  >
    {isLoading ? 'Loading...' : children}
    {isLoading && (
      <span id="loading-text" className="sr-only">
        Please wait while content loads
      </span>
    )}
  </button>
);
```

### Keyboard Navigation

```javascript
const InteractiveComponent = ({ onSelect, items }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        setSelectedIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
      case ' ':
        onSelect(items[selectedIndex]);
        break;
    }
  };
  
  return (
    <ul
      role="menu"
      onKeyDown={handleKeyDown}
      aria-activedescendant={`item-${selectedIndex}`}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          id={`item-${index}`}
          role="menuitem"
          className={index === selectedIndex ? 'selected' : ''}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};
```

## Performance Standards

### React.memo for Pure Components

```javascript
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // Component logic that doesn't depend on props changing frequently
});

// With custom comparison
const Component = React.memo(({ data, config }) => {
  // Component logic
}, (prevProps, nextProps) => {
  // Return true if props are equal (don't re-render)
  return prevProps.data.id === nextProps.data.id &&
         prevProps.config.theme === nextProps.config.theme;
});
```

### useMemo and useCallback

```javascript
const Component = ({ items, onItemClick }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  const handleClick = useCallback((item) => {
    onItemClick(item);
  }, [onItemClick]);
  
  return (
    <div>
      <p>Total: {expensiveValue}</p>
      {items.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
};
```

## Testing Standards

### Test Structure

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  const defaultProps = {
    title: 'Test Title',
    isActive: false,
    onClick: jest.fn(),
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders correctly with default props', () => {
    render(<ComponentName {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
  
  it('handles click events', () => {
    const mockOnClick = jest.fn();
    render(<ComponentName {...defaultProps} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies active styles when isActive is true', () => {
    render(<ComponentName {...defaultProps} isActive={true} />);
    expect(screen.getByRole('button')).toHaveClass('active');
  });
});
```

## Error Handling

### Error Boundaries

```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Documentation Standards

### JSDoc Comments

```javascript
/**
 * Renders a customizable button with loading state
 * @param {Object} props - Component props
 * @param {string} props.children - Button content
 * @param {boolean} [props.isLoading=false] - Whether button is in loading state
 * @param {string} [props.variant='primary'] - Button style variant
 * @param {Function} props.onClick - Click handler function
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Rendered button component
 * @example
 * <Button 
 *   isLoading={false} 
 *   variant="secondary" 
 *   onClick={handleClick}
 * >
 *   Click me
 * </Button>
 */
```

---

Following these standards ensures consistency, maintainability, and quality across all components in this portfolio project.
