"use client";

import { useMemo, useState } from "react";
import type { FlightAggregate, TripType } from "@/lib/types";
import { minOfferPrice, totalDurationMinutes } from "@/lib/flight-utils";

type SearchContext = {
  from: string;
  to: string;
  depart: string;
  returnDate: string;
  trip: TripType;
  adults: number;
};

function formatDuration(totalMin: number) {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h <= 0) return `${m} 分`;
  return `${h} 小時 ${m} 分`;
}

function formatStops(n: number) {
  if (n === 0) return "直飛";
  return `${n} 次經停`;
}

function buildExternalSearchUrl(
  fallbackUrl: string,
  channelName: string,
  ctx?: SearchContext
) {
  if (!ctx || !ctx.from || !ctx.to || !ctx.depart) {
    return fallbackUrl;
  }

  let sitePart = "";
  try {
    const host = new URL(fallbackUrl).hostname.replace(/^www\./, "");
    sitePart = `site:${host} `;
  } catch {
    sitePart = "";
  }

  const tripText = ctx.trip === "one-way" ? "單程" : "往返";
  const returnText =
    ctx.trip === "round-trip" && ctx.returnDate
      ? ` 回程 ${ctx.returnDate}`
      : "";

  const q = `${sitePart}${channelName} ${ctx.from} 到 ${ctx.to} 機票 去程 ${ctx.depart}${returnText} ${ctx.adults} 成人 經濟艙 ${tripText}`;
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

function SegmentLine({
  label,
  segments,
  stops,
}: {
  label: string;
  segments: FlightAggregate["segmentsOut"];
  stops: number;
}) {
  const first = segments[0];
  const last = segments[segments.length - 1];

  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/80">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
          {label}
        </span>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-600">
          {formatStops(stops)}
        </span>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-50">
          {first.departureTime}
        </span>
        <span className="text-sm text-slate-500">
          {first.departureCity} {first.departureAirport}
        </span>
        <span className="text-slate-300 dark:text-slate-600">→</span>
        <span className="text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-50">
          {last.arrivalTime}
        </span>
        <span className="text-sm text-slate-500">
          {last.arrivalCity} {last.arrivalAirport}
        </span>
      </div>

      <div className="mt-2 text-xs text-slate-500">
        {segments.map((s, i) => (
          <span key={`${s.flightNo}-${i}`}>
            {i > 0 ? " · " : ""}
            {s.airline} {s.flightNo}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FlightCard({
  flight,
  defaultOpen = false,
  searchContext,
}: {
  flight: FlightAggregate;
  defaultOpen?: boolean;
  searchContext?: SearchContext;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const lowest = useMemo(() => minOfferPrice(flight), [flight]);
  const dur = useMemo(() => totalDurationMinutes(flight), [flight]);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0 flex-1 space-y-3">
          <SegmentLine
            label="去程"
            segments={flight.segmentsOut}
            stops={flight.stopsOut}
          />
          {flight.segmentsIn && flight.stopsIn !== undefined ? (
            <SegmentLine
              label="回程"
              segments={flight.segmentsIn}
              stops={flight.stopsIn}
            />
          ) : null}
        </div>

        <div className="flex shrink-0 flex-row items-end justify-between gap-4 sm:flex-col sm:items-end">
          <div>
            <p className="text-xs text-slate-500">最低價（示範）</p>
            <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              {lowest.toLocaleString()}{" "}
              <span className="text-base font-medium text-slate-500">TWD</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              總飛行 {formatDuration(dur)} · 出發{" "}
              {flight.segmentsOut[0]?.departureTime}
            </p>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {open ? "收合渠道" : `展開 ${flight.offers.length} 個渠道`}
            <svg
              className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </button>

      {open ? (
        <div className="border-t border-slate-100 bg-slate-50/90 dark:border-slate-700 dark:bg-slate-950/40">
          <div className="px-4 pt-4 text-xs text-amber-700 dark:text-amber-400/90">
            目前示範版會把你的搜尋條件一併帶到站外搜尋頁，不再只是打開網站首頁；若要精準落到每一家平台自己的搜尋結果頁，下一步再補各平台 deeplink 規則。
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500 dark:border-slate-700">
                  <th className="px-4 py-3 font-medium">渠道</th>
                  <th className="px-4 py-3 font-medium">價格</th>
                  <th className="px-4 py-3 font-medium">行李</th>
                  <th className="px-4 py-3 font-medium">退改</th>
                  <th className="px-4 py-3 font-medium">官網</th>
                  <th className="px-4 py-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {flight.offers.map((o) => {
                  const href = buildExternalSearchUrl(
                    o.jumpUrl,
                    o.channelName,
                    searchContext
                  );

                  return (
                    <tr
                      key={o.id}
                      className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                        {o.channelName}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-slate-900 dark:text-slate-100">
                        {o.price.toLocaleString()} {o.currency}
                      </td>
                      <td className="max-w-[200px] px-4 py-3 text-slate-600 dark:text-slate-300">
                        {o.baggage}
                      </td>
                      <td className="max-w-[220px] px-4 py-3 text-slate-600 dark:text-slate-300">
                        {o.refundChange}
                      </td>
                      <td className="px-4 py-3">
                        {o.isOfficial ? (
                          <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                            是
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-600"
                        >
                          帶條件搜尋
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </article>
  );
}