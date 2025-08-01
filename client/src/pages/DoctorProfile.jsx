import React, { Component } from 'react';
import { Link, useParams } from 'wouter';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import { getDoctorById } from '../data/mockData.js';

// Higher-order component to inject useParams hook
function withParams(WrappedComponent) {
  return function WithParamsComponent(props) {
    const params = useParams();
    return <WrappedComponent {...props} params={params} />;
  };
}

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      doctor: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.loadDoctor();
  }

  loadDoctor = () => {
    const { id } = this.props.params;
    this.setState({ loading: true });
    
    // Simulate loading delay
    setTimeout(() => {
      const doctor = getDoctorById(id);
      if (doctor) {
        this.setState({ doctor, loading: false, error: null });
      } else {
        this.setState({ 
          error: 'Doctor not found. Please try again.', 
          loading: false 
        });
      }
    }, 300);
  };

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { searchQuery, doctor, loading, error } = this.state;
    const { id } = this.props.params;

    return (
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={this.handleSearchChange}
          />
          
          <div className="content-area">
            <Link href="/" className="back-btn">
              <span>←</span>
              Back to Doctors
            </Link>

            {loading && (
              <div className="loading-message">
                Loading doctor profile...
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {!loading && !error && doctor && (
              <>
                <div className="profile-header">
                  <img src={doctor.avatar} alt={doctor.name} className="profile-avatar" />
                  
                  <div className="profile-details">
                    <h2>{doctor.name}</h2>
                    <p>{doctor.specialty}</p>
                    <span className={`availability-badge ${doctor.available ? "available" : "fully-booked"}`}>
                      {doctor.status}
                    </span>
                  </div>
                </div>

                <div className="availability-section">
                  <h3 className="availability-title">Available Time Slots</h3>
                  
                  <div className="time-slots">
                    <div className="time-slot available">9:00 AM</div>
                    <div className="time-slot available">10:30 AM</div>
                    <div className="time-slot booked">12:00 PM</div>
                    <div className="time-slot available">2:00 PM</div>
                    <div className="time-slot available">3:30 PM</div>
                    <div className="time-slot booked">5:00 PM</div>
                  </div>

                  {doctor.available ? (
                    <Link href={`/book/${doctor.id}`} className="book-appointment-btn">
                      Book Appointment
                    </Link>
                  ) : (
                    <button className="book-appointment-btn" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                      Doctor Not Available
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(DoctorProfile);