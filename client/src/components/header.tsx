import React from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default class Header extends React.Component<HeaderProps> {
  render() {
    const { searchQuery, onSearchChange } = this.props;

    return (
      <div className="header">
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
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
            <i className="fas fa-user"></i>
          </button>
          <button className="action-btn add-btn">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    );
  }
}
