import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteEmployee } from '../../../../../../store/actions/employee.action';

@Component({
  selector: 'app-delete-employee-component',
  imports: [],
  templateUrl: './delete-employee-component.html',
  styleUrl: './delete-employee-component.scss',
})
export class DeleteEmployeeComponent {

  private dialogRef = inject(MatDialogRef<DeleteEmployeeComponent>)
  data = inject(MAT_DIALOG_DATA);
  store = inject(Store)

  closeDialog(){
    this.dialogRef.close()
  }

  deleteEmployee(){
    this.store.dispatch(deleteEmployee({
      id: this.data?.id
    }))

    this.closeDialog()

  }

}
