import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  isModalOpen: boolean = false;
  users: any[];

  constructor(public userService: UserService) {
    this.users = this.userService.getUsersFromLocalStorage();
  }

  moreDetailsUserButton(user: any) {
    this.userService.moreDetailsUser(user);
  }

  editUserButton() {
    this.userService.editUser();
  }

  deleteUserButton(userId: number) {
    this.userService.deleteUser(userId);
  }

}
