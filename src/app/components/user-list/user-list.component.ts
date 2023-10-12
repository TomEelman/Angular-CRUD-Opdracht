import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any[] = [];

  constructor(private userService: UserService) {
    this.users = this.userService.getUsersFromLocalStorage();
  }

  moreDetailsUserButton() {
    this.userService.moreDetailsUser();
  }

  editUserButton() {
    this.userService.editUser();
  }

  deleteUserButton(userId: number) {
    this.userService.deleteUser(userId);
  }
}
