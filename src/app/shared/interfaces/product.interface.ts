  export interface IProductCart {
    id:                    string;
    name:                  string;
    variant:                  string;
    orderQuantity:         number,
    imgUrl:                string;
    price:                 number;
    sku:                   string;
    offer?:                OfferDto;
    storage?:              string;
  }

  
  export interface IProduct {
    id:              string;
    _id:              string;
    name:            string;
    slug:            string;
    description:     string;
    category:        string;
    brand:           string;
    status:          string;
    reviews:         Review[];
    productVariants: ProductVariant[];
    tags:            string[];
    featured:        boolean;
    rate:            number;
    qty:             number;
    additionalInformation: AdditionalInformation[];
    bgColor?:         string;
}
export interface StorageOption {
  storage: string;
  price: number;
}

export interface ProductVariant {
    name:                  string;
    isDefault?:            boolean;
    price:                 number;
    sku:                   string;
    imgUrl:                string;
    offer?:                OfferDto;
    storageOptions: StorageOption[];
}

export interface AdditionalInformation {
    key:   string;
    value: string;
}

export interface Review {
    user:   string;
    name:   string;
    email:  string;
    rating: number;
    review: string;
    date:   Date;
}

export interface OfferDto {
  startDate: Date
  endDate?: Date | null
  discount: number
}



  