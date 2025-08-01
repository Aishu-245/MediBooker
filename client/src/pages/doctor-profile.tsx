import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Doctor } from "@shared/schema";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

interface DoctorProfileState {
  searchQuery: string;
}

export default class DoctorProfile extends React.Component<{}, DoctorProfileState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: ""
    };
  }

  handleSearchChange = (query: string) => {
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
            <DoctorProfileContent />
          </div>
        </div>
      </div>
    );
  }
}

function DoctorProfileContent() {
  const params = useParams();
  const doctorId = params.id;

  const { data: doctor, isLoading, error } = useQuery<Doctor>({
    queryKey: ["/api/doctors", doctorId],
    queryFn: async () => {
      const response = await fetch(`/api/doctors/${doctorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctor");
      }
      return response.json();
    }
  });

  if (isLoading) {
    return <div>Loading doctor profile...</div>;
  }

  if (error || !doctor) {
    return <div>Error loading doctor profile. Please try again.</div>;
  }

  return (
    <>
      <Link href="/">
        <a className="back-btn">
          <i className="fas fa-arrow-left"></i>
          Back to Doctors
        </a>
      </Link>

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
          <Link href={`/book/${doctor.id}`}>
            <a className="book-appointment-btn">
              Book Appointment
            </a>
          </Link>
        ) : (
          <button className="book-appointment-btn" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
            Doctor Not Available
          </button>
        )}
      </div>
    </>
  );
}
