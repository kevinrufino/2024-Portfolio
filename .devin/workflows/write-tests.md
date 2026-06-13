---
description: Create comprehensive unit and integration tests for components
---

# Write Tests Workflow

This workflow helps AI agents create comprehensive unit and integration tests following React Testing Library best practices.

## When to Use

Use this workflow when you need to:
- Write tests for new components
- Add tests to existing components
- Improve test coverage
- Create integration tests
- Add accessibility tests

## Steps

1. **Analyze Component Requirements**
   - Review component props and functionality
   - Identify user interactions
   - Consider edge cases and error states
   - Plan test scenarios

2. **Plan Test Structure**
   - Determine unit vs integration test needs
   - Identify test categories (rendering, interactions, accessibility)
   - Plan test data and mocks
   - Consider performance testing

3. **Write Unit Tests**
   - Test component rendering
   - Test props variations
   - Test user interactions
   - Test state changes

4. **Write Integration Tests**
   - Test component interactions
   - Test data flow
   - Test user workflows
   - Test error handling

5. **Add Accessibility Tests**
   - Test screen reader compatibility
   - Test keyboard navigation
   - Test ARIA attributes
   - Test color contrast

6. **Validate Test Coverage**
   - Ensure adequate coverage
   - Test edge cases
   - Verify error scenarios
   - Check performance impact

## Testing Setup

### Basic Test Template
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  // Default props for testing
  const defaultProps = {
    // Define default props here
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to render component
  const renderComponent = (props = {}) => {
    return render(<ComponentName {...defaultProps} {...props} />);
  };
});
```

## Test Categories

### Rendering Tests
```javascript
describe('Rendering', () => {
  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByTestId('component-name')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    renderComponent();
    expect(screen.getByText('Default Content')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    renderComponent({ title: 'Custom Title' });
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    renderComponent(
      <div>Child Content</div>
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
```

### Props Testing
```javascript
describe('Props', () => {
  it('applies custom className', () => {
    renderComponent({ className: 'custom-class' });
    const component = screen.getByTestId('component-name');
    expect(component).toHaveClass('custom-class');
  });

  it('handles boolean props correctly', () => {
    renderComponent({ isActive: true });
    expect(screen.getByTestId('component-name')).toHaveClass('active');
  });

  it('passes through other props', () => {
    renderComponent({ 'data-testid': 'test-component' });
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });
});
```

### Interaction Tests
```javascript
describe('Interactions', () => {
  it('handles click events', async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();
    
    renderComponent({ onClick: mockOnClick });
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles form submissions', async () => {
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();
    
    renderComponent({ onSubmit: mockOnSubmit });
    
    const input = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    await user.type(input, 'test@example.com');
    await user.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('handles keyboard events', async () => {
    const mockOnKeyDown = jest.fn();
    const user = userEvent.setup();
    
    renderComponent({ onKeyDown: mockOnKeyDown });
    
    const input = screen.getByRole('textbox');
    input.focus();
    await user.keyboard('{Enter}');
    
    expect(mockOnKeyDown).toHaveBeenCalled();
  });
});
```

### State Testing
```javascript
describe('State Management', () => {
  it('updates state on user interaction', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle' });
    await user.click(toggleButton);
    
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    renderComponent({ isLoading: true });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('handles error state', () => {
    renderComponent({ error: 'Something went wrong' });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
```

### Accessibility Tests
```javascript
describe('Accessibility', () => {
  it('has proper ARIA attributes', () => {
    renderComponent({ isActive: true });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    const firstItem = screen.getByRole('menuitem', { name: 'Item 1' });
    firstItem.focus();
    
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Item 2' })).toHaveFocus();
  });

  it('announces changes to screen readers', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const liveRegion = screen.getByRole('status');
    expect(liveRegion).toHaveTextContent('Item selected');
  });
});
```

## Mocking and Fixtures

### Mocking External Dependencies
```javascript
// Mocking API calls
jest.mock('../api', () => ({
  fetchData: jest.fn(() => Promise.resolve({ data: 'test data' })),
}));

// Mocking child components
jest.mock('./ChildComponent', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="child-mock">{children}</div>,
}));

// Mocking hooks
jest.mock('../hooks/useData', () => ({
  useData: () => ({ data: 'mock data', loading: false }),
}));
```

### Test Fixtures
```javascript
// fixtures/testData.js
export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
};

export const mockPosts = [
  { id: 1, title: 'Post 1', content: 'Content 1' },
  { id: 2, title: 'Post 2', content: 'Content 2' },
];

// Using fixtures in tests
import { mockUser, mockPosts } from '../fixtures/testData';

it('displays user data correctly', () => {
  renderComponent({ user: mockUser });
  expect(screen.getByText('Test User')).toBeInTheDocument();
});
```

## Integration Testing

### Component Integration
```javascript
describe('Integration Tests', () => {
  it('integrates with parent component', () => {
    const ParentComponent = () => (
      <div>
        <ComponentName data={mockData} />
        <AnotherComponent />
      </div>
    );
    
    render(<ParentComponent />);
    
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByTestId('another-component')).toBeInTheDocument();
  });

  it('handles data flow between components', async () => {
    const user = userEvent.setup();
    render(<ParentComponent />);
    
    const input = screen.getByLabelText('Search');
    await user.type(input, 'search term');
    
    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument();
    });
  });
});
```

## Performance Testing

### Rendering Performance
```javascript
describe('Performance', () => {
  it('renders quickly with large datasets', () => {
    const largeData = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));
    
    const startTime = performance.now();
    renderComponent({ data: largeData });
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(100); // Should render in < 100ms
  });

  it('does not re-render unnecessarily', () => {
    const mockFunction = jest.fn();
    const { rerender } = renderComponent({ onClick: mockFunction });
    
    rerender(<ComponentName onClick={mockFunction} />);
    
    expect(mockFunction).not.toHaveBeenCalled();
  });
});
```

## Error Handling Tests

### Error Boundaries
```javascript
describe('Error Handling', () => {
  it('displays error message when error occurs', () => {
    renderComponent({ error: 'Network error' });
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('recovers from error state', async () => {
    const user = userEvent.setup();
    renderComponent({ error: 'Error occurred' });
    
    const retryButton = screen.getByRole('button', { name: 'Retry' });
    await user.click(retryButton);
    
    expect(screen.queryByText('Error occurred')).not.toBeInTheDocument();
  });
});
```

## Testing Best Practices

### Test Organization
```javascript
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Rendering tests
  });
  
  describe('Interactions', () => {
    // Interaction tests
  });
  
  describe('Accessibility', () => {
    // Accessibility tests
  });
});
```

### Test Naming
```javascript
// Good descriptive names
it('renders with default props');
it('handles click events correctly');
it('displays error message when API fails');

