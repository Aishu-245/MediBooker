import React, { Component } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import DoctorCard from '../components/DoctorCard.jsx';
import { getDoctors, searchDoctors } from '../data/mockData.js';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      doctors: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.loadDoctors();
  }

  loadDoctors = (searchQuery = '') => {
    this.setState({ loading: true });
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const doctors = searchQuery ? searchDoctors(searchQuery) : getDoctors();
      this.setState({ 
        doctors, 
        loading: false, 
        error: null 
      });
    }, 300);
  };

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
    // Debounce search for better performance
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.loadDoctors(query);
    }, 300);
  };

  componentWillUnmount() {
    clearTimeout(this.searchTimeout);
  }

  render() {
    const { searchQuery, doctors, loading, error } = this.state;

    return (
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={this.handleSearchChange}
          />
          
          <div className="content-area">
            <h1 className="page-title">Available Doctors</h1>
            
            {loading && (
              <div className="loading-message">
                Loading doctors...
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="doctors-grid">
                {doctors.length === 0 ? (
                  <div className="loading-message">
                    No doctors found.
                  </div>
                ) : (
                  doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;