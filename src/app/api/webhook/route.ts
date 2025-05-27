import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const quantity = session.metadata?.quantity || '1';

      // Send email notification to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'junktms@gmail.com',
        subject: 'New FirstWork License Purchase',
        html: `
          <h1>New License Purchase</h1>
          <p>Quantity: ${quantity}</p>
          <p>Total Amount: $${(session.amount_total! / 100).toFixed(2)}</p>
          <p>Customer Email: ${session.customer_details?.email}</p>
          <p>Please activate the license(s) for this customer.</p>
        `,
      });

      // Send confirmation email to customer
      if (session.customer_details?.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: session.customer_details.email,
          subject: 'Your FirstWork License Purchase',
          html: `
            <h1>Thank you for your purchase!</h1>
            <p>You have purchased ${quantity} FirstWork license${quantity !== '1' ? 's' : ''}.</p>
            <p>Our team will process your order and send you the license details shortly.</p>
            <p>If you have any questions, please contact us at junktms@gmail.com</p>
          `,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }
} 