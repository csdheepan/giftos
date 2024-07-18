import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftosComponent } from './giftos/giftos.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    component: GiftosComponent
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth-module/auth-module.module').then(m => m.AuthModuleModule)
  },

  {
    path: 'user',
    loadChildren: () => import('./user-control/user-control.module').then(m => m.UserControlModule)
  },

  { path: '404', component: PageNotFoundComponent },

  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }