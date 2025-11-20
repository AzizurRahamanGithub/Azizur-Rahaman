# Portfolio CMS - Complete Setup Guide

This is a full-stack portfolio with Django REST Framework backend and Next.js frontend. Everything is managed through Django admin dashboard.

## System Requirements

- Python 3.9+
- Node.js 16+
- npm or yarn
- Git

## Backend Setup (Django REST Framework)

### Step 1: Navigate to backend directory
\`\`\`bash
cd backend
\`\`\`

### Step 2: Create virtual environment
\`\`\`bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
\`\`\`

### Step 3: Install dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Step 4: Create requirements.txt (if not exists)
\`\`\`bash
pip install django djangorestframework django-cors-headers pillow
pip freeze > requirements.txt
\`\`\`

### Step 5: Make migrations
\`\`\`bash
python manage.py makemigrations
python manage.py migrate
\`\`\`

### Step 6: Create superuser (admin account)
\`\`\`bash
python manage.py createsuperuser
# Follow prompts to create username, email, and password
\`\`\`

### Step 7: Run development server
\`\`\`bash
python manage.py runserver
\`\`\`

Backend will be running at: **http://localhost:8000**

### Step 8: Access Django Admin
- Go to: http://localhost:8000/admin
- Login with the superuser credentials you created
- Start managing your portfolio content

---

## Frontend Setup (Next.js)

### Step 1: Navigate to frontend directory (in new terminal/tab)
\`\`\`bash
cd .. && cd frontend
# Or if at root: cd portfolio-frontend
\`\`\`

### Step 2: Install dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Run development server
\`\`\`bash
npm run dev
\`\`\`

Frontend will be running at: **http://localhost:3000**

---

## What You Can Manage in Django Admin

### 1. **Site Settings**
   - Your name, tagline, bio
   - Years of experience
   - Resume URL/PDF link

### 2. **Hero Section**
   - Main title and subtitle
   - CTA button texts and links

### 3. **About Section**
   - Profile photo upload
   - Bio paragraphs (use [NEW_PARA] to separate)
   - Key achievements
   - Select which skills to display

### 4. **Skills**
   - Add/edit technologies
   - Categorize (Frontend, Backend, Tools, Other)
   - Set display order

### 5. **Projects**
   - Project title, description, category
   - Upload project thumbnail
   - Add tags (comma-separated)
   - Add live project link
   - Add GitHub repository link
   - Mark as featured
   - Set display order

### 6. **Experience**
   - Job title, company, dates
   - Description and achievements
   - Mark as current position

### 7. **Education**
   - Degree, institution, dates
   - Description
   - Mark as current

### 8. **Achievements**
   - Title, issuer, date
   - Type (Award, Certification, Competition, Recognition)

### 9. **Blog Posts**
   - Create blog articles
   - Upload featured image
   - Set as draft or published
   - Add read time estimate
   - Mark featured posts

### 10. **Contact Information**
   - Email, phone, location
   - GitHub, LinkedIn, Twitter links

---

## Project Directory Structure

\`\`\`
portfolio/
├── backend/
│   ├── portfolio_backend/
│   │   ├── settings.py       # Django configuration
│   │   ├── urls.py           # API routes
│   │   ├── wsgi.py
│   │   └── __init__.py
│   ├── portfolio/
│   │   ├── models.py         # Database models (ALL YOUR CONTENT)
│   │   ├── views.py          # API endpoints
│   │   ├── serializers.py    # JSON converters
│   │   ├── admin.py          # Admin dashboard config
│   │   └── migrations/
│   ├── manage.py
│   ├── db.sqlite3            # Database file
│   └── media/                # Uploaded images (photos, projects, etc.)
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Main page
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   ├── experience.tsx
│   │   ├── education.tsx
│   │   ├── achievements.tsx
│   │   └── ...
│   └── package.json
│
└── SETUP_GUIDE.md
\`\`\`

---

## Common Issues & Solutions

### Issue: "Failed to fetch" errors on frontend
**Solution:** Make sure backend is running on port 8000

### Issue: CORS errors
**Solution:** Backend CORS is already configured for localhost:3000. Check settings.py CORS_ALLOWED_ORIGINS

### Issue: Images not showing
**Solution:** 
1. Make sure you uploaded images in Django admin
2. Check that media folder exists at: \`backend/media/\`
3. Restart backend server after migration

### Issue: Admin page won't load
**Solution:**
1. Run migrations: \`python manage.py migrate\`
2. Check that db.sqlite3 exists
3. Create superuser again if needed

---

## API Endpoints (Backend URLs)

All endpoints return JSON:

- \`GET /api/site-settings/\` - Global settings
- \`GET /api/hero/\` - Hero section
- \`GET /api/about/\` - About section with profile photo
- \`GET /api/skills/\` - All skills
- \`GET /api/projects/\` - All projects
- \`GET /api/experience/\` - All work experience
- \`GET /api/education/\` - All education
- \`GET /api/achievements/\` - All achievements
- \`GET /api/blog/\` - All blog posts
- \`GET /api/contact-info/\` - Contact details

---

## Deployment

### Frontend (Vercel - Recommended)
\`\`\`bash
# Push to GitHub, then connect repo to Vercel dashboard
# Environment: Set NEXT_PUBLIC_API_URL to your backend URL
\`\`\`

### Backend (Heroku, Railway, Render, or your server)
\`\`\`bash
# Collect static files
python manage.py collectstatic --noinput

# Run with production server (gunicorn)
gunicorn portfolio_backend.wsgi:application
\`\`\`

---

## Adding Custom Fields

To add new fields to your portfolio:

1. Edit \`backend/portfolio/models.py\` - Add new field to relevant model
2. Create migration: \`python manage.py makemigrations\`
3. Apply migration: \`python manage.py migrate\`
4. Update \`backend/portfolio/serializers.py\` - Add field to serializer
5. Update \`backend/portfolio/admin.py\` - Add field to admin form
6. Update frontend component to display the data from API

---

## Need Help?

- Django Docs: https://docs.djangoproject.com
- DRF Docs: https://www.django-rest-framework.org
- Next.js Docs: https://nextjs.org/docs
- Python on VS Code: https://code.visualstudio.com/docs/python/python-tutorial
