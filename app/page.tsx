import { SearchForm } from "@/components/SearchForm";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(56,189,248,0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(14,165,233,0.12),transparent)]"
        aria-hidden
      />
      <main className="relative mx-auto max-w-lg px-4 pb-20 pt-16 sm:pt-24">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
            ReachFare MVP
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            機票比價
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            同一航班彙整多平台報價，一鍵跳轉訂票頁。
            <br />
            <span className="text-slate-500">
              非 OTA：本站不收款、不出票，僅供產品演示。
            </span>
          </p>
        </div>
        <SearchForm />
        <p className="mt-8 text-center text-xs text-slate-400">
          經濟艙 · 成人 · 示範資料
        </p>
      </main>
    </div>
  );
}
