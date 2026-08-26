import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { addDepartment, deleteDepartment, loadDepartments, updateDepartment } from '../../../../store/actions/deapartment.actions';

import { addDesignation, deleteDesignation, loadDesignation, updateDesignation } from '../../../../store/actions/designation.actions';

import { selectDepartments } from '../../../../store/selectors/department.selectors';
import { selectDesignation } from '../../../../store/selectors/designation.selector';

import { DepartmentServerResponseDto } from '../../../../core/models/department.model';
import { DesignationServerResponseDTO } from '../../../../core/models/designation.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../../../core/components/delete-dialog/delete-dialog';

@Component({
  selector: 'app-admin-department',
  imports: [AsyncPipe, FormsModule, TitleCasePipe],
  templateUrl: './admin-department.html',
  styleUrl: './admin-department.scss',
})
export class AdminDepartment implements OnInit {

  private readonly store = inject(Store);
  dialog = inject(MatDialog)

  // ================= Department =================

  departmentName = '';
  edittingDepartmentId: string | null = null;

  // ================= Designation =================

  designationName = '';
  edittinDesignationId: string | null = null;

  departments$ = this.store.select(selectDepartments);
  designation$ = this.store.select(selectDesignation);

  departmentAddHide = signal<boolean>(true)
  designationAddHide = signal<boolean>(true)

  ngOnInit(): void {
    this.store.dispatch(loadDepartments());
    this.store.dispatch(loadDesignation());
  }

  // ==================================================
  // Department
  // ==================================================

  editDepartment(department: DepartmentServerResponseDto): void {
    this.departmentName = department.name;
    this.edittingDepartmentId = department.id;
  }

  addEditDepartment(): void {

    if (this.edittingDepartmentId) {

      this.store.dispatch(updateDepartment({
        id: this.edittingDepartmentId,
        request: {
          name: this.departmentName
        }
      }));

    } else {

      this.store.dispatch(addDepartment({
        request: {
          name: this.departmentName
        }
      }));

    }

    this.departmentName = '';
    this.edittingDepartmentId = null;
  }

  deleteDepartment(id: string): void {
    this.store.dispatch(deleteDepartment({ id }));
  }

  // ==================================================
  // Designation
  // ==================================================

  editDesignation(designation: DesignationServerResponseDTO): void {
    this.designationName = designation.title;
    this.edittinDesignationId = designation.id;
  }

  addEditDesignation(): void {

    if (this.edittinDesignationId) {

      this.store.dispatch(updateDesignation({
        id: this.edittinDesignationId,
        request: {
          title: this.designationName
        }
      }));

    } else {

      this.store.dispatch(addDesignation({
        request: {
          title: this.designationName
        }
      }));

    }

    this.designationName = '';
    this.edittinDesignationId = null;
  }

  deleteDesignation(id: string): void {

    const dialogRef = this.dialog.open(DeleteDialog)

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.store.dispatch(deleteDesignation({ id }));
      }
    })

  }


  departmentAddToggle(){
    this.departmentAddHide.set(!this.departmentAddHide())
  }

  designationAddToggle(){
    this.designationAddHide.set(!this.designationAddHide())
  }


}