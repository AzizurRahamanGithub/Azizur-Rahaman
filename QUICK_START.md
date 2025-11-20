# Portfolio - Quick Start Guide

## Prerequisites
- Python 3.8+
- Node.js 14+
- Git

## Backend Setup (Django)

### 1. Navigate to Backend
\`\`\`bash
cd backend
\`\`\`

### 2. Create Virtual Environment
\`\`\`bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
\`\`\`

### 3. Install Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 4. Setup Database (IMPORTANT!)
\`\`\`bash
python setup_db.py
\`\`\`

This command will:
- ✓ Create all database tables
- ✓ Add sample data
- ✓ Show next steps

### 5. Create Admin User
\`\`\`bash
python manage.py createsuperuser
# Follow prompts to create username, email, password
\`\`\`

### 6. Run Backend Server
\`\`\`bash
python manage.py runserver
# Visit: http://localhost:8000/admin
\`\`\`

## Frontend Setup (React/Next.js)

### 1. Go Back to Root Directory
\`\`\`bash
cd ..
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Create Environment File
\`\`\`bash
# Create .env.local file
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
\`\`\`

### 4. Run Frontend Server
\`\`\`bash
npm run dev
# Visit: http://localhost:3000
\`\`\`

## Running Both Servers

You need **two terminal windows**:

### Terminal 1 (Backend)
\`\`\`bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
\`\`\`

### Terminal 2 (Frontend)
\`\`\`bash
npm run dev
\`\`\`

## Accessing the Application

- **Frontend:** http://localhost:3000
- **Django Admin:** http://localhost:8000/admin
- **API:** http://localhost:8000/api/

## Managing Content

All content is managed from Django Admin:
1. Go to http://localhost:8000/admin
2. Login with your superuser credentials
3. Add/Edit:
   - Projects
   - Experience
   - Education
   - Achievements
   - Blog Posts
   - Courses
   - And more!

## Troubleshooting

### "no such table" error
Run: \`python setup_db.py\`

### API Connection Failed
- Make sure backend is running: \`python manage.py runserver\`
- Check .env.local has correct API_URL
- Ensure CORS is configured in settings.py

### Port Already in Use
- Backend (port 8000): \`python manage.py runserver 8001\`
- Frontend (port 3000): \`npm run dev -- -p 3001\`
- Update .env.local API_URL if backend port changes

## Database Reset

To start fresh with sample data:
\`\`\`bash
cd backend
rm db.sqlite3  # or delete on Windows
python setup_db.py
\`\`\`

---

**Questions?** Check Django/Next.js documentation or review the code comments.
