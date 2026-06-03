import { apiClient } from "../client";
import type { Cart, DeliveryOption } from "@/types";

export const cartApi = {
  getCart: () =>
    apiClient.get<Cart>("/kisaan/companion/v1/farmer/cart"),

  addItem: (skuId: string, quantity: number) =>
    apiClient.post<Cart>("/kisaan/companion/v1/farmer/cart", { skuId, quantity }),

  updateItem: (cartItemId: string, quantity: number) =>
    apiClient.put<Cart>("/kisaan/companion/v1/farmer/cart", { cartItemId, quantity }),

  removeItem: (cartItemId: string) =>
    apiClient.delete<Cart>(`/kisaan/companion/v1/farmer/cart/${cartItemId}`),

  applyCoupon: (couponCode: string) =>
    apiClient.post<Cart>("/kisaan/companion/v1/farmer/cart/coupon", { couponCode }),

  removeCoupon: () =>
    apiClient.delete<Cart>("/kisaan/companion/v1/farmer/cart/coupon"),

  getDeliveryOptions: (pincode: string) =>
    apiClient.get<{ deliveryOptions: DeliveryOption[] }>(
      "/kisaan/companion/v1/delivery-options", { params: { pincode } }
    ),
};
