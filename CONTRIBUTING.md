# Contributing to Career Hub Frontend

Thank you for considering contributing to Career Hub! This document provides guidelines and steps for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- List any alternative solutions you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding standards** outlined below
3. **Write tests** for new functionality
4. **Update documentation** as needed
5. **Ensure all tests pass** before submitting
6. **Fill in the PR template** completely

## Development Setup

1. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/career-hub-front-v2.git
cd career-hub-front-v2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

## Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### File Organization

- Components in `src/components/` by feature
- Services in `src/services/`
- Utilities in `src/utils/`
- Tests colocated with components

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Files**: camelCase for utilities, PascalCase for components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS classes**: kebab-case (Tailwind utilities)

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

Pre-commit hooks will automatically format your code.

## Testing

Write tests for:
- New components
- New utility functions
- Bug fixes
- Complex logic

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    // Test implementation
  })
})
```

## Commit Messages

Use clear and meaningful commit messages following conventional commits:

- `feat: Add new feature`
- `fix: Fix bug in component`
- `docs: Update documentation`
- `style: Format code`
- `refactor: Refactor component`
- `test: Add tests`
- `chore: Update dependencies`

Examples:
```
feat: Add user profile photo upload
fix: Resolve token refresh issue on 401
docs: Update API integration guide
test: Add tests for ErrorBoundary component
```

## Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions

## Pull Request Process

1. **Update** your branch with the latest main:
```bash
git checkout main
git pull origin main
git checkout your-branch
git rebase main
```

2. **Run the full test suite**:
```bash
npm run lint
npm run test
npm run build
```

3. **Push** your changes:
```bash
git push origin your-branch
```

4. **Create a Pull Request** with:
   - Clear title describing the change
   - Description of what changed and why
   - Reference to related issues
   - Screenshots for UI changes

5. **Address review feedback** promptly

## Review Process

- At least one maintainer must approve
- All CI checks must pass
- No merge conflicts
- Follows project standards

## Need Help?

- Check existing documentation
- Search through existing issues
- Ask questions in GitHub Discussions
- Reach out to maintainers

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes (for significant contributions)

Thank you for contributing! 🎉
