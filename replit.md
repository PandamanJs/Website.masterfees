# Master-Fees School Management System

## Overview

Master-Fees is a comprehensive school fee management application built with React and TypeScript. It provides educational institutions with tools to manage student fees, track payments, generate reports, and integrate with external systems like QuickBooks. The application features a multi-step onboarding process for new schools and a dashboard-driven interface for day-to-day operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Components**: Custom-built components with Figma-generated designs
- **State Management**: React useState hooks for local state
- **Styling**: Tailwind CSS with custom utility classes
- **Build Tool**: Replit-based development environment

### Component Structure
- **Page Components**: Multi-step onboarding flow, authentication pages, dashboard views
- **UI Components**: Reusable form elements, cards, buttons, and data visualization components
- **Import Components**: Figma-generated UI components for consistent design system

## Key Components

### Authentication System
- **Login/Signup Flow**: Email-based authentication with password reset functionality
- **Session Management**: Token-based authentication with "keep logged in" option
- **Password Recovery**: Multi-step verification process via email or SMS

### Onboarding Process
1. **Basic Information**: School name entry
2. **Detailed Setup**: Institution type, location, contact details
3. **Final Configuration**: Additional school information and logo upload
4. **Class Selection**: Grade and class structure setup
5. **Product Groups**: Organizing classes into categories
6. **Pricing Structure**: Fee configuration for different class groups

### Dashboard Features
- **Revenue Tracking**: Total revenue and balance display with real-time updates
- **Fee Breakdown**: Category-wise fee collection status
- **Student Management**: Class-based filtering and search functionality
- **Transaction History**: Payment tracking and status monitoring
- **Task Management**: Scheduled tasks and calendar integration

### External Integrations
- **QuickBooks Integration**: Two-way synchronization of financial data
- **Real-time Notifications**: Live updates for payments and system events

## Data Flow

### User Journey
1. **Authentication**: Users log in or create new accounts
2. **Onboarding**: New schools complete multi-step setup process
3. **Dashboard Access**: Authenticated users access main application features
4. **Data Management**: CRUD operations for students, fees, and transactions
5. **Reporting**: View financial summaries and export data

### State Management Pattern
- Local component state for UI interactions
- API integration layer for server communication
- Real-time update hooks for live data synchronization
- Error handling with user-friendly toast notifications

## External Dependencies

### Core Libraries
- **React**: Frontend framework
- **TypeScript**: Type safety and development tooling
- **Tailwind CSS**: Utility-first styling framework
- **Sonner**: Toast notification system
- **Figma Assets**: Design system integration

### API Integration
- **Supabase**: Backend services and database
- **QuickBooks API**: Financial data synchronization
- **Real-time Subscriptions**: Live data updates

### Development Tools
- **Custom SVG System**: Icon and graphic management
- **Asset Pipeline**: Figma-to-code workflow
- **Type Definitions**: Comprehensive TypeScript interfaces

## Deployment Strategy

### Environment Configuration
- **Development**: Replit-based development environment
- **Production**: Web-based deployment with API endpoints
- **Database**: Supabase-hosted PostgreSQL database
- **Authentication**: Supabase Auth integration

### Error Handling
- **Network Failures**: Graceful degradation with retry mechanisms
- **Validation Errors**: Real-time form validation with clear messaging
- **API Errors**: Comprehensive error logging and user feedback
- **Session Management**: Automatic token refresh and logout handling

### Performance Considerations
- **Component Optimization**: Efficient re-rendering patterns
- **Asset Loading**: Optimized image and SVG delivery
- **Data Pagination**: Large dataset handling
- **Real-time Updates**: Efficient WebSocket connections

The application follows professional development standards with comprehensive error handling, user-friendly messaging, and a modular component architecture that supports scalability and maintainability.