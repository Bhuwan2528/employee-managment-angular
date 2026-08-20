import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeServerResponse } from '../../../../../../core/models/emloyee.model';

@Component({
  selector: 'app-employee-detail-dialog',
  imports: [DatePipe],
  templateUrl: './employee-detail-dialog.html',
  styleUrl: './employee-detail-dialog.scss',
})
export class EmployeeDetailDialog {

  employee = inject<EmployeeServerResponse>(MAT_DIALOG_DATA)
  private dialogRef = inject(MatDialogRef<EmployeeDetailDialog>)

  closeDialog(){
    this.dialogRef.close()
  }
}
