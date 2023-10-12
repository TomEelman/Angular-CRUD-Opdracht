import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service'; // Import your UserService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  [x: string]: any;

  constructor(private userService: UserService) { }

}