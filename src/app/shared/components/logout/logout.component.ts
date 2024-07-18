import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InMemoryCache } from '../../services/memory-cache';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(
    private router: Router, 
    private store: InMemoryCache
  ) { }

  logout() {
    this.store.clear();
    this.router.navigate(['']);
  }
  
}
