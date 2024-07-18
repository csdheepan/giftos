export class Product {
    brand !: string;
    color!: string;
    compatibility!: string;
    connectivity!: string;
    description!: string;
    dimensions!: string;
    discount!: string;
    image!: string;
    likedProduct!: boolean;
    name!: string;
    price!: string;
    size!: string;
    star!: number;
    totalRating!: number;
    warranty!: string;
    weight!: string;
  }

  export class ShippingDetails {
    estDeliveryDate !: string;
    orderAddress !: Address[];
    orderId !: string;
    productDetails !: Product[];
    purchaseDate !: string;
    totalCost !: string;
  }

  export class Address{
    address !: string;
    city !: string;
    country !: string;
    phoneNumber !: string;
    paymentMode !: string;
  }

  export class Order{
    product !: ShippingDetails
  }