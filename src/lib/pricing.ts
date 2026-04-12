export interface PricingBreakdown {
  nights:    number;
  baseTotal: number;
  gstAmount: number;
  grandTotal: number;
  avgNightly: number;
  halfPayNow: number;
}

export interface DBSeasonRate {
  id:          string;
  name:        string;
  startMonth:  number;
  startDay:    number;
  endMonth:    number;
  endDay:      number;
  nightlyRate: number;
  isActive:    boolean;
}

/** Returns the base nightly rate for a given date using hardcoded fallback rates. */
export function getNightlyRate(date: Date): number {
  const m = date.getMonth() + 1; // 1–12
  if (m === 12 || m === 1)             return 118750; // Peak
  if (m === 10 || m === 11 || m === 2) return 90000;  // High
  if (m === 3  || m === 9)             return 70000;  // Shoulder
  return 55000;                                         // Off-Peak
}

/**
 * Returns the nightly rate from the database season rates.
 * Uses (month * 100 + day) encoding to handle cross-year seasons (e.g. Dec–Jan).
 */
export function getNightlyRateFromDB(date: Date, rates: DBSeasonRate[]): number {
  const m   = date.getMonth() + 1;
  const d   = date.getDate();
  const val = m * 100 + d; // e.g. Dec 15 → 1215, Jan 5 → 105

  for (const rate of rates) {
    const start = rate.startMonth * 100 + rate.startDay;
    const end   = rate.endMonth   * 100 + rate.endDay;

    if (start <= end) {
      // Simple range: Apr 1 (401) → Aug 31 (831)
      if (val >= start && val <= end) return rate.nightlyRate;
    } else {
      // Cross-year range: Dec 1 (1201) → Jan 31 (131)
      if (val >= start || val <= end) return rate.nightlyRate;
    }
  }

  // Fallback to hardcoded rates
  return getNightlyRate(date);
}

export function calculatePricing(
  checkIn:  Date,
  checkOut: Date,
  dbRates?: DBSeasonRate[],
): PricingBreakdown {
  const nightRates: number[] = [];
  const cursor = new Date(checkIn);
  cursor.setHours(0, 0, 0, 0);
  const end = new Date(checkOut);
  end.setHours(0, 0, 0, 0);

  while (cursor < end) {
    nightRates.push(
      dbRates && dbRates.length > 0
        ? getNightlyRateFromDB(cursor, dbRates)
        : getNightlyRate(cursor),
    );
    cursor.setDate(cursor.getDate() + 1);
  }

  const baseTotal  = nightRates.reduce((s, r) => s + r, 0);
  const gstAmount  = Math.round(baseTotal * 0.18);
  const grandTotal = baseTotal + gstAmount;

  return {
    nights:     nightRates.length,
    baseTotal,
    gstAmount,
    grandTotal,
    avgNightly: nightRates.length ? Math.round(baseTotal / nightRates.length) : 118750,
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
