import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialog } from './component/add-employee-dialog/add-employee-dialog';
import { select, Store } from '@ngrx/store';
import { loadEmployees } from '../../../../store/actions/employee.action';
import { selectEmployees } from '../../../../store/selectors/employeeSelector';
import { AsyncPipe } from '@angular/common';
import { EmployeeDetailDialog } from './component/employee-detail-dialog/employee-detail-dialog';
import { EmployeeRequest, EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { DeleteEmployeeComponent } from './component/delete-employee-component/delete-employee-component';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-admin-employees',
  imports: [],
  templateUrl: './admin-employees.html',
  styleUrl: './admin-employees.scss',
})
export class AdminEmployees {

  dialog = inject(MatDialog)
  store = inject(Store)
  addEmployeeData : EmployeeRequest | null = null

  openAddEmployeeDialog(){
    this.dialog.open(AddEmployeeDialog, {
      data: {
        mode: 'add'
      }
    });
  }

  openEditEmployeeDialog(employee: EmployeeServerResponse){
    this.dialog.open(AddEmployeeDialog, {
      data: {
        mode: 'edit',
        employee
      }
    });
  }

  openEmployeeDetailDialog(employee: EmployeeServerResponse){
    this.dialog.open(EmployeeDetailDialog, {
      data: employee
    })
  } 

  openDeleteEmployeDialog(id: string){
    this.dialog.open(DeleteEmployeeComponent, {
      data:{
        id
      }
    })
  }

  

  ngOnInit(){
    this.store.dispatch(loadEmployees())
  }
  

  employees = toSignal(
    this.store.select(selectEmployees), {initialValue: []}
  )
}
