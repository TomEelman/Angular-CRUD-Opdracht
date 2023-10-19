import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isEditMode: boolean = false;
  modeText!: string;
  selectedUser: any;
  userId!: number;


  private userList = 'userList';
  public id: number | null = null;
  public firstname: string = '';
  public infix: string = '';
  public lastname: string = '';
  public city: string = '';
  public postalcode: string = '';
  public street: string = '';
  public streetnumber: number | null = null;
  public additive: string = '';

  constructor(private router: Router) {
    this.isEditMode = false;
    this.updateModeText();
    this.clearFormInputs();
  }

  getUsersFromLocalStorage(): any[] {
    const usersJson = localStorage.getItem(this.userList);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  getUserById(userId: number): User | null {
    const users: User[] = this.getUsersFromLocalStorage();
    const userData = users.find(user => user.id === userId) || null
    if (userData) {
      return new User(userData);
    }
    return null;
  }

  toggleEditForm() {
    this.isEditMode = !this.isEditMode;

    this.updateModeText();

    if (this.isEditMode) {

      this.fillFormInputs();

      this.router.navigate(['/userForm']);

    }
  }

  fillFormInputs() {
    const selectedUser = this.getUserById(this.userId);

    if (selectedUser) {
      this.id = selectedUser.id;
      this.firstname = selectedUser.firstname;
      this.infix = selectedUser.infix;
      this.lastname = selectedUser.lastname;
      this.city = selectedUser.city;
      this.postalcode = selectedUser.postalcode;
      this.street = selectedUser.street;
      this.streetnumber = selectedUser.streetnumber;
      this.additive = selectedUser.additive;
    }
  }

  clearFormInputs() {
    this.firstname = '';
    this.infix = '';
    this.lastname = '';
    this.city = '';
    this.postalcode = '';
    this.street = '';
    this.streetnumber = null;
    this.additive = '';
  }

  updateModeText() {
    this.modeText = this.isEditMode ? 'Aanpassen' : 'Toevoegen';
  }

  addUser() {

    const storedData = localStorage.getItem('userList');
    let userList: any[] = storedData ? JSON.parse(storedData) : [];

    const userData = {
      id: Date.now(),
      firstname: this.firstname,
      infix: this.infix,
      lastname: this.lastname,
      city: this.city,
      postalcode: this.postalcode,
      street: this.street,
      streetnumber: this.streetnumber,
      additive: this.additive
    };

    userList.push(userData);

    localStorage.setItem('userList', JSON.stringify(userList));

    this.router.navigate(['']);

  }

  editUser() {
    const editUserId = this.userId;
    const userData = this.getUsersFromLocalStorage();
    const editUserIndex = userData.findIndex((user) => user.id === editUserId);

    if (editUserIndex !== -1) {
      userData[editUserIndex] = {
        id: editUserId,
        firstname: this.firstname,
        infix: this.infix,
        lastname: this.lastname,
        city: this.city,
        postalcode: this.postalcode,
        street: this.street,
        streetnumber: this.streetnumber,
        additive: this.additive
      };

      localStorage.setItem('userList', JSON.stringify(userData));
    }
  }

  deleteUser(userId: number): void {
    let userData = this.getUsersFromLocalStorage();
    const userIndex = userData.findIndex((user) => user.id === userId);

    if (confirm("Weet je het zeker dit zal deze gebruiker verwijderen!")) {
      userData.splice(userIndex, 1);
      localStorage.setItem('userList', JSON.stringify(userData));
      this.router.navigate(['']);
    } else {
      this.router.navigate(['']);
    }
    location.replace("localhost:4200");
  }

  locationReload() {
    location.reload()
  }
}