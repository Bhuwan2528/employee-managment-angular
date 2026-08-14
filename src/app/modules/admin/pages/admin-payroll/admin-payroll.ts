import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEmployees } from '../../../../store/selectors/employeeSelector';
import { loadEmployees } from '../../../../store/actions/employee.action';
import { MatDialog } from '@angular/material/dialog';
import { PaySalaryDialog } from './components/pay-salary-dialog/pay-salary-dialog';
import { EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { SalaryHistory } from './components/salary-history/salary-history';

@Component({
  selector: 'app-admin-payroll',
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: './admin-payroll.html',
  styleUrl: './admin-payroll.scss',
})
export class AdminPayroll {

  store = inject(Store)
  employees  = this.store.select(selectEmployees)
  dialog = inject(MatDialog)

  ngOnInit(){
    this.store.dispatch(loadEmployees())
  }

  openPaySalaryDialog(employee: EmployeeServerResponse){
    this.dialog.open(PaySalaryDialog, {
      data: employee
    })
  }

  openSalaryHistoryDialog(id: string, employee: EmployeeServerResponse){
    this.dialog.open(SalaryHistory, {
      data: {
        id,
        employee
      }
    })
  }



}

