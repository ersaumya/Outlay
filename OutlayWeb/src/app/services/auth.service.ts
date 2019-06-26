import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string="https://localhost:44307/auth/"

  constructor(private http:HttpClient,private router:Router) { }
   
  register(user){
    return this.http.post(this.baseUrl+'register',user);
  }

  login(user){
    return this.http.post(this.baseUrl+'login',user);
  }

  logout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('token_value');
    this.router.navigate(['/login']);
  }

  get getUserName(){
    return localStorage.getItem('userName');
  }

  get isAuthenticated(){
    return !!localStorage.getItem('token_value');
  }
}
