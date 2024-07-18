import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MfaComponent } from './mfa/mfa.component';

const routes: Routes = [
  {
    path:"login",
    component : LoginComponent
  },
  {
    path:'mfa',
    component: MfaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModuleRoutingModule { }
