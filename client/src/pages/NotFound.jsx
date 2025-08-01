import React, { Component } from 'react';
import { Link } from 'wouter';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={this.handleSearchChange}
          />
          
          <div className="content-area">
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#1f2937' }}>404</h1>
              <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#6b7280' }}>Page Not Found</h2>
              <p style={{ fontSize: '16px', marginBottom: '30px', color: '#6b7280' }}>
                The page you're looking for doesn't exist.
              </p>
              <Link href="/" className="btn-primary">
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;