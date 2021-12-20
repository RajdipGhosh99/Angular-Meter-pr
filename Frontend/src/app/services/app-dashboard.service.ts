import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppDashboardService {

  constructor( private http:HttpClient) { }

  allMeterData(){
    let apiUrl =`http://localhost:9000/value/viewall`
    return this.http.get(apiUrl).pipe(catchError(this.handelError))
  }

  last24Data(oId:any){
    let apiUrl =`http://localhost:9000/value/last24/${oId}`
    return this.http.get(apiUrl).pipe(catchError(this.handelError))
  }
  
  private handelError(error: HttpErrorResponse) {
    return throwError(error.error)
  }
  
}
