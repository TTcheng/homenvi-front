export default class DbUser {
  username;
  password;
  authorities;

  constructor(username, password, authorities) {
    this.username = username;
    this.password = password;
    this.authorities = authorities;
  }
}