// Avoid vague names
it('works correctly');
it('handles clicks');
it('shows error');
```

### Assertions
```javascript
// Use specific assertions
expect(screen.getByRole('button')).toBeInTheDocument();
expect(screen.getByText('Submit')).toBeEnabled();
expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');

// Avoid generic assertions
expect(screen.getByText('Submit')).toBeTruthy();
expect(component).toBeDefined();
```

## Quality Checklist

### Test Coverage
- [ ] All component variants tested
- [ ] All props tested
- [ ] All user interactions tested
- [ ] Error states tested
- [ ] Loading states tested
- [ ] Accessibility tested

### Test Quality
- [ ] Tests are descriptive and readable
- [ ] Tests are isolated and independent
- [ ] Proper assertions used
- [ ] Mocks are appropriate
- [ ] Tests are maintainable

### Performance
- [ ] Tests run quickly
- [ ] No unnecessary re-renders
- [ ] Efficient DOM queries
- [ ] Proper cleanup

### Integration
- [ ] Component interactions tested
- [ ] Data flow tested
- [ ] Error propagation tested
- [ ] User workflows tested

## Common Testing Patterns

### Custom Render Function
```javascript
const customRender = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
  
  return render(ui, { wrapper: Wrapper, ...options });
};
```

### Test Utilities
```javascript
const waitForElement = (selector) => 
  screen.findByTestId(selector);

const clickButton = (buttonText) => 
  userEvent.click(screen.getByRole('button', { name: buttonText }));

const typeInInput = (label, text) => 
  userEvent.type(screen.getByLabelText(label), text);
```

### Async Testing
```javascript
it('handles async operations', async () => {
  renderComponent();
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

## Running Tests

### Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ComponentName.test.js

# Run tests matching pattern
npm test -- --testNamePattern="Rendering"
```

### Coverage Reports
```bash
# Generate coverage report
npm test -- --coverage --coverageReporters=text-lcov

# Open coverage in browser
open coverage/lcov-report/index.html
```

This workflow ensures comprehensive testing coverage while maintaining code quality and reliability.
