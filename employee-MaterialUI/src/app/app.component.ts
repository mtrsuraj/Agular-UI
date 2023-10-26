import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './fetures/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Employee';

  constructor(){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

}
