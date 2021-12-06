import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userFullData:any=[]
  userData:any=[]
  oId:any=""
  loginStatus:boolean=false
  roleOptions:any=[]


  constructor(private dataSer:DataService, private userService:UserdataService,private router:Router) {
    this.loginStatusFunc()
    this.throwTologin()
  }

  ngOnInit(): void {
    this.dataSer.getUserData().subscribe(d => {
      this.userFullData = d
      console.log("vggvgvvbbbujbh");
      
      console.log(d);
    })
    this.getUserData()
    this.addUser.controls.created_by.setValue(this.userFullData.user_name)
  }

  getAllRoles(){
    this.userService.getRoleOptions().subscribe(d=>{
      this.roleOptions=d

    },err=>alert("err"))
  }



  loginStatusFunc() {
    this.dataSer.getLoginStatus().subscribe(d=>{
      this.loginStatus=d
    })

  }

  throwTologin(){
    if(this.loginStatus==false){
      this.router.navigateByUrl("/user/login")

    }
  }

  addUser=new FormGroup({
    user_name:new FormControl("",[Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    role_coll_id:new FormControl(""),
    created_by:new FormControl("")
    
  })

  getUserId(data: any){
    this.oId=data._id
    console.log(this.oId);
    this.getAllRoles()
    this.addUser.controls.user_name.setValue(data.user_name)
    this.addUser.controls.email.setValue(data.email)
    this.addUser.controls.password.setValue(data.password)
    this.addUser.controls.role_coll_id.setValue(data.role_coll_id.role_name)

  }

  addUserForm(){
   
    console.log(this.addUser.value);

    this.userService.addUser(this.addUser.value).subscribe(d=>{
      alert("User added sucessfully")
      this.getUserData()
      this.addUser.reset()
    })
  }

  getUserData(){
    this.userData=[]
    this.userService.allUser().subscribe(d=>{
      this.userData=d
      console.log(d);
      

    })
  }

  deleteUser(oId:any){
    const confirn=window.confirm("Are you sure")

    if(confirn){
      this.userService.deleteUser(oId).subscribe(d => {
        alert("User deleted sucessfully")
        this.getUserData()
      })

    }

  }

  updateForm(){
    console.log(this.addUser.value);

    this.userService.updateUser(this.oId, this.addUser.value).subscribe(d=>{
      this.getUserData()
      alert("User updated sucessfully")
    },(e)=>{
      alert(e)
    })
    this.addUser.reset()

  }




}
