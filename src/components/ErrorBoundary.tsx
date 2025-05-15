import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return <div className="p-6 bg-red-100 text-red-800 rounded">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;