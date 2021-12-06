import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userdataSer:UserdataService, private dataService:DataService,private router:Router) { }

  ngOnInit(): void {}

  signinForm=new FormGroup({
    email:new FormControl("rajdip@gmail.com",[Validators.required,Validators.email]),
    password: new FormControl("123456", [Validators.required, Validators.minLength(6)])
  })

  loginFunc(){
    this.userdataSer.loginService(this.signinForm.value).subscribe(d=>{
      console.log(d);
      this.signinForm.reset()
      this.dataService.setLoginStatus(true)
      this.dataService.setUserData(d)
      this.router.navigateByUrl('/')
    },error=>{
      console.log("err"+error);
      alert(error)
      
      
    })
   
  }

  consoleForm(){
    console.log(this.signinForm.value);
    
  }

}
