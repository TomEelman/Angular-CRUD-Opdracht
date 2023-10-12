import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  constructor(private userService: UserService) { }

  firstname: string = this.userService.firstname;
  infix: string = this.userService.infix;
  lastname: string = this.userService.lastname;
  city: string = this.userService.city;
  postalcode: string = this.userService.postalcode;
  street: string = this.userService.street;
  streetnumber: number | null = this.userService.streetnumber;
  additive: string = this.userService.additive;

  addUser() {
    const storedData = localStorage.getItem('userList');
    let userList: any[] = storedData ? JSON.parse(storedData) : [];
  
    if (this.userService.validateUserData()) {
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

      this.userService.locationReload();
    }

  }

  showEditUserForm() {

  }

  fillUserForm() {

  }
}



