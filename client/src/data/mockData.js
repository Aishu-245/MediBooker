// Static mock data for the healthcare appointment system
export const doctors = [
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
  },
  {
    id: "lisa-patel",
    name: "Dr. Lisa Patel",
    specialty: "Pediatrician",
    avatar: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    available: true,
    status: "Available Today"
  },
  {
    id: "david-kim",
    name: "Dr. David Kim",
    specialty: "Orthopedic Surgeon",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    available: true,
    status: "Available Today"
  }
];

export const appointments = [];

// Helper functions
export function getDoctors() {
  return doctors;
}

export function getDoctorById(id) {
  return doctors.find(doctor => doctor.id === id);
}

export function searchDoctors(query) {
  if (!query) return doctors;
  
  const searchTerm = query.toLowerCase();
  return doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm) ||
    doctor.specialty.toLowerCase().includes(searchTerm)
  );
}

export function createAppointment(appointmentData) {
  const appointment = {
    id: Date.now().toString(),
    ...appointmentData,
    createdAt: new Date()
  };
  appointments.push(appointment);
  return appointment;
}