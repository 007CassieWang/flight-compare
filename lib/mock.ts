import type { FlightAggregate } from "./types";

type AirportInfo = {
  code: string;
  city: string;
};

const AIRPORT_MAP: Record<string, AirportInfo> = {};

function registerAirport(code: string, city: string, aliases: string[] = []) {
  const info: AirportInfo = { code, city };
  const keys = [code, city, ...aliases];

  for (const raw of keys) {
    const key = raw.trim();
    if (!key) continue;
    AIRPORT_MAP[key] = info;
    AIRPORT_MAP[key.toUpperCase()] = info;
  }
}

/**
 * 说明：
 * 1. 这是演示版映射，不是严格民航数据库
 * 2. 一个城市统一映射到一个“默认机场码”
 * 3. 多机场城市做了简化：
 *    - 东京 -> NRT
 *    - 上海 -> SHA
 *    - 北京 -> PEK
 *    - 成都 -> CTU
 *    - 纽约 -> JFK
 *    - 伦敦 -> LHR
 *    - 巴黎 -> CDG
 */

/* =========================
   中国内地热门城市 / 旅游城市
   ========================= */

registerAirport("PEK", "北京", ["Beijing", "北京首都", "北京首都机场"]);
registerAirport("PKX", "北京", ["北京大兴", "北京大兴机场", "Daxing"]);

registerAirport("SHA", "上海", ["Shanghai", "上海虹桥", "虹桥"]);
registerAirport("PVG", "上海", ["上海浦东", "浦东", "Pudong"]);

registerAirport("CAN", "广州", ["Guangzhou", "廣州", "白云", "白雲", "广州白云"]);
registerAirport("SZX", "深圳", ["Shenzhen", "宝安", "寶安", "深圳宝安"]);

registerAirport("CTU", "成都", ["Chengdu", "成都双流", "成都雙流", "双流", "雙流"]);
registerAirport("TFU", "成都", ["成都天府", "天府", "Tianfu"]);

registerAirport("XIY", "西安", ["Xian", "Xi'an", "西安咸阳", "西安咸陽", "咸阳", "咸陽"]);
registerAirport("CKG", "重庆", ["Chongqing", "重慶", "重庆江北", "重慶江北", "江北"]);
registerAirport("KMG", "昆明", ["Kunming", "昆明长水", "昆明長水", "长水", "長水"]);
registerAirport("LJG", "丽江", ["Lijiang", "麗江", "丽江三义", "麗江三義"]);
registerAirport("SYX", "三亚", ["Sanya", "三亞", "三亚凤凰", "三亞鳳凰", "凤凰", "鳳凰"]);
registerAirport("XMN", "厦门", ["Xiamen", "廈門", "厦门高崎", "廈門高崎", "高崎"]);
registerAirport("HGH", "杭州", ["Hangzhou", "杭州萧山", "杭州蕭山", "萧山", "蕭山"]);
registerAirport("NKG", "南京", ["Nanjing", "南京禄口", "南京祿口", "禄口", "祿口"]);
registerAirport("WUH", "武汉", ["Wuhan", "武漢", "武汉天河", "武漢天河", "天河"]);
registerAirport("CSX", "长沙", ["Changsha", "長沙", "长沙黄花", "長沙黃花", "黄花", "黃花"]);
registerAirport("TAO", "青岛", ["Qingdao", "青島", "青岛胶东", "青島膠東", "胶东", "膠東"]);
registerAirport("DLC", "大连", ["Dalian", "大連", "大连周水子", "大連周水子"]);
registerAirport("HRB", "哈尔滨", ["Harbin", "哈爾濱", "哈尔滨太平", "哈爾濱太平", "太平"]);
registerAirport("CGO", "郑州", ["Zhengzhou", "鄭州", "郑州新郑", "鄭州新鄭", "新郑", "新鄭"]);
registerAirport("FOC", "福州", ["Fuzhou", "福州长乐", "福州長樂", "长乐", "長樂"]);
registerAirport("TNA", "济南", ["Jinan", "濟南", "济南遥墙", "濟南遙牆", "遥墙", "遙牆"]);
registerAirport("KWL", "桂林", ["Guilin", "桂林两江", "桂林兩江", "两江", "兩江"]);
registerAirport("DYG", "张家界", ["Zhangjiajie", "張家界"]);
registerAirport("SIA", "西安", ["咸阳机场", "咸陽機場"]); // 兼容误写
registerAirport("TSN", "天津", ["Tianjin", "天津滨海", "天津濱海", "滨海", "濱海"]);
registerAirport("HAK", "海口", ["Haikou", "海口美兰", "海口美蘭", "美兰", "美蘭"]);
registerAirport("URC", "乌鲁木齐", ["Urumqi", "烏魯木齊", "乌鲁木齐地窝堡", "烏魯木齊地窩堡"]);
registerAirport("KWE", "贵阳", ["Guiyang", "貴陽", "贵阳龙洞堡", "貴陽龍洞堡"]);
registerAirport("NNG", "南宁", ["Nanning", "南寧", "南宁吴圩", "南寧吳圩"]);
registerAirport("SJW", "石家庄", ["Shijiazhuang", "石家莊", "石家庄正定", "石家莊正定"]);
registerAirport("YNT", "烟台", ["Yantai", "煙台", "烟台蓬莱", "煙台蓬萊"]);
registerAirport("WEH", "威海", ["Weihai", "威海大水泊", "大水泊"]);
registerAirport("MIG", "绵阳", ["Mianyang", "綿陽"]);
registerAirport("YIH", "宜昌", ["Yichang", "宜昌三峡", "宜昌三峽", "三峡", "三峽"]);
registerAirport("LXA", "拉萨", ["Lhasa", "拉薩", "拉萨贡嘎", "拉薩貢嘎"]);
registerAirport("INC", "银川", ["Yinchuan", "銀川", "银川河东", "銀川河東"]);
registerAirport("HET", "呼和浩特", ["Hohhot", "呼和浩特白塔", "白塔"]);
registerAirport("BAV", "包头", ["Baotou", "包頭"]);
registerAirport("JZH", "九寨沟", ["九寨溝", "Jiuzhaigou", "九寨黄龙", "九寨黃龍"]);
registerAirport("AAT", "阿勒泰", ["Altay", "阿勒泰机场"]);
registerAirport("LHW", "兰州", ["Lanzhou", "蘭州", "兰州中川", "蘭州中川", "中川"]);

