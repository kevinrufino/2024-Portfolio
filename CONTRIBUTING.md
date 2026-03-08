# Contributing to Kevin Rufino's Portfolio 2024

Thank you for your interest in contributing to this portfolio project! This repository is AI-native and designed for collaboration between humans and AI agents.

## 🤖 AI Agent Guidelines

### Before You Start (AI Agents)

1. **Read the Repository Structure**: Familiarize yourself with the component architecture
2. **Check Existing Issues**: Look for related issues or PRs before starting
3. **Understand the Tech Stack**: React 18, Tailwind CSS, React Spring, Matter.js, P5.js
4. **Run Tests Locally**: Always run `npm test` before submitting changes

### Agent Permissions Matrix

| Action | Human | AI Agent | Requirements |
|--------|-------|----------|-------------|
| Create new component | ✅ | ✅ | Follow naming conventions |
| Modify existing component | ✅ | ✅ | Maintain backward compatibility |
| Update dependencies | ✅ | ⚠️ | Must pass security checks |
| Change build config | ✅ | ❌ | Human review required |
| Delete files | ✅ | ❌ | Human approval required |
| Modify core architecture | ✅ | ❌ | Human approval required |

### AI Agent Workflows

Use these predefined workflows for common tasks:

#### `/create-component`
Creates a new React component with proper structure and testing.

#### `/update-styling`
Updates component styling while maintaining design system consistency.

#### `/add-dependency`
Adds new dependencies with security and compatibility checks.

#### `/optimize-performance`
Optimizes component performance and bundle size.

#### `/write-tests`
Creates comprehensive unit and integration tests.

## 🧑‍💻 Human Contributor Guidelines

### Development Setup

```bash
# Clone and setup
git clone https://github.com/kevinrufino/2024-Portfolio.git
cd 2024-Portfolio
npm install

# Start development
npm start

# Run tests
npm test

# Format code
npm run format
```

### Code Standards

#### Component Structure
```javascript
/**
 * Component description
 * @param {Object} props - Component props
 * @param {string} props.className - CSS classes
 * @returns {JSX.Element} Rendered component
 */
const ComponentName = ({ className, ...props }) => {
  // Component logic
  return <div className={className}>{/* JSX */}</div>;
};

export default ComponentName;
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `LoadingScreen`)
- **Files**: PascalCase.js (e.g., `LoadingScreen.js`)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case with Tailwind utilities

#### Import Order
1. React imports
2. Third-party libraries
3. Internal components
4. Utility functions
5. Styles and assets

### Testing Requirements

- **Unit Tests**: All components must have unit tests
- **Coverage**: Maintain 90%+ test coverage
- **Test Files**: Co-locate with components or use `__tests__` folder
- **Testing Library**: Use React Testing Library

```javascript
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## 🔄 Pull Request Process

### For AI Agents

1. **Create Feature Branch**: `agent/component-update` or `agent/feature-name`
2. **Run Quality Checks**: `npm test && npm run format`
3. **Update Documentation**: Add JSDoc comments and update README if needed
4. **Submit PR**: Use the AI Agent PR template

### For Humans

1. **Fork Repository**: Create a fork
2. **Create Branch**: `feature/feature-name` or `fix/issue-number`
3. **Make Changes**: Follow code standards
4. **Test Thoroughly**: Ensure all tests pass
5. **Submit PR**: Use detailed description

### PR Templates

#### AI Agent PR Template
```markdown
## AI Agent Contribution
- **Agent**: [Agent Name]
- **Task**: [Task Description]
- **Changes**: [Brief description]
- **Testing**: [Tests added/updated]
- **Documentation**: [Docs updated]
```

#### Human PR Template
```markdown
## Changes
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Description
[Detailed description of changes]

## Testing
- [ ] All tests pass
- [ ] New tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
```

## 📋 Quality Gates

All contributions must pass:

### Automated Checks
- ✅ ESLint validation (no warnings)
- ✅ Prettier formatting
- ✅ Unit tests (90%+ coverage)
- ✅ Build success
- ✅ No security vulnerabilities

### Manual Review
- Code quality and architecture
- Performance implications
- Accessibility compliance
- Design system consistency

## 🚨 Common Pitfalls to Avoid

### For AI Agents
- **Don't** modify core architecture without approval
- **Don't** delete existing functionality
- **Don't** add dependencies without security review
- **Don't** ignore ESLint warnings
- **Don't** skip testing

### For Humans
- **Don't** commit directly to main branch
- **Don't** ignore test failures
- **Don't** make breaking changes without discussion
- **Don't** hardcode values that should be configurable

## 📚 Documentation

- Update JSDoc comments for all modified components
- Update README.md for significant changes
- Add new documentation to `docs/` folder
- Include examples in component documentation

## 🚀 Deployment

### Staging
- All PRs are automatically deployed to staging
- Staging URL: [staging-url]

### Production
- Production deployments require approval
- Deployments happen after successful merge to main

## 🤝 Getting Help

- **Issues**: Create GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check `docs/` folder for detailed guides

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to this project! Your help makes this portfolio better for everyone. 🎉
