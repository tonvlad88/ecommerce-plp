// app/api/checkout/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: NextRequest) {
  try {
    // Optional: read body for dynamic items
    // const { priceId, quantity = 1 } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        { price: "price_1S4PHv2dtCcwsNdzj0WYvygs", quantity: 1 }, // Replace with your Stripe Price ID
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      metadata: {
        orderId: "test-order-id-01",
        userId: "test-user-id-01",
      },
      // Optional: collect shipping, phone, etc.
      // shipping_address_collection: { allowed_countries: ["US", "PH"] },
      // automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: unknown) {
    let errorMessage = "An unknown error occurred.";
    // Check if the error is an instance of the built-in Error class
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
