import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeServerResponse } from '../../../../../../core/models/emloyee.model';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { select, Store } from '@ngrx/store';
import { AddEmployeeSalary } from '../../../../../../store/actions/salary.actions';
import { ToastService } from '../../../../../../core/services/toast.service';
import { selectSalaryError } from '../../../../../../store/selectors/salary.selector';
import { PrintError } from '../../../../../../shared/utils/prinitingError';

@Component({
  selector: 'app-pay-salary-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './pay-salary-dialog.html',
  styleUrl: './pay-salary-dialog.scss',
})
export class PaySalaryDialog {
  dialogRef = inject(MatDialogRef<PaySalaryDialog>)
  employee = inject<EmployeeServerResponse>(MAT_DIALOG_DATA)
  fb = inject(NonNullableFormBuilder)
  store = inject(Store)
  toast = inject(ToastService)
  printError = inject(PrintError)

  closeDialog(){
    this.dialogRef.close()
  }

  payForm = this.fb.group({
    month: ['', Validators.required],
    year: ['2026', Validators.required],
    allowances: [0, Validators.required],
    deductions: [0, Validators.required]
  })

  getNetSalary(){
    const basic = Number(this.employee.basic)
    const allowances = this.payForm.controls.allowances.value;
    const deductions = this.payForm.controls.deductions.value;

    return (basic + allowances - deductions)
  }

  onSubmit(){
    const request = {
      month: Number(this.payForm.controls.month.value),
      year: Number(this.payForm.controls.year.value),
      allowances: Number(this.payForm.controls.allowances.value),
      deductions: Number(this.payForm.controls.deductions.value)
    }
    this.store.dispatch(AddEmployeeSalary({
      request,
      id: this.employee.id
    }))
    this.toast.success('Salary Paid')
  }

  resError = this.store.select(selectSalaryError).subscribe(error=> this.printError.toastError(error))
}
