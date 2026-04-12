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
  startDate:   string; // ISO date string (from JSON)
  endDate:     string; // ISO date string (from JSON)
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
 * Compares the given date against startDate–endDate ranges stored in the DB.
 * Logs the matched season name and rate for debugging.
 */
export function getNightlyRateFromDB(date: Date, rates: DBSeasonRate[]): number {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0); // noon — avoids any DST edge issues

  for (const rate of rates) {
    const start = new Date(rate.startDate);
    const end   = new Date(rate.endDate);
    start.setHours(0,  0,  0, 0);
    end.setHours(23, 59, 59, 999); // inclusive end date

    if (d >= start && d <= end) {
      console.log(
        `[rates] ${date.toISOString().split("T")[0]} → matched "${rate.name}" @ ₹${rate.nightlyRate}`,
      );
      return rate.nightlyRate;
    }
  }

  // No season matched — fall back to hardcoded rates
  const fallback = getNightlyRate(date);
  console.log(
    `[rates] ${date.toISOString().split("T")[0]} → no DB season matched, fallback ₹${fallback}`,
  );
  return fallback;
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
    avgNightly: nightRates.length ? Math.round(baseTotal / nightRates.length) : 0,
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
