import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadEmployeeLastpaid, loadEmployeeSalary } from '../../../../store/actions/salary.actions';
import { selectEmployeeLastPaid, selectEmployeeSalary } from '../../../../store/selectors/salary.selector';
import { AsyncPipe, DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { SalaryServerResponse } from '../../../../core/models/payroll.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-salary',
  imports: [AsyncPipe, TitleCasePipe, DecimalPipe, DatePipe],
  templateUrl: './salary.html',
  styleUrl: './salary.scss',
})
export class Salary {

  store = inject(Store)
  empSalary = this.store.select(selectEmployeeSalary)
  empLastPaid = this.store.select(selectEmployeeLastPaid)
  

  ngOnInit(){
    this.store.dispatch(loadEmployeeSalary())
    this.store.dispatch(loadEmployeeLastpaid())
  }

  totalNetPay(salary: SalaryServerResponse[]){
      return salary.reduce((total, item)=>{
        return total + Number(item.netPay);
      },0)
  }

  getMonthName(month: number): string {
    return new Date(2000, month - 1).toLocaleString('en-US', {
      month: 'long'
    });
  }

  downloadExcel() {
    this.empSalary.subscribe((salary) => {

      const data = salary.map((item) => ({
        'Month': `${this.getMonthName(item.month)} ${item.year}`,
        'Basic': item.basic,
        'Deductions': item.deductions,
        'Allowances': item.allowances,
        'Net Pay': item.netPay,
        'Status': 'Paid'
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Salary');

      XLSX.writeFile(workbook, `${salary[0].employee.firstName} Salary Report.xlsx`);
    });
  }

  
}
