import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly httpClient:HttpClient) { }
   CartNumber : BehaviorSubject<number> = new BehaviorSubject(0);
   
  AddProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,

      {
        "productId": id
     }
    )
  }

   getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`
    )
  }

  RemoveSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
    )
  }

    UpdatedProductCounted(id:string,newCount:Number):Observable<any>{
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
    "count": newCount
      }
    )
  }

  
  ClearCart():Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`
    )
  }
} 
