import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store : InMemoryCache
  ) {}

  canActivate() {
    if (this.store.getItem("USER_AUTH") == 'User Authenticated Successfully' && this.store.getItem("USER_DETAILS")) {
      return true;
    } else {
      this.router.navigate(['']); // Redirect to login if not authenticated
      this.store.clear()
      return false;
    }
  }

}
