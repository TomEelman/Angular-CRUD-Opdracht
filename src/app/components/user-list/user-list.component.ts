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
    this.userService.userId = userId;
    this.userService.toggleEditForm();
  }

  deleteUserButton(userId: number) {
    this.userService.deleteUser(userId);
    this.userService.locationReload();
  }

}
