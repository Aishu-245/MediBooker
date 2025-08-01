# Healthcare Appointment System

## Overview

This is a modern healthcare appointment booking system built with React, Express, and PostgreSQL. The application allows patients to browse available doctors, view their profiles, and book appointments. It features a clean, accessible interface with comprehensive UI components and real-time data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Custom component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with structured error handling
- **Request Logging**: Custom middleware for API request/response logging
- **Development**: Hot module replacement with Vite integration

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Validation**: Zod schemas for type-safe data validation
- **Development Storage**: In-memory storage with seeded mock data

### Component Architecture
- **Design System**: shadcn/ui components for consistent UI patterns
- **Component Structure**: Mix of class and function components
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: Custom toast system for user feedback

### Key Features
1. **Doctor Discovery**: Search and browse available healthcare providers
2. **Profile Views**: Detailed doctor information and availability status
3. **Appointment Booking**: Form-based scheduling with validation
4. **Responsive Design**: Mobile-first approach with Tailwind CSS
5. **Real-time Updates**: Query invalidation for data consistency

### Development Workflow
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Organization**: Shared schema definitions between client and server
- **Path Aliases**: Clean import paths with TypeScript path mapping
- **Development Tools**: ESBuild for server bundling, Vite for client

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations and schema management
- **Drizzle Kit**: Database migration and schema generation tools

### UI & Styling
- **Radix UI**: Accessible component primitives for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

### Data Fetching & Forms
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer

### Routing & Navigation
- **Wouter**: Lightweight client-side routing
- **React Router**: Navigation and route management

### Additional Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **nanoid**: Unique ID generation