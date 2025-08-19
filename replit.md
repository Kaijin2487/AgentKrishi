# replit.md

## Overview

AgentKrishi is an AI-powered multilingual agricultural advisory application designed for Indian farmers. The platform provides real-time agricultural advice, weather forecasts, pest detection, and government scheme information through a conversational chat interface. The application supports 10+ Indian languages and offers both text and voice interaction capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- React 18 with TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for styling with shadcn/ui component library
- TanStack Query for server state management and caching
- Wouter for lightweight client-side routing

**Component Structure**
- Modular component architecture with UI components in `/components/ui`
- Page-based routing with home and 404 pages
- Responsive design supporting mobile and desktop interfaces
- Chat interface as the primary user interaction method

**State Management**
- React Query for server state and API caching
- React hooks for local component state
- Toast notifications for user feedback

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for REST API
- Custom route registration system
- Middleware for request logging and error handling
- In-memory storage implementation for development

**API Design**
- RESTful endpoints for chat messages and agricultural advice
- Chat endpoints: POST `/api/chat`, GET `/api/chat/messages`
- Advice endpoints: GET `/api/advice`, GET `/api/advice/search`
- Weather and government scheme endpoints (planned)

**Data Layer**
- Drizzle ORM for database operations
- PostgreSQL as the target database
- Type-safe database schema definitions
- Memory storage fallback for development

### Data Storage Solutions

**Database Schema**
- Users table for authentication and preferences
- Chat messages with multilingual support and metadata
- Agricultural advice categorized by region, season, and crop type
- Weather data with forecasting capabilities
- Government schemes with state and category filtering

**Data Models**
- Strongly typed schemas using Drizzle and Zod
- Support for JSON metadata in messages
- Array fields for tags and advisories
- Timestamp tracking for all entities

### Authentication and Authorization

**Current Implementation**
- Basic user structure defined in schema
- Username/password authentication planned
- User preferences including language and location
- Session-based authentication architecture prepared

### External Service Integrations

**Chatbot Integration**
- Local agricultural chatbot with intelligent response system
- Knowledge base integration with 20 agricultural Q&A covering crops, fertilizers, pests, irrigation, etc.
- "Start Chat" button scrolls to interactive chat interface
- Smart query matching with fallback responses for agricultural topics
- Maintains tools sidebar alongside chat experience
- External webhook integration prepared for future implementation

**Language Processing**
- Multi-language support for 10+ Indian languages (Hindi, Bengali, Telugu, Tamil, etc.)
- AI response generation system for agricultural queries
- Voice input/output capabilities planned

**Agricultural Data**
- Weather data integration for forecasting
- Regional and seasonal advice categorization
- Pest detection and crop management guidance
- Government scheme database integration

**Development Tools**
- Replit integration for development environment
- Hot reload and development banner support
- TypeScript compilation and type checking

### Build and Deployment

**Development Workflow**
- Vite development server with HMR
- TSX for TypeScript execution
- Concurrent client and server development

**Production Build**
- Vite build for client-side assets
- ESBuild for server bundling
- Static file serving through Express
- Environment-specific configuration support

The architecture prioritizes farmer accessibility with multilingual support, offline capabilities, and mobile-responsive design while maintaining type safety and developer productivity through modern tooling.