import User from '../model/User';

export default class Query {
  public static getUsers: string = `SELECT * FROM public.users;`;
  public static getUser(username: string){
    return `SELECT * FROM public.users WHERE username = '${username}'`;
  };
  public static addUser(user: User){
    const { username, email, firstname, lastname, password } = user;
    return `INSERT INTO users(username, email, firstname, lastname, password) 
      values ('${username}', '${email}', '${firstname}', '${lastname}', '${password}');`
  };
  public static removeUser(username: string){
    return `DELETE FROM users WHERE username='${username}'`;
  }
}