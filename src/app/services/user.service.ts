import { Injectable } from '@angular/core';
import { User } from '../classes/user.class';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users!: User[];
    private deleteUserSubject = new Subject<any>();
    public deleteUser$ = this.deleteUserSubject.asObservable();

    constructor() {
        this.users = this.getUsers();
    }

    public getUsers(): User[] {
        const userData = localStorage.getItem("userList");
        const tmpArr: User[] = [];

        if (userData) {
            const users: any[] = JSON.parse(userData);
            users.forEach((userData: any) => {
                const user = new User(userData);
                tmpArr.push(user);
            });
        }
        return tmpArr;
    }

    public getUserById(userId: number): User | null {
        const user = this.users.find(user => user.id === userId) || null;
        if (user) {
            return user;
        }
        return null;
    }

    public addUser(user: User): void {
        const existingUser = this.users.find(userObj => userObj.id === user.id) || null;

        if (!existingUser) {
            this.users.push(user);
            localStorage.setItem('userList', JSON.stringify(this.users));
        }
    }

    public editUser(user: User): void {
        const existingUserIndex = this.users.findIndex(userObj => userObj.id === user.id);

        if (existingUserIndex > -1) {
            this.users[existingUserIndex] = user;
            localStorage.setItem('userList', JSON.stringify(this.users));
        }
    }

    public deleteUser(userId: number): void {
        const userIndex = this.users.findIndex((user) => user.id === userId);

        if (userIndex > -1) {
            if (confirm("Weet je het zeker dit zal deze gebruiker verwijderen!")) {
                this.users.splice(userIndex, 1);
                this.deleteUserSubject.next('userDeleted')
                localStorage.setItem('userList', JSON.stringify(this.users));
            }
        }
        this.getUsers();
    }
}