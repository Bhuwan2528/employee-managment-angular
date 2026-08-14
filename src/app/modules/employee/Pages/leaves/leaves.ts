import { Component, inject } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveRequest, LeaveServerResponse } from '../../../../core/models/leaves.model';
import { Store } from '@ngrx/store';
import { addLeave, userLeaves } from '../../../../store/actions/leave.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectUserLeaves } from '../../../../store/selectors/leave.selector';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leaves',
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, DatePipe ],
  templateUrl: './leaves.html',
  styleUrl: './leaves.scss',
})
export class Leaves {

fb = inject(NonNullableFormBuilder)
store = inject(Store)

addLeaveForm = this.fb.group({
  type: ['', Validators.required],
  startDate: ['', Validators.required],
  endDate: ['', Validators.required],
  reason: ['', Validators.required]
})

addLeave(){
  const formValue = this.addLeaveForm.getRawValue();

  const request = {
    ...formValue,
    startDate: new Date(formValue.startDate).toLocaleDateString('en-CA'),
    endDate: new Date(formValue.endDate).toLocaleDateString('en-CA')
  }

  this.store.dispatch(addLeave({request}))
  
  this.userLeaves = toSignal(this.store.select(selectUserLeaves), {initialValue: [] as LeaveServerResponse[]})
}

ngOnInit(){
  this.store.dispatch(userLeaves())
}

userLeaves = toSignal(this.store.select(selectUserLeaves), {initialValue: [] as LeaveServerResponse[]})

}
