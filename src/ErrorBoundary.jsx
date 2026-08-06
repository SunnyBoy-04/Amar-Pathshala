import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("AMAR PATHSHALA Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-3xl flex items-center justify-center mb-4 text-3xl font-black border border-red-500/30">
            ⚠️
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-white tracking-tight">
            AMAR PATHSHALA Portal Restored
          </h1>
          <p className="text-slate-400 text-sm max-w-md mb-3 leading-relaxed font-medium">
            An unexpected error was safely intercepted. Click below to reload and restore your session.
          </p>
          {this.state.error && (
            <div className="mb-6 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-300 font-mono max-w-lg overflow-x-auto text-left">
              {this.state.error.toString()}
            </div>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl transition"
          >
            🔄 Reload AMAR PATHSHALA
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
