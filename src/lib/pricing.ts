export interface PricingBreakdown {
  nights:    number;
  baseTotal: number;
  gstAmount: number;
  grandTotal: number;
  avgNightly: number;
  halfPayNow: number;
}

/** Returns the base nightly rate for a given check-in night's date. */
export function getNightlyRate(date: Date): number {
  const m = date.getMonth() + 1; // 1–12
  if (m === 12 || m === 1)             return 118750; // Peak
  if (m === 10 || m === 11 || m === 2) return 90000;  // High
  if (m === 3  || m === 9)             return 70000;  // Shoulder
  return 55000;                                         // Off-Peak
}

export function calculatePricing(
  checkIn: Date,
  checkOut: Date,
): PricingBreakdown {
  const rates: number[] = [];
  const cursor = new Date(checkIn);
  cursor.setHours(0, 0, 0, 0);
  const end = new Date(checkOut);
  end.setHours(0, 0, 0, 0);

  while (cursor < end) {
    rates.push(getNightlyRate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  const baseTotal = rates.reduce((s, r) => s + r, 0);
  const gstAmount = Math.round(baseTotal * 0.18);
  const grandTotal = baseTotal + gstAmount;

  return {
    nights:     rates.length,
    baseTotal,
    gstAmount,
    grandTotal,
    avgNightly: rates.length ? Math.round(baseTotal / rates.length) : 118750,
    halfPayNow: Math.round(grandTotal / 2),
  };
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export function toYMD(d: Date): string {
  return d.toISOString().split("T")[0];
}

/** Day difference between two dates (checkOut − checkIn). */
export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}
