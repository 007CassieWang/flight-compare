"use client";

import type { SortOption } from "@/lib/types";

const SORT_LABELS: Record<SortOption, string> = {
  recommended: "推薦優先",
  "price-asc": "最低價",
  "duration-asc": "最短時長",
  "departure-asc": "最早出發",
};

export function ResultsToolbar({
  sort,
  onSortChange,
  minPrice,
  maxPrice,
  priceCeiling,
  onMinPrice,
  onMaxPrice,
  directOnly,
  onDirectOnly,
  resultCount,
}: {
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  minPrice: number;
  maxPrice: number;
  priceCeiling: number;
  onMinPrice: (n: number) => void;
  onMaxPrice: (n: number) => void;
  directOnly: boolean;
  onDirectOnly: (v: boolean) => void;
  resultCount: number;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          共 <strong className="text-slate-900 dark:text-white">{resultCount}</strong>{" "}
          組航班（示範資料）
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">排序</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/20 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>價格區間（TWD，依最低渠道價）</span>
            <span className="tabular-nums">
              {minPrice.toLocaleString()} – {maxPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid gap-1">
              <label className="text-[11px] text-slate-400">最低</label>
              <input
                type="range"
                min={0}
                max={priceCeiling}
                value={Math.min(minPrice, priceCeiling)}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  onMinPrice(Math.min(v, maxPrice));
                }}
                className="w-full accent-sky-500"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-[11px] text-slate-400">最高</label>
              <input
                type="range"
                min={0}
                max={priceCeiling}
                value={Math.min(maxPrice, priceCeiling)}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  onMaxPrice(Math.max(v, minPrice));
                }}
                className="w-full accent-sky-500"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => {
                  const v = Number(e.target.value) || 0;
                  onMinPrice(Math.min(v, maxPrice));
                }}
                className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800"
              />
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => {
                  const v = Number(e.target.value) || 0;
                  onMaxPrice(Math.max(v, minPrice));
                }}
                className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
          <input
            type="checkbox"
            checked={directOnly}
            onChange={(e) => onDirectOnly(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
          />
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            僅顯示直飛（去程與回程皆直飛）
          </span>
        </label>
      </div>
    </div>
  );
}
