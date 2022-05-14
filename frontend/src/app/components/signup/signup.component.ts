import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/shared/angular-material/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  responseMsg : any;
  signupForm : any = FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private userServ : UserServiceService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username : [null,[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]],
      email : [null,[Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
      password : [null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]]
    })
  }

  handleSubmit(){
    let formData = this.signupForm.value;
    console.log(formData);
    let data = {
      username : formData.username,
      email : formData.email,
      password : formData.password
    }
    this.userServ.signup(data).subscribe((response:any)=>{
      confirm("User created successfully!");
      this.router.navigate(['/login']);
    },(err)=>{
      if(err.error?.message){
        this.responseMsg = err.error?.message;
        alert(this.responseMsg);
      }
    })
  }

    resetForm(){
    this.signupForm.reset();
    this.signupForm.controls.username.setErrors(null);
    this.signupForm.controls.email.setErrors(null);
    this.signupForm.controls.password.setErrors(null);
  }
}
