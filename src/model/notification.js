import {BaseConstants} from "../utils/Constants";

export default class Notification {
  title;
  content;
  date;
  unread;

  constructor(title, content, date = new Date(), unread = BaseConstants.YES) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.unread = unread;
  }
}