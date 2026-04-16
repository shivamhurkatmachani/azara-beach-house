import { NextResponse } from "next/server";
import Razorpay from "razorpay";

let razorpay: Razorpay;
function getRazorpay() {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }
  return razorpay;
}

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, checkIn, checkOut, guestName, email, phone, bookingDetails } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await getRazorpay().orders.create({
      amount: Math.round(amount), // amount in paise
      currency: "INR",
      receipt: `azr_${Date.now()}`,
      notes: {
        checkIn: checkIn || "",
        checkOut: checkOut || "",
        guestName: guestName || "",
        email: email || "",
        phone: phone || "",
        ...(bookingDetails || {}),
      },
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    return NextResponse.json(
      { error: "Failed to create payment order. Please try again." },
      { status: 500 },
    );
  }
}
