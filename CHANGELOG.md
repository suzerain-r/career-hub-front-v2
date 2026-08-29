# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Environment variable configuration support (`.env` files)
- Comprehensive testing infrastructure with Vitest and React Testing Library
- Error Boundary component for graceful error handling
- Pre-commit hooks with Husky and lint-staged
- Prettier code formatting
- Logger utility for better error tracking and monitoring
- Docker containerization support with multi-stage builds
- Nginx configuration for production deployment
- GitHub Actions CI/CD workflow
- Comprehensive README with setup instructions
- CONTRIBUTING.md guide for contributors
- SECURITY.md policy for security reporting
- CHANGELOG.md for tracking changes
- Test examples for ErrorBoundary and JWT utilities

### Changed
- Migrated API base URL to environment variable
- Fixed typo: "Recomendations" → "Recommendations"
- Updated README from default Vite template to project-specific documentation
- Enhanced .gitignore with environment files
- Improved package.json with additional scripts and dev dependencies

### Security
- Added security headers in Nginx configuration
- Documented JWT token storage considerations
- Added security best practices documentation

## [2.0.0] - 2026-04-30

### Added
- Initial version 2 release
- Multi-role system (Students, Companies, Universities)
- Profile management system
- Review and rating features
- Favorites functionality
- Resume management with Elasticsearch
- Photo upload capabilities
- Search and filtering
- JWT authentication with protected routes

### Tech Stack
- React 19.2
- Vite 7
- React Router 7
- Tailwind CSS 4
- Axios for API communication

[Unreleased]: https://github.com/yourusername/career-hub-front-v2/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/yourusername/career-hub-front-v2/releases/tag/v2.0.0
