import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { EmployeeDialogData, EmployeeRequest, EmployeeServerResponse, EmployeeUpdateRequest } from '../../../../../../core/models/emloyee.model';
import { addEmployee, loadEmployees, updateEmployee } from '../../../../../../store/actions/employee.action';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectDesignation } from '../../../../../../store/selectors/designation.selector';
import { selectDepartments } from '../../../../../../store/selectors/department.selectors';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { loadDesignation } from '../../../../../../store/actions/designation.actions';
import { loadDepartments } from '../../../../../../store/actions/deapartment.actions';

@Component({
  selector: 'app-add-employee-dialog',
  imports: [MatFormField, MatSelect, MatOption, MatLabel, AsyncPipe, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './add-employee-dialog.html',
  styleUrl: './add-employee-dialog.scss',
})

export class AddEmployeeDialog {

  private dialogRef = inject(MatDialogRef<AddEmployeeDialog>)
  store = inject(Store)
  fb = inject(NonNullableFormBuilder)
  data = inject<EmployeeDialogData>(MAT_DIALOG_DATA)

  closeDialog(){
    this.dialogRef.close();
  }

  designations= this.store.select(selectDesignation)
  departments = this.store.select(selectDepartments)

  addEmployeeForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    dateOfJoining: ['', Validators.required],
    departmentId: ['', Validators.required],
    designationId: ['', Validators.required],
    password: ['', Validators.required],
    status: [''],
    basic: [0, Validators.required]
  });
  
  ngOnInit(){
    this.store.dispatch(loadDesignation())
    this.store.dispatch(loadDepartments())

    if(this.data.mode === 'edit' && this.data.employee){
      this.addEmployeeForm.patchValue({
        firstName: this.data.employee.firstName,
        lastName: this.data.employee.lastName,
        email: this.data.employee.email,
        phone: this.data.employee.phone,
        departmentId: this.data.employee.departmentId,
        designationId: this.data.employee.designationId,
        status: this.data.employee.status,
        dateOfJoining: JSON.stringify(this.data.employee.dateOfJoining).split('T')[0].replace('"', ''),
        basic: this.data.employee.basic
      })
    }

    
  }

  addEmployee(){
    if(this.addEmployeeForm.invalid){
      return
    }
    const request = this.addEmployeeForm.getRawValue();
    this.store.dispatch(addEmployee({ request }))
    this.closeDialog();
  }

  updateEmployee(id: string | undefined){
    console.log('btn clicked');
    
    const formValue = this.addEmployeeForm.getRawValue();

    const request:EmployeeUpdateRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      dateOfJoining: formValue.dateOfJoining,
      departmentId: formValue.departmentId,
      designationId: formValue.designationId,
      status: formValue.status,
      basic: formValue.basic
    } 

    this.store.dispatch(updateEmployee({ request, id }))
    this.closeDialog();
  }



}
