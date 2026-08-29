# Career Hub Frontend v2

A modern React-based platform connecting students, universities, and companies. Built with React 19, Vite, and Tailwind CSS.

## Features

- **Multi-Role System**: Support for Students, Companies, and Universities
- **Profile Management**: Comprehensive profile editing and viewing
- **Review System**: Rate and review feature with sender tracking
- **Favorites**: Companies can mark favorite students
- **Resume Management**: Elasticsearch-powered resume indexing and search
- **Recommendations**: Smart student recommendations for companies
- **Authentication**: JWT-based authentication with protected routes
- **Photo Uploads**: Profile photo management
- **Search & Filter**: Advanced search with filtering capabilities

## Tech Stack

- **React 19.2** - Latest React with modern features
- **Vite 7** - Lightning-fast build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client with interceptors
- **Heroicons** - Beautiful hand-crafted SVG icons
- **JWT Decode** - JWT token parsing

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Backend API running (default: http://localhost:8080)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd career-hub-front-v2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and set your API base URL:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_ENV=development
```

### 4. Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

### Development
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing
- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate coverage report

## Project Structure

```
career-hub-front-v2/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, SVGs
│   ├── components/     # React components
│   │   ├── auth/       # Authentication components
│   │   ├── commons/    # Shared components (ErrorBoundary, etc.)
│   │   ├── landing/    # Landing page components
│   │   ├── list/       # List view components
│   │   └── profile/    # Profile components
│   ├── config/         # Configuration files
│   │   ├── authConfig.js
│   │   ├── cardConfig.js
│   │   ├── filtersConfig.js
│   │   ├── listConfig.js
│   │   ├── profileConfig.js
│   │   └── searchConfig.js
│   ├── pages/          # Page components
│   │   ├── auth/       # Auth pages
│   │   ├── main/       # Main pages (Landing, List)
│   │   └── profile/    # Profile pages
│   ├── services/       # API services
│   │   ├── apiService.js      # Core API & endpoints
│   │   ├── authService.js     # Authentication
│   │   └── profileService.js  # Profile management
│   ├── test/           # Test utilities
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Root component with routing
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── .env                # Environment variables (gitignored)
├── .env.example        # Environment template
├── .husky/             # Git hooks
├── eslint.config.js    # ESLint configuration
├── vite.config.js      # Vite configuration
├── vitest.config.js    # Vitest configuration
└── package.json        # Dependencies and scripts
```

## API Integration

The application communicates with a backend API. Configure the base URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Authentication

The app uses JWT tokens stored in localStorage. Tokens are automatically:
- Added to request headers via axios interceptors
- Removed on 401 responses
- Users are redirected to `/auth?mode=sign-in` on authentication failure

### API Services

All API calls are centralized in `src/services/`:
- `apiService.js` - Main API client and endpoints
- `authService.js` - Login, registration, user management
- `profileService.js` - Profile CRUD operations

## Testing

The project uses Vitest and React Testing Library for testing.

### Running Tests

```bash
# Watch mode
npm run test

# With UI
npm run test:ui

# Coverage report
npm run test:coverage
```

### Writing Tests

Tests are colocated with components:
```
src/components/commons/ErrorBoundary.jsx
src/components/commons/ErrorBoundary.test.jsx
```

Example test:
```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## Code Quality

### Pre-commit Hooks

The project uses Husky and lint-staged to ensure code quality:
- ESLint checks and auto-fixes
- Prettier formatting
- Runs automatically before each commit

### Manual Checks

```bash
# Lint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_ENV` | Environment name | `development` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port already in use
If port 5173 is busy, Vite will automatically try the next available port.

### API connection issues
Verify:
1. Backend is running
2. `VITE_API_BASE_URL` is correct in `.env`
3. CORS is configured on the backend

### Build errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Ensure tests pass: `npm run test`
4. Ensure linting passes: `npm run lint`
5. Commit your changes (pre-commit hooks will run)
6. Push and create a Pull Request

## License

[Add your license here]

## Support

For issues and questions, please open an issue on GitHub.
