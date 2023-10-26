import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private baseUrl = "http://localhost:8080/api/v1/employee";
  constructor(private httpClient: HttpClient) {   }

  getEmployeeList() : Observable<Employee[]>{
    console.log(this.baseUrl);
    return this.httpClient.get<Employee[]>(`{$this.baseUrl}`);
    
  }
}
    



