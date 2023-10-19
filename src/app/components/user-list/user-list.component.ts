import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user.class';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  user?: User | null = null;
  userId!: number;
  users: any[];

  constructor(private route: ActivatedRoute, public userService: UserService) {
    this.users = this.userService.getUsersFromLocalStorage();
    this.userService.clearFormInputs();
    this.userService.isEditMode = false;

    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')! || 0;
      this.user = this.userService.getUserById(this.userId);
    }
    )
  }

  toggleEditFormButton(userId: number) {

    const selectedUser = this.userService.getUserById(userId);
    this.userService.toggleEditForm();

    if (selectedUser) {
      this.userService.id = selectedUser.id;
      this.userService.firstname = selectedUser.firstname;
      this.userService.infix = selectedUser.infix;
      this.userService.lastname = selectedUser.lastname;
      this.userService.city = selectedUser.city;
      this.userService.postalcode = selectedUser.postalcode;
      this.userService.street = selectedUser.street;
      this.userService.streetnumber = selectedUser.streetnumber;
      this.userService.additive = selectedUser.additive;
    }
  }

  deleteUserButton(userId: number) {
    this.userService.deleteUser(userId);
  }

}
