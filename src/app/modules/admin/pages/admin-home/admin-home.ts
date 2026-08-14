import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEmployees } from '../../../../store/selectors/employeeSelector';
import { selectDepartments } from '../../../../store/selectors/department.selectors';
import { selectLeave } from '../../../../store/selectors/leave.selector';
import { AsyncPipe } from '@angular/common';
import { loadDepartments } from '../../../../store/actions/deapartment.actions';
import { loadEmployees } from '../../../../store/actions/employee.action';
import { loadLeaves } from '../../../../store/actions/leave.actions';
import { map } from 'rxjs';
import { loadDashboard } from '../../../../store/actions/dashboard.actions';
import { selectDashboard } from '../../../../store/selectors/dashboard.selector';

@Component({
  selector: 'app-admin-home',
  imports: [AsyncPipe],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.scss',
})
export class AdminHome {
  store = inject(Store)

  employees = this.store.select(selectEmployees)
  departments = this.store.select(selectDepartments)
  leaves = this.store.select(selectLeave)
  dashboard = this.store.select(selectDashboard)



  ngOnInit(){
    this.store.dispatch(loadDepartments())
    this.store.dispatch(loadEmployees())
    this.store.dispatch(loadLeaves())
    this.store.dispatch(loadDashboard())
    
    
  }

}
