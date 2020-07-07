import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FirstComponent } from './first/first.component';
import { AppareilComponent } from './appareil/appareil.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { Scenario } from './model/scenario';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from './model/Product';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
baseUrl:String ="http://localhost:8085/scenarios/comment";
baseUrlQ:String ="http://localhost:8085/scenarios/qual";
base :String="http://localhost:8085/scenarios/pend";
baseimg :String="http://localhost:8085/scenarios/get-image"
  constructor(private http:HttpClient) { }
  getEmployees():Observable<Scenario[]>
  {const requestOptions: Object = {
    /* other options here */
    responseType: 'text'
  }
    console.log("test callserviiiiiiiiiiiiiiiiiiiice");
    return this.http.get<Scenario[]>('http://localhost:8085/scenarios' );
  }
  getErrors():Observable<Scenario[]>
  {const requestOptions: Object = {
    /* other options here */
    responseType: 'text'
  }
    console.log("test callserviiiiiiiiiiiiiiiiiiiice");
    return this.http.get<Scenario[]>('http://localhost:8085/scenarios/errors' );
  }
  getunres():Observable<Scenario[]>
  {const requestOptions: Object = {
    /* other options here */
    responseType: 'text'
  }
    console.log("test callserviiiiiiiiiiiiiiiiiiiice");
    return this.http.get<Scenario[]>('http://localhost:8085/scenarios/previous' );
  }
  getunqual():Observable<Scenario[]>
  {const requestOptions: Object = {
    /* other options here */
    responseType: 'text'
  }
    console.log("test callserviiiiiiiiiiiiiiiiiiiice");
    return this.http.get<Scenario[]>('http://localhost:8085/scenarios/unqualif' );
  }
  gettrue():Observable<Scenario[]>
  {const requestOptions: Object = {
    /* other options here */
    responseType: 'text'
  }
    console.log("test callserviiiiiiiiiiiiiiiiiiiice");
    return this.http.get<Scenario[]>('http://localhost:8085/scenarios/true' );
  }
  getfalse():Observable<Scenario[]>
  {const requestOptions: Object = {
    /* other options here */
    responseType: 'text'
  }
    console.log("test callserviiiiiiiiiiiiiiiiiiiice");
    return this.http.get<Scenario[]>('http://localhost:8085/scenarios/false' );
  }
  appupd():Observable<Scenario[]>
  {const requestOptions: Object = {
    /* other options here */
    responseType: 'text'
  }
    console.log("test callserviiiiiiiiiiiiiiiiiiiice");
    return this.http.get<Scenario[]>('http://localhost:8085/scenarios/appupd' );
  }

  
    updateComment(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${id}`, value);
    }
    updateQual(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrlQ}/${id}`, value);
    }
    getprods():Observable<Product[]>
    {const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
      
      return this.http.get<Product[]>('http://localhost:8085/scenarios/prod' );
    }
    updatePend(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.base}/${id}`, value);
    }
    getDate(value:any):Observable<Scenario[]>
    {const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
      console.log("test callserviiiiiiiiiiiiiiiiiiiice");
      return this.http.get<Scenario[]>('http://localhost:8085/scenarios/bydate' );
    }
    getSucc():Observable<Scenario[]>
    {const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
      console.log("test callserviiiiiiiiiiiiiiiiiiiice");
      return this.http.get<Scenario[]>('http://localhost:8085/scenarios/success' );
    }
}
