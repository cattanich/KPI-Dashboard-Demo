# KPI Dashboard

A web application for tracking and visualizing Key Performance Indicators (KPIs) built with Next.js, TypeScript, React, Zustand, and Tailwind CSS.

## Project Overview

This project is a dashboard application that allows users to:

- Browse and search for KPIs
- Explore various assets (dashboards, reports, documents, visualizations)
- View detailed information about KPIs and assets
- Filter KPIs by visualization type
- Save favorites
- Access a library of KPIs

## Features

- **Dashboard:** Main view with recent KPIs, assets, and quick stats
- **KPI Library:** Browse and filter available KPIs
- **Search Functionality:** Search for KPIs and assets
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Component Library:** Built with reusable UI components styled with Tailwind

## Tech Stack

- **Next.js:** React framework for server-rendered applications
- **TypeScript:** Type safety for JavaScript
- **React:** UI library
- **Zustand:** State management
- **Tailwind CSS:** Utility-first CSS framework
- **Storybook:** Component documentation and testing

## Project Structure

```
/
├── app/                # Next.js pages and routes
│   ├── dashboard/      # Dashboard page
│   ├── library/        # KPI Library page
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   ├── ui/             # Basic UI components
│   ├── dashboard/      # Dashboard-specific components
│   └── layout/         # Layout components
├── store/              # Zustand state management
├── lib/                # Utilities and helpers
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Storybook

To run Storybook:

```
npm run storybook
```

This will start Storybook on [http://localhost:6006](http://localhost:6006)

## Implementation Details

### State Management

The application uses Zustand for state management, with a central store that manages:

- Assets and KPIs data
- Selected items
- Search and filtering state
- UI state (expandable sections, etc.)

### Mock Data

Since this is a prototype, mock data is generated to simulate API calls.

### Component Architecture

Components are designed to be reusable and follow a modular approach:

- **UI Components:** Basic building blocks (Button, Card, Input)
- **Dashboard Components:** Specific to dashboard functionality (KPICard, AssetCard, SearchBar)
- **Layout Components:** Structural components (MainLayout)

## Assumptions Made

- The application would typically connect to a backend API for real data
- Authentication and user management would be added in a production version
- The design follows a simplified version of the flowchart provided
- Mobile and responsive design are important

## Future Enhancements

- Add authentication and user management
- Connect to a real backend API
- Add more interactive visualizations for KPIs
- Implement data filtering and sorting options
- Add notification system
- Add user preferences and personalization
- Add export/import functionality for KPIs and assets
