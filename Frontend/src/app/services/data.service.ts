import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readingData: any = []
  private dataService = new BehaviorSubject(this.readingData)

  private MeterName = ""
  private meterNameService=new BehaviorSubject(this.MeterName)

  constructor() { }

  setData(data: any) {
    this.readingData.push(data)
    this.dataService.next(this.readingData)
  }

  setalldata(data: any) {
    this.readingData = data
    this.dataService.next(this.readingData)
  }


  getData(): Observable<any> {
    return this.dataService
  }


  setMeterName(name:any){
    this.MeterName=name
    this.meterNameService.next(this.MeterName)
  }
  getMeterName(){
    return this.meterNameService
  }
 
}
