import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialog } from './component/add-employee-dialog/add-employee-dialog';
import { select, Store } from '@ngrx/store';
import { loadEmployees } from '../../../../store/actions/employee.action';
import { selectEmployees } from '../../../../store/selectors/employeeSelector';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { EmployeeDetailDialog } from './component/employee-detail-dialog/employee-detail-dialog';
import { EmployeeRequest, EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { DeleteEmployeeComponent } from './component/delete-employee-component/delete-employee-component';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-admin-employees',
  imports: [TitleCasePipe, FormsModule],
  templateUrl: './admin-employees.html',
  styleUrl: './admin-employees.scss',
})
export class AdminEmployees {

  dialog = inject(MatDialog)
  store = inject(Store)
  addEmployeeData : EmployeeRequest | null = null
  searchText = signal('')

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

    // console.log(this.employees()?[0]?.attendances?[0]?.status)
  }
  

  employees = toSignal(
    this.store.select(selectEmployees), {initialValue: []}
  )

  filteredEmployees = computed(()=>{
    const employees = this.employees()
    const search = this.searchText().trim().toLowerCase()

    if(!search){
      return employees
    }

    return employees.filter((emp)=>{
      return `${emp.firstName} ${emp.lastName}`.toLowerCase().startsWith(search)|| `${emp.employeeCode}`.toLowerCase().startsWith(search)
    })
  })
}
