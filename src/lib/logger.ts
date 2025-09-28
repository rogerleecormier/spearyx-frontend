/**
 * Utility Logger for Spearyx Frontend
 *
 * Provides structured logging with different levels and environments.
 * Replaces console.log usage throughout the application.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  [key: string]: unknown;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private isDevelopment: boolean;
  private isProduction: boolean;
  private logLevel: LogLevel;

  constructor(env?: Record<string, unknown>) {
    this.isDevelopment = env?.NODE_ENV !== 'production';
    this.isProduction = env?.NODE_ENV === 'production';
    this.logLevel = this.getLogLevel(env);
  }

  private getLogLevel(env?: Record<string, unknown>): LogLevel {
    const envLevel = env?.VITE_LOG_LEVEL as LogLevel;
    if (envLevel && ['debug', 'info', 'warn', 'error'].includes(envLevel)) {
      return envLevel;
    }
    return this.isDevelopment ? 'debug' : 'info';
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[level] >= levels[this.logLevel];
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
    _error?: Error
  ): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (context?.component) {
      return `${prefix} [${context.component}] ${message}`;
    }

    return `${prefix} ${message}`;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error: error
        ? ({
            name: error.name,
            message: error.message,
            stack: error.stack,
          } as Error)
        : undefined,
    };
  }

  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, context, error);
    const logEntry = this.createLogEntry(level, message, context, error);

    // Console output for development
    if (this.isDevelopment) {
      const consoleMethod =
        level === 'error'
          ? 'error'
          : level === 'warn'
            ? 'warn'
            : level === 'debug'
              ? 'debug'
              : 'log';

      console[consoleMethod](formattedMessage);
      if (context) console[consoleMethod]('Context:', context);
      if (error) console[consoleMethod]('Error:', error);
    }

    // Production logging (could be extended to send to external services)
    if (this.isProduction) {
      // In production, you might want to send logs to a service like:
      // - Cloudflare Analytics
      // - Sentry
      // - LogRocket
      // - Custom logging endpoint

      // For now, we'll store in a global log buffer (optional)
      this.storeLogEntry(logEntry);
    }
  }

  private logBuffer: LogEntry[] = [];
  private maxBufferSize = 100;

  private storeLogEntry(entry: LogEntry): void {
    this.logBuffer.push(entry);

    // Keep only the last N entries to prevent memory leaks
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer = this.logBuffer.slice(-this.maxBufferSize);
    }
  }

  /**
   * Debug level logging - detailed information for debugging
   */
  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  /**
   * Info level logging - general information
   */
  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  /**
   * Warning level logging - something unexpected happened
   */
  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  /**
   * Error level logging - something went wrong
   */
  error(message: string, context?: LogContext, error?: Error): void {
    this.log('error', message, context, error);
  }

  /**
   * Log user actions for analytics
   */
  userAction(action: string, context?: Omit<LogContext, 'action'>): void {
    this.info(`User action: ${action}`, { ...context, action });
  }

  /**
   * Log page views
   */
  pageView(page: string, context?: Omit<LogContext, 'component'>): void {
    this.info(`Page view: ${page}`, { ...context, component: 'PageView' });
  }

  /**
   * Log API calls
   */
  apiCall(
    method: string,
    url: string,
    status?: number,
    context?: LogContext
  ): void {
    const level = status && status >= 400 ? 'error' : 'info';
    const message = `API ${method} ${url}${status ? ` - ${status}` : ''}`;
    this.log(level, message, { ...context, component: 'API' });
  }

  /**
   * Log performance metrics
   */
  performance(
    metric: string,
    value: number,
    unit: string = 'ms',
    context?: LogContext
  ): void {
    this.info(`Performance: ${metric} = ${value}${unit}`, {
      ...context,
      component: 'Performance',
    });
  }

  /**
   * Get stored logs (useful for debugging in production)
   */
  getLogs(): LogEntry[] {
    return [...this.logBuffer];
  }

  /**
   * Clear stored logs
   */
  clearLogs(): void {
    this.logBuffer = [];
  }

  /**
   * Export logs as JSON (useful for debugging)
   */
  exportLogs(): string {
    return JSON.stringify(this.logBuffer, null, 2);
  }
}

// Create and export a singleton instance
export const logger = new Logger(globalThis as Record<string, unknown>);

// Export the class for custom instances if needed
export { Logger };

// Convenience functions for common use cases
export const log = {
  debug: (message: string, context?: LogContext) =>
    logger.debug(message, context),
  info: (message: string, context?: LogContext) =>
    logger.info(message, context),
  warn: (message: string, context?: LogContext) =>
    logger.warn(message, context),
  error: (message: string, context?: LogContext, error?: Error) =>
    logger.error(message, context, error),
  userAction: (action: string, context?: Omit<LogContext, 'action'>) =>
    logger.userAction(action, context),
  pageView: (page: string, context?: Omit<LogContext, 'component'>) =>
    logger.pageView(page, context),
  apiCall: (
    method: string,
    url: string,
    status?: number,
    context?: LogContext
  ) => logger.apiCall(method, url, status, context),
  performance: (
    metric: string,
    value: number,
    unit?: string,
    context?: LogContext
  ) => logger.performance(metric, value, unit, context),
};
