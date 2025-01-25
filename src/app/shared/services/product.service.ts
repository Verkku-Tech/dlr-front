import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { IProduct, ProductVariant, StorageOption } from "../interfaces/product.interface";
import { environment } from '../../../environments/environment';
import { ProductParameters } from '../interfaces/product-parameters.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(){
    this.getProducts({})
  }
  
  public products: IProduct[] = []
  http: HttpClient = inject(HttpClient)

  public filter_offcanvas: boolean = false
  
  public filterSelect: {value: string, text: string}[] = [
    { value: 'asc', text: 'Ascending' },
    { value: 'desc', text: 'Descending' },
    { value: 'low', text: 'Price (Low to Hight)' },
    { value: 'high', text: 'Price (High to Low)' },
    { value: 'on-sale', text: 'Discount' },
    { value: 'category', text: 'Category' },
    { value: 'new', text: 'New to Old' },
  ];

  baseUrl = environment.baseUrl + '/v1/products'
  activeImg: string | undefined
  selectedVariant: ProductVariant | undefined
  selectedStorage: StorageOption | undefined
  
  getStarRating(i: number, product: IProduct){
    return i <= product.reviews.reduce((avg, review) => avg + review.rating, 0) / product.reviews.length ? '#ffa800' : '#ccc'
  }
  
  getDefaultImg({ productVariants }: IProduct){
    return productVariants.filter(e => e.isDefault)[0].imgUrl
  }

  getDefaultPrice({ productVariants }: IProduct){
    return productVariants.filter(e => e.isDefault)[0].price
  }


  getProducts({ featured, name, category }: ProductParameters){
    const params: HttpParams = new HttpParams()

    if(featured) params.set("featured", featured)
    if(name) params.set("name", name)
    if(category) params.set("category", category)
      
    firstValueFrom(this.http.get<IProduct[]>(this.baseUrl, { params }))
    .then(result => this.products = result)
  }

  handleActiveVariant(variant: ProductVariant) {
    this.selectedVariant = variant
    this.selectedStorage = undefined 

    if(variant.storageOptions.length > 0){
      this.selectedStorage = variant.storageOptions[0]
    }
    this.activeImg = variant.imgUrl;
  }
  handleSelectedStorage(storageOpt: StorageOption) {
    this.selectedStorage = storageOpt;
  }

  getMaxPrice(): number {
    const max_price = [...this.products].reduce((max, product) => {
      const variantPrices = product.productVariants.map(variant => variant.price);
      const productMaxPrice = Math.max(...variantPrices, 0);
      return productMaxPrice > max ? productMaxPrice : max;
    }, 0);
    return max_price;
  }

  getMaxPriceByProducts(data: IProduct[]): number {
    const max_price = [...data].reduce((max, product) => {

      const variantPrices = product.productVariants.map(variant => variant.price);
      const productMaxPrice = Math.max(...variantPrices, 0);
      const output = productMaxPrice > max ? productMaxPrice : max;
      return output
    }, 0);
    return max_price;
  }
  
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 9) {
    let totalPages = Math.ceil(totalItems / pageSize);
    let paginateRange = 3;

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if(currentPage < paginateRange - 1){
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage =  currentPage + 1;
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }


//   // Get Products By id
//   public getProductById(id: string): Observable<IProduct | undefined> {
//     return this.getProducts().pipe(map(items => {
//       const product = items.find(p => p.id === id);
//       if(product){
//         this.handleImageActive(product.img)
//       }
//       return product;
//     }));
//   }
//    // Get related Products
//    public getRelatedProducts(productId: string,category:string): Observable<IProduct[]> {
//     return this.products.pipe(map(items => {
//       return items.filter(
//         (p) =>
//           (p.category.name.toLowerCase().includes('todo') || p.category.name.toLowerCase() === category.toLowerCase()) &&
//           p.id !== productId
//       )
//     }));
//   }
//   // Get max price



//     // Get Product Filter
//   public filterProducts(filter: any= []): Observable<IProduct[]> {
//       return this.products.pipe(map(product =>
//         product.filter((item: IProduct) => {
//           if (!filter.length) return true

//           const Tags = filter.some((prev: any) => {
//             if (item.tags) {
//               if (item.tags.includes(prev)) {
//                 return prev;
//               }
//             }
//           });
//           return Tags
//         })
//       ));
//     }


//       // Sorting Filter
//   public sortProducts(products: IProduct[], payload: string): any {

//     if(payload === 'asc') {
//       return products.sort((a, b) => {
//         if (a.id < b.id) {
//           return -1;
//         } else if (a.id > b.id) {
//           return 1;
//         }
//         return 0;
//       })
//     } else if (payload === 'on-sale') {
//       return products.filter((p) => p.discount > 0)
//     } else if (payload === 'low') {
//       return products.sort((a, b) => {
//         if (a.price < b.price) {
//           return -1;
//         } else if (a.price > b.price) {
//           return 1;
//         }
//         return 0;
//       })
//     } else if (payload === 'high') {
//       return products.sort((a, b) => {
//         if (a.price > b.price) {
//           return -1;
//         } else if (a.price < b.price) {
//           return 1;
//         }
//         return 0;
//       })
//     }
//   }

//   /*
//     ---------------------------------------------
//     ------------- Product Pagination  -----------
//     ---------------------------------------------
//   */
}
