import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { checkin, checkout, loadUserAttendance } from '../../../../store/actions/attendance.actions';
import { selectAttendanceLoading, selectUserAttendanceList } from '../../../../store/selectors/attendance.selector';
import { AttendanceServerResponse } from '../../../../core/models/attendance.model';

export type TodayAttendanceStatus = 'NOT_CHECKED_IN' | 'CHECKED_IN' | 'CHECKED_OUT';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {

  store = inject(Store)

  // Source of truth for attendance: the actual list from the backend, never
  // component-local state. checkin()/checkout() only ever mutate this via a
  // real refetch (attendance.effects re-dispatches loadUserAttendance once
  // the mutation itself succeeds), so this stays correct across refreshes,
  // re-navigation, and re-login without any separate caching.
  userList = toSignal(this.store.select(selectUserAttendanceList), {
    initialValue: [] as AttendanceServerResponse[],
  });

  // True from before the very first dispatch until the initial fetch (or any
  // checkin/checkout/reload) settles. Without this, canCheckIn/canCheckOut
  // derive from an empty userList for the ~1s+ (longer on a cold backend)
  // between mount and the real response landing, rendering a false
  // NOT_CHECKED_IN/"Check In enabled" flash even when today is actually
  // already checked out -- confirmed by tracing real response timing against
  // the deployed site: the button showed enabled for ~800ms before the
  // attendance/user response (which flips it correctly) arrived.
  loading = toSignal(this.store.select(selectAttendanceLoading), { initialValue: true });

  // Drives the live "current time" clock and the live working-duration tick
  // while checked in.
  now = signal(new Date());
  private tickId: ReturnType<typeof setInterval>;

  // Matched by local calendar date of checkIn -- not list[0] (the most recent
  // record isn't necessarily today, e.g. an old session left open for days),
  // and not the record's own `date` field (its truncation turned out to be
  // inconsistent across records: some UTC-midnight, some IST-midnight,
  // apparently a backend behavior change between when they were created --
  // checkIn is a real, unambiguous instant, so comparing its local calendar
  // date against today's avoids depending on that inconsistent field).
  todayAttendance = computed<AttendanceServerResponse | null>(() => {
    const todayStr = new Date().toDateString();
    return this.userList().find((item) => item.checkIn && new Date(item.checkIn).toDateString() === todayStr) ?? null;
  });

  status = computed<TodayAttendanceStatus>(() => {
    const record = this.todayAttendance();
    if (!record?.checkIn) return 'NOT_CHECKED_IN';
    if (!record.checkOut) return 'CHECKED_IN';
    return 'CHECKED_OUT';
  });

  checkinTime = computed(() => this.todayAttendance()?.checkIn ?? null);
  checkoutTime = computed(() => this.todayAttendance()?.checkOut ?? null);

  canCheckIn = computed(() => !this.loading() && this.status() === 'NOT_CHECKED_IN');
  canCheckOut = computed(() => !this.loading() && this.status() === 'CHECKED_IN');

  // The backend never populates workingDuration (verified against the live
  // API: it's null on every record, checked-out or not) -- duration is
  // always computed here instead, from the real checkIn/checkOut timestamps.
  workingDurationMs = computed(() => {
    const record = this.todayAttendance();
    return record ? this.durationFor(record) : 0;
  });

  // firstName isn't on the auth user (only role/email), so it's read off any
  // attendance record for this employee rather than requiring today's.
  empName = computed(() => this.userList()[0]?.employee?.firstName ?? '');

  constructor() {
    this.tickId = setInterval(() => this.now.set(new Date()), 1000);
  }

  ngOnInit() {
    this.store.dispatch(loadUserAttendance());
  }

  ngOnDestroy() {
    clearInterval(this.tickId);
  }

  durationFor(record: AttendanceServerResponse): number {
    if (!record.checkIn) return 0;
    const start = new Date(record.checkIn).getTime();
    const end = record.checkOut ? new Date(record.checkOut).getTime() : this.now().getTime();
    return Math.max(0, end - start);
  }

  private isToday(record: AttendanceServerResponse): boolean {
    if (!record.checkIn) return false;
    return new Date(record.checkIn).toDateString() === new Date().toDateString();
  }

  // Backend status is passed through as-is unless it's the generic PRESENT
  // value, where "still working" (no checkout yet, today) is worth calling
  // out distinctly rather than always reading "Present".
  rowStatusLabel(record: AttendanceServerResponse): string {
    if (record.status !== 'PRESENT') return record.status;
    if (!record.checkOut && this.isToday(record)) return 'Still Working';
    return 'Present';
  }

  checkin() {
    this.store.dispatch(checkin())
  }

  checkout() {
    this.store.dispatch(checkout())
  }
}
