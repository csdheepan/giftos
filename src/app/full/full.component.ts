import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InMemoryCache } from '../services/cache-services';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {


  constructor(private router: Router, private store: InMemoryCache) { }

  logout() {
    this.store.clear();
    this.router.navigate(['']);
  }
}
