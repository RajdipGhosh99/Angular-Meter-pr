import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  addRole(data: any) {
    let apiUrl = `http://localhost:9000/role/add`
    return this.http.post(apiUrl, data).pipe(catchError(this.handelError))
  }


  allRole() {
    let apiUrl = `http://localhost:9000/role/all`
    return this.http.get(apiUrl).pipe(catchError(this.handelError))
  }

  deleteRole(oId: any) {
    let apiUrl = `http://localhost:9000/role/delete/${oId}`
    return this.http.delete(apiUrl).pipe(catchError(this.handelError))
  }

  UpdateRole(data: any, oId: any) {
    let apiUrl = `http://localhost:9000/role/update/${oId}`
    return this.http.put(apiUrl, data).pipe(catchError(this.handelError))
  }


  private handelError(error: HttpErrorResponse) {
    return throwError(error.error)
  }
}


