import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly  activtedRoute=inject(ActivatedRoute);
  private readonly  ordersService=inject(OrdersService);

  checkoutForm!: FormGroup;
  cardId: string = "";

  ngOnInit(): void {
    this.initForm(),
    this.getcartid()
  }

  initForm():void{
     this.checkoutForm = new FormGroup({
      details: new FormControl(null, Validators.required),
      phone: new FormControl(null,Validators.required),
      city: new FormControl(null, Validators.required)
    });
    
  }
   getcartid():void{
    this.activtedRoute.paramMap.subscribe({
      next:(param)=>{
         this.cardId = param.get('id') !
         console.log(param.get('id') !)
      }
    })
   }
  submitFrom():void{
    console.log(this.checkoutForm.value)
    this.ordersService.checkOutPayment(this.cardId, this.checkoutForm.value).subscribe({
         next:(res)=>{
        console.log(res);
        open(res.session.url,'self')
      },
       error:(err)=>{
        console.log(err);
      }
    })
  }
}
