# Deployment Guide for Veya Website

## Issues Fixed

This version addresses the following deployment issues:

1. **Missing `.gitignore`** - Added comprehensive gitignore file
2. **Missing `public` directory** - Created public/images structure with placeholder
3. **Missing image assets** - Added placeholder for neuron-fallback.jpg
4. **Drizzle config format** - Converted from JSON to TypeScript for better env var handling
5. **Missing database scripts** - Added db:push, db:generate, db:migrate, db:studio scripts
6. **Missing environment example** - Added .env.example file
7. **No deployment documentation** - Added comprehensive README

## Before Deploying

### 1. Add Required Images

You MUST add the following image to `public/images/`:

- **neuron-fallback.jpg** - The fallback/loading image for the 3D neuron canvas

Without this image, the site will show broken image references.

### 2. Set Up Database

You need a PostgreSQL database. Options:

- **Vercel Postgres** (recommended for Vercel deployment)
- **Neon** (free tier available)
- **Supabase** (open source)
- **Railway**

Get your connection string in this format:
```
postgresql://username:password@host:5432/database_name
```

## Deploy to Vercel

### Step 1: Push to Git

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Step 2: Import in Vercel

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

In Vercel dashboard, add:

```
DATABASE_URL=postgresql://username:password@host:5432/database_name
```

Make sure to add this for **Production**, **Preview**, and **Development** environments.

### Step 4: Deploy

Click "Deploy" and Vercel will build and deploy your site.

### Step 5: Initialize Database

After first deployment, you need to create tables. You can either:

**Option A: Use Drizzle Studio**
```bash
# Install dependencies locally with your production DATABASE_URL
npm install
DATABASE_URL="your_production_url" npm run db:push
```

**Option B: Use Drizzle migrations**
```bash
npm run db:generate
DATABASE_URL="your_production_url" npm run db:migrate
```

## Common Deployment Errors

### "Cannot find module '@/...' "

**Cause:** TypeScript path aliases not resolving

**Fix:** Already configured in tsconfig.json - should not occur

### "Database connection failed"

**Cause:** DATABASE_URL not set or incorrect

**Fix:** 
- Check environment variable is set in Vercel
- Verify connection string format
- Ensure database allows external connections
- Check SSL requirements (add `?sslmode=require` if needed)

### "relation 'enquiries' does not exist"

**Cause:** Database tables not created

**Fix:** Run `npm run db:push` with production DATABASE_URL

### "Module not found: Can't resolve '/images/neuron-fallback.jpg'"

**Cause:** Missing image file

**Fix:** Add neuron-fallback.jpg to public/images/ directory

### Build fails with type errors

**Cause:** TypeScript compilation errors

**Fix:** Run `npm run typecheck` locally to identify issues

## Testing Locally Before Deploy

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` with your database URL:
```bash
cp .env.example .env.local
# Edit .env.local and add your DATABASE_URL
```

3. Add the neuron-fallback.jpg image to public/images/

4. Initialize database:
```bash
npm run db:push
```

5. Run development server:
```bash
npm run dev
```

6. Build to verify no errors:
```bash
npm run build
```

If the build succeeds locally, it should work on Vercel.

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Images display correctly (neuron background)
- [ ] Contact form submits successfully
- [ ] Database records enquiries
- [ ] 3D effects render properly
- [ ] All pages are accessible
- [ ] Mobile responsive layout works

## Support

If you encounter issues:

1. Check Vercel build logs for specific errors
2. Verify all environment variables are set
3. Test database connection separately
4. Ensure all required files are committed to Git

## What's Different from Original

- Added .gitignore
- Created public/images directory structure
- Converted drizzle.config.json to drizzle.config.ts
- Added database management scripts
- Added .env.example
- Added comprehensive documentation
- Added vercel.json for explicit build config
