export type TripType = "one-way" | "round-trip";

export type SortOption =
  | "recommended"
  | "price-asc"
  | "duration-asc"
  | "departure-asc";

export interface Segment {
  departureAirport: string;
  departureCity: string;
  arrivalAirport: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  /** 分鐘 */
  durationMinutes: number;
  flightNo: string;
  airline: string;
}

export interface ChannelOffer {
  id: string;
  channelName: string;
  price: number;
  currency: string;
  baggage: string;
  refundChange: string;
  isOfficial: boolean;
  jumpUrl: string;
}

export interface FlightAggregate {
  id: string;
  segmentsOut: Segment[];
  segmentsIn?: Segment[];
  /** 去程經停數（不含起飛與抵達），0=直飛 */
  stopsOut: number;
  stopsIn?: number;
  /** 推薦分數，越大越優先 */
  score: number;
  offers: ChannelOffer[];
}

export interface SearchParamsState {
  from: string;
  to: string;
  depart: string;
  returnDate: string;
  trip: TripType;
  adults: number;
}
