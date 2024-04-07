import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InMemoryCache } from '../services/cache-services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  listProducts :any []= [];
  userProduct : any =[];
  cloneProductList : any[]=[
    { image: "assets/images/p1.png", name: "Ring", price: "$20" },
    { image: "assets/images/p2.png", name: "Watch", price: "$35" },
    { image: "assets/images/p3.png", name: "Teddy Bear", price: "$10" },
    { image: "assets/images/p8.png", name: "Ring", price: "$45" },
    { image: "assets/images/p9.png", name: "Shoes", price: "$45" },
    { image: "assets/images/p10.png", name: "Shoes", price: "$30" },
    { image: "assets/images/p11.png", name: "Chair", price: "$40" },
    { image: "assets/images/p12.png", name: "Tablet", price: "$180" },
    { image: "assets/images/p13.png", name: "Tv", price: "$450" },
    { image: "assets/images/p14.png", name: "Laptop", price: "$560" },
    { image: "assets/images/p4.png", name: "Flower Bouquet", price: "$20" },
    { image: "assets/images/p5.png", name: "Teddy Bear", price: "$90" },
    { image: "assets/images/p6.png", name: "Flower Bouquet", price: "$56" },
    { image: "assets/images/p7.png", name: "Watch", price: "$80" },
    { image: "assets/images/p15.png", name: "Men Wear", price: "$20" },
    { image: "assets/images/p16.png", name: "Men Wear", price: "$90" },
    { image: "assets/images/p17.png", name: "Men Wear", price: "$56" },
    { image: "assets/images/p18.png", name: "Women Wear", price: "$80" },
    { image: "assets/images/p19.png", name: "Women Wear", price: "$49" },
  ];


  cartCount: number = 0;

  constructor(private router : Router,private store : InMemoryCache,private _snackBar: MatSnackBar){}


  ngOnInit(): void {
    let userProduct =  JSON.parse(this.store.getItem("USER_PRODUCT"));
    this.cartCount = userProduct ? userProduct.length : 0;

     // Initialize filteredProducts with listProducts array on component initialization
     this.listProducts = [...this.cloneProductList];
  }

  navigateHome(){
    this.router.navigate(["home"])
  }

  navigateCart(){
    this.router.navigate(["cart"])
  }

  addToCart(product: any){
    this.cartCount++;

    let existingProduct = this.store.getItem('USER_PRODUCT');
    if(existingProduct){
       this.userProduct = JSON.parse(existingProduct);
       this.userProduct.push(product);
    }
    else{
      this.userProduct.push(product);
    }

    let userProduct = JSON.stringify(this.userProduct);
    this.store.setItem('USER_PRODUCT',userProduct);

    this._snackBar.open(`You've added a ${product.name} to your cart`, 'Close', {
      duration: 5000, //Duration in milliseconds (5 seconds)
    }); 
  
  }

  serachProduct(searchValue:string){

    if (searchValue && searchValue.trim() !== "") {
      // Filter the listProducts array based on the search value
      this.listProducts = this.cloneProductList.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      // If search value is empty, display all products
      this.listProducts = [...this.cloneProductList];
    }
  }
}
