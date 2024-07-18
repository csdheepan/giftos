import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InMemoryCache } from '../../services/memory-cache';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {


  pageNotFound = "assets/images/pagenotfound.png";
  
  constructor(
    private router : Router,
    private store: InMemoryCache
  ){}

  goHomePage(){
    this.store.clear();
    this.router.navigate(["auth/login"])
  }
}
