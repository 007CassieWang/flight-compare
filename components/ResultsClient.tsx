"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { filterFlights, sortFlights } from "@/lib/flight-utils";
import { getMockFlights } from "@/lib/mock";
import type { SortOption, TripType } from "@/lib/types";
import { FlightCard } from "./FlightCard";
import { ResultsToolbar } from "./ResultsToolbar";

function useResultsData() {
  const searchParams = useSearchParams();

  const from = (searchParams.get("from") ?? "").trim();
  const to = (searchParams.get("to") ?? "").trim();
  const depart = searchParams.get("depart") ?? "";
  const returnDate = searchParams.get("return") ?? "";
  const trip: TripType =
    searchParams.get("trip") === "one-way" ? "one-way" : "round-trip";
  const adults = Math.max(1, Math.min(9, Number(searchParams.get("adults")) || 1));
  const roundTrip = trip === "round-trip";

  const raw = useMemo(() => {
    if (!from || !to) return [];
    if (from.trim().toUpperCase() === to.trim().toUpperCase()) return [];
    return getMockFlights(roundTrip, from, to);
  }, [roundTrip, from, to]);

  const priceCeiling = useMemo(() => {
    const max = Math.max(
      20000,
      ...raw.map((f) => Math.min(...f.offers.map((o) => o.price)))
    );
    return Math.ceil(max / 1000) * 1000;
  }, [raw]);

  return {
    from,
    to,
    depart,
    returnDate,
    trip,
    adults,
    roundTrip,
    raw,
    priceCeiling,
  };
}

export function ResultsClient() {
  const {
    from,
    to,
    depart,
    returnDate,
    trip,
    adults,
    roundTrip,
    raw,
    priceCeiling,
  } = useResultsData();

  const [sort, setSort] = useState<SortOption>("recommended");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [directOnly, setDirectOnly] = useState(false);

  useEffect(() => {
    setMinPrice(0);
    setMaxPrice(priceCeiling);
  }, [priceCeiling]);

  const list = useMemo(() => {
    const filtered = filterFlights(raw, minPrice, maxPrice, directOnly);
    return sortFlights(filtered, sort);
  }, [raw, minPrice, maxPrice, directOnly, sort]);

  const missingSearch = !from || !to;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400"
        >
          ← 返回首頁
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          航班比價結果
        </h1>

        {missingSearch ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            尚未提供完整搜尋條件，請返回首頁重新搜尋。
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">{from}</span>
              {" → "}
              <span className="font-medium">{to}</span>
              {depart ? (
                <>
                  {" · 去程 "}
                  {depart}
                </>
              ) : null}
              {roundTrip && returnDate ? (
                <>
                  {" · 回程 "}
                  {returnDate}
                </>
              ) : null}
              {" · "}
              {trip === "one-way" ? "單程" : "往返"}
              {" · "}
              成人 {adults} · 經濟艙
            </p>

            <p className="mt-2 text-xs text-amber-700 dark:text-amber-400/90">
              本頁為產品示範：站內結果會依出發地、目的地與單程/往返切換；站外按鈕會把你的搜尋條件一起帶出去。
            </p>
          </>
        )}
      </header>

      {!missingSearch ? (
        <>
          <ResultsToolbar
            sort={sort}
            onSortChange={setSort}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceCeiling={priceCeiling}
            onMinPrice={setMinPrice}
            onMaxPrice={setMaxPrice}
            directOnly={directOnly}
            onDirectOnly={setDirectOnly}
            resultCount={list.length}
          />

          <div className="mt-6 space-y-4">
            {list.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900">
                沒有符合條件的示範航班。你可以更換出發地/目的地，或返回首頁重新輸入。
              </p>
            ) : (
              list.map((f, i) => (
                <FlightCard
                  key={f.id}
                  flight={f}
                  defaultOpen={i === 0}
                  searchContext={{
                    from,
                    to,
                    depart,
                    returnDate,
                    trip,
                    adults,
                  }}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          請先回首頁輸入出發地、目的地、日期與成人數，再查看比價結果。
        </div>
      )}
    </div>
  );
}