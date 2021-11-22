import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  adminLogin = this.fb.group({
    email: new FormControl(""),
    password: new FormControl(""),
    genderRadio:new FormControl("")
  })
 

 

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  
    
  
  }

}
