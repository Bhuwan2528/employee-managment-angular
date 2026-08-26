import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialog } from './component/add-employee-dialog/add-employee-dialog';
import { select, Store } from '@ngrx/store';
import { loadEmployees } from '../../../../store/actions/employee.action';
import { selectEmployeePagination, selectEmployees } from '../../../../store/selectors/employeeSelector';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { EmployeeDetailDialog } from './component/employee-detail-dialog/employee-detail-dialog';
import { EmployeeRequest, EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { DeleteEmployeeComponent } from './component/delete-employee-component/delete-employee-component';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from "@angular/forms";
import { RoleClassPipe } from '../../../../shared/pipes/role-class-pipe';
import { EmployeeFilterOffcanvas } from "./component/employee-filter-offcanvas/employee-filter-offcanvas";


@Component({
  selector: 'app-admin-employees',
  imports: [TitleCasePipe, FormsModule, RoleClassPipe, EmployeeFilterOffcanvas],
  templateUrl: './admin-employees.html',
  styleUrl: './admin-employees.scss',
})
export class AdminEmployees {

  dialog = inject(MatDialog)
  store = inject(Store)
  addEmployeeData : EmployeeRequest | null = null
  searchNameText = signal('')
  searchIdText = signal('')
  searchRoleText = signal('')
  pageSize = signal(10)
  currentPage = signal(1)
  showSearchBoxes = signal<boolean>(false)

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

  openDeleteEmployeDialog(id: string){
    this.dialog.open(DeleteEmployeeComponent, {
      data:{
        id
      }
    })
  }

  ngOnInit(){
    this.loadEmployees()
  }

  loadEmployees(){
    const Namesearch = this.searchNameText().trim()
    const Idsearch = this.searchIdText().trim()
    const Rolesearch = this.searchRoleText().trim()

    if(!Namesearch && !Idsearch && !Rolesearch){
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

    const nameSearch = this.searchNameText().trim().toLowerCase();
    const idSearch = this.searchIdText().trim().toLowerCase();
    const roleSearch = this.searchRoleText().trim().toLowerCase();

    return employees.filter(emp => {

      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const employeeCode = `${emp.employeeCode}`.toLowerCase();
      const role = `${emp.user?.role?.name ?? ''}`.toLowerCase();

      const nameMatches = !nameSearch || fullName.startsWith(nameSearch);

      const idMatches = !idSearch || employeeCode.startsWith(idSearch);

      const roleMatches = !roleSearch || role.startsWith(roleSearch);

      return nameMatches && idMatches && roleMatches;
    });
  });

  onNameSearch(value: string){
    this.searchNameText.set(value)
    this.currentPage.set(1)
    this.loadEmployees()
  }

  onIdSearch(value: string){
    this.searchIdText.set(value)
    this.currentPage.set(1)
    this.loadEmployees()
  }

  onRoleSearch(value: string){
    this.searchRoleText.set(value)
    this.currentPage.set(1)
    this.loadEmployees()
  }

  toggleSearch(){
    this.showSearchBoxes.set(!this.showSearchBoxes())
  }
  
}
