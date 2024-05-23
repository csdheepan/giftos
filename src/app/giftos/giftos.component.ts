import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-giftos',
  templateUrl: './giftos.component.html',
  styleUrls: ['./giftos.component.scss']
})
export class GiftosComponent {

  isMenuOpen: boolean = false;
  likedProduct : boolean = false;
  homePageImg = "assets/images/slider-img.png";
  product = "assets/images/p1.png";
  savingImage = "assets/images/saving-img.png";
  giftImage = "assets/images/gifts.png";
  contactImg = "assets/images/contact-image.png";
  sections = [
    { title: "Fresh Sales", products: [
      { image: "assets/images/p1.png", name: "HAVIT HV-G92 Gamepad", price: "$120",actualPrice: "$160",star:4,totalRating:200,discount:'40%',likedProduct:false},
    { image: "assets/images/p2.png", name: "AK-900 Wired Keyboard", price: "$960",actualPrice: "$1100",star:5,totalRating:458,discount:'20%',likedProduct:false },
    { image: "assets/images/p3.png", name: "IPS LCD Gaming Monitor",  price: "$360",actualPrice: "$490",star:3,totalRating:350,discount:'35%',likedProduct:false  },
    { image: "assets/images/p4.png", name: "S-Series Comfort Chair ", price: "$375",actualPrice: "$400",star:4,totalRating:99,discount:'15%',likedProduct:false  },
    { image: "assets/images/p5.png", name: "Gucci duffle bag", price: "$35",actualPrice: "$40",star:4,totalRating:66,discount:'10%',likedProduct:false  },
    ] },
    { title: "Best Selling Products", products: [
      { image: "assets/images/p6.png", name: "GP11 Shooter USB Gamepad", price: "$660",star:5,totalRating:350,discount:'New',likedProduct:false},
    { image: "assets/images/p7.png", name: "CANON EOS DSLR Camera", price: "$960",star:4,totalRating:458, discount:'Best',likedProduct:false},
    { image: "assets/images/p8.png", name: "ASUS FHD Gaming Laptop",  price: "$900",star:3,totalRating:350,discount:'New',likedProduct:false  },
    { image: "assets/images/p9.png", name: "Jr. Zoom Soccer Cleats ", price: "$375",actualPrice: "$400",star:4,totalRating:99,discount:'Hot',likedProduct:false  },
    { image: "assets/images/p10.png", name: "Quilted Satin Jacket", price: "$350",actualPrice: "$300",star:4,totalRating:66,discount:'10%' ,likedProduct:false },
    { image: "assets/images/p17.png", name: "iphone 12", price: "$700",actualPrice: "$600",star:4,totalRating:280,discount:'10%' ,likedProduct:false},
    ] },
    { title: "Explore Our Products", products: [ 
    { image: "assets/images/p11.png", name: "Kids Electric Car", price: "$960",actualPrice: "$1100",star:5,totalRating:458,discount:'20%' ,likedProduct:false},
    { image: "assets/images/p12.png", name: "RGB liquid CPU Cooler",  price: "$360",actualPrice: "$490",star:3,totalRating:350,discount:'35%'  ,likedProduct:false},
    { image: "assets/images/p13.png", name: "S-Series Comfort Chair ", price: "$375",actualPrice: "$400",star:4,totalRating:99,discount:'15%' ,likedProduct:false },
    { image: "assets/images/p16.png", name: "The north coat", price: "$120",actualPrice: "$160",star:4,totalRating:200,discount:'40%',likedProduct:false},
  ] }
  ];
  listProducts = [];
  shopPolicy = [
    { image: "assets/images/free-delivery.png", title: "Fast Delivery", description: "Get your orders delivered quickly with our fast delivery service." },
    { image: "assets/images/quality-image.png", title: "Quality", description: "Experience top-notch quality products that meet your expectations." },
    { image: "assets/images/free-shipping.png", title: "Free Delivery", description: "Enjoy free delivery on all orders, no minimum purchase required." }
  ];
  testimonials = [
    { name: "John", position: "Customer", description: "As the CEO of a growing company, I rely on efficient and reliable services to meet our needs. This shop never fails to deliver exceptional products and excellent customer service. Whether it's a last-minute order or a special request, they always go above and beyond to ensure our satisfaction. I highly recommend them to anyone looking for top-notch quality and reliability." },
    { name: "Jane", position: "Customer", description: "Being a developer, attention to detail and quality are paramount to me. This shop consistently exceeds my expectations with its wide selection of high-quality products and personalized service. Whether I'm shopping for gifts or essentials, I can always count on them to deliver excellence. Their attention to detail and commitment to customer satisfaction make them my go-to destination for all my shopping needs." },
    { name: "Dheepan", position: "Customer", description: "I have been consistently impressed with the quality of products and the speed of delivery provided by this shop. From beautifully crafted items to prompt and courteous service, every experience has exceeded my expectations. Highly recommended!" },
  ];
  currentIndex = 0;
  @ViewChild ('home') homeSection !: ElementRef;
  @ViewChild ('product') productSection !: ElementRef;
  @ViewChild ('shop') shopSection !: ElementRef;
  @ViewChild ('testimonial') testSection !: ElementRef;
  @ViewChild ('contact') contactSection !: ElementRef;


  constructor(private router : Router,private dialog :MatDialog) { }

  
  ngOnInit(): void {}
   
  slideNext() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  slidePrev() {
    this.currentIndex = this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
  }


  toggleSidenav(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToHome(){
    this.homeSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }


  scrollToShop(){
    this.shopSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }


  scrollToContact(){
    this.contactSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  login(){
   this.router.navigate(['login'])
  }


  isScrolledLeft: boolean = false;
  isScrolledRight: boolean = false;


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
    if(value == "liked"){
      this.likedProduct = !this.likedProduct
    }
    else{
      value.likedProduct = !value.likedProduct;
    }
  }

}