/* =========================
   港澳台 / 东亚 / 东南亚
   ========================= */

registerAirport("TPE", "台北", ["Taipei", "台北市", "臺北"]);
registerAirport("KHH", "高雄", ["Kaohsiung", "高雄市"]);
registerAirport("RMQ", "台中", ["Taichung", "臺中", "台中清泉岗", "清泉崗"]);

registerAirport("HKG", "香港", ["Hong Kong", "HongKong"]);
registerAirport("MFM", "澳门", ["Macau", "澳門"]);

registerAirport("NRT", "东京", ["Tokyo", "東京", "东京成田", "東京成田", "成田"]);
registerAirport("HND", "东京", ["东京羽田", "東京羽田", "羽田"]);
registerAirport("KIX", "大阪", ["Osaka", "大阪关西", "大阪關西", "关西", "關西"]);
registerAirport("ITM", "大阪", ["大阪伊丹", "伊丹"]);
registerAirport("CTS", "札幌", ["Sapporo", "札幌新千岁", "札幌新千歲", "新千岁", "新千歲"]);
registerAirport("FUK", "福冈", ["Fukuoka", "福岡"]);
registerAirport("OKA", "冲绳", ["Okinawa", "沖繩", "那霸", "那霸机场"]);
registerAirport("NGO", "名古屋", ["Nagoya", "名古屋中部", "中部"]);
registerAirport("HIJ", "广岛", ["Hiroshima", "廣島"]);
registerAirport("ICN", "首尔", ["Seoul", "首爾", "仁川", "仁川机场", "仁川機場"]);
registerAirport("GMP", "首尔", ["金浦", "金浦机场", "金浦機場"]);
registerAirport("PUS", "釜山", ["Busan", "釜山金海", "金海"]);
registerAirport("CJU", "济州", ["Jeju", "濟州"]);

