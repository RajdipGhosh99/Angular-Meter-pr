import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserdataService } from 'src/app/services/userdata.service';
import Swal from 'sweetalert2';

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
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Login successfully'
      })
    },error=>{
      console.log("err"+error);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: error
      })
    })

   
  }

  consoleForm(){
    console.log(this.signinForm.value);
    
  }

}
