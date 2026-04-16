import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function genRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "AZR-";
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking,
    } = body;

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Razorpay signature mismatch", {
        expected: expectedSignature,
        received: razorpay_signature,
      });
      return NextResponse.json(
        { error: "Payment verification failed. Signature mismatch." },
        { status: 400 },
      );
    }

    // Signature valid — save the booking
    const paymentOption = booking.paymentOption || "100";
    const grandTotal = Number(booking.grandTotal);
    const amountPaid = paymentOption === "50" ? Math.round(grandTotal / 2) : grandTotal;
    const amountDue = grandTotal - amountPaid;
    const paymentStatus = paymentOption === "50" ? "PARTIALLY_PAID" : "PAID";

    // If a promo code was used, increment its usedCount
    if (booking.promoCode) {
      await prisma.promoCode.updateMany({
        where: { code: booking.promoCode.toUpperCase(), isActive: true },
        data: { usedCount: { increment: 1 } },
      });
    }

    const savedBooking = await prisma.booking.create({
      data: {
        ref: genRef(),
        checkIn: new Date(booking.checkIn),
        checkOut: new Date(booking.checkOut),
        nights: Number(booking.nights),
        adults: Number(booking.adults) || 1,
        children: Number(booking.children) || 0,
        firstName: String(booking.firstName),
        lastName: String(booking.lastName || ""),
        email: String(booking.email),
        phone: String(booking.phone || ""),
        gstNumber: booking.gstNumber ?? null,
        specialRequests: booking.specialRequests ?? null,
        promoCode: booking.promoCode ?? null,
        paymentOption,
        baseTotal: Number(booking.baseTotal),
        gstAmount: Number(booking.gstAmount),
        grandTotal,
        status: "confirmed",
        paidAmount: amountPaid,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentStatus,
        amountDue,
      },
    });

    return NextResponse.json({
      success: true,
      ref: savedBooking.ref,
      paymentStatus,
      amountPaid,
      amountDue,
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { error: "Failed to verify payment. Please contact support." },
      { status: 500 },
    );
  }
}
