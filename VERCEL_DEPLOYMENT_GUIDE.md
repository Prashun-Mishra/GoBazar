# Go Bazar Vercel Deployment Guide

This guide explains how to deploy your Go Bazar application on Vercel's free tier.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier)
2. [Git](https://git-scm.com/downloads) installed
3. [Node.js](https://nodejs.org/) installed (v14 or later)
4. A database service (see Database Options below)

## Step 1: Prepare Your Frontend

Your Next.js frontend is already configured for Vercel deployment with the `vercel.json` file we created.

## Step 2: Set Up Your Database

For the free tier, choose one of these database providers:

- **PlanetScale** (MySQL): 5GB storage, no credit card required
  - Sign up at [planetscale.com](https://planetscale.com)
  - Create a new database
  - Get your connection string

- **MongoDB Atlas** (NoSQL): 512MB storage, no credit card required
  - Sign up at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
  - Create a free cluster
  - Get your connection string

- **Supabase** (PostgreSQL): 500MB storage, no credit card required
  - Sign up at [supabase.com](https://supabase.com)
  - Create a new project
  - Get your connection string

## Step 3: Update Environment Variables

1. Update the `.env.production` file with your database connection string and other secrets
2. **IMPORTANT**: Never commit this file to your repository

## Step 4: Deploy to Vercel

### Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Navigate to your project directory:
   ```
   cd blinkit-clone
   ```

3. Login to Vercel:
   ```
   vercel login
   ```

4. Deploy your project:
   ```
   vercel
   ```

5. For production deployment:
   ```
   vercel --prod
   ```

### Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure your project settings
5. Add your environment variables
6. Deploy

## Free Tier Limitations

- **Vercel Free Tier**:
  - 100GB bandwidth per month
  - 6,000 minutes of serverless function execution per month
  - Max function execution time: 10 seconds
  - Max function size: 50MB
  - No custom domains (yourapp.vercel.app domain provided)

- **Database Free Tier** (varies by provider):
  - Limited storage (500MB-5GB)
  - Limited connections
  - May sleep after inactivity (cold starts)

## Monitoring and Scaling

- Monitor your usage in the Vercel dashboard
- Upgrade to a paid plan when you exceed free tier limits
- Consider optimizing your code to reduce function execution time

## Troubleshooting

- **Deployment Failures**: Check build logs in Vercel dashboard
- **Database Connection Issues**: Verify connection strings and network access
- **Function Timeouts**: Optimize code or split into smaller functions
- **CORS Errors**: Ensure proper CORS headers in API responses

## Next Steps

1. Set up a CI/CD pipeline for automated deployments
2. Configure custom domain (requires paid plan)
3. Implement monitoring and error tracking
4. Optimize for performance and cost