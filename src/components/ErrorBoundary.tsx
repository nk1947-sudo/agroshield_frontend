// ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={24} className="text-red-500" />
            <h2 className="text-lg font-semibold">Something went wrong</h2>
          </div>
          <p className="mb-4">
            An error occurred while loading this component.
          </p>
          <details className="bg-white p-3 rounded-md shadow-sm">
            <summary className="cursor-pointer font-medium">Error details</summary>
            <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap max-h-48">
              {this.state.error?.toString()}
            </pre>
          </details>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;