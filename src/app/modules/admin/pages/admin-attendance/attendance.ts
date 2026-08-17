import { Component, inject } from '@angular/core';
import { MatFormField, MatOption, MatSelect, MatPrefix, MatLabel } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectedUserAttendance } from '../../../../store/actions/attendance.actions';
import { loadEmployees } from '../../../../store/actions/employee.action';
import { selectEmployees } from '../../../../store/selectors/employeeSelector';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { selectedSelectedUserList } from '../../../../store/selectors/attendance.selector';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendance',
  imports: [ MatSelect, MatOption, MatFormField, MatIconModule, MatPrefix, MatLabel, AsyncPipe, DatePipe, TitleCasePipe
  ],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
})
export class AdminAttendance {
  store = inject(Store);
  selectedEmployee: string | null = null;

  months = [
    'August 2026',
    'July 2026',
    'June 2026',
    'May 2026',
    'April 2026',
    'March 2026',
    'February 2026',
    'January 2026',
  ];

  ngOnInit() {
    this.store.dispatch(loadEmployees());
  }

  employees = this.store.select(selectEmployees);

  onEmployeeChange(id: string) {
    this.store.dispatch(selectedUserAttendance({ id }));
  }

  employeeAttendance = this.store.select(selectedSelectedUserList);

  downloadExcel() {
    this.employeeAttendance.subscribe((attendance) => {
      const data = attendance.map((item) => ({
        Name: item.employee.firstName + item.employee.lastName,
        Designation: item.employee.designation?.title,
        Date: item.date,
        CheckIn: item.checkIn,
        CheckOut: item.checkOut,
        WorkingDuration: item.workingDuration,
        Status: item.status,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

      XLSX.writeFile(
        workbook,
        `${attendance[0].employee.firstName} ${attendance[0].employee.lastName} Attendance Report.xlsx`,
      );
    });
  }
}
