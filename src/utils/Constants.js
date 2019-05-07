import Pair from "../model/pair";

export const client = {
  grant_type: "password",
  client_id: "homenvi",
  client_secret: "homenvi123",
  scope: "homenvi"
};

export const BaseConstants = {
  YES: 1,
  NO: 0,
  Authorization: "Authorization",
  CollectDuration: 5, //seconds
};

export const NoticeTypes = {
  read: 'read',
  unread: 'unread',
  all: 'all',
};

export const Symbol = {
  AND: '&',
  QUES: '?',
  SPACE: ' ',
  EQUAL: '=',
  COMMA: ',',
  SEMICOLON: ';',
  ASTERISK: '*',
};

export const InfluxAuth = {
  db: 'homenvi',
  u: 'homenvi-front',
  p: 'homenvi',
};

export const HomenviDataTypes = {
  humidity: {
    field: 'humidity',
    name: '湿度',
    unit: '%',
    nameUnit: new Pair('湿度', '%')
  },
  celsius: {
    field: 'celsius',
    name: '温度',
    unit: '℃',
    nameUnit: new Pair('温度', '℃'),
  },
  heatIndexCelsius: {
    field: 'heatIndexCelsius',
    name: '体感温度',
    unit: '℃',
    nameUnit: new Pair('体感温度', '℃'),
  },
  fahrenheit: {
    field: 'fahrenheit',
    name: '华氏温度',
    unit: '℉',
    nameUnit: new Pair('华氏温度', '℉'),
  },
  heatIndexFahrenheit: {
    field: 'heatIndexFahrenheit',
    name: '华氏体感温度',
    unit: '℉',
    nameUnit: new Pair('华氏体感温度', '℉'),
  },
  brightness: {
    field: 'brightness',
    name: '光线强度',
    unit: 'lux',
    nameUnit: new Pair('光线强度', 'lux'),
  },
  dustDensity: {
    field: 'dustDensity',
    name: 'PM2.5浓度',
    unit: 'ug/m³',
    nameUnit: new Pair('PM2.5浓度', 'ug/m³'),
    categories: ['严重污染', '重度污染', '中度污染', '轻度污染', '良', '优'],
    category: (value) => {
      if (!value) return null;
      if (value > 250) {
        return '严重污染'
      } else if (value > 200) {
        return '重度污染'
      } else if (value > 150) {
        return '中度污染'
      } else if (value > 100) {
        return '轻度污染'
      } else if (value > 50) {
        return '良'
      } else return '优'
    }
  },
  gasValue: {
    field: 'gasValue',
    name: '烟雾和有毒气体',
    unit: '模拟值',
    nameUnit: new Pair('烟雾和有毒气体', ''),
  },
  sound: {
    field: 'sound',
    name: '声音强度',
    unit: '模拟值',
    nameUnit: new Pair('声音强度', ''),
  },
};