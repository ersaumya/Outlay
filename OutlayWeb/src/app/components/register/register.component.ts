import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService) {
    this.registerForm=fb.group({
      userName:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    },{
      validators:matchingFields('password','confirmPassword')
    })
  }



  ngOnInit() {
  }
  
  registerForm: FormGroup;

  onSubmit(){
    //console.log(this.registerForm.value);
    delete this.registerForm.value.confirmPassword;
    this.authService.register(this.registerForm.value).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem('userName',data.UserName);
      localStorage.setItem('token_value',data.Token);
    })
  }

}

 //confirm password validation function
 function  matchingFields(field1,field2){
  return form=>{
    if(form.controls[field1].value!==form.controls[field2].value){
      return {matchingFields:true}
    }
  }
}