registerAirport("SIN", "新加坡", ["Singapore"]);
registerAirport("BKK", "曼谷", ["Bangkok", "Suvarnabhumi", "素万那普", "素萬那普"]);
registerAirport("DMK", "曼谷", ["廊曼", "Don Mueang"]);
registerAirport("HKT", "普吉", ["Phuket", "普吉岛", "普吉島"]);
registerAirport("CNX", "清迈", ["Chiang Mai", "清邁"]);
registerAirport("KUL", "吉隆坡", ["Kuala Lumpur", "KL"]);
registerAirport("PEN", "槟城", ["Penang", "檳城"]);
registerAirport("JHB", "新山", ["Johor Bahru", "柔佛"]);
registerAirport("DPS", "巴厘岛", ["Bali", "巴厘島", "登巴萨", "登巴薩", "Denpasar"]);
registerAirport("CGK", "雅加达", ["Jakarta", "雅加達"]);
registerAirport("SUB", "泗水", ["Surabaya"]);
registerAirport("MNL", "马尼拉", ["Manila", "馬尼拉"]);
registerAirport("CEB", "宿务", ["Cebu", "宿霧"]);
registerAirport("SGN", "胡志明市", ["Ho Chi Minh", "Ho Chi Minh City", "胡志明", "西贡", "西貢"]);
registerAirport("HAN", "河内", ["Hanoi", "河內"]);
registerAirport("DAD", "岘港", ["Da Nang", "峴港"]);
registerAirport("PQC", "富国岛", ["Phu Quoc", "富國島"]);
registerAirport("REP", "暹粒", ["Siem Reap"]);
registerAirport("PNH", "金边", ["Phnom Penh", "金邊"]);
registerAirport("VTE", "万象", ["Vientiane", "萬象"]);
registerAirport("RGN", "仰光", ["Yangon", "仰光机场"]);
registerAirport("KTM", "加德满都", ["Kathmandu", "加德滿都"]);

/* =========================
   欧洲 / 中东 / 非洲常见旅游城市
   ========================= */

registerAirport("LHR", "伦敦", ["London", "倫敦", "希思罗", "希斯罗", "Heathrow"]);
registerAirport("LGW", "伦敦", ["盖特威克", "蓋特威克", "Gatwick"]);
registerAirport("CDG", "巴黎", ["Paris", "戴高乐", "戴高樂", "Charles de Gaulle"]);
registerAirport("ORY", "巴黎", ["Orly"]);
registerAirport("FCO", "罗马", ["Rome", "羅馬", "菲乌米奇诺", "Fiumicino"]);
registerAirport("MXP", "米兰", ["Milan", "米蘭", "Malpensa"]);
registerAirport("VCE", "威尼斯", ["Venice", "Venezia"]);
registerAirport("BCN", "巴塞罗那", ["Barcelona", "巴塞隆納"]);
registerAirport("MAD", "马德里", ["Madrid", "馬德里"]);
registerAirport("AMS", "阿姆斯特丹", ["Amsterdam"]);
registerAirport("FRA", "法兰克福", ["Frankfurt", "法蘭克福"]);
registerAirport("MUC", "慕尼黑", ["Munich", "München"]);
registerAirport("ZRH", "苏黎世", ["Zurich", "蘇黎世"]);
registerAirport("VIE", "维也纳", ["Vienna", "維也納"]);
registerAirport("PRG", "布拉格", ["Prague"]);
registerAirport("ATH", "雅典", ["Athens", "雅典机场"]);
registerAirport("IST", "伊斯坦布尔", ["Istanbul", "伊斯坦堡"]);
registerAirport("DXB", "迪拜", ["Dubai", "杜拜"]);
registerAirport("AUH", "阿布扎比", ["Abu Dhabi"]);
registerAirport("DOH", "多哈", ["Doha"]);
registerAirport("CAI", "开罗", ["Cairo", "開羅"]);
registerAirport("CMN", "卡萨布兰卡", ["Casablanca"]);
registerAirport("RAK", "马拉喀什", ["Marrakesh", "Marrakech", "馬拉喀什"]);

/* =========================
   北美 / 大洋洲热门城市
   ========================= */

registerAirport("JFK", "纽约", ["New York", "紐約", "纽约肯尼迪", "肯尼迪", "Kennedy"]);
registerAirport("LGA", "纽约", ["LaGuardia", "拉瓜迪亚", "拉瓜地亞"]);
registerAirport("EWR", "纽约", ["Newark", "紐瓦克"]);

registerAirport("LAX", "洛杉矶", ["Los Angeles", "洛杉磯"]);
registerAirport("SFO", "旧金山", ["San Francisco", "三藩市", "舊金山"]);
registerAirport("LAS", "拉斯维加斯", ["Las Vegas"]);
registerAirport("SEA", "西雅图", ["Seattle", "西雅圖"]);
registerAirport("ORD", "芝加哥", ["Chicago", "奧黑爾", "O'Hare"]);
registerAirport("BOS", "波士顿", ["Boston", "波士頓"]);
registerAirport("MIA", "迈阿密", ["Miami", "邁阿密"]);
registerAirport("HNL", "檀香山", ["Honolulu", "夏威夷", "夏威夷火奴鲁鲁", "火奴魯魯"]);
registerAirport("YVR", "温哥华", ["Vancouver", "溫哥華"]);
registerAirport("YYZ", "多伦多", ["Toronto", "多倫多"]);
registerAirport("YUL", "蒙特利尔", ["Montreal", "Montréal", "蒙特利爾"]);

registerAirport("SYD", "悉尼", ["Sydney", "雪梨"]);
registerAirport("MEL", "墨尔本", ["Melbourne", "墨爾本"]);
registerAirport("BNE", "布里斯班", ["Brisbane"]);
registerAirport("CNS", "凯恩斯", ["Cairns", "凱恩斯"]);
registerAirport("AKL", "奥克兰", ["Auckland", "奧克蘭"]);
registerAirport("ZQN", "皇后镇", ["Queenstown", "皇后鎮"]);

function normalizeAirport(input: string): AirportInfo {
  const raw = input.trim();
  const key = raw.toUpperCase();

  return (
    AIRPORT_MAP[raw] ??
    AIRPORT_MAP[key] ?? {
      code: key || "UNK",
      city: raw || key || "未知城市",
    }
  );
}

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

function estimateDurationMinutes(fromCode: string, toCode: string) {
  const domesticChina = [
    "SHA",
    "PVG",
    "PEK",
    "PKX",
    "CAN",
    "SZX",
    "CTU",
    "TFU",
    "XIY",
    "CKG",
    "KMG",
    "LJG",
    "SYX",
    "XMN",
    "HGH",
    "NKG",
    "WUH",
    "CSX",
    "TAO",
  ];

  const bothChina =
    domesticChina.includes(fromCode) && domesticChina.includes(toCode);

  if (bothChina) return 155;

  if (
    (fromCode === "TPE" && ["NRT", "HND", "KIX", "CTS", "FUK", "OKA"].includes(toCode)) ||
    (toCode === "TPE" && ["NRT", "HND", "KIX", "CTS", "FUK", "OKA"].includes(fromCode))
  ) {
    return 205;
  }

  if (
    ["SIN", "BKK", "KUL", "HKG", "MFM", "MNL", "SGN", "HAN", "DAD", "DPS"].includes(fromCode) ||
    ["SIN", "BKK", "KUL", "HKG", "MFM", "MNL", "SGN", "HAN", "DAD", "DPS"].includes(toCode)
  ) {
    return 240;
  }

  if (
    ["LHR", "CDG", "FCO", "AMS", "FRA", "DXB", "IST"].includes(fromCode) ||
    ["LHR", "CDG", "FCO", "AMS", "FRA", "DXB", "IST"].includes(toCode)
  ) {
    return 720;
  }

  if (
    ["JFK", "LAX", "SFO", "YVR", "YYZ", "SYD", "MEL", "AKL"].includes(fromCode) ||
    ["JFK", "LAX", "SFO", "YVR", "YYZ", "SYD", "MEL", "AKL"].includes(toCode)
  ) {
    return 780;
  }

  return 225;
}

function pickHub(fromCode: string, toCode: string) {
  const useHkg =
    ["TPE", "SHA", "PVG", "PEK", "PKX", "CAN", "SZX", "CTU", "TFU", "XIY"].includes(fromCode) ||
    ["TPE", "SHA", "PVG", "PEK", "PKX", "CAN", "SZX", "CTU", "TFU", "XIY"].includes(toCode);

  return useHkg ? normalizeAirport("HKG") : normalizeAirport("ICN");
}

