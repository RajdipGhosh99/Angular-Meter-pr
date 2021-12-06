import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor( private http:HttpClient) { }


  loginService(data:any){
    let apiUrl =`http://localhost:9000/user/login`
    return this.http.post(apiUrl,data).pipe(catchError(this.handelError))
  }
  allUser(){
    let apiUrl =`http://localhost:9000/user/all`
    return this.http.get(apiUrl).pipe(catchError(this.handelError))
  }

  addUser(data:any){
    let apiUrl =`http://localhost:9000/user/new`
    return this.http.post(apiUrl,data).pipe(catchError(this.handelError))

  }

  deleteUser(oId:any){
    let apiUrl =`http://localhost:9000/user/delete/${oId}`
    return this.http.delete(apiUrl).pipe(catchError(this.handelError))
  }

  updateUser(oId:any,data:any){
    let apiUrl = `http://localhost:9000/user/edit/${oId}`
    return this.http.put(apiUrl,data).pipe(catchError(this.handelError))

  }

  getRoleOptions(){
    let apiUrl =`http://localhost:9000/role/all`
    return this.http.get(apiUrl).pipe(catchError(this.handelError))
  }

  findById(oId:any){
    const apiUrl =`http://localhost:9000/user/find-by-id/${oId}`
    return this.http.get(apiUrl).pipe(catchError(this.handelError))

  }


  private handelError(error:HttpErrorResponse){
    return throwError(error.error)
  }

}
