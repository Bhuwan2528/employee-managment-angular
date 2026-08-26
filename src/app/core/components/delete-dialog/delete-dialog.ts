import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DeleteDialogInterface {
  icon?: string;
  title?: string;
  description?: string;
  btn?: string;
}

@Component({
  selector: 'app-delete-dialog',
  imports: [],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})

export class DeleteDialog {
  
  dialogRef = inject(MatDialogRef<DeleteDialog>)
  data = inject<DeleteDialogInterface>(MAT_DIALOG_DATA)

  closeDialog(){
    this.dialogRef.close(false)
  }

  confirmDelete(){
    this.dialogRef.close(true)
  }
}

