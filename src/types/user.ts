export interface Farmer {
  farmerId:        number;
  farmerName:      string;
  mobileNumber:    string;
  email?:          string;
  age?:            number;
  gender?:         string;
  pincode:         string;
  village?:        string;
  district?:       string;
  stateName?:      string;
  areaName?:       string;
  streetName?:     string;
  crops?:          Crop[];
  loyaltyCoins?:   number;
}

export interface Crop {
  cropId:   number;
  cropName: string;
  imageUrl: string;
}

export interface Address {
  addressId:   number;
  name:        string;
  mobileNumber:string;
  addressLine1:string;
  addressLine2?:string;
  city:        string;
  district:    string;
  state:       string;
  pincode:     string;
  isDefault:   boolean;
}

export interface AuthTokens {
  accessToken:  string;
  refreshToken: string;
  expiresIn?:   number;
}

export interface LoginResult {
  status:            string;
  httpStatus:        string;
  message:           string;
  status_code:       string;
  farmerId:          number;
  registeredFarmer:  boolean;
  enablePincode?:    boolean;
  preferredLanguage: string;
  expiresIn:         number;
  customerDetail?:   string;
  CustomerStore?:    number;
  bearerToken?:      string;
  refreshToken?:     string;
}
