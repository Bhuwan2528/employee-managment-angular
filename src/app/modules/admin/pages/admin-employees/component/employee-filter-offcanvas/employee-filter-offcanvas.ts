import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { loadDesignation } from '../../../../../../store/actions/designation.actions';
import { loadDepartments } from '../../../../../../store/actions/deapartment.actions';
import { selectDesignation } from '../../../../../../store/selectors/designation.selector';
import { selectDepartments } from '../../../../../../store/selectors/department.selectors';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

export interface EmployeeFilters{
  employeeName: string;
  employeeId: string;
  employeeRole: string;
  departmentId: string;
  designationId: string;
  status: string;
}

@Component({
  selector: 'app-employee-filter-offcanvas',
  imports: [MatFormField, MatSelect, MatOption, TitleCasePipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './employee-filter-offcanvas.html',
  styleUrl: './employee-filter-offcanvas.scss',
})
export class EmployeeFilterOffcanvas {

  store = inject(Store)
  fb = inject(FormBuilder)

  @Output() 
  filtersApplied = new EventEmitter<EmployeeFilters>()

  @Output()
  filtersReset = new EventEmitter<void>()

  ngOnInit(){
    this.store.dispatch(loadDesignation())
    this.store.dispatch(loadDepartments())
  }

  designations = this.store.select(selectDesignation)
  departments = this.store.select(selectDepartments)

  filterForm = this.fb.group({
    employeeName: [''],
    employeeId: [''],
    employeeRole: [''],
    departmentId: [''],
    designationId: [''],
    status: ['']
  })


  applyFilters(){
    const filters : EmployeeFilters = {
      employeeName: this.filterForm.value.employeeName || '',
      employeeId: this.filterForm.value.employeeId || '',
      employeeRole: this.filterForm.value.employeeRole || '',
      departmentId: this.filterForm.value.departmentId || '',
      designationId: this.filterForm.value.designationId || '',
      status: this.filterForm.value.status || ''
    }

    console.log('CHILD APPLY:', filters);

    this.filtersApplied.emit(filters)
    
  }
  
  resetFilters(){
    this.filterForm.reset({
      employeeName: '',
      employeeId: '',
      employeeRole: '',
      departmentId: '',
      designationId: '',
      status: ''
    })

    this.filtersReset.emit()
  }
}

