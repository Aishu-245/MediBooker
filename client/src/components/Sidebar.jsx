import React, { Component } from 'react';
import { Link, useLocation } from 'wouter';

// Higher-order component to inject location hook
function withLocation(WrappedComponent) {
  return function WithLocationComponent(props) {
    const [location] = useLocation();
    return <WrappedComponent {...props} location={location} />;
  };
}

class Sidebar extends Component {
  render() {
    const { location } = this.props;

    return (
      <div className="sidebar">
        <div className="logo">
          <span className="heart-icon">❤️</span>
          <span>Healthcare</span>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link href="/" className={`nav-link ${location === "/" ? "active" : ""}`}>
              <span className="nav-icon">🏠</span>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon">👤</span>
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon">⚙️</span>
              Settings
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon">❓</span>
              Support
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withLocation(Sidebar);