export function getMockFlights(
  roundTrip: boolean,
  fromInput: string,
  toInput: string
): FlightAggregate[] {
  const from = normalizeAirport(fromInput);
  const to = normalizeAirport(toInput);

  if (!from.code || !to.code || from.code === to.code) {
    return [];
  }

  const hub = pickHub(from.code, to.code);
  const directMin = estimateDurationMinutes(from.code, to.code);
  const inboundMin = directMin + 20;
  const stopLeg1 = Math.max(80, Math.floor(directMin * 0.55));
  const stopLeg2 = Math.max(90, Math.floor(directMin * 0.7));
  const routeTag = `${from.code}${to.code}`;
  const basePrice =
    directMin <= 170 ? 4800 : directMin <= 210 ? 7600 : directMin <= 300 ? 9800 : directMin <= 800 ? 16800 : 23800;

  const directCarrierA = "示範航空 A";
  const directCarrierB = "示範航空 B";
  const lccCarrier = "示範廉航";
  const connectCarrier = "示範聯程";

  const base: FlightAggregate[] = [
    {
      id: `${routeTag}-f1`,
      score: 92,
      stopsOut: 0,
      stopsIn: roundTrip ? 0 : undefined,
      segmentsOut: [
        seg(
          from.code,
          from.city,
          to.code,
          to.city,
          "08:15",
          "11:40",
          directMin,
          `DA${routeTag.slice(0, 2)}101`,
          directCarrierA
        ),
      ],
      segmentsIn: roundTrip
        ? [
            seg(
              to.code,
              to.city,
              from.code,
              from.city,
              "14:20",
              "17:55",
              inboundMin,
              `DA${routeTag.slice(2, 4)}102`,
              directCarrierA
            ),
          ]
        : undefined,
      offers: [
        {
          id: `${routeTag}-o1`,
          channelName: "官方網站",
          price: basePrice + 1200,
          currency: "TWD",
          baggage: "托運 23kg×1",
          refundChange: "可改期；退票依票種",
          isOfficial: true,
          jumpUrl: "https://www.google.com/travel/flights",
        },
        {
          id: `${routeTag}-o2`,
          channelName: "Trip.com",
          price: basePrice + 850,
          currency: "TWD",
          baggage: "托運 23kg×1",
          refundChange: "依平台條款",
          isOfficial: false,
          jumpUrl: "https://www.trip.com",
        },
        {
          id: `${routeTag}-o3`,
          channelName: "Skyscanner",
          price: basePrice + 980,
          currency: "TWD",
          baggage: "依航空公司規則",
          refundChange: "以供應商頁面為準",
          isOfficial: false,
          jumpUrl: "https://www.skyscanner.com",
        },
      ],
    },
    {
      id: `${routeTag}-f2`,
      score: 78,
      stopsOut: 1,
      stopsIn: roundTrip ? 1 : undefined,
      segmentsOut: [
        seg(
          from.code,
          from.city,
          hub.code,
          hub.city,
          "07:10",
          "09:00",
          stopLeg1,
          `CN${routeTag.slice(0, 2)}201`,
          connectCarrier
        ),
        seg(
          hub.code,
          hub.city,
          to.code,
          to.city,
          "10:30",
          "14:55",
          stopLeg2,
          `CN${routeTag.slice(2, 4)}202`,
          connectCarrier
        ),
      ],
      segmentsIn: roundTrip
        ? [
            seg(
              to.code,
              to.city,
              hub.code,
              hub.city,
              "11:30",
              "15:10",
              stopLeg2,
              `CN${routeTag.slice(2, 4)}203`,
              connectCarrier
            ),
            seg(
              hub.code,
              hub.city,
              from.code,
              from.city,
              "17:00",
              "18:35",
              stopLeg1,
              `CN${routeTag.slice(0, 2)}204`,
              connectCarrier
            ),
          ]
        : undefined,
      offers: [
        {
          id: `${routeTag}-o4`,
          channelName: "聯程平台",
          price: basePrice - 600,
          currency: "TWD",
          baggage: "依航司組合票規則",
          refundChange: "退改限制較多",
          isOfficial: false,
          jumpUrl: "https://www.kiwi.com",
        },
        {
          id: `${routeTag}-o5`,
          channelName: "Agoda Flights",
          price: basePrice - 420,
          currency: "TWD",
          baggage: "依平台條款",
          refundChange: "以訂單條款為準",
          isOfficial: false,
          jumpUrl: "https://www.agoda.com",
        },
      ],
    },
    {
      id: `${routeTag}-f3`,
      score: 86,
      stopsOut: 0,
      stopsIn: roundTrip ? 0 : undefined,
      segmentsOut: [
        seg(
          from.code,
          from.city,
          to.code,
          to.city,
          "10:40",
          "14:15",
          directMin + 10,
          `DB${routeTag.slice(0, 2)}301`,
          directCarrierB
        ),
      ],
      segmentsIn: roundTrip
        ? [
            seg(
              to.code,
              to.city,
              from.code,
              from.city,
              "09:20",
              "12:55",
              inboundMin + 5,
              `DB${routeTag.slice(2, 4)}302`,
              directCarrierB
            ),
          ]
        : undefined,
      offers: [
        {
          id: `${routeTag}-o6`,
          channelName: "官方網站",
          price: basePrice + 1450,
          currency: "TWD",
          baggage: "托運 23kg×2",
          refundChange: "可改期；退票依票種",
          isOfficial: true,
          jumpUrl: "https://www.google.com/travel/flights",
        },
        {
          id: `${routeTag}-o7`,
          channelName: "Expedia",
          price: basePrice + 1050,
          currency: "TWD",
          baggage: "依航空公司",
          refundChange: "以代理商條款為準",
          isOfficial: false,
          jumpUrl: "https://www.expedia.com",
        },
      ],
    },
    {
      id: `${routeTag}-f4`,
      score: 70,
      stopsOut: 0,
      stopsIn: roundTrip ? 0 : undefined,
      segmentsOut: [
        seg(
          from.code,
          from.city,
          to.code,
          to.city,
          "23:20",
          "02:55",
          directMin + 15,
          `LC${routeTag.slice(0, 2)}401`,
          lccCarrier
        ),
      ],
      segmentsIn: roundTrip
        ? [
            seg(
              to.code,
              to.city,
              from.code,
              from.city,
              "22:15",
              "01:40",
              inboundMin + 10,
              `LC${routeTag.slice(2, 4)}402`,
              lccCarrier
            ),
          ]
        : undefined,
      offers: [
        {
          id: `${routeTag}-o8`,
          channelName: "廉航官網",
          price: basePrice - 1400,
          currency: "TWD",
          baggage: "手提 7kg；托運需加購",
          refundChange: "不可退；改期依官網",
          isOfficial: true,
          jumpUrl: "https://www.google.com/travel/flights",
        },
        {
          id: `${routeTag}-o9`,
          channelName: "Google Flights",
          price: basePrice - 1180,
          currency: "TWD",
          baggage: "依航空公司規則",
          refundChange: "連至供應商確認",
          isOfficial: false,
          jumpUrl: "https://www.google.com/travel/flights",
        },
      ],
    },
    {
      id: `${routeTag}-f5`,
      score: 89,
      stopsOut: 0,
      stopsIn: roundTrip ? 0 : undefined,
      segmentsOut: [
        seg(
          from.code,
          from.city,
          to.code,
          to.city,
          "15:05",
          "18:30",
          directMin,
          `DA${routeTag.slice(0, 2)}501`,
          directCarrierA
        ),
      ],
      segmentsIn: roundTrip
        ? [
            seg(
              to.code,
              to.city,
              from.code,
              from.city,
              "19:20",
              "22:45",
              inboundMin,
              `DA${routeTag.slice(2, 4)}502`,
              directCarrierA
            ),
          ]
        : undefined,
      offers: [
        {
          id: `${routeTag}-o10`,
          channelName: "官方網站",
          price: basePrice + 980,
          currency: "TWD",
          baggage: "托運 23kg×1",
          refundChange: "改退依票種",
          isOfficial: true,
          jumpUrl: "https://www.google.com/travel/flights",
        },
        {
          id: `${routeTag}-o11`,
          channelName: "Google Flights",
          price: basePrice + 760,
          currency: "TWD",
          baggage: "依航空公司",
          refundChange: "連至供應商確認",
          isOfficial: false,
          jumpUrl: "https://www.google.com/travel/flights",
        },
        {
          id: `${routeTag}-o12`,
          channelName: "比價平台",
          price: basePrice + 830,
          currency: "TWD",
          baggage: "依供應商頁面",
          refundChange: "代理商條款",
          isOfficial: false,
          jumpUrl: "https://www.skyscanner.com",
        },
      ],
    },
  ];

  return base;
}