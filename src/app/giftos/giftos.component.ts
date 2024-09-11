import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { listProducts } from '../shared/data-sharing/home-product-list';

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
  sections = listProducts
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
   this.router.navigate(['auth/login'])
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