import { useCallback, useRef } from 'react';

import { LogContext, logger } from './logger';

/**
 * React hook for logging with component context
 *
 * Automatically includes component name and provides convenient logging methods
 */
export function useLogger(componentName: string) {
  const componentRef = useRef(componentName);

  const createContext = useCallback(
    (additionalContext?: LogContext): LogContext => ({
      component: componentRef.current,
      ...additionalContext,
    }),
    []
  );

  const debug = useCallback(
    (message: string, context?: LogContext) => {
      logger.debug(message, createContext(context));
    },
    [createContext]
  );

  const info = useCallback(
    (message: string, context?: LogContext) => {
      logger.info(message, createContext(context));
    },
    [createContext]
  );

  const warn = useCallback(
    (message: string, context?: LogContext) => {
      logger.warn(message, createContext(context));
    },
    [createContext]
  );

  const error = useCallback(
    (message: string, context?: LogContext, error?: Error) => {
      logger.error(message, createContext(context), error);
    },
    [createContext]
  );

  const userAction = useCallback(
    (action: string, context?: Omit<LogContext, 'action' | 'component'>) => {
      logger.userAction(action, createContext({ ...context, action }));
    },
    [createContext]
  );

  const apiCall = useCallback(
    (method: string, url: string, status?: number, context?: LogContext) => {
      logger.apiCall(method, url, status, createContext(context));
    },
    [createContext]
  );

  const performance = useCallback(
    (metric: string, value: number, unit?: string, context?: LogContext) => {
      logger.performance(metric, value, unit, createContext(context));
    },
    [createContext]
  );

  const pageView = useCallback(
    (page: string, context?: Omit<LogContext, 'component'>) => {
      logger.pageView(page, createContext({ ...context }));
    },
    [createContext]
  );

  return {
    debug,
    info,
    warn,
    error,
    userAction,
    pageView,
    apiCall,
    performance,
  };
}
