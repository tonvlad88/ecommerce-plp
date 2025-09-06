// app/api/stripe/webhook/route.ts
import { headers } from "next/headers";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const sig = headersList.get("stripe-signature") as string;
  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed.", errorMessage);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout Session Completed:", session);
        // TODO: Add logic here to fulfill the order.
        // Remember to check for idempotency.
        break;
      // You can add more cases for other event types if needed.
      default:
        console.warn(`Unhandled event type: ${event.type}`);
        break;
    }

    // Return a success response to Stripe immediately
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Webhook handler failed:", e);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
