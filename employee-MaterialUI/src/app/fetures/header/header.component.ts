import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { CoreService } from '../core/core.service';
import { WarnMessageComponent } from '../warn-message/warn-message.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _dialog:MatDialog, private _employeeService:EmployeeService, private _coreService:CoreService){

  }

  ngOnInit(): void {
    this._employeeService.getEmployeeList().subscribe({
      next:(val:any)=>{
        this.getEmployeeList();
      },
      error:console.error
    })
      
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob', 'gender','education', 'company', 'experience', 'package', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getEmployeeList(){
    this._employeeService.getEmployeeList().subscribe({
      next:(val:any)=>{
        this.dataSource=new MatTableDataSource(val);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(employeeId:number){
    if(confirm('Are you sure you want to delete this employee?'))
    this._employeeService.deleteEmployee(employeeId).subscribe({
      next:(ref)=>{
        
      //  if(ref){

      //    this._coreService.openSnackBar("Employee deleted successfully")
      //  }
      // this.warnMessage();
        this.getEmployeeList();
      },
      error:console.error
    })
  }

 

  openAddEditDialog(){
    const _dialogRef =this._dialog.open(EmpAddEditComponent);
    _dialogRef.afterClosed().subscribe({
      next:(val:any)=>{
        if(val){
          this.getEmployeeList();
        }
      },
      error:console.error
    })
    
  }

  openEditForm(data:any){
   const _dialogRef= this._dialog.open(EmpAddEditComponent, {
      data,
    });
    _dialogRef.afterClosed().subscribe({
      next:(val:any)=>{
        if(val){
          this.getEmployeeList();
        }
      },
      error:console.error
    })
    
  }

  // warnMessage(){
  //   this._dialog.open(WarnMessageComponent)
  // }

}
