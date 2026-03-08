---
description: Create a new React component with proper structure and testing
---

# Create New Component Workflow

This workflow helps AI agents create new React components following the project's standards and conventions.

## When to Use

Use this workflow when you need to:
- Create a new reusable component
- Add a new feature component
- Create a page or section component
- Add UI components to the design system

## Steps

1. **Analyze Requirements**
   - Understand the component's purpose and functionality
   - Identify required props and their types
   - Determine if the component needs state management
   - Consider accessibility requirements

2. **Plan Component Structure**
   - Choose appropriate component name (PascalCase)
   - Determine file location in components folder
   - Plan the component's internal structure
   - Identify any child components needed

3. **Create Component File**
   - Create the main component file with proper JSDoc comments
   - Follow the established component template
   - Implement prop types and default values
   - Add proper error handling

4. **Add Styling**
   - Use Tailwind CSS utility classes
   - Follow the established color scheme
   - Ensure responsive design
   - Add hover and interactive states

5. **Create Tests**
   - Write unit tests using React Testing Library
   - Test all props and user interactions
   - Include accessibility tests
   - Ensure good test coverage

6. **Update Documentation**
   - Add JSDoc comments to all functions
   - Document prop types and usage examples
   - Update component documentation if needed

## Component Template

```javascript
/**
 * Brief description of what the component does
 * @component
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

## Quality Checks

- [ ] Component follows naming conventions
- [ ] JSDoc comments are complete and accurate
- [ ] PropTypes are properly defined
- [ ] Component is accessible
- [ ] Tests cover all functionality
- [ ] Styling follows design system
- [ ] Component is responsive
- [ ] No console errors or warnings
- [ ] Code passes ESLint checks
- [ ] Code is properly formatted

## Common Patterns

### Conditional Rendering
```javascript
const Component = ({ showContent }) => {
  if (!showContent) return null;
  return <div>Content</div>;
};
```

### Event Handling
```javascript
const handleClick = (event) => {
  event.preventDefault();
  // Handle click logic
};
```

### State Management
```javascript
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState(null);
```

## File Structure

```
components/
├── ComponentName/
│   ├── ComponentName.js
│   ├── ComponentName.test.js
│   └── index.js (export barrel)
```

## Testing Template

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  const defaultProps = {
    className: '',
    children: 'Test content',
  };

  it('renders correctly', () => {
    render(<ComponentName {...defaultProps} />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockOnClick = jest.fn();
    render(<ComponentName {...defaultProps} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
```

## Accessibility Checklist

- [ ] Semantic HTML elements used
- [ ] ARIA attributes where needed
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color contrast compliance
- [ ] Focus management
- [ ] Alt text for images

## Performance Considerations

- Use React.memo for pure components
- Implement proper dependency arrays in useEffect
- Avoid unnecessary re-renders
- Optimize images and assets
- Use lazy loading for heavy components

## Integration Points

- Import in parent components
- Add to component index files
- Update documentation
- Add to storybook (if applicable)
- Update design system (if reusable)
