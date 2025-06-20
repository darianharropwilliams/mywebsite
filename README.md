# Personal Portfolio Website

This is the source code for my personal portfolio website, designed and developed from scratch to showcase my work, background, and technical capabilities. The site is live and fully functional, but this repository primarily exists for recruiters and collaborators to explore the code I’ve written behind it.

## Overview

The site includes several interactive sections like a custom project showcase, blog, skills viewer, and a CHIP-8 emulator demo. It is a single-developer project built to be fast, responsive (desktop-first), and visually clean. All content, routing, state management, and animations are handcrafted rather than scaffolded from templates or site builders.

## Tech Stack

**Frontend:**
- React (w/ hooks and functional components)
- React Router for routing
- Framer Motion for animations
- MUI (Material UI) for some components
- Axios for API communication
- ReCAPTCHA integration
- Custom CSS (organized per-component)

**Backend:**
- Node.js with Express
- MongoDB for dynamic content (projects, blog posts, skills)
- RESTful API architecture
- Helmet, CORS, and rate-limiting middleware for security and control

**Other:**
- WebAssembly for CHIP-8 emulator
- Vercel for frontend hosting and analytics
- Environment-based configuration for dev/prod separation
- Modular project structure with lazy loading and prefetching logic

## Structure Overview

```
.
├── backend/                   # Backend API built with Express and MongoDB
│   ├── config/                # Configuration files (e.g., DB connection)
│   ├── controllers/           # Business logic for each route group
│   ├── middlewares/           # Custom Express middleware (auth, logging, etc.)
│   ├── models/                # Mongoose schemas defining data models
│   ├── routes/                # Express route definitions (REST endpoints)
│   ├── scripts/               # Migration/seeding scripts for MongoDB
│   ├── services/              # Optional abstraction layer for business logic
│   ├── utils/                 # Helper functions and utilities
│   ├── package.json           # Backend dependencies and scripts
│   └── server.js              # Main entry point for Express server
│
├── client/                    # Frontend React application
│   ├── public/                # Static assets and public files
│   │   └── wasm/chip8/        # CHIP-8 emulator WebAssembly + ROMs
│   ├── src/                   # Application source code
│   │   ├── components/        # Reusable UI components (e.g., cards, nav, forms)
│   │   ├── data/              # Static JSON data (page titles, descriptions, links)
│   │   ├── pages/             # Route-based React pages (Home, Blog, etc.)
│   │   ├── utils/             # Frontend utilities (e.g., caching)
│   │   ├── App.jsx            # App layout and React Router setup
│   │   └── index.js           # React application entry point
│   ├── package.json           # Frontend dependencies and scripts
│   └── build/                 # Production-ready static output (auto-generated)
│
├── .gitignore                 # Git ignored files
├── README.md                  # Project overview and usage
```


## Purpose

This project is not intended for reuse or as a template. It’s a personal codebase demonstrating my ability to design, implement, and maintain a full-stack web application on my own. Feel free to browse and explore!
