import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user.class';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy, OnInit {
    public users!: User[];
    private unsubscriber$ = new Subject();

    constructor(public userService: UserService) {
        this.userService.deleteUser$
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe((x) => {
                this.userService.getUsers();
            })
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.users = this.userService.getUsers();
    }

    deleteUser(userId: number) {
        this.userService.deleteUser(userId);
    }

    ngOnDestroy(): void {
        this.unsubscriber$.next("unsubscribe");
        this.unsubscriber$.complete();
    }
}