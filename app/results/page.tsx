import { Suspense } from "react";
import { ResultsClient } from "@/components/ResultsClient";

function ResultsFallback() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-500">
      載入結果…
    </div>
  );
}

export default function ResultsPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<ResultsFallback />}>
        <ResultsClient />
      </Suspense>
    </div>
  );
}
