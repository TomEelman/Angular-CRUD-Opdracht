import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user.class';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnDestroy {
    public user!: User;
    public editMode: boolean = false;
    public buttonText: string = "Toevoegen";
    private unsubscriber$ = new Subject();
    private userId!: number;

    constructor(public userService: UserService, private router: Router, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(params => {
            const userId = params.get('id');
            if (userId) {
                this.userId = +userId;
                this.editMode = true;
                this.buttonText = "Wijzigen";
                this.getUserById(this.userId);
            } else {
                this.createEmptyUser();
            }
        })

        this.userService.deleteUser$
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe((x) => {
                console.log(x);
        })
    }

    private getUserById(userId: number){
        const user = this.userService.getUserById(userId);
        if(user){
            this.user = user;
        }        
    }

    private createEmptyUser() {
        this.user = new User({
            firstname: "",
            infix: "",
            lastname: "",
            city: "",
            postalcode: "",
            street: "",
            streetnumber: "",
            additive: ""
        });
    }

    private validate(): boolean {
        return Boolean(
            this.user.firstname &&
            this.user.lastname &&
            this.user.city &&
            this.user.postalcode &&
            this.user.street &&
            this.user.streetnumber
        )
    }

    onSubmit() {
        if (this.validate()) {
            const user = new User({
                id: new Date().getTime(),
                firstname: this.user.firstname,
                infix: this.user.infix,
                lastname: this.user.lastname,
                city: this.user.city,
                postalcode: this.user.postalcode,
                street: this.user.street,
                streetnumber: this.user.streetnumber,
                additive: this.user.additive
            });

            if (this.editMode) {
                if (confirm("Dit zal de gebruiker zijn informatie aanpassen!")) {
                    this.userService.editUser(user);
                }
            } else {
                this.userService.addUser(user);
            }
            this.router.navigate(['/']);
            
        }
    }
    ngOnDestroy(): void {
        this.unsubscriber$.next("unsubscribe");
        this.unsubscriber$.complete();
    }
}