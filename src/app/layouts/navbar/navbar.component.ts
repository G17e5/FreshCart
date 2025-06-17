import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin=input<boolean>(true)
  private readonly _Authservices= inject(AuthService)
  private readonly _CartService= inject(CartService)
  
  countNumber:number  = 0;
  

 ngOnInit(): void {
  this._CartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this._CartService.CartNumber.next(res.numOfCartItems)
    }
  })
  //this.countNumber =  this._CartService.CartNumber.getValue();
  this._CartService.CartNumber.subscribe({
    next:(data)=>{
          this.countNumber = data
    }
  })
 }
  Loged():void{
    this._Authservices.logOut();
  }
}
