import type { Metadata } from "next";
import BookingPage from "@/components/booking/BookingPage";

export const metadata: Metadata = {
  title: "Book Your Stay — Azara Beach House, Candolim Goa",
  description:
    "Check availability and book Azara Beach House — a 5-BHK luxury villa in Candolim, Goa. Instant booking confirmation. From ₹1,18,750 per night inclusive of taxes.",
};

export default function BookPage() {
  return (
    <main>
      <BookingPage />
    </main>
  );
}
