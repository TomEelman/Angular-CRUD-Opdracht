import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: any;

  private userList = 'userList';
  public firstname: string = '';
  public infix: string = '';
  public lastname: string = '';
  public city: string = '';
  public postalcode: string = '';
  public street: string = '';
  public streetnumber: number | null = null;
  public additive: string = '';

  constructor(private router: Router) { }

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

  moreDetailsUser(user: any) {
    this.selectedUser = user;
    const openmodal = document.getElementById('userModal');
    if (openmodal) {
      openmodal.classList.add('show');
      openmodal.style.display = 'block';
    }
  }

  editUser() {
    console.log('edits');
  }

  deleteUser(userId: number): void {
    let userData = this.getUsersFromLocalStorage();
    const userIndex = userData.findIndex((user) => user.id === userId);

    if (confirm("Weet je het zeker dit zal deze gebruiker verwijderen!")) {
      userData.splice(userIndex, 1);
      localStorage.setItem('userList', JSON.stringify(userData));
      this.router.navigate(['']);
      this.locationReload();
    } else {
      this.locationReload();
    }
  }

  locationReload() {
    location.reload()
  }
}