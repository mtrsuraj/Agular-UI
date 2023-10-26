import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{

  empForm: FormGroup;

  education:String[]=[
    'matric',
    'diploma',
    'intermediate',
    'graduate',
    'post-graduate'

  ]
  constructor(private _fb:FormBuilder, private _employeeService:EmployeeService, private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService:CoreService
    ){
    this.empForm=this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''
      
    })
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data)
  }

  formSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._employeeService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next:(val:any)=>{
            
            this._coreService.openSnackBar("Employee Updated", "ok")
          this._dialogRef.close(true);
          },
          error:console.error
        })
      }else{
        this._employeeService.createEmployee(this.empForm.value).subscribe({
          next:(val:any)=>{
            this._coreService.openSnackBar("Employee Created Successfully!")
          this._dialogRef.close(true);
          },
          error:console.error
        })

      }
    }
  }

  
}
