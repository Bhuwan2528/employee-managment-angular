import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkin, checkout, loadUserAttendance } from '../../../../store/actions/attendance.actions';
import { selectAttendance, selectUserAttendanceList } from '../../../../store/selectors/attendance.selector';

@Component({
  selector: 'app-home',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  store = inject(Store)
  checkinTime = signal<null | string | Date>(null);
  checkoutTime = signal<null | string | Date>(null);
  workingDuration = signal<number>(0)

  empName = signal<string>('')

  currentTime = new Date();

  attendance = this.store.select(selectAttendance)

  userList = this.store.select(selectUserAttendanceList)

  constructor(){
    this.attendance.subscribe(attendance =>{

      if(attendance?.checkIn){
        localStorage.setItem('checkinTime', JSON.stringify(attendance?.checkIn ?? null));
        const localcheckin = localStorage.getItem('checkinTime')
        this.checkinTime.set(localcheckin ? new Date(JSON.parse(localcheckin)) : null)
      }
      
      if(attendance?.checkOut){
        localStorage.setItem('checkoutTime', JSON.stringify(attendance?.checkOut ?? null));
        const localcheckout = localStorage.getItem('checkoutTime')
        this.checkoutTime.set(localcheckout ? new Date(JSON.parse(localcheckout)) : null)
      }


      } 
    )

    setInterval(() => {
      this.currentTime = new Date()
    }, 1000);
  }

  ngOnInit(){
    this.store.dispatch(loadUserAttendance())
    this.userList.subscribe(list=> console.log(list))
    
    this.userList.subscribe((lists)=>{
      const list = lists[0] 
      if(!list){
        return
      }

      const today = new Date().toDateString();
      const apiDate = new Date(list.date).toDateString();

      if(today === apiDate){
        this.checkinTime.set(list.checkIn)
        this.checkoutTime.set(list.checkOut)
        this.workingDuration.set(list.workingDuration * 60 * 1000)
        this.empName.set(list.employee.firstName)
      }

    })

    console.log('WORKING DURATION:', this.workingDuration());
console.log('TYPE:', typeof this.workingDuration());
  }


  checkin(){
    this.store.dispatch(checkin())
    this.store.dispatch(loadUserAttendance())
  }

  checkout(){
    this.store.dispatch(checkout())
    this.store.dispatch(loadUserAttendance())
  }
}
