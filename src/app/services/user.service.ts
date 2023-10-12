import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  id: number | null = null;
  firstname: string = '';
  infix: string = '';
  lastname: string = '';
  city: string = '';
  postalcode: string = '';
  street: string = '';
  streetnumber: number | null = null;
  additive: string = '';

  getUsersFromLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('userList') || '[]');
  }

  validateUserData() {
    let isValid = true;

    if (
      !this.firstname ||
      !this.lastname ||
      !this.city ||
      !this.postalcode ||
      !this.street ||
      this.streetnumber
    ) {
      isValid = false;
      alert("Vul alle velden met een * in");
    }

    return isValid;
    
  }

  moreDetailsUser() {
    console.log("info");
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