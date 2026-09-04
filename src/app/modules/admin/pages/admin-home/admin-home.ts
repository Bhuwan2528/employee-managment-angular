import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDepartments } from '../../../../store/selectors/department.selectors';
import { selectLeave } from '../../../../store/selectors/leave.selector';
import { AsyncPipe, DatePipe } from '@angular/common';
import { loadDepartments } from '../../../../store/actions/deapartment.actions';
import { loadLeaves } from '../../../../store/actions/leave.actions';
import { map } from 'rxjs';
import { loadDashboard } from '../../../../store/actions/dashboard.actions';
import { selectDashboard } from '../../../../store/selectors/dashboard.selector';
import { RouterLink } from '@angular/router';
import { EmployeeOperationService } from '../admin-employees/services/employee.service';

@Component({
  selector: 'app-admin-home',
  imports: [AsyncPipe, RouterLink, DatePipe],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.scss',
})
export class AdminHome {
  store = inject(Store)
  employeeOperationService = inject(EmployeeOperationService)

  employees = this.employeeOperationService.entities$
  departments = this.store.select(selectDepartments)
  leaves = this.store.select(selectLeave)
  dashboard = this.store.select(selectDashboard)

  ngOnInit(){
    this.store.dispatch(loadDepartments())
    this.employeeOperationService.getWithQuery({})
    this.store.dispatch(loadLeaves())
    this.store.dispatch(loadDashboard())
  }

}
