import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  user?: User | null = null;
  userId!: number;

  constructor(public userService: UserService, private router: Router) {
    this.userService.updateModeText();
  }

  onSubmit() {

    if (this.userService.isEditMode) {

      if (confirm("Dit zal de gebruiker zijn informatie aanpassen!")) {

        this.userService.editUser();

        this.router.navigate(['']);
      } else {

      }
    } else {

      this.userService.addUser();

    }
  }
}