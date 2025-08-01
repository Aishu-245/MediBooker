import React from "react";
import { Link } from "wouter";
import { Doctor } from "@shared/schema";

interface DoctorCardProps {
  doctor: Doctor;
}

export default class DoctorCard extends React.Component<DoctorCardProps> {
  render() {
    const { doctor } = this.props;

    return (
      <div className="doctor-card">
        <img src={doctor.avatar} alt={doctor.name} className="doctor-avatar" />

        <div className="doctor-info">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-specialty">{doctor.specialty}</p>
          <span className={`availability-badge ${doctor.available ? "available" : "fully-booked"}`}>
            {doctor.status}
          </span>
        </div>

        <Link href={`/doctor/${doctor.id}`}>
          <a className={`view-profile-btn ${doctor.available ? "btn-available" : "btn-booked"}`}>
            View Profile
          </a>
        </Link>
      </div>
    );
  }
}
