import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   data: any = {};
   allProducts={}

  constructor(private uData:LoginRegisterService) { }

  ngOnInit(): void {
  //  this.data= this.uData.getData();
  //  console.log(this.data)

  this.uData.getAllData().subscribe(data=>{
    console.log(data);
    
  })
    
  }
  


}
