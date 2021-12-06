import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-meter-home',
  templateUrl: './meter-home.component.html',
  styleUrls: ['./meter-home.component.css']
})
export class MeterHomeComponent implements OnInit {

  isLogin:boolean=false

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  this.dataService.getLoginStatus().subscribe((status)=>{
    this.isLogin=status
  })

  }

}
