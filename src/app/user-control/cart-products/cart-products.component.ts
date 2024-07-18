import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUp } from 'src/app/core/model/login-model';
import { InMemoryCache } from 'src/app/shared/services/memory-cache';
import { CartProductService } from 'src/app/core/services/cart-product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {


  listProducts: any[] = [];
  overallPrice !: string;
  discount !: any;
  tax !: any;
  totalCost !: any;
  form: FormGroup = Object.create(null);
  userDetail !: SignUp;
  subscription !: Subscription;

  constructor(private store: InMemoryCache, private router: Router, private fb: FormBuilder, private datePipe: DatePipe
    , private cartProductService: CartProductService, private userService: UserService, private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {

    this.userDetail = JSON.parse(this.store.getItem('USER_DETAILS'));


    this.getUserCartProducts();

    this.getUserDetails();

    this.form = this.fb.group({
      "address": [null, Validators.compose([Validators.required])],
      "city": [null, Validators.compose([Validators.required])],
      "country": [null, Validators.compose([Validators.required])],
      "phoneNumber": [null, Validators.compose([Validators.required])],
      "paymentMode": ['cash on delivery', Validators.compose([Validators.required])]
    })

  }

  //method to retrieve user cart product
  getUserCartProducts() {
    this.subscription = this.cartProductService.getCartProducts(this.userDetail.id).subscribe((data: any) => {

      this.listProducts = data.length != 0 ? data[0].product : [];

      this.subscription.unsubscribe(); // Unsubscribe once data is retrieved

      this.caluculatePrice();
    })
  }

  //method to retrieve user details for shipping details
  getUserDetails() {
    this.userService.getUserDetails(this.userDetail.id).subscribe((data: any) => {
      if(data.length != 0){
        this.form.patchValue({
          "address": data[0].street,
          "city": data[0].city,
          "country": data[0].country,
          "phoneNumber": data[0].phone,
        })
      }
    })
  }


  caluculatePrice() {

    if (this.listProducts) {

      const totalPrice = this.listProducts.reduce((accumulator, currentProduct) => {
        const price = parseFloat(currentProduct.price.replace('$', ''));
        return accumulator + price;
      }, 0);

      this.overallPrice = totalPrice.toFixed(2); // Format the total price with 2 decimal places

      // Calculate discount amount (10% of total price)
      this.discount = (totalPrice * 0.1).toFixed(2);

      // Calculate total cost before tax
      const totalCostBeforeTax = totalPrice - this.discount;

      // Define the tax percentage (e.g., 5%)
      const taxPercentage = 5;

      // Calculate tax amount (specified percentage of total cost before tax)
      this.tax = (totalCostBeforeTax * taxPercentage) / 100;

      // Calculate total cost with tax
      this.totalCost = totalCostBeforeTax + this.tax;
    }
    else {
      this.overallPrice = "0";
      this.discount = 0;
      this.tax = 0;
      this.totalCost = 0;
      this.listProducts = [];
    }

  }

  
  //method for remove product from cart
  removeProduct(product: any, index: number) {

    // Remove the product from the listProducts array based on the index
    this.listProducts.splice(index, 1);

    console.log('Removed Product' + product);

    this.caluculatePrice();

    //service call to update item in database
    this.cartProductService.addItem(this.listProducts, this.userDetail.id);
  }


  //method for product (back to shop)
  navigateShop() {
    this.router.navigate(["user/full/products"])
  }


  //method for placing order
  confirmOrder() {

    if (this.listProducts.length != 0 && this.form.valid) {
      // Get today's date
      const orderDate = new Date();
      const formattedOrderDate = this.datePipe.transform(orderDate, 'MMMM d, yyyy h:mm a');

      // Get the delivery date one week later
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7);
      const formattedDeliveryDate = this.datePipe.transform(deliveryDate, 'MMMM d, yyyy');

      // Generate a random order ID
      const orderId = '#' + (Math.floor(1000000 + Math.random() * 9000000));

      const trackingSteps = this.generateTrackingSteps(orderDate);

      const objDetails: any = {
        "address": this.form.controls['address'].value,
        "phoneNumber": this.form.controls['phoneNumber'].value,
        "city": this.form.controls['city'].value,
        "country": this.form.controls['country'].value,
        "totalAmount": this.totalCost,
        "orderDate": formattedOrderDate,
        "deliveryDate": formattedDeliveryDate,
        "orderId": orderId,
        "paymentMode": this.form.controls['paymentMode'].value,
        'products': this.listProducts,
        "status": "Dispatched",
        'trackingSteps': trackingSteps
      }

      this.cartProductService.DeleteCartItem(this.userDetail.id).subscribe((data: any) => {
        console.log("Cart item Deleted Sucessfully" + data);
        this.cartProductService.placedProduct(objDetails, this.userDetail.id);
      });

      this.router.navigate(["user/full/order-placed"]);

      let shippingDetails = JSON.stringify(objDetails);
      this.store.setItem("SHIPPING_DETAILS", shippingDetails);
    }
    else if(!this.form.valid){
      this.snackBar.open(`Please Enter Shipping Details for your Delivery`, 'Close', {
        duration: 5000, //Duration in milliseconds (9 seconds)
      });
    }
    else {
      this.snackBar.open(`Your cart is currently empty.Please add product and proceed order`, 'Close', {
        duration: 9000, //Duration in milliseconds (9 seconds)
      });
    }

  }


  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  generateTrackingSteps(orderDate: Date): { date: string, description: string }[] {
    const steps = [
      { days: 0, description: 'Order placed' },
      { days: 1, description: 'Order processed' },
      { days: 2, description: 'Shipped' },
      { days: 7, description: 'Out for delivery' }
    ];

    return steps.map(step => {
      const date = new Date(orderDate);
      date.setDate(orderDate.getDate() + step.days);
      return { date: this.formatDate(date), description: step.description };
    });
  }
}
