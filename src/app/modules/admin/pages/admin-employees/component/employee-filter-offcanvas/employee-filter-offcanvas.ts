import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { loadDesignation } from '../../../../../../store/actions/designation.actions';
import { loadDepartments } from '../../../../../../store/actions/deapartment.actions';
import { selectDesignation } from '../../../../../../store/selectors/designation.selector';
import { selectDepartments } from '../../../../../../store/selectors/department.selectors';

@Component({
  selector: 'app-employee-filter-offcanvas',
  imports: [MatFormField, MatSelect, MatOption, TitleCasePipe, AsyncPipe],
  templateUrl: './employee-filter-offcanvas.html',
  styleUrl: './employee-filter-offcanvas.scss',
})
export class EmployeeFilterOffcanvas {

  store = inject(Store)

  ngOnInit(){
    this.store.dispatch(loadDesignation())
    this.store.dispatch(loadDepartments())
  }

  designations = this.store.select(selectDesignation)
  departments = this.store.select(selectDepartments)
}
