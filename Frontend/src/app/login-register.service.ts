import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {catchError} from "rxjs/Operators"


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  constructor(private httpclient:HttpClient) { }
  getData(){
    return({
      name:"Rajdip",
      age:30,
      id:1
    })
  }
  getAllData(): Observable<any>{
    let apiUrl ="http://localhost:9000/value/viewall"
    return this.httpclient.get(apiUrl).pipe(
      catchError(this.handelError))
  }

  postData(value:any):Observable<any>{
    let apiUrl ="http://localhost:9000/value/add"
    return this.httpclient.post(apiUrl,value).pipe(
      catchError(this.handelError)
    )
  }

  deleteData(value:any) :Observable<any>{
    let apiUrl = `http://localhost:9000/value/delete/${value}`
    return this.httpclient.delete(apiUrl).pipe(
      catchError(this.handelError)
    )
  }

  updateData(Oid:any,valu:any){
    let apiUrl = `http://localhost:9000/value/update/${Oid}`
    return this.httpclient.put(apiUrl, valu).pipe(
      catchError(this.handelError)
    )
  }


  addValueToMeter(oId:any,valuu:any){
    let apiUrl =`http://localhost:9000/value/add-reading/${oId}`
    return this.httpclient.put(apiUrl, valuu).pipe(
      catchError(this.handelError))
  }

  getMeterValue(oId:any){
    let apiUrl =`http://localhost:9000/value/find-by-id/${oId}`
    return this.httpclient.get(apiUrl).pipe(
      catchError(this.handelError))
  }

  getMeterValueByUnit(oId:any,oUnit:any){
    let Body = { "rUnit":oUnit}
    let apiUrl =`http://localhost:9000/value/search-by-unit/${oId}`
    return this.httpclient.post(apiUrl,Body)
    .pipe(catchError(this.handelError))

  }

  deleteMeterReadingById(oId:any,rId:any){
    let Body = { "_id": rId }
    let apiUrl = `http://localhost:9000/value//delete-reading/${oId}`
    return this.httpclient.put(apiUrl,Body).pipe(catchError(this.handelError))

  }

  private handelError(error:HttpErrorResponse){
    return throwError(error.error)

  }
}
