import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/classes/user.class';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  constructor(public userService: UserService) { }

addUserButton(){
  this.userService.addUser();
}

}



