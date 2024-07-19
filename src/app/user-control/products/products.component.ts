import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { allProducts } from 'src/mock data/all-products';
import { SignUp } from 'src/app/core/model/login-model';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';
import { CartProductService } from 'src/app/core/services/cart-product.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductDialogComponent } from '../modal/product-dialog/product-dialog.component';
import { Product } from 'src/app/core/model/product-model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {

  listProducts: Product[] = [];
  userProducts: Product[] = [];
  cloneProductList: any[] = allProducts;
  userDetail!: SignUp;
  debounceTimer!: any;
  subscriptions: Subscription[] = [];

  constructor(
    private store: InMemoryCache,
    private snackBar: MatSnackBar,
    private cartProductService: CartProductService,
    private productService: ProductService,
    private dialog: MatDialog,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.userDetail = JSON.parse(this.store.getItem('USER_DETAILS'));
    this.loadUserProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private loadUserProducts(): void {
    const productSubscription = this.productService.getAllProducts(this.userDetail.id).subscribe(
      (data: any) => {
        if (data.length !== 0) {
          this.listProducts = data[0].product;
        } else {
          this.addDefaultProducts();
        }
        this.loadUserCartProducts();
        productSubscription.unsubscribe();
      },
      err => this.errorHandlerService.handleErrors(err, "retrieving user products")
    );
    this.subscriptions.push(productSubscription);
  }

  private addDefaultProducts(): void {
    this.productService.addProductItem(this.cloneProductList, this.userDetail.id).subscribe(
      () => this.listProducts = [...this.cloneProductList],
      err => this.errorHandlerService.handleErrors(err, "adding default products")
    );
  }

  private loadUserCartProducts(): void {
    const cartSubscription = this.cartProductService.getCartProducts(this.userDetail.id).subscribe(
      (data: any) => {
        this.userProducts = data.length !== 0 ? data[0].product : [];
      },
      err => this.errorHandlerService.handleErrors(err, "retrieving user cart products")
    );
    this.subscriptions.push(cartSubscription);
  }

  private loadMoreProducts(): void {
    this.listProducts.push(...this.cloneProductList);
  }

  addToCart(product: Product): void {
    this.userProducts.push(product);
    this.cartProductService.addItem(this.userProducts, this.userDetail.id).subscribe(
      () => this.showSnackBar(`You've added a ${product.name} to your cart`),
      err => this.errorHandlerService.handleErrors(err, "adding product to cart")
    );
  }

  searchProduct(searchValue: string): void {
    if (searchValue && searchValue.trim() !== '') {
      this.listProducts = this.cloneProductList.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.listProducts = [...this.cloneProductList];
    }
  }

 generateStars(rating: number): any[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? 'star' : 'star_border');
    }
    return stars;
  }

  handleLike(product: Product): void {
    product.likedProduct = !product.likedProduct;
    this.productService.addProductItem(this.listProducts, this.userDetail.id).subscribe(
      () => {},
      err => this.errorHandlerService.handleErrors(err, "updating like status")
    );
  }

  previewProduct(product: Product): void {
    this.dialog.open(ProductDialogComponent, {
      data: product,
      width: '80%'
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000 // Duration in milliseconds (5 seconds)
    });
  }

/**
 * 
 * Todo - Issue Occur want to fix it 
 */
  @HostListener('document:mousewheel', ['$event'])
  onDocumentMousewheelEvent(event: Event): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("Load data from Infinite scroll");
        // this.loadMoreProducts();
      }
    }, 500);
  }
}