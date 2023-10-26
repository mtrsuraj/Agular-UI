import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] | undefined;

   constructor(private employeeService:EmployeeServiceService){}


  ngOnInit(): void { 
    this.getEmployees();
    // console.log("done");
   }
   getEmployees(){
    this.employeeService.getEmployeeList().subscribe(data=>{
      this.employees = data
    });
   }
  



}
