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

  currentTime = new Date();

  attendance = this.store.select(selectAttendance)
  
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

  userList = this.store.select(selectUserAttendanceList)

  ngOnInit(){
    this.store.dispatch(loadUserAttendance())

    this.userList.subscribe(list=> console.log(list))
  }


  checkin(){
    this.store.dispatch(checkin())
  }

  checkout(){
    this.store.dispatch(checkout())
  }
}
