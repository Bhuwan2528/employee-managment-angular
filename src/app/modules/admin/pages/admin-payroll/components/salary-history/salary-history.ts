import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeaveServerResponse } from '../../../../../../core/models/leaves.model';
import { Store } from '@ngrx/store';
import { DownloadEmployeeSalary, DownloadEmployeeSalarySuccesfully, loadEmployeeSalaryByAdmin } from '../../../../../../store/actions/salary.actions';
import { selectParticularEmployeeSalary } from '../../../../../../store/selectors/salary.selector';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EmployeeServerResponse } from '../../../../../../core/models/emloyee.model';
import { DATA } from '../../../../../../core/models/payroll.model';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-salary-history',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './salary-history.html',
  styleUrl: './salary-history.scss',
})
export class SalaryHistory {

  dialoRef = inject(MatDialogRef);
  data = inject<DATA>(MAT_DIALOG_DATA)
  store = inject(Store)
  action$ = inject(Actions)

  closeDialog(){
    this.dialoRef.close()
  }
  ngOnInit(){
    this.store.dispatch(loadEmployeeSalaryByAdmin({
      id: this.data.id
    }))


  this.salaryDetails.subscribe(data => {
    console.log('SALARY SELECTOR DATA:', data);
  });
  }
  EmployeeDetails = this.data.employee
  salaryDetails = this.store.select(selectParticularEmployeeSalary)

  

  getMonthName(month: number): string {
    return new Date(2000, month - 1).toLocaleString('en-US', {
      month: 'long'
    });
  }

  downloadSalary(empId: string){
    this.store.dispatch(DownloadEmployeeSalary({empId}))
  }

  constructor(){
    this.action$.pipe(ofType (DownloadEmployeeSalarySuccesfully) ).subscribe(({file})=>{
      const url = window.URL.createObjectURL(file)
      const link = document.createElement('a')

      link.href = url
      link.download = 'salary.xlsx'
      link.click()

      window.URL.revokeObjectURL(url)
    })
  }
}
