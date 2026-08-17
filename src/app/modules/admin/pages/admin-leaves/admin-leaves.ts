import { Component, computed, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { approveLeave, loadLeaves, rejectLeave } from '../../../../store/actions/leave.actions';
import { selectLeave } from '../../../../store/selectors/leave.selector';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeServerResponse } from '../../../../core/models/emloyee.model';
import { LeaveServerResponse } from '../../../../core/models/leaves.model';
import { loadDashboard } from '../../../../store/actions/dashboard.actions';
import { OnLeaveTodayDTO } from '../../../../core/models/dashboard.model';
import { selectDashboard } from '../../../../store/selectors/dashboard.selector';

@Component({
  selector: 'app-admin-leaves',
  imports: [MatFormFieldModule, MatSelect, MatOption, DatePipe, FormsModule],
  templateUrl: './admin-leaves.html',
  styleUrl: './admin-leaves.scss',
})
export class AdminLeaves {
  
  store = inject(Store)
  leaveType = signal<string>('all')
  empLeaves: OnLeaveTodayDTO[]  = []


  ngOnInit() {
    this.store.dispatch(loadLeaves());
    this.store.dispatch(loadDashboard())
  }

  allLeaves = toSignal(this.store.select(selectLeave), {initialValue: []})

  leaves = computed(()=>{
    const allLeaves = this.allLeaves();
    const type = this.leaveType();

    if(type === 'all'){
      return allLeaves;
    }

    return allLeaves.filter(leave => leave.type == type)
  })

  selectDashboard = this.store.select(selectDashboard).subscribe((dashboard)=>{
    this.empLeaves = dashboard?.OnLeaveToday ?? []
    console.log(dashboard);
    console.log(this.empLeaves);
    
  })
  

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
