export  interface Product {
    discount: string;
    image: string;
    name: string;
    price: string;
    star: number;
    totalRating: number;
  }
  
  export interface Order {
    address: string;
    city: string;
    country: string;
    deliveryDate: string;
    orderDate: string;
    orderId: string;
    paymentMode: string;
    phoneNumber: string;
    products: Product[];
    totalAmount: number;
    status: string;
    deliveryWindow: string;
    trackingSteps: { date: string, description: string }[];
  }

  export class ShippingDetails {
    orderId !: string;
    orderDate !: string;
    address !: string;
    city !: string;
    country !: string;
    phoneNumber !: string;
    paymentMode !: string;
    totalAmount !: number;
    deliveryDate !: string;
  }