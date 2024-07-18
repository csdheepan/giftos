import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { allProducts } from 'src/mock data/all-products';
import { SignUp } from 'src/app/core/model/login-model';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';
import { CartProductService } from 'src/app/core/services/cart-product.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductDialogComponent } from '../modal/product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  listProducts: any[] = [];
  userProduct: any = [];
  cloneProductList: any[] = allProducts;
  userDetail !: SignUp;
  debounceTimer!:any
  productSubscription !: Subscription;
  
  @HostListener('document:mousewheel', ['$event'])
  onDocumentMousewheelEvent(event:Event) {
 
    if(this.debounceTimer){
      clearInterval(this.debounceTimer)
    }
    
  this.debounceTimer= setTimeout(() => {
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      // console.log("load data from infinite scroll");
      // this.loadAddCartProducts();
    }
   }, 500);
}

  constructor(private store: InMemoryCache,private snackBar: MatSnackBar, private cartProductService: CartProductService,private productService : ProductService,private dialog : MatDialog) { }

  loadAddCartProducts(){
    this.listProducts.push(...this.listProducts)
  }

  ngOnInit(): void {

    this.userDetail = JSON.parse(this.store.getItem('USER_DETAILS'));

   this.productSubscription = this.productService.getAllProducts(this.userDetail.id).subscribe((data:any)=>{

      if(data.length != 0){
        this.listProducts = data[0].product;
      }
      else{
        this.productService.addProductitem(this.cloneProductList,this.userDetail.id);
        this.listProducts = [...this.cloneProductList];
      }

      this.cartProductService.getCartProducts(this.userDetail.id).subscribe((data: any) => {

        this.userProduct = data.length != 0 ? data[0].product : [];
      })

      this.productSubscription.unsubscribe();
    });

  }



  addToCart(product: any) {

    let userId = this.userDetail.id;

    this.userProduct.push(product);

    this.cartProductService.addItem(this.userProduct, userId);

    this.snackBar.open(`You've added a ${product.name} to your cart`, 'Close', {
      duration: 5000, //Duration in milliseconds (5 seconds)
    });

  }

  serachProduct(searchValue: string) {

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

  generateStars(rating: number): any[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push('star'); // Filled star
      } else {
        stars.push('star_border'); // Empty star
      }
    }
    return stars;
  }

  handleLike(value:any){  
      
    value.likedProduct = !value.likedProduct;

    this.productService.addProductitem(this.listProducts, this.userDetail.id);
  }


  previewProduct(product:any){
    this.dialog.open(ProductDialogComponent, {
      data: product,
      width:"80%"
    });
    }
}