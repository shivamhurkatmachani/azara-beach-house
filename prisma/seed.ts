import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /* ── Season rates ──────────────────────────────────────── */
  const rates = [
    { name: "Peak Season",          startMonth: 12, startDay: 1,  endMonth: 1,  endDay: 31, nightlyRate: 118750 },
    { name: "High Season Oct–Nov",  startMonth: 10, startDay: 1,  endMonth: 11, endDay: 30, nightlyRate: 90000  },
    { name: "High Season Feb",      startMonth: 2,  startDay: 1,  endMonth: 2,  endDay: 28, nightlyRate: 90000  },
    { name: "Shoulder Mar",         startMonth: 3,  startDay: 1,  endMonth: 3,  endDay: 31, nightlyRate: 70000  },
    { name: "Shoulder Sep",         startMonth: 9,  startDay: 1,  endMonth: 9,  endDay: 30, nightlyRate: 70000  },
    { name: "Off-Peak Season",      startMonth: 4,  startDay: 1,  endMonth: 8,  endDay: 31, nightlyRate: 55000  },
  ];

  for (const r of rates) {
    await prisma.seasonRate.upsert({
      where:  { id: r.name },
      update: r,
      create: { id: r.name, ...r },
    });
  }

  /* ── Default policies ──────────────────────────────────── */
  const policies = [
    { key: "checkin_time",        value: "14:00" },
    { key: "checkout_time",       value: "11:00" },
    { key: "max_occupancy",       value: "12" },
    { key: "min_nights",          value: "2" },
    { key: "gst_rate",            value: "18" },
    { key: "security_deposit",    value: "50000" },
    {
      key: "cancellation_policy",
      value: "60+ days: Full refund\n30–59 days: 50% refund\nUnder 30 days: No refund\n\nWe strongly recommend travel insurance for peak-season bookings. All cancellations must be submitted in writing via email.",
    },
    {
      key: "terms_conditions",
      value: "By booking Azara Beach House you agree to:\n\n• No external guests without prior approval\n• No events, parties, or amplified sound after 10:00 PM\n• No smoking indoors\n• Pets allowed only with prior approval and deposit\n• Quiet hours: 10:00 PM – 8:00 AM\n• Guests are responsible for any damage beyond fair wear and tear\n\nAzara Beach House reserves the right to terminate a booking without refund in case of violation of house rules.",
    },
    { key: "offer_direct",        value: "10% off when you book directly from our official website" },
    { key: "offer_fb",            value: "10% discount on all F&B during your stay" },
    { key: "offer_welcome",       value: "Complimentary welcome drinks on arrival for all guests" },
    { key: "bachelor_policy",     value: "Bachelor parties and group events not permitted" },
    { key: "sound_policy",        value: "Sound policy strictly enforced — amplified music must stop by 10:00 PM" },
  ];

  for (const p of policies) {
    await prisma.policy.upsert({
      where:  { key: p.key },
      update: { value: p.value },
      create: p,
    });
  }

  console.log("✓ Database seeded with rates and policies.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
