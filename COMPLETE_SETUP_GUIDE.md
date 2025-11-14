# 🚀 Portfolio Project - Complete Setup Guide

This is a full-stack portfolio application with a Django REST Framework backend and Next.js frontend. All portfolio content is managed through Django Admin Dashboard.

## Project Structure

\`\`\`
portfolio/
├── backend/                          # Django REST API
│   ├── portfolio_backend/           # Project settings
│   ├── portfolio/                   # Main Django app
│   │   ├── models.py               # Database models
│   │   ├── serializers.py          # API serializers
│   │   ├── views.py                # API views
│   │   ├── admin.py                # Django admin config
│   │   └── urls.py                 # App URLs
│   ├── seed_data.py                # Sample data script
│   ├── requirements.txt            # Python dependencies
│   └── manage.py
├── app/                            # Next.js app
│   ├── page.tsx                    # Main page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/                     # React components
│   ├── hero.tsx
│   ├── about.tsx
│   ├── projects.tsx
│   ├── experience.tsx
│   ├── education.tsx
│   ├── achievements.tsx
│   ├── blog.tsx
│   ├── contact.tsx
│   └── ... other components
└── package.json
\`\`\`

## Backend Setup

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Virtual environment (recommended)

### Step 1: Create Virtual Environment

\`\`\`bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Step 3: Database Setup

\`\`\`bash
# Run migrations to create database tables
python manage.py migrate

# Create superuser for Django admin
python manage.py createsuperuser
# You'll be prompted to enter:
# - Username: admin
# - Email: admin@example.com
# - Password: (create a strong password)
\`\`\`

### Step 4: Seed Sample Data (Optional)

\`\`\`bash
python seed_data.py
\`\`\`

This will populate the database with:
- Sample projects (6 projects with descriptions, links, and categories)
- Work experience (3 positions with achievements)
- Education (2 entries)
- Blog posts (3 articles)
- Skills (15+ technologies)
- Achievements (3 awards/certifications)
- Contact information

### Step 5: Create Media Directories

\`\`\`bash
# Create necessary folders for uploaded files
mkdir -p media/profile
mkdir -p media/projects
mkdir -p media/blog
mkdir -p media/case-studies
\`\`\`

### Step 6: Run Backend Server

\`\`\`bash
python manage.py runserver
\`\`\`

Server will start at: http://localhost:8000

✅ Django Admin: http://localhost:8000/admin
- Username: admin
- Password: (your created password)

## Frontend Setup

### Prerequisites
- Node.js 18+ and npm/yarn

### Step 1: Install Dependencies

\`\`\`bash
cd ..
npm install
# or
yarn install
\`\`\`

### Step 2: Create Environment File

Create a `.env.local` file in the root directory:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000
\`\`\`

### Step 3: Run Frontend Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Server will start at: http://localhost:3000

## Managing Content in Django Admin

### Access Django Admin Dashboard

1. Navigate to: http://localhost:8000/admin
2. Login with your superuser credentials
3. Manage all portfolio content

### Content Sections

#### 1. Hero Section
- **Path:** Admin > Portfolio > Hero
- **Edit:** Title, subtitle, and CTA buttons
- **Fields:**
  - Title: Main headline
  - Subtitle: Supporting text
  - CTA Primary Text & Link: First button
  - CTA Secondary Text & Link: Second button

#### 2. About Section
- **Path:** Admin > Portfolio > About
- **Edit:** Bio, profile photo, achievements
- **Fields:**
  - Title: Section heading
  - Profile Photo: Upload your photo (JPG/PNG)
  - Bio Paragraphs: Enter paragraphs separated by `[NEW_PARA]`
  - Achievements: Enter achievements, one per line
  - Skills Display: Multi-select skills to showcase

#### 3. Projects
- **Path:** Admin > Portfolio > Projects
- **Add/Edit:** Click "Add Project" button
- **Fields:**
  - Title: Project name
  - Description: Detailed project description
  - Category: Full Stack / Frontend / Backend
  - Tags: Comma-separated technologies
  - Image: Project thumbnail (upload image)
  - Link: Live project URL
  - GitHub Link: Repository URL
  - Featured: Check to display on homepage
  - Order: Control display order

**Example Project Entry:**
\`\`\`
Title: E-Commerce Platform
Description: A full-stack e-commerce platform...
Category: Full Stack
Tags: React, Node.js, PostgreSQL, Stripe
Image: (upload image)
Link: https://example.com/ecommerce
GitHub Link: https://github.com/azizur/ecommerce
Featured: ✓ (checked)
\`\`\`

#### 4. Experience
- **Path:** Admin > Portfolio > Experience
- **Add/Edit:** Click "Add Experience" button
- **Fields:**
  - Title: Job title
  - Company: Company name
  - Period: Date range (e.g., "2022 - Present")
  - Description: Job description
  - Achievements: Enter achievements, one per line
  - Start Date: Date picker
  - End Date: Leave blank for current role
  - Is Current: Check if currently employed there
  - Order: Display order

#### 5. Education
- **Path:** Admin > Portfolio > Education
- **Add/Edit:** Click "Add Education" button
- **Fields:**
  - Degree: Degree name
  - Institution: School/University name
  - Start Date: When you started
  - End Date: Graduation date
  - Description: Additional details

#### 6. Achievements
- **Path:** Admin > Portfolio > Achievements
- **Add/Edit:** Click "Add Achievement" button
- **Fields:**
  - Title: Achievement name
  - Description: Details
  - Issuer: Organization that awarded it
  - Date: Achievement date
  - Achievement Type: Award / Certification / Competition / Recognition

#### 7. Blog Posts
- **Path:** Admin > Portfolio > Blog Posts
- **Add/Edit:** Click "Add Blog Post" button
- **Fields:**
  - Title: Article title
  - Slug: URL-friendly identifier (auto-generated)
  - Excerpt: Short summary
  - Content: Full article content
  - Featured Image: Upload article image
  - Category: Article category
  - Read Time: Estimated minutes to read
  - Featured: Check to show on homepage
  - Published: Check to make visible

#### 8. Skills
- **Path:** Admin > Portfolio > Skills
- **Add/Edit:** Click "Add Skill" button
- **Fields:**
  - Name: Technology/skill name
  - Category: Frontend / Backend / Tools / Other
  - Order: Display order

#### 9. Contact Info
- **Path:** Admin > Portfolio > Contact Info
- **Edit:** Your contact information
- **Fields:**
  - Email: Your email address
  - Phone: Your phone number
  - Location: Your location
  - GitHub: GitHub profile URL
  - LinkedIn: LinkedIn profile URL
  - Twitter: Twitter profile URL

## File Upload Guide

### Uploading Images in Django Admin

1. **Profile Photo:**
   - Go to: Admin > Portfolio > About
   - Click "Choose File" under Profile Photo
   - Select a JPG or PNG image
   - Click "Save"
   - Photo will appear in About section

2. **Project Images:**
   - Go to: Admin > Portfolio > Projects
   - Create/Edit a project
   - Click "Choose File" under Image
   - Upload project thumbnail
   - Click "Save"

3. **Blog Featured Images:**
   - Go to: Admin > Portfolio > Blog Posts
   - Create/Edit a blog post
   - Click "Choose File" under Featured Image
   - Upload article image
   - Click "Save"

### Image Requirements
- **Format:** JPG, PNG, WebP
- **Recommended Size:** 1200x800px (blog), 600x400px (projects)
- **Max Size:** 5MB

## API Endpoints

All data is accessible via REST API:

\`\`\`
Base URL: http://localhost:8000/api/

GET  /api/site-settings/         - Global settings
GET  /api/hero/                  - Hero section
GET  /api/about/                 - About section
GET  /api/projects/              - All projects
GET  /api/projects/?category=frontend  - Filter projects
GET  /api/experience/            - Work experience
GET  /api/education/             - Education
GET  /api/achievements/          - Achievements
GET  /api/blog-posts/            - All blog posts
GET  /api/blog-posts/featured/   - Featured blog posts
GET  /api/skills/                - Skills list
GET  /api/contact-info/          - Contact information
\`\`\`

## Common Issues & Solutions

### Issue: API Connection Error (Failed to fetch)

**Solution:**
1. Ensure backend server is running: `python manage.py runserver`
2. Check CORS settings in `backend/portfolio_backend/settings.py`
3. Verify frontend API URL in `.env.local`

### Issue: Images Not Showing

**Solution:**
1. Upload image through Django Admin (not by moving files)
2. Check media folder exists: `backend/media/`
3. Verify image path in browser console
4. Try refreshing page (hard refresh: Ctrl+Shift+R)

### Issue: Database Migration Error

**Solution:**
\`\`\`bash
python manage.py makemigrations
python manage.py migrate
\`\`\`

### Issue: Superuser Password Forgotten

**Solution:**
\`\`\`bash
python manage.py changepassword admin
\`\`\`

## Deployment

### Deploy to Vercel (Frontend)

\`\`\`bash
# Push to GitHub
git push origin main

# Connect GitHub repo to Vercel
# Set environment variable: NEXT_PUBLIC_API_URL
\`\`\`

### Deploy Backend Options

1. **Heroku** (Free tier removed - use alternatives)
2. **Railway** - https://railway.app
3. **Render** - https://render.com
4. **DigitalOcean** - https://digitalocean.com
5. **AWS** - https://aws.amazon.com

**Environment Variables for Production:**
\`\`\`
SECRET_KEY=your-secure-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
\`\`\`

## Project Features

✅ **Full CMS Functionality**
- All portfolio content managed from Django Admin
- No code changes needed to update content
- Image upload support for all sections

✅ **Responsive Design**
- Mobile-first approach
- Works on all device sizes
- Optimized for performance

✅ **SEO Optimized**
- Schema.org structured data
- Meta tags for social sharing
- Sitemap generation

✅ **Real-time Updates**
- Blog posts with featured images
- Project showcase with live links
- Experience timeline with achievements

✅ **API-Driven**
- RESTful API endpoints
- Fallback data for when API is unavailable
- Easy to extend with new features

## Need Help?

- Django Documentation: https://docs.djangoproject.com/
- Next.js Documentation: https://nextjs.org/docs
- DRF Documentation: https://www.django-rest-framework.org/
- Tailwind CSS: https://tailwindcss.com/docs

---

**Happy Coding!** 🎉
