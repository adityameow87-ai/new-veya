# Veya - Premium 3D Website

A modern Next.js website with 3D effects, business automation services showcase, and contact form integration.

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure your database:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your PostgreSQL connection string:

```
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### 3. Setup Database

Run the database migrations:

```bash
npm run db:push
```

Or generate migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 4. Add Required Images

The project references the following image that needs to be added to `public/images/`:

- `neuron-fallback.jpg` - Fallback image for the 3D neuron canvas

Place your image files in the `public/images/` directory.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Quick Deploy

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard:
   - Add `DATABASE_URL` with your production database connection string
4. Deploy

### Database Setup for Production

For production, you'll need a PostgreSQL database. Options include:

- **Vercel Postgres** - Integrated database solution
- **Neon** - Serverless Postgres
- **Supabase** - Open source alternative
- **Railway** - Easy database hosting

After setting up your production database:

1. Add the `DATABASE_URL` to Vercel environment variables
2. Run migrations against production (or use `npm run db:push` during first deploy)

### Important Notes

- Ensure all required images are in the `public/images/` directory before deploying
- The `DATABASE_URL` environment variable must be set in Vercel for the contact form to work
- The project uses PostgreSQL - other databases are not supported without code changes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── app/              # Next.js app directory (pages and routes)
├── components/       # React components
├── config/           # Site configuration
├── db/               # Database schema and connection
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL with Drizzle ORM
- **3D Graphics:** Three.js with React Three Fiber
- **Animations:** GSAP
- **Validation:** Zod

## Troubleshooting

### Build fails on Vercel

- Check that `DATABASE_URL` environment variable is set
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run typecheck`

### Images not loading

- Make sure all referenced images exist in `public/images/`
- Check file names match exactly (case-sensitive)

### Database connection fails

- Verify `DATABASE_URL` format is correct
- Ensure database allows connections from Vercel IPs
- Check that database tables are created (run migrations)

## License

Private - All rights reserved
