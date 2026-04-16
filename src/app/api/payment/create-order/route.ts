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

    const orderAmount = Math.round(amount);
    console.log("[Razorpay] Creating order:", { amount: orderAmount, currency: "INR" });

    const order = await getRazorpay().orders.create({
      amount: orderAmount,
      currency: "INR",
      receipt: `azr_${Date.now()}`,
      payment_capture: true,
      notes: {
        checkIn: checkIn || "",
        checkOut: checkOut || "",
        guestName: guestName || "",
        email: email || "",
        phone: phone || "",
        ...(bookingDetails || {}),
      },
    });

    const keyPrefix = (process.env.RAZORPAY_KEY_ID || "").slice(0, 12);
    console.log("[Razorpay] Order created:", {
      id: order.id,
      amount: order.amount,
      typeof_amount: typeof order.amount,
      status: order.status,
      key_prefix: keyPrefix,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    return NextResponse.json(
      { error: "Failed to create payment order. Please try again." },
      { status: 500 },
    );
  }
}
