import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user.class';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit {
  public user?: User | null = null;
  private userId?: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {

    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.userId = +userId;
      }
    })
  }

  ngOnInit(): void {
    if(this.userId){
      this.user = this.userService.getUserById(this.userId);
    }
  }
} 
