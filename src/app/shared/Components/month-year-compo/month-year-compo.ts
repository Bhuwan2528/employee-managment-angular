import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-month-year-compo',
  imports: [MatFormField, MatSelect, MatOption, CommonModule, FormsModule ],
  templateUrl: './month-year-compo.html',
  styleUrl: './month-year-compo.scss',
})
export class MonthYearCompo {

  @Output() monthYearFilter = new EventEmitter()


  months = [ 1,2,3,4,5,6,7,8,9,10,11,12 ];
  years = [ 2020, 2021, 2022, 2023, 2024, 2025, 2026 ];

  month = signal<number>(new Date().getMonth() + 1)
  year = signal<number>(new Date().getFullYear())

  getMonthName(month: number): string {
    return new Date(2000, month - 1).toLocaleString('en-US', {
      month: 'long'
    });
  }

  filterChange(){
    const month = this.month()
    const year = this.year()
    this.monthYearFilter.emit({month, year})
  }

}
