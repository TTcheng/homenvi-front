export default class User {

  name;
  avatar;
  userid;
  notifyCount;

  constructor(name = "Serati Ma",
              userid = "00000001",
              avatar = "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
              notifyCount = 0) {
    this.name = name;
    this.userid = userid;
    this.avatar = avatar;
    this.notifyCount = notifyCount;
  }

}