# Go Bazar Full Deployment Guide (Frontend & Backend)

This guide will help you deploy both the frontend and backend of your Go Bazar application to Vercel.

## Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. Supabase account (already set up at https://rcleblpyiuweqjxjcgnt.supabase.co)
3. Git repository with your code

## Backend Deployment

### Step 1: Prepare Backend for Deployment

1. Build the backend:
   ```bash
   cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"
   npm run build
   ```

2. Verify the `vercel.json` file is in your backend root directory (already created).

### Step 2: Deploy Backend to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Deploy the backend:
   ```bash
   cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"
   vercel
   ```

3. Follow the prompts:
   - Log in to your Vercel account if prompted
   - Set up and deploy project
   - When asked about build settings, use the defaults

### Step 3: Configure Backend Environment Variables

In the Vercel dashboard, add these environment variables for your backend:

- `DATABASE_URL`: Your Supabase PostgreSQL connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `FRONTEND_URL`: Your frontend Vercel deployment URL (after deploying frontend)
- `SUPABASE_URL`: https://rcleblpyiuweqjxjcgnt.supabase.co
- `SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `PAYU_MERCHANT_KEY`: 98Z9UR
- `PAYU_MERCHANT_SALT`: Vn8snbPt8e2ceSrSKqB7zlDrzHK4mUJi
- `PAYU_API_URL`: https://secure.payu.in/_payment

## Frontend Deployment

### Step 1: Deploy Frontend to Vercel

1. Deploy the frontend:
   ```bash
   cd "c:\Users\mishr\Downloads\Go Bazar\blinkit-clone"
   vercel
   ```

2. Follow the prompts:
   - Log in to your Vercel account if prompted
   - Set up and deploy project
   - When asked about build settings, use the defaults

### Step 2: Configure Frontend Environment Variables

In the Vercel dashboard, add these environment variables for your frontend:

- `NEXT_PUBLIC_API_URL`: Your backend Vercel deployment URL
- `NEXT_PUBLIC_SUPABASE_URL`: https://rcleblpyiuweqjxjcgnt.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `NEXT_PUBLIC_PAYU_KEY`: 98Z9UR
- `NEXT_PUBLIC_PAYU_SALT`: Vn8snbPt8e2ceSrSKqB7zlDrzHK4mUJi
- `NEXT_PUBLIC_PAYU_MODE`: production

## Connecting Frontend and Backend

1. After deploying both applications, get the backend URL from Vercel
2. Update the frontend's `NEXT_PUBLIC_API_URL` environment variable with this URL
3. Redeploy the frontend if necessary

## Testing the Deployment

1. Test user authentication
2. Test product listings
3. Test cart functionality
4. Test checkout and payment with PayU

## Troubleshooting

- **CORS Issues**: Ensure the backend's `FRONTEND_URL` matches your frontend's actual URL
- **Database Connection**: Verify Supabase connection string is correct
- **API Errors**: Check backend logs in Vercel dashboard
- **Payment Issues**: Verify PayU credentials are correct

## Vercel Free Tier Limitations

- **Serverless Functions**: Limited to 12 concurrent executions
- **Bandwidth**: 100GB per month
- **Build Time**: 45 minutes per month
- **Deployments**: Unlimited

## Supabase Free Tier Limitations

- **Database Size**: 500MB
- **Auth Users**: 50,000
- **Storage**: 1GB
- **Realtime Connections**: 20 concurrent

## Next Steps

1. Set up a custom domain
2. Configure SSL certificates
3. Set up monitoring and alerts
4. Implement CI/CD pipeline