import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}
  
  userData:any = null;
   private readonly _Router = inject(Router)


  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
  }


  SaveUserData():void{
    if(localStorage.getItem('userToken') !== null){
    this.userData =  jwtDecode(localStorage.getItem('userToken') ! )
    console.log('UserData',this.userData);
    }

  } 

 logOut():void{
  localStorage.removeItem('userToken');
  this.userData = null;
  //navigate to login
  this._Router.navigate(['/login']);
 }


 SetVerifiyEmail(data:object):Observable<any>{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,data)
 }
  SetVerifiyCode(data:object):Observable<any>{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,data)
 }
  SetRestPassword(data:object):Observable<any>{
  return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,data)
 }


}


