import React from 'react';

export interface IErrorBoundary {
    children: React.ReactNode;
}

export interface IErrorFallback {
    error: Error;
    resetErrorBoundary: () => void;
    errorInfo?: React.ErrorInfo;
}

export interface IUseErrorBoundary {
    ErrorBoundary?: React.FC<IErrorBoundary>;
    error: Error | null;
    resetErrorBoundary: () => void;
    showBoundary: (error: unknown) => void;
};