import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)

  cartDetails:Icart = {} as Icart;
  ngOnInit(): void {
    this.getCartData()
  }

  getCartData():void{
    
    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartDetails = res.data;
      }
    })
  }

  RemoveItem(id:string):void{
    this._CartService.RemoveSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res.data)
       this.cartDetails = res.data;
       this._CartService.CartNumber.next(res.numOfCartItems)
      this.toastrService.error('Item Removed','FrechCart')

      }
    })
  }
  UpdatedCounted(id:string,count:number):void{
    this._CartService.UpdatedProductCounted(id,count).subscribe({
      next:(res)=>{
        console.log(res)
       this.cartDetails = res.data;
         this._CartService.CartNumber.next(res.numOfCartItems)
      this.toastrService.info('Quntity Updated','FrechCart')

      }
    })
  }

  ClearItem():void
  {
    this._CartService.ClearCart().subscribe({
      next:(res)=>{
       if(res.message === 'success')
       {
          this.cartDetails = {} as Icart
            this._CartService.CartNumber.next(0)
       }
      }
    })
  }
}
