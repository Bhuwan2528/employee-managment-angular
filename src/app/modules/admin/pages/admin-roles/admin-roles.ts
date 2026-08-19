import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { loadEmployees, updateRoleEmployee } from '../../../../store/actions/employee.action';
import { selectEmployeeError, selectEmployees } from '../../../../store/selectors/employeeSelector';
import { PrintError } from '../../../../shared/utils/prinitingError';
import { EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-admin-roles',
  imports: [MatFormField, MatLabel, MatOption, MatSelect, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './admin-roles.html',
  styleUrl: './admin-roles.scss',
})
export class AdminRoles {

  store = inject(Store)
  fb = inject(NonNullableFormBuilder)
  printError = inject(PrintError)
  admins = signal<EmployeeServerResponse[]>([])

  roleForm = this.fb.group({
    email: ['', Validators.required],
    rolename: ['', Validators.required]
  })

  addRole(){
    this.store.dispatch(updateRoleEmployee({
      request: this.roleForm.getRawValue()
    }))
  }

  ngOnInit(){
    this.store.dispatch(loadEmployees({}))
    this.employess.subscribe(emp=>{
      this.admins.set(emp.filter(item => item.user?.role.name == 'ADMIN' || item.user?.role.name == 'HR'))
      console.log('admins : ', this.admins());
      console.log('employess : ', emp);
      
    })
  }

  resError = this.store.select(selectEmployeeError).subscribe(error=> this.printError.toastError(error))

  employess = this.store.select(selectEmployees)

  

}
