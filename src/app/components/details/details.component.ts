import { IProduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent  implements OnInit{
   private readonly _ActivatedRoute = inject(ActivatedRoute)
   private readonly _ProductsService = inject(ProductsService)
   detailsProduct:IProduct | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idproduct = p.get('id');
        
       this._ProductsService.getSpecificProducts(idproduct).subscribe({
        next:(res)=>{
          this.detailsProduct=res.data
          console.log(res.data)
        },
                error:(err)=>{
                  console.log(err)
                },

       })
        
 



      }
    })
  }

}
