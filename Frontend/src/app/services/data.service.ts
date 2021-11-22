import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readingData: any = []
  private dataService = new BehaviorSubject(this.readingData)

  constructor() { }
  setData(data: any) {
    this.readingData.push(data)
    this.dataService.next(this.readingData)
  }

  setalldata(data: any) {
    this.readingData=data
    this.dataService.next(this.readingData)
  }


  getData(): Observable<any> {
    return this.dataService
  }
}
