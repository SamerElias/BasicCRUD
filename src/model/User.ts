
export default class User{
  username!: string
  email!: string
  firstname!: string
  lastname!: string
  password!: string

  constructor(username: string, email: string, firstname: string, lastname: string, password: string){
    this.username = username;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
  }
}