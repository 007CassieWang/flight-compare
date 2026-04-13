import type { FlightAggregate, SortOption } from "./types";

function parseTimeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function minOfferPrice(f: FlightAggregate): number {
  return Math.min(...f.offers.map((o) => o.price));
}

export function totalDurationMinutes(f: FlightAggregate): number {
  const out = f.segmentsOut.reduce((s, x) => s + x.durationMinutes, 0);
  const inn = f.segmentsIn?.reduce((s, x) => s + x.durationMinutes, 0) ?? 0;
  return out + inn;
}

export function earliestDepartureMinutes(f: FlightAggregate): number {
  const first = f.segmentsOut[0]?.departureTime ?? "00:00";
  return parseTimeToMinutes(first);
}

export function sortFlights(
  list: FlightAggregate[],
  sort: SortOption
): FlightAggregate[] {
  const copy = [...list];
  switch (sort) {
    case "recommended":
      return copy.sort((a, b) => b.score - a.score);
    case "price-asc":
      return copy.sort((a, b) => minOfferPrice(a) - minOfferPrice(b));
    case "duration-asc":
      return copy.sort(
        (a, b) => totalDurationMinutes(a) - totalDurationMinutes(b)
      );
    case "departure-asc":
      return copy.sort(
        (a, b) => earliestDepartureMinutes(a) - earliestDepartureMinutes(b)
      );
    default:
      return copy;
  }
}

export function filterFlights(
  list: FlightAggregate[],
  minPrice: number,
  maxPrice: number,
  directOnly: boolean
): FlightAggregate[] {
  return list.filter((f) => {
    const p = minOfferPrice(f);
    if (p < minPrice || p > maxPrice) return false;
    if (directOnly) {
      if (f.stopsOut !== 0) return false;
      if (f.segmentsIn && f.stopsIn !== undefined && f.stopsIn !== 0)
        return false;
    }
    return true;
  });
}
