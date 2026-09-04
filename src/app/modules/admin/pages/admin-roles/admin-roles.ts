import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { PrintError } from '../../../../shared/utils/prinitingError';
import { EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { TitleCasePipe } from '@angular/common';
import { EmployeeOperationService } from '../admin-employees/services/employee.service';
import { StoreService } from '../../../../core/services/storeService';

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
  employeeOperationService = inject(EmployeeOperationService)
  storeService = inject(StoreService)

  roleForm = this.fb.group({
    email: ['', Validators.required],
    rolename: ['', Validators.required]
  })

  addRole(){
    if (this.roleForm.invalid) {
      return;
    }

    const request = this.roleForm.getRawValue();

    this.employeeOperationService.empoyeeRole(request)
  }

  ngOnInit(){
    this.employeeOperationService.getWithQuery({})
    this.employess.subscribe(emp=>{
      this.admins.set(emp.filter(item => item.user?.role.name == 'ADMIN' || item.user?.role.name == 'HR'))
      console.log('admins : ', this.admins());
      console.log('employess : ', emp);
      
    })
  }

  employess = this.employeeOperationService.entities$

  

}
