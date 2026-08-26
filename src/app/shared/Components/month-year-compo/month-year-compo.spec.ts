import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthYearCompo } from './month-year-compo';

describe('MonthYearCompo', () => {
  let component: MonthYearCompo;
  let fixture: ComponentFixture<MonthYearCompo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthYearCompo],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthYearCompo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
