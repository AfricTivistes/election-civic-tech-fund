# Democracy Form Builder

## Overview

This is a multi-step form application for the Election Civic Tech Fund, designed to collect project submissions from African civil society organizations seeking funding for democratic technology initiatives. The application supports English and French languages, guides users through a 4-step submission process (Vision, Technology, Team, Documents), and stores submissions in NocoDB.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 15** with App Router and React Server Components
- Uses the `app/[lang]/` directory structure for internationalization
- Client-side components marked with `"use client"` directive
- Framer Motion for animations and transitions

### UI Component Library
- **shadcn/ui** components built on Radix UI primitives
- Tailwind CSS for styling with CSS variables for theming
- Dark gradient theme (slate-900 to blue-900) as the primary visual style
- Lucide React for icons

### Internationalization
- Route-based i18n with `/en` and `/fr` URL prefixes
- Middleware handles language detection from browser headers and cookies
- Translations stored in `lib/translations.ts`
- `useLanguage` hook provides translation access throughout the app

### Multi-Step Form Architecture
- 4-step wizard pattern: Vision → Technology → Team → Documents
- Each step is a separate component (`step-one.tsx`, `step-two.tsx`, etc.)
- Progress tracking with completion percentages
- Form state managed at page level and passed down to step components

### Data Persistence
- **NocoDB** as the backend database (hosted at app.nocodb.com)
- `nocoDBService` class in `lib/nocodb.ts` handles CRUD operations
- `useProjectData` hook manages project state and auto-saving
- File uploads stored as attachments in NocoDB with S3 backend

### Key Design Patterns
- Custom hooks for shared logic (`use-language`, `use-project-data`, `use-toast`)
- Component composition for reusable UI elements
- Async params handling in Next.js 15 (params must be awaited)

## External Dependencies

### NocoDB (Database)
- Cloud-hosted at `app.nocodb.com`
- Requires environment variables:
  - `NEXT_PUBLIC_NOCODB_URL`: API endpoint
  - `NEXT_PUBLIC_NOCODB_TOKEN`: Authentication token
  - `NEXT_PUBLIC_NOCODB_BASE_ID`: Database identifier
- Table: `democracy_projects` stores all submissions
- Supports file attachments via S3-backed storage

### Vercel (Deployment)
- Primary deployment platform
- Automatic deployments from repository

### npm Packages
- `nocodb-sdk`: NocoDB API client
- `axios`: HTTP requests
- `framer-motion`: Animations
- `@hookform/resolvers` + `zod`: Form validation
- `date-fns`: Date formatting
- Full Radix UI component suite for accessible primitives