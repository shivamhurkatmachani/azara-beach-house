export interface PricingBreakdown {
  nights:          number;
  baseTotal:       number;   // discounted base (after display discount, before GST)
  rackTotal:       number;   // original rack total (no discount, before GST)
  displayDiscount: number;   // effective discount % shown to guest (0 if none)
  savedAmount:     number;   // rackTotal - baseTotal (base savings)
  rackGrandTotal:  number;   // rackTotal * 1.18 (for strikethrough display)
  rackAvgNightly:  number;   // rack avg per night (for strikethrough display)
  gstAmount:       number;   // 18% on baseTotal
  grandTotal:      number;   // baseTotal + gstAmount
  avgNightly:      number;   // discounted avg per night
  halfPayNow:      number;
  rateUnavailable?: boolean; // true when DB rates are loaded but a night has no matching season
}

export interface DBSeasonRate {
  id:              string;
  name:            string;
  startDate:       string; // ISO date string (from JSON)
  endDate:         string; // ISO date string (from JSON)
  nightlyRate:     number;
  displayDiscount: number; // 0–50 percent discount shown to guest
  isActive:        boolean;
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
 * Returns 0 if no season covers this date (caller treats 0 as "rate unavailable").
 */
export function getNightlyRateFromDB(date: Date, rates: DBSeasonRate[]): number {
  const dateStr = toYMD(date);

  for (const rate of rates) {
    const startStr = rate.startDate.slice(0, 10);
    const endStr   = rate.endDate.slice(0, 10);

    if (dateStr >= startStr && dateStr <= endStr) {
      console.log(`[rates] ${dateStr} → matched "${rate.name}" @ ₹${rate.nightlyRate}`);
      return rate.nightlyRate;
    }
  }

  console.log(`[rates] ${dateStr} → no DB season matched — rate unavailable`);
  return 0;
}

export function calculatePricing(
  checkIn:  Date,
  checkOut: Date,
  dbRates?: DBSeasonRate[],
): PricingBreakdown {
  const rackRates: number[] = [];
  const nightRates: number[] = [];
  const usingDB = dbRates && dbRates.length > 0;
  const cursor = new Date(checkIn);
  cursor.setHours(0, 0, 0, 0);
  const end = new Date(checkOut);
  end.setHours(0, 0, 0, 0);

  while (cursor < end) {
    if (usingDB) {
      const dateStr = toYMD(cursor);
      let rackRate = 0;
      let discount = 0;
      for (const rate of dbRates!) {
        const startStr = rate.startDate.slice(0, 10);
        const endStr   = rate.endDate.slice(0, 10);
        if (dateStr >= startStr && dateStr <= endStr) {
          console.log(`[rates] ${dateStr} → matched "${rate.name}" @ ₹${rate.nightlyRate} (${rate.displayDiscount}% off)`);
          rackRate = rate.nightlyRate;
          discount = rate.displayDiscount ?? 0;
          break;
        }
      }
      const discountedRate = rackRate > 0 ? Math.round(rackRate * (1 - discount / 100)) : rackRate;
      rackRates.push(rackRate);
      nightRates.push(discountedRate);
    } else {
      const rate = getNightlyRate(cursor);
      rackRates.push(rate);
      nightRates.push(rate);
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  const rateUnavailable = usingDB && nightRates.some((r) => r === 0);

  const rackTotal   = rackRates.reduce((s, r) => s + r, 0);
  const baseTotal   = nightRates.reduce((s, r) => s + r, 0);
  const savedAmount = rackTotal - baseTotal;
  const displayDiscount = rackTotal > 0 && savedAmount > 0
    ? Math.round((savedAmount / rackTotal) * 100)
    : 0;
  const rackGrandTotal  = Math.round(rackTotal * 1.18);
  const rackAvgNightly  = nightRates.length ? Math.round(rackTotal / nightRates.length) : 0;
  const gstAmount       = Math.round(baseTotal * 0.18);
  const grandTotal      = baseTotal + gstAmount;

  return {
    nights:          nightRates.length,
    baseTotal,
    rackTotal,
    displayDiscount,
    savedAmount,
    rackGrandTotal,
    rackAvgNightly,
    gstAmount,
    grandTotal,
    avgNightly:      nightRates.length ? Math.round(baseTotal / nightRates.length) : 0,
    halfPayNow:      Math.round(grandTotal / 2),
    rateUnavailable,
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

/**
 * Returns a local YYYY-MM-DD string (NOT UTC).
 * Using toISOString() would shift dates back by one day in UTC+ timezones
 * (e.g. IST midnight = previous day in UTC), causing calendar mismatches.
 */
export function toYMD(d: Date): string {
  const y  = d.getFullYear();
  const m  = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

/** Day difference between two dates (checkOut − checkIn). */
export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}
