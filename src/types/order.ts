export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURN_REQUESTED"
  | "RETURNED";

export interface OrderItem {
  productId:   string;
  productName: string;
  imageUrl:    string;
  size:        string;
  quantity:    number;
  price:       number;
}

export interface Order {
  orderId:       string;
  orderDate:     string;
  status:        OrderStatus;
  items:         OrderItem[];
  subtotal:      number;
  deliveryCharge:number;
  discount:      number;
  total:         number;
  address:       import("./user").Address;
  paymentMode:   "ONLINE" | "COD";
  trackingUrl?:  string;
}
