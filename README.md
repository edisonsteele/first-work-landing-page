# FirstWork License Sales Landing Page

A high-converting landing page for FirstWork software license sales with Stripe integration.

## Features

- Modern, responsive design optimized for conversion
- Dynamic pricing based on license quantity
- Secure Stripe payment integration
- Automated email notifications for successful purchases
- Success page with purchase confirmation

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Stripe
- Nodemailer

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # Email Configuration
   EMAIL_USER=your_gmail_address
   EMAIL_PASSWORD=your_gmail_app_password

   # Site Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Set up Stripe:
   - Create a Stripe account if you haven't already
   - Get your API keys from the Stripe Dashboard
   - Set up a webhook endpoint in the Stripe Dashboard pointing to `/api/webhook`
   - Get the webhook signing secret

5. Set up Gmail for email notifications:
   - Use an App Password for Gmail (2FA must be enabled)
   - Generate an App Password in your Google Account settings

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Build for production:
   ```bash
   npm run build
   ```

## Deployment

The site is configured for deployment on Vercel. Simply connect your repository to Vercel and set up the environment variables in the Vercel dashboard.

## License

All rights reserved. This software is proprietary and confidential.
