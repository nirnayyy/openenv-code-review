import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary Caught Error]', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 bg-[#F5F5F7]">
          <div className="max-w-md w-full bg-white border border-rose-200 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-[#111111] text-left">
            <div className="flex items-center space-x-3 text-rose-600">
              <AlertTriangle className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-bold text-sm uppercase">APPLICATION ERROR DETECTED</h3>
                <p className="text-[10px] text-slate-500 font-sans">Something went wrong while rendering this section.</p>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs text-rose-800 font-mono overflow-x-auto max-h-32">
              {this.state.error?.toString() || 'Unknown Runtime Error'}
            </div>

            <button
              onClick={this.handleReload}
              className="w-full btn-orange-chaingpt py-2.5 text-xs flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RELOAD APPLICATION</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
