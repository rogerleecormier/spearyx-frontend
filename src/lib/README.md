# Logger Utility

A comprehensive logging utility for the Spearyx Frontend application.

## Features

- **Structured Logging**: Consistent log format with timestamps and context
- **Log Levels**: Debug, Info, Warn, Error with configurable filtering
- **Environment Aware**: Different behavior for development vs production
- **React Integration**: Custom hook for easy component logging
- **Performance Tracking**: Built-in performance metrics logging
- **User Analytics**: Track user actions and page views
- **Error Handling**: Proper error logging with stack traces

## Usage

### Basic Logging

```typescript
import { log } from '../lib/logger';

// Simple logging
log.info('Application started');
log.warn('Deprecated feature used');
log.error('Failed to load data', { userId: '123' }, error);

// With context
log.debug('User interaction', {
  component: 'Button',
  action: 'click',
  userId: '123',
});
```

### React Hook

```typescript
import { useLogger } from '../lib/useLogger';

function MyComponent() {
  const log = useLogger('MyComponent');

  useEffect(() => {
    log.info('Component mounted');
  }, []);

  const handleClick = () => {
    log.userAction('button_clicked', { buttonId: 'submit' });
  };
}
```

### Performance Tracking

```typescript
const startTime = performance.now();
// ... do work ...
const endTime = performance.now();
log.performance('data_processing', endTime - startTime);
```

### API Calls

```typescript
log.apiCall('GET', '/api/users', 200, { userId: '123' });
log.apiCall('POST', '/api/login', 401); // Error status
```

## Configuration

Set the log level via environment variable:

```bash
# .env
VITE_LOG_LEVEL=debug  # debug, info, warn, error
```

## Log Levels

- **debug**: Detailed information for debugging (development only)
- **info**: General information about application flow
- **warn**: Something unexpected happened but application continues
- **error**: Something went wrong, needs attention

## Production Considerations

In production, logs are stored in memory and can be exported for debugging:

```typescript
import { logger } from '../lib/logger';

// Get all logs
const logs = logger.getLogs();

// Export as JSON
const logData = logger.exportLogs();
```

## Integration with Cloudflare

The logger is designed to work with Cloudflare Pages and can be extended to send logs to:

- Cloudflare Analytics
- Sentry
- LogRocket
- Custom logging endpoints

## Best Practices

1. **Use appropriate log levels**
2. **Include relevant context**
3. **Don't log sensitive information**
4. **Use structured logging for analytics**
5. **Log user actions for UX insights**
6. **Track performance metrics**
