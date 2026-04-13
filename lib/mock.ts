import type { FlightAggregate } from "./types";

const seg = (
  dep: string,
  depCity: string,
  arr: string,
  arrCity: string,
  depT: string,
  arrT: string,
  min: number,
  no: string,
  airline: string
) => ({
  departureAirport: dep,
  departureCity: depCity,
  arrivalAirport: arr,
  arrivalCity: arrCity,
  departureTime: depT,
  arrivalTime: arrT,
  durationMinutes: min,
  flightNo: no,
  airline,
});

/** Mock：經濟艙、成人；可依搜尋替換文案，資料結構固定 */
export function getMockFlights(
  roundTrip: boolean,
  _from: string,
  _to: string
): FlightAggregate[] {
  const base: FlightAggregate[] = [
    {
      id: "f1",
      score: 92,
      stopsOut: 0,
      stopsIn: roundTrip ? 0 : undefined,
      segmentsOut: [seg("TPE", "台北", "NRT", "東京", "08:05", "12:30", 205, "BR184", "長榮航空")],
      segmentsIn: roundTrip
        ? [seg("NRT", "東京", "TPE", "台北", "14:10", "17:05", 235, "BR185", "長榮航空")]
        : undefined,
      offers: [
        {
          id: "o1",
          channelName: "長榮官網",
          price: 12800,
          currency: "TWD",
          baggage: "托運 23kg×2",
          refundChange: "依票種；改期手續費約 NT$1,500 起",
          isOfficial: true,
          jumpUrl: "https://www.evaair.com",
        },
        {
          id: "o2",
          channelName: "Trip.com",
          price: 12450,
          currency: "TWD",
          baggage: "托運 23kg×1（加購可升級）",
          refundChange: "不可退；改期依平台規則",
          isOfficial: false,
          jumpUrl: "https://www.trip.com",
        },
        {
          id: "o3",
          channelName: "Skyscanner",
          price: 12690,
          currency: "TWD",
          baggage: "依航空公司規則",
          refundChange: "以供應商頁面為準",
          isOfficial: false,
          jumpUrl: "https://www.skyscanner.com.tw",
        },
      ],
    },
    {
      id: "f2",
      score: 78,
      stopsOut: 1,
      stopsIn: roundTrip ? 1 : undefined,
      segmentsOut: [
        seg("TPE", "台北", "HKG", "香港", "07:20", "09:05", 105, "CX451", "國泰航空"),
        seg("HKG", "香港", "NRT", "東京", "10:40", "16:15", 215, "CX542", "國泰航空"),
      ],
      segmentsIn: roundTrip
        ? [
            seg("NRT", "東京", "HKG", "香港", "11:30", "15:50", 260, "CX543", "國泰航空"),
            seg("HKG", "香港", "TPE", "台北", "18:10", "19:45", 95, "CX488", "國泰航空"),
          ]
        : undefined,
      offers: [
        {
          id: "o4",
          channelName: "國泰官網",
          price: 11200,
          currency: "TWD",
          baggage: "托運 23kg×1",
          refundChange: "可改期；退票依票種",
          isOfficial: true,
          jumpUrl: "https://www.cathaypacific.com",
        },
        {
          id: "o5",
          channelName: "Kiwi.com",
          price: 10890,
          currency: "TWD",
          baggage: "依航司組合票規則",
          refundChange: "自助組合票，退改嚴格限制",
          isOfficial: false,
          jumpUrl: "https://www.kiwi.com",
        },
      ],
    },
    {
      id: "f3",
      score: 85,
      stopsOut: 0,
      stopsIn: roundTrip ? 0 : undefined,
      segmentsOut: [seg("TPE", "台北", "NRT", "東京", "10:15", "14:40", 205, "JL802", "日本航空")],
      segmentsIn: roundTrip
        ? [seg("NRT", "東京", "TPE", "台北", "09:00", "11:50", 230, "JL801", "日本航空")]
        : undefined,
      offers: [
        {
          id: "o6",
          channelName: "日航官網",
          price: 13550,
          currency: "TWD",
          baggage: "托運 23kg×2",
          refundChange: "可改期；退票依票種",
          isOfficial: true,
          jumpUrl: "https://www.jal.co.jp",
        },
        {
          id: "o7",
          channelName: "Expedia",
          price: 13200,
          currency: "TWD",
          baggage: "依航空公司",
          refundChange: "以訂單條款為準",
          isOfficial: false,
          jumpUrl: "https://www.expedia.com.tw",
        },
      ],
    },
    {
      id: "f4",
      score: 70,
      stopsOut: 0,
      stopsIn: roundTrip ? 0 : undefined,
      segmentsOut: [seg("TPE", "台北", "NRT", "東京", "23:55", "04:20", 205, "MM924", "樂桃航空")],
      segmentsIn: roundTrip
        ? [seg("NRT", "東京", "TPE", "台北", "22:30", "01:50", 230, "MM923", "樂桃航空")]
        : undefined,
      offers: [
        {
          id: "o8",
          channelName: "樂桃官網",
          price: 6890,
          currency: "TWD",
          baggage: "手提 7kg；托運需加購",
          refundChange: "不可退；改期依官網",
          isOfficial: true,
          jumpUrl: "https://www.flypeach.com",
        },
        {
          id: "o9",
          channelName: "Agoda Flights",
          price: 7150,
          currency: "TWD",
          baggage: "依航司",
          refundChange: "平台代訂條款",
          isOfficial: false,
          jumpUrl: "https://www.agoda.com",
        },
      ],
    },
    {
      id: "f5",
      score: 88,
      stopsOut: 0,
      stopsIn: roundTrip ? 0 : undefined,
      segmentsOut: [seg("TPE", "台北", "NRT", "東京", "14:30", "18:55", 205, "CI100", "中華航空")],
      segmentsIn: roundTrip
        ? [seg("NRT", "東京", "TPE", "台北", "19:40", "22:25", 225, "CI101", "中華航空")]
        : undefined,
      offers: [
        {
          id: "o10",
          channelName: "華航官網",
          price: 11980,
          currency: "TWD",
          baggage: "托運 23kg×2",
          refundChange: "豪經/全額票可改；廉價促銷票限制較多",
          isOfficial: true,
          jumpUrl: "https://www.china-airlines.com",
        },
        {
          id: "o11",
          channelName: "Google Flights",
          price: 11820,
          currency: "TWD",
          baggage: "依航司",
          refundChange: "連至供應商確認",
          isOfficial: false,
          jumpUrl: "https://www.google.com/travel/flights",
        },
        {
          id: "o12",
          channelName: "CheapTickets",
          price: 12100,
          currency: "TWD",
          baggage: "依航司",
          refundChange: "代理商條款",
          isOfficial: false,
          jumpUrl: "https://www.cheaptickets.com",
        },
      ],
    },
  ];

  return base;
}
