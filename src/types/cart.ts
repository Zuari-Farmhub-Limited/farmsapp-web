export interface CartItem {
  cartItemId:   string;
  productId:    string;
  productName:  string;
  technicalName?:string;
  imageUrl:     string;
  skuId:        string;
  size:         string;
  quantity:     number;
  price:        number;
  mrp:          number;
  isHomeDelivery:boolean;
}

export interface Cart {
  items:                       CartItem[];
  totalItems:                  number;
  subtotal:                    number;
  deliveryCharge:              number;
  discount:                    number;
  total:                       number;
  minOrderValueForFreeDelivery:number;
  couponCode?:                 string;
  couponDiscount?:             number;
}

export interface DeliveryOption {
  type:          "HOME_DELIVERY";
  label:         string;
  charge:        number;
  estimatedDays: string;
  isFree:        boolean;
  freeAbove?:    number;
}
