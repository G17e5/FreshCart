import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  step: number = 1;
  isLoding: boolean = false;
  MessageErorr: string = '';
  isSucess: string = '';

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  verifiyEmail = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifiyCode = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  });

  restpassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  });

  submitEmail(): void {
    this.isLoding = true;
    this.MessageErorr = '';
    this._AuthService.SetVerifiyEmail(this.verifiyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.isSucess = res.message;
          this.step = 2;
        }
        this.isLoding = false;
      },
      error: (err) => {
        this.MessageErorr = err.error.message;
        this.isLoding = false;
      }
    });
  }

  submitCode(): void {
    this.isLoding = true;
    this.MessageErorr = '';
    this._AuthService.SetVerifiyCode(this.verifiyCode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.isSucess = res.status;
          this.step = 3;
        }
        this.isLoding = false;
      },
      error: (err) => {
        this.MessageErorr = err.error.message;
        this.isLoding = false;
      }
    });
  }

  submitRestPassword(): void {
    this.isLoding = true;
    this.MessageErorr = '';
    this._AuthService.SetRestPassword(this.restpassword.value).subscribe({
      next: (res) => {
        this.isSucess = res.message;
        localStorage.setItem('userToken', res.token);
        this._AuthService.SaveUserData();
        this._Router.navigate(['/home']);
        this.isLoding = false;
      },
      error: (err) => {
        this.MessageErorr = err.error.message;
        this.isLoding = false;
      }
    });
  }
}
