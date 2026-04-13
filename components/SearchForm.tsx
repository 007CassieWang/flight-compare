"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TripType } from "@/lib/types";

function todayISO() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().slice(0, 10);
}

function plusDaysISO(base: string, days: number) {
  const d = new Date(base + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function SearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState("TPE");
  const [to, setTo] = useState("NRT");
  const [depart, setDepart] = useState(todayISO());
  const [returnDate, setReturnDate] = useState(plusDaysISO(todayISO(), 7));
  const [trip, setTrip] = useState<TripType>("round-trip");
  const [adults, setAdults] = useState(2);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("from", from.trim());
    params.set("to", to.trim());
    params.set("depart", depart);
    params.set("trip", trip);
    params.set("adults", String(Math.max(1, Math.min(9, adults))));
    if (trip === "round-trip") params.set("return", returnDate);
    router.push(`/results?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          行程類型
        </span>
        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={() => setTrip("one-way")}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              trip === "one-way"
                ? "bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            單程
          </button>
          <button
            type="button"
            onClick={() => setTrip("round-trip")}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              trip === "round-trip"
                ? "bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            往返
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-muted">
            出發地
          </span>
          <input
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="例如 TPE、台北"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-sky-500/30 transition focus:border-sky-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-muted">
            目的地
          </span>
          <input
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="例如 NRT、東京"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-sky-500/30 transition focus:border-sky-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-muted">
            出發日期
          </span>
          <input
            required
            type="date"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-sky-500/30 transition focus:border-sky-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        {trip === "round-trip" ? (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-muted">
              回程日期
            </span>
            <input
              required
              type="date"
              value={returnDate}
              min={depart}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-sky-500/30 transition focus:border-sky-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        ) : (
          <div className="hidden sm:block" aria-hidden />
        )}
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ink-muted">
            成人數（經濟艙）
          </span>
          <input
            type="number"
            min={1}
            max={9}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value) || 1)}
            className="w-full max-w-[200px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-sky-500/30 transition focus:border-sky-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-sky-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        搜尋航班
      </button>
    </form>
  );
}
