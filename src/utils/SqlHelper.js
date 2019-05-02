import * as PropTypes from 'prop-types';
import {Symbol} from "./Constants";
import Pair from "../model/pair";

const keywords = {
  select: 'SELECT' + Symbol.SPACE,
  insert: 'INSERT' + Symbol.SPACE,
  from: "FROM",
  order: "ORDER",
  into: "INTO",
  where: "WHERE",
  group: "GROUP",
  by: "BY",
  and: "AND",
  limit: "LIMIT",
  asc: "ASC",
  desc: "DESC",
};

const sqlTypes = {
  write: "write",
  query: "query"
};

const sqlTypesArray = [sqlTypes.query, sqlTypes.write];
const orderTypes = [keywords.asc, keywords.desc];


export default class SqlHelper {
  static query = (fields = [], measurement, conditions = [], groups = [], orders = [], limit = []) => {
    return new SqlHelper()
      .select(fields)
      .from(measurement)
      .where(conditions)
      .groupBy(groups)
      .orderBy(orders)
      .limit(...limit)
      .build();
  };
  static propTypes = {
    type: PropTypes.oneOf(sqlTypesArray)
  };
  props;
  sql;

  constructor(props = {type: sqlTypes.query}) {
    this.props = props;
    if (props.type === sqlTypes.query)
      this.sql = keywords.select;
    else if (props.type === sqlTypes.write) {
      this.sql = keywords.insert;
    }
  }

  select = (fieldsArray = [Symbol.ASTERISK]) => {
    this.sql = this.sql.concat(fieldsArray.join(Symbol.COMMA), Symbol.SPACE);
    return this;
  };

  from = (measurement) => {
    this.sql = this.sql.concat(
      keywords.from,
      Symbol.SPACE,
      measurement.trim(),
      Symbol.SPACE
    );
    return this;
  };

  where = (condition = []) => {
    let whereClause = '' + keywords.where + Symbol.SPACE + '1=1' + Symbol.SPACE;
    condition.forEach(((item) => {
      whereClause = whereClause.concat(
        keywords.and,
        Symbol.SPACE,
        item,
        Symbol.SPACE
      )
    }));
    this.sql = this.sql.concat(whereClause);
    return this;
  };

  groupBy = (groups = []) => {
    if (!groups || groups.length < 1) {
      return this;
    }
    this.sql = this.sql.concat(
      keywords.group,
      Symbol.SPACE,
      keywords.by,
      Symbol.SPACE,
      groups.join(Symbol.COMMA),
      Symbol.SPACE
    );
    return this;
  };

  /**
   * build order clause. example : sqlHelper.orderBy([new Pair('id','desc'),new Pair('name','asc')])
   * @param pairs: Order fields and it's types;
   * @returns {SqlHelper}
   */
  orderBy = (pairs = []) => {
    if (!pairs || pairs.length < 1) {
      return this;
    }
    let orderClause = keywords.order + Symbol.SPACE + keywords.by + Symbol.SPACE;
    let orders = [];
    pairs.forEach(item => {
      if (!item instanceof Pair) {
        throw Error("Illegal Arguments,Given param is not array of Pair");
      }
      const orderType = item.value.toUpperCase();
      if (orderTypes.indexOf(orderType) < 0) {
        throw Error(`Unsupported order type of ${orderType}`)
      }
      orders.push(item.name + Symbol.SPACE + orderType);
    });
    this.sql = this.sql.concat(orderClause, orders.join(Symbol.COMMA), Symbol.SPACE);
    return this;
  };

  limit = (offset, number) => {
    if (!offset) return this;
    let limitClause = keywords.limit + Symbol.SPACE + offset;
    if (number && number > 0) {
      limitClause += Symbol.COMMA + number;
    }
    limitClause += Symbol.SPACE;
    this.sql = this.sql.concat(limitClause);
    return this;
  };

  build = (withSemicolon = false) => {
    if (withSemicolon) {
      this.sql = this.sql.concat(Symbol.SEMICOLON);
    }
    return this.sql.trim();
  }
}