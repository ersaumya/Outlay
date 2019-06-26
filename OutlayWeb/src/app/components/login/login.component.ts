import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) {
    this.loginForm=fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit() {
  }
  login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((data:any)=>
      {
        console.log(data);
        localStorage.setItem('userName',data.UserName);
        localStorage.setItem('token_value',data.Token);
        this.router.navigate(['/entries']);
      },
    
    (error)=>alert(error.error.Message));
  }

}
