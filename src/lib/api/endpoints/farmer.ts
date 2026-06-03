import { apiClient } from "../client";
import type { Farmer, Address } from "@/types";

export const farmerApi = {
  getProfile: () =>
    apiClient.get<Farmer>("/kisaan/companion/v1/farmer"),

  updateProfile: (payload: Partial<Farmer>) =>
    apiClient.put<Farmer>("/kisaan/companion/v1/farmer", payload),

  getAddresses: () =>
    apiClient.get<{ addresses: Address[] }>("/kisaan/farmer/address"),

  addAddress: (address: Omit<Address, "addressId">) =>
    apiClient.post<Address>("/kisaan/farmer/address", address),

  updateAddress: (addressId: number, address: Partial<Address>) =>
    apiClient.put<Address>(`/kisaan/farmer/address/${addressId}`, address),

  deleteAddress: (addressId: number) =>
    apiClient.delete(`/kisaan/farmer/address/${addressId}`),

  getWishlist: () =>
    apiClient.get<{ productId: string }[]>("/kisaan/companion/v1/farmer/wishlist"),

  addToWishlist: (productId: string) =>
    apiClient.post("/kisaan/companion/v1/farmer/wishlist", { productId }),

  removeFromWishlist: (productId: string) =>
    apiClient.delete(`/kisaan/companion/v1/farmer/wishlist/${productId}`),
};
