import Pair from "../model/pair";
import {arrayOfObjProps} from "./ArrayUtils";

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

export const levels = {good: 'good', warning: 'warning', danger: 'danger'};
export const HomenviDataTypes = {
  humidity: {
    field: 'humidity',
    name: '湿度',
    unit: '%',
    nameUnit: new Pair('湿度', '%'),
    state: (value) => {
      if (value > 30 || value < 80) {
        return levels.good;
      }
      return levels.danger;
    },
    min: 0,
    max: 100,
  },
  celsius: {
    field: 'celsius',
    name: '温度',
    unit: '℃',
    nameUnit: new Pair('温度', '℃'),
    state: (value) => {
      if (value > 15 || value < 30) {
        return levels.good;
      } else if (value > 0 || value < 40) {
        return levels.warning
      }
      return levels.danger;
    },
    min: -40,
    max: 80,
  },
  heatIndexCelsius: {
    field: 'sendibleCelsius',
    name: '体感温度',
    unit: '℃',
    nameUnit: new Pair('体感温度', '℃'),
    state: (value) => {
      if (value > 15 || value < 30) {
        return levels.good;
      } else if (value > 0 || value < 40) {
        return levels.warning
      }
      return levels.danger;
    },
    min: -40,
    max: 80,
  },
  fahrenheit: {
    field: 'fahrenheit',
    name: '华氏温度',
    unit: '℉',
    nameUnit: new Pair('华氏温度', '℉'),
    min: 104,
    max: 176,
  },
  heatIndexFahrenheit: {
    field: 'sendibleFahrenheit',
    name: '华氏体感温度',
    unit: '℉',
    nameUnit: new Pair('华氏体感温度', '℉'),
    min: 104,
    max: 176,
  },
  brightness: {
    field: 'brightness',
    name: '光线强度',
    unit: 'lux',
    nameUnit: new Pair('光线强度', 'lux'),
    state: (value) => {
      if (value > 50 || value < 500) {
        return levels.good;
      }
      return levels.danger;
    },
    min: 0,
    max: 1000,
  },
  dustDensity: {
    field: 'dustDensity',
    name: 'PM2.5浓度',
    unit: 'ug/m³',
    nameUnit: new Pair('PM2.5浓度', 'ug/m³'),
    state: (value) => {
      if (value < 100) {
        return levels.good;
      } else if (value < 200) {
        return levels.warning
      }
      return levels.danger;
    },
    categories: ['严重污染', '重度污染', '中度污染', '轻度污染', '良', '优'],
    category: (value) => {
      if (!value) return null;
      if (value > 250) {
        return '严重污染'
      } else if (value > 150) {
        return '重度污染'
      } else if (value > 115) {
        return '中度污染'
      } else if (value > 75) {
        return '轻度污染'
      } else if (value > 35) {
        return '良'
      } else return '优'
    },
    min: 0,
    max: 500,
  },
  gasValue: {
    field: 'gasValue',
    name: '烟雾和有毒气体',
    unit: '',
    nameUnit: new Pair('烟雾和有毒气体', ''),
    state: (value) => {
      if (value < 400) {
        return levels.good;
      }
      return levels.danger;
    },
    min: 0,
    max: 1023,
  },
  sound: {
    field: 'sound',
    name: '声音强度',
    unit: '',
    nameUnit: new Pair('声音强度', ''),
    state: (value) => {
      if (value < 500) {
        return levels.good;
      }
      return levels.warning;
    },
    min: 0,
    max: 1023,
  },
};

export const VitalHomenviDataTypes = [
  HomenviDataTypes.humidity,
  HomenviDataTypes.celsius,
  HomenviDataTypes.brightness,
  HomenviDataTypes.dustDensity,
  HomenviDataTypes.gasValue,
  HomenviDataTypes.sound,
];

export const AllHomenviDataTypes = arrayOfObjProps(HomenviDataTypes);