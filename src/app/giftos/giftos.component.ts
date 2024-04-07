import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giftos',
  templateUrl: './giftos.component.html',
  styleUrls: ['./giftos.component.scss']
})
export class GiftosComponent {


  homePageImg = "assets/images/slider-img.png";
  product = "assets/images/p1.png";
  savingImage = "assets/images/saving-img.png";
  giftImage = "assets/images/gifts.png";
  contactImg = "assets/images/contact-image.png"
  listProducts = [
    { image: "assets/images/p1.png", name: "Ring", price: "$20" },
    { image: "assets/images/p2.png", name: "Watch", price: "$30" },
    { image: "assets/images/p3.png", name: "Teddy Bear", price: "$10" },
    { image: "assets/images/p4.png", name: "Flower Bouquet", price: "$20" },
    { image: "assets/images/p5.png", name: "Teddy Bear", price: "$90" },
    { image: "assets/images/p6.png", name: "Flower Bouquet", price: "$56" },
    { image: "assets/images/p7.png", name: "Watch", price: "$80" },
    { image: "assets/images/p8.png", name: "Ring", price: "$23" },
  ];
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


  constructor(private router : Router) { }

  
  ngOnInit(): void {}
   
  slideNext() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  slidePrev() {
    this.currentIndex = this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
  }

  isMenuOpen: boolean = false;

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

  scrollToProduct(){
    this.productSection.nativeElement.scrollIntoView({
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

  scrollToTestimonial(){
    this.testSection.nativeElement.scrollIntoView({
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

  navigateProducts(){
    this.router.navigate(["products"]).then(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    });
  }
}
