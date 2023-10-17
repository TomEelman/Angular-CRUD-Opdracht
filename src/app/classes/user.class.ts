export class User {

  public id: number;
  public firstname: string;
  public infix: string;
  public lastname: string;
  public city: string;
  public postalcode: string;
  public street: string;
  public streetnumber: string;
  public additive: string;

  constructor(userData: any) {

    this.id = userData.id;
    this.firstname = userData.firstname;
    this.infix = userData.infix;
    this.lastname = userData.lastname;
    this.city = userData.city;
    this.postalcode = userData.postalcode;
    this.street = userData.street;
    this.streetnumber = userData.streetnumber;
    this.additive = userData.additive;

  }



  public get fullName() {
    if (this.infix) {
      return `${this.firstname} ${this.infix} ${this.lastname}`;
    } else {
      return `${this.firstname} ${this.lastname}`;
    }
  }

  public get Adress() {
    return `${this.city} ${this.postalcode}`
  }

  public get residentialDetails() {
    return `${this.street} ${this.streetnumber} ${this.additive}`
  }

}