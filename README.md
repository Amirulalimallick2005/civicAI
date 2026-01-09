# 🏛️ CivicAI – AI-Powered Civic Issue Reporting & Governance Platform

CivicAI is a full-stack **AI-powered civic governance platform** that enables citizens to report public infrastructure issues using images and allows municipal authorities to efficiently manage, assign, track, and resolve those issues through a transparent, data-driven system.

This project is designed as a **gov-tech / smart city solution** using modern AI, backend, and frontend technologies.

---

## 🚀 Vision & Objective

Urban governance systems often suffer from:
- Manual complaint handling
- Delayed response times
- Poor accountability
- Lack of transparency
- Inefficient workforce allocation

**CivicAI solves these problems by combining AI + digital governance**, creating a system where:
- Citizens can report issues instantly
- AI validates and categorizes complaints
- Authorities get structured dashboards
- Workers are tracked with accountability
- Decisions are driven by real data

---

## 🧠 Core Concept

> “Use AI as an assistant, not a replacement — with human oversight and accountability.”

CivicAI ensures:
- AI assists in detection
- Humans validate decisions
- Every action is logged
- No complaint disappears silently

---

## 🧩 System Modules

### 1️⃣ Citizen (Public User) Portal
Mobile-first responsive web interface.

**Features**
- Capture image using camera or upload
- Auto GPS location capture
- AI-based issue detection
- Confidence score display
- Issue confirmation by user
- Auto-generated complaint report
- Transparent submission preview
- Complaint tracking & status timeline

---

### 2️⃣ AI Intelligence Layer
Computer vision powered decision engine.

**Capabilities**
- Civic issue image classification
- Confidence threshold validation
- Non-civic image rejection
- Multi-issue detection handling
- AI verification (before vs after fix)
- Prevents fake or irrelevant complaints

---

### 3️⃣ Authority Dashboard (Municipal / Known Departments)

**Departments Supported**
- Sanitation
- Water Supply
- Roads & Infrastructure
- Electrical
- Drainage
- (Expandable)

**Features**
- Secure role-based login
- Department selection after login
- Live city map with issue markers
- Issue list with filters & sorting
- Assign / reject / escalate issues
- SLA tracking & auto escalation
- Worker management & performance stats
- Analytics, reports, and heatmaps

---

### 4️⃣ Field Worker Portal

**Features**
- Secure worker login
- Daily assigned tasks
- Priority-based task list
- Map navigation to issue location
- Upload after-fix image
- Task history & accountability

---

## 🏗️ System Architecture




---

## 🛠️ Technology Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- ShadCN UI
- Mobile-first design

### Backend
- FastAPI (Python)
- JWT Authentication
- Role-based access control
- REST APIs

### Database
- PostgreSQL
- SQLAlchemy ORM
- Alembic migrations

### AI / ML
- TensorFlow / Keras
- Image classification model
- Confidence-based validation
- Invalid image detection

---

## 📁 Project Structure


---

## 🔐 User Roles & Permissions

| Role | Capabilities |
|----|-------------|
| Citizen | Report & track issues |
| Authority Officer | Manage issues |
| Department Head | SLA & escalation |
| Field Worker | Resolve assigned tasks |
| Admin | System-wide oversight |

---

## 📊 Analytics & Governance Intelligence

- Monthly issue trends
- Ward-wise heatmaps
- Department performance metrics
- SLA compliance monitoring
- Workforce efficiency analytics
- Downloadable reports (CSV / PDF)

---

## 🧪 AI Confidence Logic

- High confidence → Auto accepted
- Medium confidence → User confirmation
- Low confidence → Marked invalid
- “Others / Non-civic” → Rejected automatically

This prevents misuse and improves data quality.

---

## ⚙️ Local Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

---

If you want next, I can give you:
- API documentation (Swagger)
- ER diagram
- Database schema
- Deployment guide (Docker / AWS)
- Research paper format

Just say the word.


