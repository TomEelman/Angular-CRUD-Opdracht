export class User {

    public id: number;
    public firstname: string;
    public infix: string;
    public lastname: string;
    public city: string;
    public postalcode: string;
    public street: string;
    public streetnumber: string;

    constructor(userData: any) {

        this.id = userData.id;
        this.firstname = userData.name;
        this.infix = userData.infix;
        this.lastname = userData.lastname;
        this.city = userData.city;
        this.postalcode = userData.postalcode;
        this.street = userData.street;
        this.streetnumber = userData.housenumber;
    }

 

    public get fullName() {

        if (this.infix) {
          return `${this.firstname} ${this.infix} ${this.lastname}`;
        } else {
          return `${this.firstname} ${this.lastname}`;
        }
    }

    public get fullAdress() {
        return `${this.street} ${this.streetnumber} ${this.postalcode} ${this.city}`
    }
}