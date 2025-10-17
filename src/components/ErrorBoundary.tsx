"use client";
import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-zinc-100 mb-4">Something went wrong</h1>
        <p className="text-zinc-400 mb-6">
          We encountered an error while loading the blueprint. Please try refreshing the page.
        </p>
        {error && (
          <details className="text-left text-xs text-zinc-500 mb-4">
            <summary className="cursor-pointer mb-2">Error details</summary>
            <pre className="bg-zinc-800 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        <div className="space-y-2">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[var(--brand)] text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Refresh Page
          </button>
          <button
            onClick={resetError}
            className="w-full bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg hover:bg-zinc-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
