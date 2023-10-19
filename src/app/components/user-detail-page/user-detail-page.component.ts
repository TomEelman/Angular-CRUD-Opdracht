import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../classes/user.class';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent {
  user?: User | null = null;
  userId!: number;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.userService.getUsersFromLocalStorage();

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
    this.router.navigate(['']);
  }
} 
