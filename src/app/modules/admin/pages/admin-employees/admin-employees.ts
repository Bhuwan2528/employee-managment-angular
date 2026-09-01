import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialog } from './component/add-employee-dialog/add-employee-dialog';
import { select, Store } from '@ngrx/store';
import { addBulkEmployee, loadEmployees } from '../../../../store/actions/employee.action';
import { selectEmployeePagination, selectEmployees } from '../../../../store/selectors/employeeSelector';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { EmployeeDetailDialog } from './component/employee-detail-dialog/employee-detail-dialog';
import { EmployeeRequest, EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from "@angular/forms";
import { RoleClassPipe } from '../../../../shared/pipes/role-class-pipe';
import { EmployeeFilterOffcanvas, EmployeeFilters } from "./component/employee-filter-offcanvas/employee-filter-offcanvas";
import * as XLSX from 'xlsx'
import { ToastService } from '../../../../core/services/toast.service';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-admin-employees',
  imports: [TitleCasePipe, FormsModule, RoleClassPipe, EmployeeFilterOffcanvas, MatFormField, MatSelect, MatOption],
  templateUrl: './admin-employees.html',
  styleUrl: './admin-employees.scss',
})
export class AdminEmployees {

  dialog = inject(MatDialog)
  store = inject(Store)
  toast = inject(ToastService)
  addEmployeeData : EmployeeRequest | null = null
  pageSize = signal(10)
  currentPage = signal(1)

  filters = signal<EmployeeFilters>({
    employeeName: '',
    employeeId: '',
    employeeRole: '',
    departmentId: '',
    designationId: '',
    status: ''
  })

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

  ngOnInit(){
    this.loadEmployees()
  }

  onFiltersApplied(filters: EmployeeFilters){
    console.log('PARENT RECEIVED:', filters);
    this.filters.set(filters)
    console.log('PARENT SIGNAL:', this.filters());
    this.loadEmployees();
  }

  onFiltersReset(){
    this.filters.set({
      employeeName: '',
      employeeId: '',
      employeeRole: '',
      departmentId: '',
      designationId: '',
      status: ''
    })

    this.loadEmployees();
  }

  loadEmployees(){

    const filters = this.filters
    const hasFilters = filters().employeeName || filters().employeeId || filters().employeeRole || filters().departmentId || filters().designationId || filters().status;

    if(!hasFilters){
      this.store.dispatch(loadEmployees({
        page: this.currentPage(),
        limit: this.pageSize()
      }))
    }
    else{
      this.store.dispatch(loadEmployees({}))
    }
  }

  onPageSizeChange(){
      this.store.dispatch(loadEmployees({
        page: this.currentPage(),
        limit: this.pageSize()
      }))   
  }
  
  employees = toSignal(
    this.store.select(selectEmployees), {initialValue: []}
  )

  pagination = toSignal(this.store.select(selectEmployeePagination), {initialValue: null})

  nextPage(){
    if(this.pagination()?.hasNextPage){
      this.currentPage.update(page=> page+1)
      this.loadEmployees();
    }
  }

  prevPage(){
    if(this.pagination()?.hasPreviousPage){
      this.currentPage.update(page=> page-1)
      this.loadEmployees()
    }
  }

  pages = computed(()=>{
    const totalPages = this.pagination()?.totalPages ?? 0

    return Array.from({length: totalPages}, (_, index)=> index+1 )
  })

  goToPage(page: number){
    if(page === this.currentPage()){
      return
    }
    this.currentPage.set(page);
    this.loadEmployees()
  }

  filteredEmployees = computed(() => {

    const employees = this.employees();
    const filters = this.filters()

    // Searches Ko filteration ke liye optimize krna 
    const nameSearch = filters.employeeName.trim().toLowerCase();
    const idSearch = filters.employeeId.trim().toLowerCase();
    const roleSearch = filters.employeeRole.trim().toLowerCase();

    return employees.filter(emp => {

      // Employee Server Response Signals Me se values extract krna for filteration
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const employeeCode = `${emp.employeeCode}`.toLowerCase();
      const role = `${emp.user?.role?.name ?? ''}`.toLowerCase();
      const departmentId = emp.department?.id ;
      const designationId = emp.designation?.id;
      const status = emp.status;

      //Filteration wala part

      const nameMatches = !nameSearch || fullName.startsWith(nameSearch);

      const idMatches = !idSearch || employeeCode.startsWith(idSearch);

      const roleMatches = !roleSearch || role.startsWith(roleSearch);

      const departmentMatches = !filters.departmentId || departmentId === filters.departmentId;

      const designationMatches = !filters.designationId || designationId === filters.designationId;

      const statusMatches = !filters.status || status === filters.status

      return nameMatches && idMatches && roleMatches && departmentMatches &&  designationMatches &&  statusMatches ;
    });
  });

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;

    if(!input.files || input.files.length === 0){
      return;
    }
    
    const file = input.files[0]

    file.arrayBuffer().then(buffer =>{

    const workbook = XLSX.read(buffer)
    const sheetName = workbook.SheetNames[0]
    const worksheet  = workbook.Sheets[sheetName]

    const request = XLSX.utils.sheet_to_json<EmployeeRequest>(worksheet)

    request.forEach(employee => {
      employee.dateOfJoining = new Date(employee.dateOfJoining).toISOString();
    });

    // fields checking

    const fields :(keyof EmployeeRequest)[] =[
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfJoining',
      'departmentId',
      'designationId',
      'password',
      'basic',
    ]

    const excelFields = Object.keys(request[0] || {})

    if(fields.length !== excelFields.length || !fields.every(field => excelFields.includes(field))){
      this.toast.error('Invalid Excel Format')
      return
    }

    this.store.dispatch(addBulkEmployee({request}))
    
    this.loadEmployees()

    })


  }
  
}
