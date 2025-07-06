# Manufacturing Execution System (MES) - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Manufacturing Execution System (MES) built with React TypeScript and modern web technologies.

## Architecture Guidelines
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Material-UI (MUI) v5
- **State Management**: React Context API and useState/useEffect hooks
- **Routing**: React Router v6
- **Charts**: Recharts for data visualization
- **Data Grids**: MUI X Data Grid for complex tables
- **Real-time Communication**: Socket.io client for live updates
- **HTTP Client**: Axios for API calls
- **Date/Time**: Day.js for date manipulation

## Key MES Modules
1. **Dashboard**: Real-time production overview with KPIs
2. **Production Planning**: Schedule and plan manufacturing orders
3. **Work Order Management**: Create, track, and manage work orders
4. **Quality Control**: Quality checks, inspections, and non-conformances
5. **Inventory Management**: Raw materials, WIP, and finished goods tracking
6. **Resource Management**: Equipment, personnel, and tool management
7. **Reports**: Production reports, efficiency metrics, and analytics

## Coding Standards
- Use TypeScript interfaces for all data models
- Implement proper error handling and loading states
- Follow React hooks best practices
- Use Material-UI theme system for consistent styling
- Implement responsive design for mobile and desktop
- Add proper TypeScript types for all props and functions
- Use functional components with hooks
- Implement proper form validation
- Add accessibility features (ARIA labels, etc.)

## File Structure Conventions
- `/src/components/` - Reusable UI components
- `/src/pages/` - Page-level components
- `/src/hooks/` - Custom React hooks
- `/src/types/` - TypeScript type definitions
- `/src/services/` - API service functions
- `/src/utils/` - Utility functions
- `/src/context/` - React Context providers
- `/src/constants/` - Application constants

## Best Practices
- Always include proper loading and error states
- Implement optimistic updates where appropriate
- Use proper data validation
- Follow Material Design principles
- Implement proper caching strategies
- Add comprehensive error handling
- Use semantic HTML elements
- Implement proper form handling with validation
