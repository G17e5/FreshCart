import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private readonly authService = inject(AuthService)
 private readonly router = inject(Router)

 isLoding:boolean = false;
 MessageErorr:String = '';
 isSucess:string ='';

LoginFroms: FormGroup = new FormGroup({
  email: new FormControl(null, [
    Validators.required,
    Validators.email
  ]),
  password: new FormControl(null, [
    Validators.required,
    Validators.pattern(/^[A-Z]\w{7,}$/) 
  ]),

});


  submitForm():void{
    this.isLoding = true;
    if(this.LoginFroms.valid){ 
         this.authService.sendLoginForm(this.LoginFroms.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.message === 'success'){
        this.isSucess = res.message
       setTimeout(() => {
        //1-save the token 
        localStorage.setItem('userToken',res.token)

      //2-decode Token
      this.authService.SaveUserData();



        //navigate to home 
         this.router.navigate(['/home']);       
       }, 400);
      }
      this.isLoding =false;

    },
    error:(err)=>{
      console.log(err);
      this.MessageErorr = err.error.message;
      this.isLoding =false;

    }
   })
    }

  } 

}
