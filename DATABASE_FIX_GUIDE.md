# Database Migration Fix Guide

## Problem
You're getting errors like:
- `no such table: portfolio_blogpost`
- `no such table: portfolio_about`
- `no such table: portfolio_achievement`

This means Django tables haven't been created yet.

## Solution - Step by Step

### Step 1: Clear Previous State (if needed)
\`\`\`bash
cd backend

# Delete old database if it exists
rm db.sqlite3

# Delete migration files (keep __init__.py)
cd portfolio/migrations
# Keep: __init__.py
# Delete: 0001_initial.py, 0002_*.py, etc.

cd ../..
\`\`\`

### Step 2: Create Fresh Migrations
\`\`\`bash
python manage.py makemigrations portfolio
\`\`\`

You should see output like:
\`\`\`
Migrations for 'portfolio':
  portfolio/migrations/0001_initial.py
    - Create model About
    - Create model Achievement
    - Create model BlogPost
    - Create model Course
    ... etc
\`\`\`

### Step 3: Apply Migrations to Database
\`\`\`bash
python manage.py migrate
\`\`\`

You should see:
\`\`\`
Running migrations:
  Applying portfolio.0001_initial... OK
\`\`\`

### Step 4: Create Superuser
\`\`\`bash
python manage.py createsuperuser
\`\`\`

Follow the prompts to set username, email, and password.

### Step 5: Seed Sample Data
\`\`\`bash
python seed_data.py
python add_courses_data.py
\`\`\`

### Step 6: Run Django Server
\`\`\`bash
python manage.py runserver
\`\`\`

### Step 7: Access Admin Dashboard
- Go to: http://localhost:8000/admin
- Login with your superuser credentials
- Add/edit all portfolio content here

## Common Issues

**Issue: "No migrations to apply"**
- Make sure you ran `makemigrations` first

**Issue: "ModuleNotFoundError"**
- Make sure all dependencies are installed: `pip install -r requirements.txt`

**Issue: "CORS errors"**
- Check that both backend (http://localhost:8000) and frontend (http://localhost:3000) are running

## Running Both Servers

### Terminal 1 - Backend
\`\`\`bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python manage.py runserver
\`\`\`

### Terminal 2 - Frontend
\`\`\`bash
cd ..
npm run dev
\`\`\`

Visit: http://localhost:3000 and http://localhost:8000/admin

## If Still Having Issues

1. **Delete everything and start fresh:**
   \`\`\`bash
   rm db.sqlite3
   python manage.py makemigrations portfolio
   python manage.py migrate
   python manage.py createsuperuser
   python seed_data.py
   python add_courses_data.py
   \`\`\`

2. **Check Django status:**
   \`\`\`bash
   python manage.py check
   \`\`\`

3. **See all migrations:**
   \`\`\`bash
   python manage.py showmigrations
