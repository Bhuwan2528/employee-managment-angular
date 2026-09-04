import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialog } from './component/add-employee-dialog/add-employee-dialog';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { EmployeeDetailDialog } from './component/employee-detail-dialog/employee-detail-dialog';
import { EmployeePagination, EmployeeRequest, EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from "@angular/forms";
import { RoleClassPipe } from '../../../../shared/pipes/role-class-pipe';
import { EmployeeFilterOffcanvas, EmployeeFilters } from "./component/employee-filter-offcanvas/employee-filter-offcanvas";
import * as XLSX from 'xlsx'
import { ToastService } from '../../../../core/services/toast.service';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { EmployeeOperationService } from './services/employee.service';
import { StoreService } from '../../../../core/services/storeService';


@Component({
  selector: 'app-admin-employees',
  imports: [TitleCasePipe, FormsModule, RoleClassPipe, EmployeeFilterOffcanvas, MatFormField, MatSelect, MatOption],
  templateUrl: './admin-employees.html',
  styleUrl: './admin-employees.scss',
})
export class AdminEmployees {

  dialog = inject(MatDialog)
  storeService = inject(StoreService)
  toast = inject(ToastService)
  destroyRef = inject(DestroyRef)
  addEmployeeData : EmployeeRequest | null = null
  
  pagination = signal<EmployeePagination | null>(null)
  currentPage = signal(1)
  pageSize = signal(10)

  filters = signal<EmployeeFilters>({
    employeeName: '',
    employeeId: '',
    employeeRole: '',
    departmentId: '',
    designationId: '',
    status: ''
  })

  employeeOperationService = inject(EmployeeOperationService)

  ngOnInit(){
    this.loadEmployees()

    this.storeService.getEmployeePagination$()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data=> {
      this.pagination.set(data)
      this.currentPage.set(this.pagination()?.page ?? 1)
      this.pageSize.set(this.pagination()?.limit ?? 10)
      console.log(this.pagination())
    })
  }

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
      this.employeeOperationService.getWithQuery({
        page: this.currentPage(),
        limit: this.pageSize()
      })
    }
    else{
      this.employeeOperationService.getWithQuery({})
    }
  }

  onPageSizeChange(value: number){
    this.pageSize.set(value)
    this.loadEmployees()
    console.log('Page Size Changed : ',this.pageSize())
  }
  
  employees = toSignal(
    this.employeeOperationService.entities$, {initialValue: []}
  )


  nextPage(){
    this.employeeOperationService.clearCache()
    if(this.pagination()?.hasNextPage){
      this.currentPage.update(page=> page+1)
      this.loadEmployees();
    }
  }

  prevPage(){
    this.employeeOperationService.clearCache()
    if(this.pagination()?.hasPreviousPage){
      this.currentPage.update(page => page-1)
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

      this.loadEmployees()
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

    this.employeeOperationService.bulkUserCreate(request)
    
    this.loadEmployees()

    })


  }
  
}
