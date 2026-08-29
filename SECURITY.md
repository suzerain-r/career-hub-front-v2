# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take the security of Career Hub seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Disclose Publicly

Please do not open a public issue or discuss the vulnerability in public forums until it has been addressed.

### 2. Report Privately

Send an email to [security@your-domain.com] with:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if available)

### 3. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-30 days
  - Medium: 30-90 days
  - Low: Best effort

## Security Best Practices

### For Users

1. **Keep Dependencies Updated**
```bash
npm audit
npm audit fix
```

2. **Use Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` as template
   - Keep sensitive data in environment variables

3. **Authentication**
   - Use strong passwords
   - Enable 2FA when available
   - Don't share authentication tokens

### For Developers

1. **Secure Coding Practices**
   - Validate all user inputs
   - Sanitize data before rendering
   - Use parameterized queries
   - Implement proper error handling

2. **Dependencies**
   - Regularly update dependencies
   - Review security advisories
   - Use `npm audit` before releases
   - Pin dependency versions

3. **API Security**
   - Use HTTPS only
   - Implement rate limiting
   - Validate JWT tokens properly
   - Handle CORS correctly

4. **Frontend Security**
   - Avoid `dangerouslySetInnerHTML`
   - Sanitize user-generated content
   - Use Content Security Policy
   - Implement XSS protection

5. **Data Protection**
   - Don't store sensitive data in localStorage
   - Use httpOnly cookies for tokens when possible
   - Implement proper session management
   - Clear sensitive data on logout

## Known Security Considerations

### JWT Tokens in localStorage

The current implementation stores JWT tokens in localStorage. While functional, this approach has XSS vulnerabilities. Consider:

- Moving to httpOnly cookies
- Implementing additional XSS protections
- Using short-lived tokens with refresh mechanism
- Adding CSRF tokens for state-changing operations

### CORS Configuration

Ensure backend CORS is properly configured:
- Whitelist specific origins
- Don't use wildcard (`*`) in production
- Validate Origin headers

## Security Checklist for PRs

Before submitting a PR, verify:

- [ ] No hardcoded secrets or API keys
- [ ] User inputs are validated and sanitized
- [ ] No sensitive data in error messages
- [ ] Dependencies are up to date
- [ ] No new security vulnerabilities (`npm audit`)
- [ ] Authentication checks are in place
- [ ] Authorization is properly implemented
- [ ] Error handling doesn't leak information

## Common Vulnerabilities

### Cross-Site Scripting (XSS)

**Risk**: Malicious scripts executed in user's browser

**Prevention**:
- React escapes by default
- Avoid `dangerouslySetInnerHTML`
- Sanitize user input
- Use Content Security Policy

### Cross-Site Request Forgery (CSRF)

**Risk**: Unauthorized actions on behalf of authenticated user

**Prevention**:
- Use CSRF tokens
- SameSite cookie attribute
- Verify request origin

### SQL Injection

**Risk**: Unauthorized database access

**Prevention**:
- Use parameterized queries
- Validate inputs on backend
- Use ORMs properly

### Insecure Dependencies

**Risk**: Known vulnerabilities in third-party packages

**Prevention**:
```bash
npm audit
npm audit fix
```

## Security Tools

We recommend using:

- **npm audit** - Check for vulnerable dependencies
- **ESLint security plugins** - Detect security issues in code
- **Snyk** - Continuous security monitoring
- **OWASP ZAP** - Security testing

## Disclosure Policy

- We will acknowledge your report within 48 hours
- We will keep you updated on the progress
- We will credit you in the security advisory (unless you prefer to remain anonymous)
- We will notify affected users after the fix is deployed

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/learn/escape-hatches)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Questions?

If you have questions about security that don't involve reporting a vulnerability, please open a GitHub Discussion or contact us at [security@your-domain.com].

Thank you for helping keep Career Hub and our users safe!
