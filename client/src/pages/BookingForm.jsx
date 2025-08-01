import React, { Component } from 'react';
import { Link, useParams, useLocation } from 'wouter';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import { getDoctorById, createAppointment } from '../data/mockData.js';

// Higher-order component to inject hooks
function withRouter(WrappedComponent) {
  return function WithRouterComponent(props) {
    const params = useParams();
    const [location, setLocation] = useLocation();
    return <WrappedComponent {...props} params={params} location={location} setLocation={setLocation} />;
  };
}

class BookingForm extends Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().split('T')[0];
    this.state = {
      searchQuery: '',
      doctor: null,
      loading: true,
      error: null,
      patientName: '',
      patientEmail: '',
      appointmentDate: today,
      appointmentTime: '',
      showConfirmation: false,
      submitting: false
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

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { patientName, patientEmail, appointmentDate, appointmentTime } = this.state;
    const { id } = this.props.params;
    
    if (!patientName || !patientEmail || !appointmentDate || !appointmentTime) {
      alert('Please fill in all required fields.');
      return;
    }

    this.setState({ submitting: true });

    // Simulate API call delay
    setTimeout(() => {
      try {
        const appointment = {
          doctorId: id,
          patientName,
          patientEmail,
          appointmentDate,
          appointmentTime
        };

        // Save appointment to mock data
        createAppointment(appointment);

        this.setState({ 
          showConfirmation: true,
          submitting: false 
        });

        // Redirect after 3 seconds
        setTimeout(() => {
          this.props.setLocation('/');
        }, 3000);

      } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment. Please try again.');
        this.setState({ submitting: false });
      }
    }, 1000);
  };

  render() {
    const { 
      searchQuery, 
      doctor, 
      loading, 
      error, 
      patientName, 
      patientEmail, 
      appointmentDate, 
      appointmentTime,
      showConfirmation,
      submitting
    } = this.state;
    const { id } = this.props.params;
    const today = new Date().toISOString().split('T')[0];

    return (
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={this.handleSearchChange}
          />
          
          <div className="content-area">
            <Link href={`/doctor/${id}`} className="back-btn">
              <span>←</span>
              Back to Profile
            </Link>

            <h1 className="page-title">Book Appointment</h1>

            {loading && (
              <div className="loading-message">
                Loading doctor information...
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {!loading && !error && doctor && (
              <div style={{ marginBottom: "30px", padding: "20px", background: "#fafafa", borderRadius: "12px" }}>
                <h3>Booking with {doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </div>
            )}

            {showConfirmation ? (
              <div className="confirmation-message">
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>✅</div>
                <h3>Appointment Booked Successfully!</h3>
                <p>We've sent a confirmation email to your address. The doctor will contact you shortly.</p>
                <p>Redirecting to home page...</p>
              </div>
            ) : (
              !loading && !error && (
                <form onSubmit={this.handleSubmit} style={{ maxWidth: "600px" }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="patientName">Patient Name</label>
                    <input
                      type="text"
                      id="patientName"
                      className="form-input"
                      value={patientName}
                      onChange={(e) => this.handleInputChange("patientName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="patientEmail">Email Address</label>
                    <input
                      type="email"
                      id="patientEmail"
                      className="form-input"
                      value={patientEmail}
                      onChange={(e) => this.handleInputChange("patientEmail", e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="appointmentDate">Preferred Date</label>
                    <input
                      type="date"
                      id="appointmentDate"
                      className="form-input"
                      value={appointmentDate}
                      onChange={(e) => this.handleInputChange("appointmentDate", e.target.value)}
                      min={today}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="appointmentTime">Preferred Time</label>
                    <select
                      id="appointmentTime"
                      className="form-select"
                      value={appointmentTime}
                      onChange={(e) => this.handleInputChange("appointmentTime", e.target.value)}
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:30">10:30 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:30">3:30 PM</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? "Booking..." : "Book Appointment"}
                    </button>
                    <Link href={`/doctor/${id}`} className="btn-secondary">
                      Cancel
                    </Link>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BookingForm);