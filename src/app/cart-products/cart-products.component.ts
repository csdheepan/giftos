import { Component, OnInit } from '@angular/core';
import { InMemoryCache } from '../services/cache-services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  showCardDetails : boolean = false;
  form : FormGroup = Object.create(null)

  constructor(private store: InMemoryCache, private router: Router,private fb : FormBuilder,private datePipe: DatePipe) { }


  //handle the like based on listproducts length 
  likedProducts: boolean[] = Array(this.listProducts.length).fill(false);





  ngOnInit(): void {

    this.listProducts = JSON.parse(this.store.getItem("USER_PRODUCT"));

    this.form = this.fb.group({
      "address":[null,Validators.compose([Validators.required])],
      "city" : [null,Validators.compose([Validators.required])],
      "country": [null,Validators.compose([Validators.required])],
      "phoneNumber" : [null,Validators.compose([Validators.required])],
      "paymentMode" : [null,Validators.compose([Validators.required])]
    })
    this.caluculatePrice();

  }


  removeProduct(product: any, index: number) {

    // Remove the product from the listProducts array based on the index
    this.listProducts.splice(index, 1);

    let userProduct = JSON.stringify(this.listProducts)

    this.store.setItem('USER_PRODUCT',userProduct);

    this.caluculatePrice();

  }

  navigateShop() {
    this.router.navigate(["products"]).then(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    });
  }

  confirmOrder(){
    this.router.navigate(["order"]);

     // Get today's date
     const orderDate = new Date();
     const formattedOrderDate = this.datePipe.transform(orderDate, 'MMMM d, yyyy h:mm a');
 
     // Get the delivery date one week later
     const deliveryDate = new Date();
     deliveryDate.setDate(deliveryDate.getDate() + 7);
     const formattedDeliveryDate = this.datePipe.transform(deliveryDate, 'MMMM d, yyyy');
 
     // Generate a random order ID
     const orderId = '#' + (Math.floor(1000000 + Math.random() * 9000000));

    let objDetails : any = {
      "address" : this.form.controls['address'].value,
      "phoneNumber" : this.form.controls['phoneNumber'].value,
      "city" : this.form.controls['city'].value,
      "country" : this.form.controls['country'].value,
      "totalAmount" : this.totalCost,
      "orderDate" : formattedOrderDate,
      "deliveryDate" : formattedDeliveryDate,
      "orderId" : orderId,
      "paymentMode" : this.form.controls['paymentMode'].value
    }
    let shippingDetails = JSON.stringify(objDetails);
    this.store.setItem("SHIPPING_DETAILS",shippingDetails);
  }

  caluculatePrice() {

    if(this.listProducts){

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
    else{
      this.overallPrice = "0";
      this.discount = 0;
      this.tax = 0;
      this.totalCost = 0;
    }
   
  }
  paymentMode(value:string){
    if(value == "card"){
      this.showCardDetails = true;
    }
    else{
      this.showCardDetails = false;
    }

  }

  toggleLike(index: number) {
    this.likedProducts[index] = !this.likedProducts[index];
  }
}
