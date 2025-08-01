import React, { Component } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import DoctorCard from '../components/DoctorCard.jsx';

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
    this.fetchDoctors();
  }

  fetchDoctors = async (searchQuery = '') => {
    try {
      this.setState({ loading: true });
      const url = searchQuery 
        ? `/api/doctors/search?q=${encodeURIComponent(searchQuery)}`
        : '/api/doctors';
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      
      const doctors = await response.json();
      this.setState({ doctors, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching doctors:', error);
      this.setState({ 
        error: 'Failed to load doctors. Please try again.', 
        loading: false 
      });
    }
  };

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
    // Debounce search to avoid too many API calls
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.fetchDoctors(query);
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