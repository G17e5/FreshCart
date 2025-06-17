import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html', 
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 private readonly authService = inject(AuthService)
 private readonly router = inject(Router)

 isLoding:boolean = false;
 MessageErorr:String = '';
 isSucess:string ='';
registerForm: FormGroup = new FormGroup({
  name: new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]),
  email: new FormControl(null, [
    Validators.required,
    Validators.email
  ]),
  password: new FormControl(null, [
    Validators.required,
    Validators.pattern(/^[A-Z]\w{7,}$/)
  ]),
  rePassword: new FormControl(null, [Validators.required]),
  phone: new FormControl(null, [
    Validators.required,
    Validators.pattern(/^01[0125][0-9]{8}$/)
  ]),
},{validators: this.confirmPassword});


  submitForm():void{
    if(this.registerForm.valid){
      this.isLoding = true;
         this.authService.sendRegisterForm(this.registerForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.message === 'success'){
        //navigate to log 
       setTimeout(() => {
         this.router.navigate(['/login']);       
       }, 400);
        this.isSucess = res.message
      }
      this.isLoding =false;

    },
    error:(err)=>{
      console.log(err);
      this.MessageErorr = err.error.message;
      this.isLoding =false;

    }
   })
    }else{
      this.registerForm.markAllAsTouched()
    }

  } 

    confirmPassword(group:AbstractControl)
    {
      const password = group.get('password')?.value;
      const rePassword = group.get('rePassword')?.value;

      return password === rePassword ? null : {mismatch : true}
    }
}
