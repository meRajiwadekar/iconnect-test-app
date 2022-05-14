import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/shared/angular-material/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : any = FormGroup;
  responseMsg :any;
  constructor(
    private formBuilder : FormBuilder,
    private userServ : UserServiceService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : [null,[Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
      password : [null,Validators.required]
    })
  }


  handleSubmit(){
    let formData = this.loginForm.value;
    let data = {
      email : formData.email,
      password : formData.password
    }
    this.userServ.login(data).subscribe((response:any)=>{
      localStorage.setItem('token',response.token);
      alert(`Welcome to iconnect!`);
      this.router.navigate(['/dashboard']);
    },(err)=>{
      if(err.error?.message){
        this.responseMsg = err.error?.message;
        alert(this.responseMsg);
      }
    })
  }

  resetForm(){
    this.loginForm.reset();
    this.loginForm.controls.email.setErrors(null);
    this.loginForm.controls.password.setErrors(null);
  }
}
