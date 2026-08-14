import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPayroll } from './admin-payroll';

describe('AdminPayroll', () => {
  let component: AdminPayroll;
  let fixture: ComponentFixture<AdminPayroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPayroll],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPayroll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
