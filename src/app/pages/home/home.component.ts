// import { ApisServicesService } from './../../core/services/apis/apis-services.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from "../../core/pipes/search.pipe";
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, UpperCasePipe, CurrencyPipe, TitleCasePipe, SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {
 private readonly productsService = inject(ProductsService);
 private readonly categoriesService = inject(CategoriesService);
   private readonly _CartService = inject(CartService)
   private readonly toastrService = inject(ToastrService)
   



  // private readonly apisServicesService = inject(ApisServicesService);


 products: IProduct[] = [];
 Categories: ICategories[]=[];
//  SapAPIS: IApis[]=[]
 text:string = "";

 customMianSldier: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  autoplay:true,
  navSpeed: 700,
  navText: ['', ''],
 items:1,
  nav: false
}
 customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['prev', 'next'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

   getProductsData(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.products = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }

 getCategpriesData(){
  this.categoriesService.getAllCategoires().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.Categories = res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }

 
 ngOnInit(): void 
 {
   this.getProductsData()
   this.getCategpriesData()
   //  this.getProductsAPData()
   
  }
  addToCart(id:string):void{
    this._CartService.AddProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success('added successfuly','FrechCart')
        this._CartService.CartNumber.next(res.numOfCartItems)
        console.log(this._CartService.CartNumber)
      }
    })
  }

}