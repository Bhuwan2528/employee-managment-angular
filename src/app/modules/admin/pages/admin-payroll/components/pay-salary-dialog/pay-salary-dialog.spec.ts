import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySalaryDialog } from './pay-salary-dialog';

describe('PaySalaryDialog', () => {
  let component: PaySalaryDialog;
  let fixture: ComponentFixture<PaySalaryDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaySalaryDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PaySalaryDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
