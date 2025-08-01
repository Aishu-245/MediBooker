import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Doctor } from "@shared/schema";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import DoctorCard from "@/components/doctor-card";

interface LandingState {
  searchQuery: string;
}

export default class Landing extends React.Component<{}, LandingState> {
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
            <h1 className="page-title">Available Doctors</h1>
            
            <DoctorsGrid searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    );
  }
}

function DoctorsGrid({ searchQuery }: { searchQuery: string }) {
  const { data: doctors, isLoading, error } = useQuery<Doctor[]>({
    queryKey: searchQuery ? ["/api/doctors/search", { q: searchQuery }] : ["/api/doctors"],
    queryFn: async () => {
      const url = searchQuery 
        ? `/api/doctors/search?q=${encodeURIComponent(searchQuery)}`
        : "/api/doctors";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="doctors-grid">
        <div>Loading doctors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctors-grid">
        <div>Error loading doctors. Please try again.</div>
      </div>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="doctors-grid">
        <div>No doctors found.</div>
      </div>
    );
  }

  return (
    <div className="doctors-grid">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
