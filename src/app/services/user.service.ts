import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: any; // Declare a variable to store the selected user data

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
    return JSON.parse(localStorage.getItem('userList') || '[]');
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
    this.selectedUser = user; // Set the selected user data
    const openmodal = document.getElementById('exampleModal');
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
      this.locationReload()
    } else {
      this.locationReload()
    }
  }

  locationReload() {
    location.reload()
  }
}