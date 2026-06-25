<div align="center">

# 🏦 LoanLink

### AI-Powered Loan Management Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Frontend-brightgreen?style=for-the-badge&logo=netlify)](https://loan-link-client.netlify.app/)
[![Backend API](https://img.shields.io/badge/API-Backend-black?style=for-the-badge&logo=vercel)](https://loan-link-server-phi.vercel.app)
[![AI Service](https://img.shields.io/badge/AI%20Service-Render-blue?style=for-the-badge&logo=render)](https://loanlink-ai-service.onrender.com/)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-AI%20Service-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Operational%20DB-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Analytics%20DB-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini%202.5%20Flash-AI%20Engine-8E75B2?style=flat-square&logo=google)](https://deepmind.google/technologies/gemini/)

**A production-grade full-stack loan platform featuring a decoupled AI microservice, polyglot persistence, and dynamic PDF report generation.**

[🔗 Frontend Repo](https://github.com/TanijRoy1/loan-link-client) · [🔗 Backend Repo](https://github.com/TanijRoy1/loan-link-server) · [🔗 AI Service Repo](https://github.com/TanijRoy1/loanlink-ai-service)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Screenshots](#-screenshots)
- [Why This Project Stands Out](#-why-this-project-stands-out)
- [System Architecture](#-system-architecture)
- [AI-Powered Loan Analysis](#-ai-powered-loan-analysis)
- [AI Report Architecture](#-ai-report-architecture)
- [PDF Generation Pipeline](#-pdf-generation-pipeline)
- [AI Workflow Diagram](#-ai-workflow-diagram)
- [Deployment Architecture](#-deployment-architecture)
- [Core Features](#-core-features)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [Local Installation](#-local-installation)
- [Testing the AI Report Feature](#-testing-the-ai-report-feature)
- [Technical Highlights](#-technical-highlights)
- [Challenges & Learnings](#-challenges--learnings)
- [Author](#-author)

---

## 🧩 Project Overview

**LoanLink** is a production-grade full-stack loan management platform built on the MERN stack, extended with a decoupled **AI microservice** powered by **Gemini 2.5 Flash**.

Users can browse loan products, submit applications, pay fees, and track their application status through a role-aware dashboard. Managers and Admins can review applications, approve or reject them, and trigger AI-generated financial analysis reports that are persisted in PostgreSQL and delivered as downloadable PDFs.

The platform demonstrates real-world engineering decisions: **microservice separation**, **polyglot persistence**, **type-safe backend development**, and **AI integration** — all deployed independently across Netlify, Vercel, and Render.

---

## 📸 Screenshots

### Dashboard

![Dashboard](./src/assets/loanLinkDashboard.png)

> _Role-based dashboard with loan management, application tracking, and platform analytics._

### AI Report Generation

![AI Report](./src/assets/generate-ai-report.png)

> _AI-generated financial analysis report with risk assessment, repayment breakdown, and downloadable PDF._

---

## 🏆 Why This Project Stands Out

> _Written from a recruiter and technical interviewer perspective._

Most MERN portfolio projects demonstrate CRUD operations and basic authentication. **LoanLink goes significantly further** across multiple engineering dimensions:

| Dimension | What LoanLink Demonstrates |
|---|---|
| **Architecture** | Decoupled AI microservice with independent deployment and REST communication |
| **Database Design** | Polyglot persistence — MongoDB for operational data, PostgreSQL for analytical reports |
| **Type Safety** | Full TypeScript AI service with Prisma ORM and schema-driven development |
| **AI Integration** | Production-grade Gemini 2.5 Flash integration with structured prompt engineering |
| **PDF Generation** | Dynamic server-side PDF creation using PDFKit, not a third-party SaaS |
| **Auth Architecture** | Firebase Authentication on the client with Firebase Admin SDK + JWT on the server |
| **Role-Based Access** | Three-tier RBAC (User / Manager / Admin) with protected route enforcement |
| **State Management** | React Query for server state, reducing boilerplate and enabling cache invalidation |
| **DevOps** | Three independently deployed services across three different cloud providers |

This project demonstrates the ability to **design systems, not just write features** — a key differentiator at senior engineering levels.

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Client ["🖥️ React Client — Netlify"]
        A[React + React Router]
        B[React Query]
        C[Firebase Auth]
        D[Axios]
    end

    subgraph MainBackend ["⚙️ Express Backend — Vercel"]
        E[Express.js REST API]
        F[Firebase Admin SDK]
        G[JWT Middleware]
        H[MongoDB via Mongoose]
    end

    subgraph AIService ["🤖 AI Microservice — Render"]
        I[Express.js TypeScript]
        J[Prisma ORM]
        K[PostgreSQL]
        L[Gemini 2.5 Flash]
        M[PDFKit]
    end

    A --> |HTTP Requests + Bearer Token| E
    C --> |ID Token| E
    E --> |Verify Token| F
    E --> H
    E --> |REST API Call| I
    I --> J
    J --> K
    I --> L
    L --> |AI Analysis| I
    I --> M
    M --> |PDF Buffer| E
    E --> |PDF Response| A
```

---

## 🤖 AI-Powered Loan Analysis

The AI microservice is the most architecturally distinct part of LoanLink. When a Manager or Admin triggers report generation, the main backend **delegates** to the AI service via a REST call. The AI service processes the application data, queries Gemini 2.5 Flash, persists the report, and returns a structured analysis.

### Input Payload

```ts
{
  loanId: string;
  userId: string;
  applicantName: string;
  monthlyIncome: number;
  loanAmount: number;
  duration: number;       // in months
  purpose: string;
}
```

### AI-Generated Report Sections

| Section | Description |
|---|---|
| **Financial Summary** | Overview of the applicant's financial position relative to the loan request |
| **Repayment Analysis** | Monthly EMI estimates, debt-to-income ratio, repayment capacity assessment |
| **Risk Assessment** | Risk classification (Low / Medium / High) with supporting reasoning |
| **AI Recommendations** | Structured suggestions for approval, conditions, or rejection |

### Prompt Engineering

The service uses structured prompting to ensure consistent, parseable output from Gemini 2.5 Flash. The prompt enforces a defined response schema, enabling reliable JSON extraction and safe persistence into PostgreSQL.

---

## 🗄️ AI Report Architecture

LoanLink intentionally uses **two separate databases** for two different responsibilities:

```
┌─────────────────────────────────────────────────────┐
│                  Polyglot Persistence                │
├──────────────────────────┬──────────────────────────┤
│       MongoDB            │       PostgreSQL          │
│   (Operational DB)       │    (Analytical DB)        │
├──────────────────────────┼──────────────────────────┤
│ • User profiles          │ • AI-generated reports   │
│ • Loan products          │ • Risk analysis text     │
│ • Applications           │ • Recommendations JSON   │
│ • Fees & transactions    │ • Report metadata        │
│ • Manager/Admin actions  │ • Indexed by loanId      │
└──────────────────────────┴──────────────────────────┘
```

**Why PostgreSQL for reports?**

- Report data is **relational and structured** — each report maps to a loan and a user with well-defined foreign keys
- PostgreSQL's **JSONB** support handles the flexible `recommendations` array natively
- **Indexing on `loanId` and `userId`** enables efficient lookups during PDF regeneration
- Separation of concerns: the AI service owns its own persistence layer, enforcing **service autonomy**

### Prisma Schema — Report Model

```prisma
model Report {
  id                String   @id @default(cuid())
  loanId            String?
  userId            String?
  applicantName     String?
  monthlyIncome     Float?
  loanAmount        Float?
  duration          Int?
  purpose           String?

  summary           String?
  repaymentAnalysis String?
  riskAnalysis      String?
  recommendations   Json?

  status            String   @default("completed")

  generatedAt       DateTime @default(now())
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([loanId])
  @@index([userId])
}
```

**Schema design notes:**
- `@default(cuid())` provides collision-resistant distributed IDs without auto-increment coupling
- `recommendations` is typed as `Json?` to store a flexible array of AI-generated suggestion objects
- Dual indexing on `loanId` and `userId` optimizes the two most common query patterns
- `generatedAt` is separate from `createdAt` to track AI generation time independently from record creation

---

## 📄 PDF Generation Pipeline

After AI analysis completes, the system executes a multi-step pipeline before delivering the PDF to the end user:

```
1. ┌─────────────────────────────────┐
   │  AI analysis generated by       │
   │  Gemini 2.5 Flash               │
   └────────────────┬────────────────┘
                    │
2. ┌────────────────▼────────────────┐
   │  Report persisted in            │
   │  PostgreSQL via Prisma ORM      │
   └────────────────┬────────────────┘
                    │
3. ┌────────────────▼────────────────┐
   │  Report metadata synced back    │
   │  to MongoDB (reportId, status)  │
   └────────────────┬────────────────┘
                    │
4. ┌────────────────▼────────────────┐
   │  PDF generated dynamically      │
   │  using PDFKit (server-side)     │
   └────────────────┬────────────────┘
                    │
5. ┌────────────────▼────────────────┐
   │  PDF buffer streamed back to    │
   │  main backend → client          │
   └────────────────┬────────────────┘
                    │
6. ┌────────────────▼────────────────┐
   │  User downloads the PDF         │
   │  instantly in the browser       │
   └─────────────────────────────────┘
```

PDF content includes the applicant's profile, loan details, all four AI-generated analysis sections, and a generation timestamp — formatted as a professional financial report.

---

## 🔄 AI Workflow Diagram

```mermaid
flowchart TD
    A([Manager / Admin Views Application]) --> B[Click: Generate AI Report]
    B --> C[Main Backend receives request]
    C --> D{Validate role & application}
    D -->|Authorized| E[POST to AI Microservice]
    D -->|Unauthorized| Z([403 Forbidden])
    E --> F[Gemini 2.5 Flash]
    F --> G[Generate Structured Analysis]
    G --> H[Persist Report in PostgreSQL]
    H --> I[Sync Metadata to MongoDB]
    I --> J[Generate PDF with PDFKit]
    J --> K[Stream PDF to Backend]
    K --> L([Client Downloads PDF])

    style A fill:#4CAF50,color:#fff
    style L fill:#2196F3,color:#fff
    style Z fill:#f44336,color:#fff
    style F fill:#8E75B2,color:#fff
```

---

## ☁️ Deployment Architecture

```mermaid
graph LR
    subgraph Netlify ["🌐 Netlify"]
        FE[React Frontend\nSPA with CDN]
    end

    subgraph Vercel ["▲ Vercel"]
        BE[Express Backend\nServerless Functions]
        MDB[(MongoDB Atlas)]
    end

    subgraph Render ["🔵 Render"]
        AI[AI Microservice\nTypeScript + Express]
        PG[(PostgreSQL)]
    end

    FE -->|HTTPS REST| BE
    BE -->|Mongoose ODM| MDB
    BE -->|HTTPS REST| AI
    AI -->|Prisma ORM| PG
    AI -->|Gemini API| GEM[☁️ Google Gemini]
```

| Service | Platform | Reason |
|---|---|---|
| React Frontend | Netlify | Optimized CDN for static SPA delivery |
| Express Backend | Vercel | Serverless-friendly, zero-config Node.js deployment |
| AI Microservice | Render | Always-on container for long-running AI inference tasks |

---

## ✨ Core Features

### 👤 User Features

- 🔐 Register and log in with Firebase Authentication
- 🏷️ Browse available loan categories and products
- 📝 Apply for loans via a multi-step form (React Hook Form)
- 💳 Pay application fees
- 📊 Track loan application status in real time
- 📁 Manage personal profile and view loan history
- 📱 Fully responsive dashboard

### 🧑‍💼 Manager Features

- 📋 Review incoming loan applications
- ✅ Approve or ❌ reject applications with notes
- 📈 Monitor active loan activity
- 🤖 Trigger AI financial analysis reports
- 📄 Download PDF reports

### 🛡️ Admin Features

- 👥 Manage users — promote or suspend accounts
- 🗂️ Manage loan categories and products
- 📊 Monitor all platform activities
- 🤖 Generate AI reports on any application
- 📄 Download PDF reports

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | UI component framework |
| React Router | Client-side navigation and protected routes |
| React Query | Server state management and caching |
| Tailwind CSS | Utility-first styling |
| DaisyUI | Tailwind component library |
| Axios | HTTP client for API communication |
| Firebase Authentication | User identity and session management |
| React Hook Form | Performant form handling and validation |
| Recharts | Data visualization and analytics charts |
| Framer Motion | Animation and page transition effects |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | Operational database (users, loans, applications) |
| Firebase Admin SDK | Server-side token verification |
| JWT | Stateless authorization tokens |

### AI Microservice

| Technology | Purpose |
|---|---|
| TypeScript | Type-safe development across the service |
| Express.js | REST API framework |
| Prisma ORM | Type-safe database access layer |
| PostgreSQL | Analytical report persistence |
| Gemini 2.5 Flash | AI language model for financial analysis |
| PDFKit | Dynamic server-side PDF generation |

### Deployment

| Service | Platform |
|---|---|
| Frontend | Netlify |
| Backend | Vercel |
| AI Microservice | Render |

---

## 📁 Folder Structure

### Frontend — `loan-link-client`

```
loan-link-client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── shared/          # Navbar, Footer, Loader
│   │   ├── ui/              # Reusable UI primitives
│   │   └── dashboard/       # Role-specific dashboard panels
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Page layout wrappers
│   ├── pages/
│   │   ├── Home/
│   │   ├── Loans/
│   │   ├── Dashboard/
│   │   │   ├── User/
│   │   │   ├── Manager/
│   │   │   └── Admin/
│   │   └── Auth/
│   ├── providers/           # QueryClientProvider, AuthProvider
│   ├── routes/              # Route definitions and guards
│   ├── services/            # Axios API call abstractions
│   └── utils/
├── .env
└── package.json
```

### Backend — `loan-link-server`

```
loan-link-server/
├── src/
│   ├── config/              # DB connection, Firebase Admin init
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── loan.controller.js
│   │   ├── application.controller.js
│   │   └── report.controller.js
│   ├── middlewares/
│   │   ├── verifyToken.js
│   │   └── verifyRole.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Loan.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── loan.routes.js
│   │   ├── application.routes.js
│   │   └── report.routes.js
│   └── utils/
├── .env
├── index.js
└── package.json
```

### AI Microservice — `loanlink-ai-service`

```
loanlink-ai-service/
├── prisma/
│   ├── schema.prisma        # Report model definition
│   └── migrations/
├── src/
│   ├── config/              # Gemini client, Prisma client init
│   ├── controllers/
│   │   └── report.controller.ts
│   ├── routes/
│   │   └── report.routes.ts
│   ├── services/
│   │   ├── gemini.service.ts   # Prompt construction + AI call
│   │   ├── report.service.ts   # PostgreSQL persistence
│   │   └── pdf.service.ts      # PDFKit generation
│   ├── types/
│   │   └── report.types.ts
│   └── utils/
├── .env
├── app.ts
└── package.json
```

---

## 🚀 Local Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas URI)
- PostgreSQL (local or cloud instance)
- Firebase project (for Auth)
- Google Gemini API key

---

### 1. Frontend

```bash
# Clone the repository
git clone https://github.com/TanijRoy1/loan-link-client.git
cd loan-link-client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**`.env` configuration:**

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

```bash
# Start development server
npm run dev
```

---

### 2. Backend

```bash
# Clone the repository
git clone https://github.com/TanijRoy1/loan-link-server.git
cd loan-link-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**`.env` configuration:**

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_jwt_secret_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
AI_SERVICE_URL=http://localhost:4000
```

```bash
# Start development server
npm run dev
```

---

### 3. AI Microservice

```bash
# Clone the repository
git clone https://github.com/TanijRoy1/loanlink-ai-service.git
cd loanlink-ai-service

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**`.env` configuration:**

```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/loanlink_ai
GEMINI_API_KEY=your_gemini_api_key
```

```bash
# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

---

## 🧪 Testing the AI Report Feature

### Manager Flow

1. Log in with a **Manager** account
2. Navigate to **Dashboard → Approved Applications**
3. Open any approved application
4. Click **Generate AI Report**
5. Wait for the AI analysis to complete (~5–10 seconds)
6. Click **Download PDF** to receive the financial report

### Admin Flow

1. Log in with an **Admin** account
2. Navigate to **Dashboard → Loan Applications**
3. Open any application
4. Click **Generate AI Report**
5. Click **Download PDF**

### Behind the Scenes

When **Generate AI Report** is clicked, the following sequence executes:

```
Client → POST /api/reports/generate
       → Backend validates JWT + role
       → Backend calls AI Service: POST /report/generate
       → AI Service constructs Gemini prompt with application data
       → Gemini 2.5 Flash generates structured financial analysis
       → Analysis is parsed and persisted in PostgreSQL
       → Report ID is synced back to MongoDB on the application document
       → PDFKit generates a formatted PDF in memory
       → PDF buffer is streamed back through the backend to the client
       → Browser triggers file download
```

---

## ⚡ Technical Highlights

| Highlight | Detail |
|---|---|
| 🏛️ **Microservice Architecture** | AI service runs independently with its own runtime, database, and deployment |
| 🔗 **REST API Communication** | Synchronous inter-service communication between backend and AI service |
| 🔷 **TypeScript** | End-to-end type safety in the AI service with strict compiler config |
| 🗃️ **Prisma ORM** | Schema-first database access with auto-generated types and migrations |
| 🐘 **PostgreSQL** | Relational persistence optimized for structured analytical report data |
| 🍃 **MongoDB** | Document store for flexible, fast operational data (loans, users, applications) |
| 🔀 **Polyglot Persistence** | Each database is chosen for its specific data access patterns |
| 🤖 **Gemini 2.5 Flash** | Structured prompt engineering with consistent, parseable AI output |
| 📄 **Dynamic PDF Generation** | Server-side PDF creation with PDFKit — no third-party SaaS dependency |
| 🔐 **Role-Based Access Control** | Three-tier RBAC enforced at middleware and controller levels |
| 🔥 **Firebase Auth** | Client-side authentication with server-side verification via Admin SDK |
| ⚛️ **Modern React Architecture** | Compound components, custom hooks, and provider-pattern composition |
| 🔄 **React Query** | Automatic caching, background refetching, and optimistic updates |

---

## 🧠 Challenges & Learnings

### Challenges Solved

**1. Integrating a Decoupled AI Microservice**
The main backend and AI service had to communicate reliably without tight coupling. This required designing a clear REST contract between services and handling partial failures gracefully (e.g., AI service timeout while main backend remains responsive).

**2. Cross-Database Consistency**
With MongoDB storing applications and PostgreSQL storing reports, keeping metadata in sync required explicit design. A report ID from PostgreSQL is written back to the MongoDB application document after each generation — creating a lightweight reference without tight transactional coupling.

**3. Designing the Report Persistence Layer**
Choosing the right schema for AI-generated content meant balancing flexibility (`Json?` for recommendations) with queryability (indexed `loanId` and `userId` columns). The Prisma schema was iterated to reflect both requirements.

**4. Dynamic PDF Generation**
PDFKit requires building documents imperatively — positioning text, setting styles, and managing page breaks in code. Generating readable, structured reports from raw AI output required careful layout logic.

**5. Maintaining Service Separation**
Ensuring the AI service remained independently deployable and testable meant resisting the temptation to share database connections or code directly. Each service is fully autonomous.

### Lessons Learned

- **Microservice communication** requires clear interface contracts and resilient error handling
- **Polyglot persistence** is a genuine engineering decision — not all data fits the same database model
- **AI integration** at the application layer requires prompt engineering discipline to get consistent, usable output
- **Type-safe backends** with Prisma + TypeScript dramatically reduce runtime errors in data access code
- **Scalable architecture** means each service can be scaled, deployed, and maintained independently

---

## 👤 Author

<div align="center">

**Tanij Roy**

[![GitHub](https://img.shields.io/badge/GitHub-TanijRoy1-181717?style=for-the-badge&logo=github)](https://github.com/TanijRoy1)

_Built with precision. Designed for production. Ready for scale._

</div>

---

<div align="center">

**🌟 If this project impressed you, consider starring the repositories!**

[⭐ Frontend](https://github.com/TanijRoy1/loan-link-client) · [⭐ Backend](https://github.com/TanijRoy1/loan-link-server) · [⭐ AI Service](https://github.com/TanijRoy1/loanlink-ai-service)

</div>