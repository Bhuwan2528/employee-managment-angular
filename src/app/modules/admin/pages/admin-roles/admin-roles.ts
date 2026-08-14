import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { loadEmployees, updateRoleEmployee } from '../../../../store/actions/employee.action';
import { selectEmployeeError } from '../../../../store/selectors/employeeSelector';
import { PrintError } from '../../../../shared/utils/prinitingError';

@Component({
  selector: 'app-admin-roles',
  imports: [MatFormField, MatLabel, MatOption, MatSelect, ReactiveFormsModule],
  templateUrl: './admin-roles.html',
  styleUrl: './admin-roles.scss',
})
export class AdminRoles {

  store = inject(Store)
  fb = inject(NonNullableFormBuilder)
  printError = inject(PrintError)

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
    this.store.dispatch(loadEmployees())
  }

  resError = this.store.select(selectEmployeeError).subscribe(error=> this.printError.toastError(error))

}
