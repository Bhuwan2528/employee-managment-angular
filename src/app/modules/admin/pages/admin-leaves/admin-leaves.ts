import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { approveLeave, loadLeaves, rejectLeave } from '../../../../store/actions/leave.actions';
import { selectLeave } from '../../../../store/selectors/leave.selector';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-leaves',
  imports: [MatFormFieldModule, MatSelect, MatOption, AsyncPipe, DatePipe],
  templateUrl: './admin-leaves.html',
  styleUrl: './admin-leaves.scss',
})
export class AdminLeaves {
  
  store = inject(Store)

  ngOnInit(){
    this.store.dispatch(loadLeaves())
  }

  leaves = this.store.select(selectLeave)

  getDays(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end.getTime() - start.getTime();
    return Math.ceil(difference / (1000 * 60 * 60 * 24) + 1);
  }

  approveRequest(id: string){
    this.store.dispatch(approveLeave({id}))
  }

  rejectRequest(id: string){
    this.store.dispatch(rejectLeave({id}))
  }
}
