import {Icon} from "antd";
import React from "react";

import {levels} from '../utils/Constants'

const color = {
  good: '#3f8600',
  warning: '#ff0',
  danger: '#cf1322'
};

const prefixes = {
  up: <Icon type="arrow-up"/>,
  down: <Icon type="arrow-down"/>,
};

export const trends = {up: 'up', down: 'down'};

export default class HomenviStatistic {
  title;
  value;
  prefix;
  suffix;
  color;
  precision;


  constructor(title, value, suffix, trend = trends.up, level = levels.good, precision = 2) {
    this.title = title;
    this.value = value;
    this.suffix = suffix;
    this.prefix = prefixes[trend];
    this.color = color[level];
    this.precision = precision;
  }
}