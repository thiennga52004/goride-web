import { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card card">
            <div className="error-boundary-icon">⚠️</div>
            <h2 className="error-boundary-title">Đã xảy ra lỗi hệ thống</h2>
            <p className="error-boundary-message">
              Ứng dụng gặp sự cố không mong muốn. Vui lòng thử tải lại trang hoặc liên hệ bộ phận hỗ trợ kỹ thuật.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className="error-boundary-details">
                <summary style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', marginBottom: '8px', userSelect: 'none' }}>
                  Chi tiết lỗi (chỉ hiển thị ở dev mode)
                </summary>
                <pre>{this.state.error.stack || this.state.error.toString()}</pre>
              </div>
            )}
            <button className="error-boundary-btn" onClick={this.handleReload}>
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
