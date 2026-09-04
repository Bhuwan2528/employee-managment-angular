import { AsyncPipe, CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { PaySalaryDialog } from './components/pay-salary-dialog/pay-salary-dialog';
import { EmployeePagination, EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { SalaryHistory } from './components/salary-history/salary-history';
import { EmployeeOperationService } from '../admin-employees/services/employee.service';
import { StoreService } from '../../../../core/services/storeService';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-payroll',
  imports: [AsyncPipe, TitleCasePipe, MatFormField, MatSelect, MatOption, CommonModule, FormsModule],
  templateUrl: './admin-payroll.html',
  styleUrl: './admin-payroll.scss',
})
export class AdminPayroll {

  store = inject(Store)
  employeeOperationService = inject(EmployeeOperationService)
  storeService = inject(StoreService)
  employees  = this.employeeOperationService.entities$
  dialog = inject(MatDialog)

  pagination = signal<EmployeePagination|null>(null)
  currentPage = signal(1)
  pageSize = signal(10)

  ngOnInit(){
    this.loadEmployees()

    this.storeService.getEmployeePagination$().subscribe(data => {
      this.pagination.set(data)
      this.currentPage.set(this.pagination()?.page ?? 1)
      this.pageSize.set(this.pagination()?.limit ?? 10)
    })

  }

  loadEmployees(){
    this.employeeOperationService.getWithQuery({
      page: this.currentPage(),
      limit: this.pageSize()
    })
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

  onPageSizeChange(value: number){
    this.pageSize.set(value)
    this.loadEmployees()
  }

  nextPage(){
    this.employeeOperationService.clearCache()
    if(this.pagination()?.hasNextPage){
      this.currentPage.update(page => page+1)
      this.loadEmployees()
    }
  }

  prevPage(){
    this.employeeOperationService.clearCache()
    if(this.pagination()?.hasNextPage){
      this.currentPage.update(page => page-1)
      this.loadEmployees()
    }
  }

  pages = computed(()=>{
    const totalPages = this.pagination()?.totalPages ?? 0
    return Array.from({length: totalPages}, (_, index)=> index+1 )
  })

  goToPage(page: number){
    this.currentPage.set(page)
    this.loadEmployees()
  }


}

