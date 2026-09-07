# D2D

A full-stack web application built with **Next.js** and **Node.js/Express.js** using a separate client-server architecture.

The project combines a modern frontend with a backend responsible for API handling, authentication, database operations, file uploads, cloud storage, and email-related functionality.

---

## Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion
* Axios
* React Hook Form
* Zod
* Radix UI
* Lucide React
* Swiper
* Recharts
* Sonner

### Backend

* Node.js
* Express.js
* MySQL
* Sequelize
* JWT Authentication
* bcryptjs
* Express Session
* AWS S3
* Multer
* Multer S3
* Nodemailer
* Express Validator
* Cookie Parser
* CORS
* Morgan
* dotenv

---

# Project Structure

```text
d_to_d/
│
├── Client/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── components.json
│   ├── next.config.mjs
│   ├── package.json
│   ├── tsconfig.json
│   └── postcss.config.mjs
│
└── Server/
    ├── controllers/
    ├── middleware/
    ├── modules/
    ├── routes/
    ├── utils/
    ├── D2Dserver.js
    ├── test-db.js
    └── package.json
```

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Pijushpatra2/d_to_d.git
```

Navigate to the project:

```bash
cd d_to_d
```

---

# Frontend Setup

Navigate to the Client directory:

```bash
cd Client
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

# Backend Setup

Navigate to the Server directory:

```bash
cd Server
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run the production server:

```bash
npm start
```

---

# Environment Variables

Create a `.env` file inside the `Server` directory.

Example configuration:

```env
PORT=5000

# Database
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

# Authentication
JWT_SECRET=your_jwt_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name

# Email
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

> Never upload your `.env` file or sensitive credentials to GitHub.

---

# Application Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Next.js Client  │
                    │                  │
                    │  React + TS      │
                    │  Tailwind CSS    │
                    └────────┬─────────┘
                             │
                         API Requests
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express.js Server│
                    │                  │
                    │ Routes           │
                    │ Controllers      │
                    │ Middleware       │
                    └───────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │  MySQL   │  │ AWS S3   │  │  Email   │
        │ Database │  │ Storage  │  │ Service  │
        └──────────┘  └──────────┘  └──────────┘
```

---

# Backend Capabilities

The backend architecture includes support for:

* REST API development
* User authentication
* JWT-based authorization
* Password hashing with bcrypt
* Session management
* MySQL database integration
* Sequelize ORM
* Request validation
* File uploads
* AWS S3 cloud storage
* Email functionality
* Middleware-based request handling
* Cookie management
* CORS configuration
* Request logging

---

# Frontend Capabilities

The frontend is built using modern technologies and includes:

* Next.js App Router architecture
* TypeScript
* Responsive user interface
* Reusable components
* Tailwind CSS
* Radix UI components
* Form handling
* Form validation with Zod
* API communication with Axios
* Animations with Framer Motion
* Icons with Lucide React
* Carousel functionality
* Charts and data visualization
* Toast notifications

---

# Available Scripts

## Client

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

---

## Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

# Security

This project uses several security-related practices and technologies:

* Password hashing using bcryptjs
* JWT authentication
* Environment variables using dotenv
* Server-side validation
* Cookie handling
* Session management

---

# 📸 Screenshots

You can add screenshots of the application here.

```md
![Home Page](./screenshots/home.png)
![Dashboard](./screenshots/dashboard.png)
```


# Author

**Pijush Patra**

Full Stack Developer

GitHub: https://github.com/Pijushpatra2

---

# License

This project is intended for development and educational purposes.

---

If you found this project useful, consider giving the repository a star!
