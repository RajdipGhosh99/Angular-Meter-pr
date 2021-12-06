import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false

  userData: any
  userId: any = ''
  userAcessModule: any

  isadmin: boolean = false
  acessMeter: boolean = false
  acessDashboard: boolean = false
  acessRole: boolean = false
  acessUser: boolean = false


  constructor(private dataService: DataService, private userService: UserdataService) { }

  ngOnInit(): void {
    this.dataService.getLoginStatus().subscribe((status) => {
      this.isLogin = status
    })
    this.userDataGetFunc()


  }

  logOut() {
    this.dataService.setLoginStatus(false)
  }

  userDataGetFunc() {
    this.dataService.getUserData().subscribe(d => {
      this.userId = d._id
      this.isadmin = d.isAdmin
      console.log(this.isadmin);
      
  
      console.log(this.isadmin);
      

      console.log(this.userId);
      this.detailsById()
    })
  }



  detailsById() {
    this.userService.findById(this.userId).subscribe(d => {
      console.log(d);

      this.userData = d

      this.userAcessModule = this.userData.role_coll_id[0].module_name
      console.log(this.userAcessModule);


      if (this.userAcessModule != undefined) {
        if (this.userAcessModule.filter((v: any) => { return v == "meter" }).length == 1) {
          this.acessMeter = true
        } else { this.acessMeter = false }

        if (this.userAcessModule.filter((v: any) => { return v == "dashboard" }).length == 1) {
          this.acessDashboard = true
        } else { this.acessDashboard = false }

        if (this.userAcessModule.filter((v: any) => { return v == "user" }).length == 1) {
          this.acessUser = true
        } else { this.acessUser = false }

        if (this.userAcessModule.filter((v: any) => { return v == "role" }).length == 1) {
          this.acessRole = true
        } else { this.acessRole = false }
      }

    }
    )
  }



}
