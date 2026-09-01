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
import { ToastService } from '../../../../../../core/services/toast.service';

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
  toast = inject(ToastService)

  closeDialog(){
    this.dialogRef.close();
  }

  designations= this.store.select(selectDesignation)
  departments = this.store.select(selectDepartments)

  addEmployeeForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    dateOfJoining: ['', Validators.required],
    departmentId: ['', Validators.required],
    designationId: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    status: ['ACTIVE'],
    basic: [0, Validators.required]
  });
  
  ngOnInit(){
    this.store.dispatch(loadDesignation())
    this.store.dispatch(loadDepartments())

    if(this.data.mode === 'edit' && this.data.employee){

      this.addEmployeeForm.get('password')?.clearValidators();
      this.addEmployeeForm.get('password')?.updateValueAndValidity();

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
    console.log('FORM VALUE:', this.addEmployeeForm.getRawValue());
    console.log('FORM VALID:', this.addEmployeeForm.valid);
    console.log('FORM ERRORS:', this.addEmployeeForm.errors);
    if(this.addEmployeeForm.invalid){
      return
    }
    const formVal = this.addEmployeeForm.getRawValue();

    const request: EmployeeRequest = {
      firstName: formVal.firstName,
      lastName: formVal.lastName,
      email: formVal.email,
      phone: formVal.phone,
      dateOfJoining: new Date(formVal.dateOfJoining).toISOString(),
      departmentId: formVal.departmentId,
      designationId: formVal.designationId,
      password: formVal.password,
      basic: formVal.basic
    }

    this.store.dispatch(addEmployee({ request }))
    this.closeDialog();
    this.toast.success('Employee Added Succefully')
  }

  updateEmployee(id: string | undefined){
    console.log('btn clicked');
    
    const formValue = this.addEmployeeForm.getRawValue();

    const request:EmployeeUpdateRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      dateOfJoining: new Date(formValue.dateOfJoining).toISOString(),
      departmentId: formValue.departmentId,
      designationId: formValue.designationId,
      status: formValue.status,
      basic: formValue.basic
    } 

    this.store.dispatch(updateEmployee({ request, id }))
    this.closeDialog();
    this.toast.success('Employee Updated Succefully')
  }



}
