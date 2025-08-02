import React, { Component } from 'react';
import { Switch, Route, Router } from 'wouter';
import Landing from './pages/Landing.jsx';
import DoctorProfile from './pages/DoctorProfile.jsx';
import BookingForm from './pages/BookingForm.jsx';
import NotFound from './pages/NotFound.jsx';

class App extends Component {
  render() {
    return (
      <Router base="/MediBooker">
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/doctor/:id" component={DoctorProfile} />
          <Route path="/book/:id" component={BookingForm} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;