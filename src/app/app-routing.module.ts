import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MainComponent } from './components/main/main.component';
import { UserDetailPageComponent } from './components/user-detail-page/user-detail-page.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'userForm', component: UserFormComponent },
  { path: 'userForm/:id', component: UserFormComponent },
  { path: 'detail/:id', component: UserDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
