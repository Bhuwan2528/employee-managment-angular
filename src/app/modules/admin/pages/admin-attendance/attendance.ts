import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatOption, MatSelect, MatPrefix, MatLabel } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { downloadFile, downloadFileSuccesfully, selectedUserAttendance } from '../../../../store/actions/attendance.actions';
import { loadEmployees } from '../../../../store/actions/employee.action';
import { selectEmployees } from '../../../../store/selectors/employeeSelector';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { selectedSelectedUserList } from '../../../../store/selectors/attendance.selector';
import { Actions, ofType } from '@ngrx/effects';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-attendance',
  imports: [MatSelect, MatOption, MatFormField, MatIconModule, MatLabel, AsyncPipe, DatePipe, TitleCasePipe, FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
})
export class AdminAttendance {
  store = inject(Store);
  action$ = inject(Actions)

  month = signal<number>(new Date().getMonth() + 1);
  year = signal<number>(new Date().getFullYear());
  selectedEmployeeId = signal<string>('');
  toggleFilterBoxValue = signal<boolean>(false)

  months = [ 1,2,3,4,5,6,7,8,9,10,11,12 ];
  years = [ 2020, 2021, 2022, 2023, 2024, 2025, 2026 ];

  ngOnInit() {
    this.store.dispatch(loadEmployees({}));
  }

  getMonthName(month: number): string {
    return new Date(2000, month - 1).toLocaleString('en-US', {
      month: 'long'
    });
  }
  
  employees = this.store.select(selectEmployees);

  onEmployeeChange(id: string) {
    const month = this.month();
    const year = this.year()
    this.selectedEmployeeId.set(id)
    this.store.dispatch(selectedUserAttendance({month, year, id }));
  }

  onFilterChange(){
    const month = this.month();
    const year = this.year()
    const id = this.selectedEmployeeId()
    this.store.dispatch(selectedUserAttendance({month, year, id }));
  }


  employeeAttendance = this.store.select(selectedSelectedUserList);

  downloadFile(){
    const empId = this.selectedEmployeeId()
    this.store.dispatch(downloadFile({empId }))
  }

  constructor(){
    this.action$.pipe(ofType(downloadFileSuccesfully)).subscribe(({file})=> {
      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a')
      link.href = url;
      link.download = 'Attendance Report.xlsx';
      link.click()
      window.URL.revokeObjectURL(url)
    })
  }

  toggleFilter(){
    this.toggleFilterBoxValue.set(!this.toggleFilterBoxValue())
  }
}