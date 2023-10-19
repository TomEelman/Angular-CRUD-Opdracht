import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: any;
  isEditMode: boolean = false;
  modeText!: string;
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
      this.router.navigate(['/userForm']);
    }
  }

  clearFormInputs(){
        this.firstname = '';
        this.infix = '';
        this.lastname = '';
        this.city = '';
        this.postalcode = '';
        this.street = '';
        this.streetnumber = 0;
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
    const editUserId = this.getUserById(this.userId);
    const userData = this.getUsersFromLocalStorage();
    const editUserIndex = userData.findIndex((user) => user.Id == editUserId);

    if (editUserIndex !== -1) {
      userData[editUserIndex] = {
        id: this.id,
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
      this.locationReload();
      location.replace("localhost:4200");
    } else {
      location.replace("localhost:4200");
    }
    this.locationReload();
  }

  locationReload() {
    location.reload()
  }
}