"use client";

import { useState, useMemo } from "react";
import { toYMD } from "@/lib/pricing";

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function startOfDay(d: Date) {
  const c = new Date(d); c.setHours(0,0,0,0); return c;
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function buildGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  const grid: (Date | null)[] = Array(first).fill(null);
  for (let d = 1; d <= days; d++) grid.push(new Date(year, month, d));
  return grid;
}

interface Props {
  checkIn:      Date | null;
  checkOut:     Date | null;
  onChange:     (ci: Date | null, co: Date | null) => void;
  blockedDates: string[];
}

export default function BookingCalendar({ checkIn, checkOut, onChange, blockedDates }: Props) {
  const today      = useMemo(() => startOfDay(new Date()), []);
  const [leftMonth, setLeftMonth] = useState(() =>
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [hover, setHover] = useState<Date | null>(null);

  const rightMonth = addMonths(leftMonth, 1);
  const blocked    = useMemo(() => new Set(blockedDates), [blockedDates]);

  const isPast      = (d: Date) => d < today;
  const isBlocked   = (d: Date) => blocked.has(toYMD(d));
  const isDisabled  = (d: Date) => isPast(d) || isBlocked(d);
  const isCheckIn   = (d: Date) => !!checkIn  && toYMD(d) === toYMD(checkIn);
  const isCheckOut  = (d: Date) => !!checkOut && toYMD(d) === toYMD(checkOut);
  const isToday     = (d: Date) => toYMD(d) === toYMD(today);

  function inRange(d: Date): boolean {
    const start = checkIn;
    const end   = checkOut ?? hover;
    if (!start || !end) return false;
    const [a, b] = start <= end ? [start, end] : [end, start];
    return d > a && d < b;
  }

  function hasBlockedBetween(from: Date, to: Date): boolean {
    const c = new Date(from); c.setDate(c.getDate() + 1);
    while (c < to) { if (blocked.has(toYMD(c))) return true; c.setDate(c.getDate() + 1); }
    return false;
  }

  function handleClick(d: Date) {
    if (isDisabled(d)) return;
    if (!checkIn || (checkIn && checkOut)) {
      onChange(d, null);
    } else if (d <= checkIn) {
      onChange(d, null);
    } else if (hasBlockedBetween(checkIn, d)) {
      onChange(d, null); // reset if blocked in range
    } else {
      onChange(checkIn, d);
    }
  }

  function prevMonth() {
    const prev = addMonths(leftMonth, -1);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prev >= thisMonth) setLeftMonth(prev);
  }

  function MonthGrid({ year, month }: { year: number; month: number }) {
    const grid = buildGrid(year, month);
    return (
      <div className="flex-1 min-w-0">
        <p className="font-jost text-cream/60 text-[10px] tracking-widest uppercase
                      text-center mb-5 pb-3 border-b border-white/[0.06]">
          {MONTHS[month]} {year}
        </p>
        {/* Day name headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <span key={d} className="font-jost text-body/30 text-[9px] tracking-wide
                                     text-center h-7 flex items-center justify-center">
              {d}
            </span>
          ))}
        </div>
        {/* Day cells */}
        <div className="grid grid-cols-7">
          {grid.map((date, i) => {
            if (!date) return <div key={`pad-${i}`} className="h-8" />;
            const dis  = isDisabled(date);
            const ci   = isCheckIn(date);
            const co   = isCheckOut(date);
            const ir   = inRange(date);
            const tod  = isToday(date);

            return (
              <div
                key={toYMD(date)}
                className={[
                  "relative h-8 flex items-center justify-center",
                  ir ? "bg-gold/[0.15]" : "",
                  // Flatten left edge on check-out
                  co ? "rounded-r-none" : "",
                ].join(" ")}
              >
                <button
                  type="button"
                  disabled={dis}
                  onClick={() => handleClick(date)}
                  onMouseEnter={() => !dis && setHover(date)}
                  onMouseLeave={() => setHover(null)}
                  className={[
                    "relative z-10 w-8 h-8 flex items-center justify-center",
                    "font-jost text-[12px] tracking-wide transition-all duration-150",
                    /* Selected */
                    ci || co
                      ? "rounded-full bg-gold text-charcoal font-medium"
                      : "",
                    /* Disabled */
                    dis
                      ? "text-body/40 cursor-not-allowed"
                      : "cursor-pointer",
                    /* Today */
                    tod && !ci && !co
                      ? "text-gold ring-1 ring-gold/40 rounded-full"
                      : "",
                    /* Normal hover */
                    !dis && !ci && !co
                      ? "text-cream/90 hover:bg-gold/25 hover:text-cream hover:rounded-full"
                      : "",
                    /* In-range (normal) */
                    ir && !ci && !co && !dis ? "text-cream/80" : "",
                  ].join(" ")}
                >
                  {date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="select-none">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center
                     text-body/40 hover:text-cream transition-colors"
          aria-label="Previous month"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setLeftMonth(addMonths(leftMonth, 1))}
          className="w-7 h-7 flex items-center justify-center
                     text-body/40 hover:text-cream transition-colors"
          aria-label="Next month"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Two months side by side */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <MonthGrid year={leftMonth.getFullYear()}  month={leftMonth.getMonth()} />
        <div className="hidden sm:block w-px bg-white/[0.05] self-stretch" />
        <MonthGrid year={rightMonth.getFullYear()} month={rightMonth.getMonth()} />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-5 pt-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gold" />
          <span className="font-jost text-body/60 text-[9px] tracking-wider">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gold/[0.15]" />
          <span className="font-jost text-body/60 text-[9px] tracking-wider">Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full ring-1 ring-gold/40" />
          <span className="font-jost text-body/60 text-[9px] tracking-wider">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-jost text-[9px] text-body/45">15</span>
          <span className="font-jost text-body/60 text-[9px] tracking-wider">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
