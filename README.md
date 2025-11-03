# Role-Based Access Control (RBAC) MERN App

A full-featured, modern MERN stack app implementing fine-grained role-based access control with a production-like UI inspired by [Nitro Nerd](https://nitro-nerd.odoo.com/) and robust authentication/authorization for Admin, Editor, and Viewer users.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Project Screenshots](#project-screenshots)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage Guide](#usage-guide)
- [RBAC Permissions](#rbac-permissions)
- [Project Structure](#project-structure)
- [Customization & Theming](#customization--theming)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Links](#contact--links)

---

## About the Project

This MERN (MongoDB, Express.js, React, Node.js) project demonstrates secure user authentication, registration, and fine-grained role-based authorization for a multi-user SaaS-style dashboard.

- **Inspired by:** modern UI/UX like [Nitro Nerd](https://nitro-nerd.odoo.com)
- **Roles:** Admin, Editor, Viewer  
- Built for education, team management, and secure CRUD applications.

---

## Key Features

- **JWT Authentication:** Secure login, registration, and session management.
- **RBAC Middleware:** Backend enforces exact capabilities per role via modular middleware.
- **Role Matrix:** 
  - Admin: Manage users, view all, create posts.
  - Editor: Create posts, view all.
  - Viewer: Read-only access.
- **Modern Responsive UI:** Professionally styled homepage, dashboard, and navigation.
- **UI Guarding:** Page elements/controls visible only if user’s role allows.
- **Statistics & Cards:** Dynamic stats/info boxes on homepage.
- **FAQ & Info Sections:** Pre-built RBAC/SaaS Q&A.
- **One-Admin-Only:** Only the seeded user is admin.
- **REST API:** Modular endpoints for easy extension.
- **Seed Data:** Preloaded admin and example editor/viewer for quick testing.

---

## Project Screenshots

<!-- Add screenshots here -->
<!-- ![Homepage](screenshots/home.png) -->

---

## Tech Stack

- **Frontend:** React.js (React Router, Axios), Tailwind CSS or Bootstrap
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MongoDB + Mongoose
- **Other:** dotenv, concurrently

---

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

### Clone & Install

```bash
git clone https://github.com/yourusername/rbac-mern-app.git
cd rbac-mern-app
npm install
cd client
npm install
```


### Environment Variables

Create a `.env` file at the project root:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/rbac_mern_app
JWT_SECRET=your_super_secret_key
```


### Start the App

From root:
```bash
npm run dev
```

(Runs server and React via concurrently)

---

## Usage Guide

1. Seeded **admin user** created at startup (see `/seed.js`).
2. New users can register as **editor** or **viewer** (admin registration restricted).
3. Log in with username & password.
4. UI adapts to role:
    - Admins: Manage users, create/view all posts
    - Editors: Create/view posts
    - Viewers: View posts only
5. Restricted actions/routes return error or hide UI controls.

---

## RBAC Permissions

| Role    | View Users | Manage Users | Create Posts | View Posts |
|---------|:----------:|:------------:|:------------:|:----------:|
| Admin   | ✅         | ✅           | ✅           | ✅         |
| Editor  | ✅         | ❌           | ✅           | ✅         |
| Viewer  | ✅         | ❌           | ❌           | ✅         |

---

## Project Structure

```bash
rbac-mern-app/
├─ client/ # React frontend
├─ models/ # Mongoose Users/Posts schema
├─ middleware/ # Auth & RBAC middleware
├─ routes/ # Express route handlers
├─ seed.js # Admin user seeder
├─ server.js # Express app entry
└─ .env # Config
```

---

## Customization & Theming

- **UI Theme:** Nitro-Nerd inspired; soft colors, card layouts, hero banners.
- **Logo/Branding:** Replace `/client/public/logo.png`.
- **Landing Page:** Edit `/client/src/pages/Home.js`.
- **Colors & Fonts:** Tailwind or Bootstrap theme.
- **Role Names:** Adjust in `/models/User.js` and in UI guards.

---

## Contributing

PRs and suggestions welcomed!  
Please follow standard commit/code style. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## License

MIT

---

## Contact & Links

- **Author:** [Your Name]
- **GitHub:** [github.com/yourusername/rbac-mern-app](https://github.com/yourusername/rbac-mern-app)
- **Live Demo:** [link here]

---

*Inspired by Nitro-Nerd, built for modern RBAC education and development.*
