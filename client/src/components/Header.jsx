import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { searchQuery, onSearchChange } = this.props;

    return (
      <div className="header">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search Doctors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="header-actions">
          <button className="action-btn profile-btn">
            <span>👤</span>
          </button>
          <button className="action-btn add-btn">
            <span>➕</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;