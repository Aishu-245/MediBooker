import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { Doctor, InsertAppointment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useToast } from "@/hooks/use-toast";

interface BookingFormState {
  searchQuery: string;
  patientName: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  showConfirmation: boolean;
}

export default class BookingForm extends React.Component<{}, BookingFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: "",
      patientName: "",
      patientEmail: "",
      appointmentDate: "",
      appointmentTime: "",
      showConfirmation: false
    };
  }

  componentDidMount() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    this.setState({ appointmentDate: today });
  }

  handleSearchChange = (query: string) => {
    this.setState({ searchQuery: query });
  };

  handleInputChange = (field: keyof BookingFormState, value: string) => {
    this.setState({ [field]: value } as any);
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
            <BookingFormContent 
              formData={this.state}
              onInputChange={this.handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

interface BookingFormContentProps {
  formData: BookingFormState;
  onInputChange: (field: keyof BookingFormState, value: string) => void;
}

function BookingFormContent({ formData, onInputChange }: BookingFormContentProps) {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const doctorId = params.id;

  const { data: doctor } = useQuery<Doctor>({
    queryKey: ["/api/doctors", doctorId],
    queryFn: async () => {
      const response = await fetch(`/api/doctors/${doctorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctor");
      }
      return response.json();
    }
  });

  const createAppointmentMutation = useMutation({
    mutationFn: async (appointment: InsertAppointment) => {
      const response = await apiRequest("POST", "/api/appointments", appointment);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/doctors"] });
      toast({
        title: "Appointment Booked Successfully!",
        description: "We've sent a confirmation email to your address. The doctor will contact you shortly.",
      });
      
      // Show confirmation and redirect after delay
      onInputChange("showConfirmation", "true");
      setTimeout(() => {
        setLocation("/");
      }, 3000);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.patientEmail || !formData.appointmentDate || !formData.appointmentTime) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!doctorId) {
      toast({
        title: "Error",
        description: "Doctor information not found.",
        variant: "destructive",
      });
      return;
    }

    const appointment: InsertAppointment = {
      doctorId,
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime
    };

    createAppointmentMutation.mutate(appointment);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Link href={`/doctor/${doctorId}`}>
        <a className="back-btn">
          <i className="fas fa-arrow-left"></i>
          Back to Profile
        </a>
      </Link>

      <h1 className="page-title">Book Appointment</h1>

      {doctor && (
        <div style={{ marginBottom: "30px", padding: "20px", background: "var(--sidebar-bg)", borderRadius: "12px" }}>
          <h3>Booking with {doctor.name}</h3>
          <p>{doctor.specialty}</p>
        </div>
      )}

      {formData.showConfirmation ? (
        <div className="confirmation-message">
          <i className="fas fa-check-circle" style={{ fontSize: "24px", marginBottom: "12px" }}></i>
          <h3>Appointment Booked Successfully!</h3>
          <p>We've sent a confirmation email to your address. The doctor will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              className="form-input"
              value={formData.patientName}
              onChange={(e) => onInputChange("patientName", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="patientEmail">Email Address</label>
            <input
              type="email"
              id="patientEmail"
              className="form-input"
              value={formData.patientEmail}
              onChange={(e) => onInputChange("patientEmail", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="appointmentDate">Preferred Date</label>
            <input
              type="date"
              id="appointmentDate"
              className="form-input"
              value={formData.appointmentDate}
              onChange={(e) => onInputChange("appointmentDate", e.target.value)}
              min={today}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="appointmentTime">Preferred Time</label>
            <select
              id="appointmentTime"
              className="form-select"
              value={formData.appointmentTime}
              onChange={(e) => onInputChange("appointmentTime", e.target.value)}
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
              disabled={createAppointmentMutation.isPending}
            >
              {createAppointmentMutation.isPending ? "Booking..." : "Book Appointment"}
            </button>
            <Link href={`/doctor/${doctorId}`}>
              <a className="btn-secondary">Cancel</a>
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
