import { type Doctor, type InsertDoctor, type Appointment, type InsertAppointment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Doctor methods
  getDoctors(): Promise<Doctor[]>;
  getDoctor(id: string): Promise<Doctor | undefined>;
  getDoctorsBySearch(query: string): Promise<Doctor[]>;
  
  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]>;
}

export class MemStorage implements IStorage {
  private doctors: Map<string, Doctor>;
  private appointments: Map<string, Appointment>;

  constructor() {
    this.doctors = new Map();
    this.appointments = new Map();
    this.seedData();
  }

  private seedData() {
    const mockDoctors: Doctor[] = [
      {
        id: "sarah-williams",
        name: "Dr. Sarah Williams",
        specialty: "Cardiologist",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        available: false,
        status: "Fully Booked"
      },
      {
        id: "john-smith",
        name: "Dr. John Smith",
        specialty: "Oncologist",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        available: true,
        status: "Available Today"
      },
      {
        id: "emily-chen",
        name: "Dr. Emily Chen",
        specialty: "Dermatologist",
        avatar: "https://images.unsplash.com/photo-1594824336270-41dce1b71fb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        available: true,
        status: "Available Today"
      },
      {
        id: "michael-rodriguez",
        name: "Dr. Michael Rodriguez",
        specialty: "Neurologist",
        avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        available: false,
        status: "Fully Booked"
      }
    ];

    mockDoctors.forEach(doctor => {
      this.doctors.set(doctor.id, doctor);
    });
  }

  async getDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }

  async getDoctor(id: string): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async getDoctorsBySearch(query: string): Promise<Doctor[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.doctors.values()).filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm) ||
      doctor.specialty.toLowerCase().includes(searchTerm)
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      createdAt: new Date()
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.doctorId === doctorId
    );
  }
}

export const storage = new MemStorage();
