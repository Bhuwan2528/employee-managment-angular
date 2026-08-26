import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFilterOffcanvas } from './employee-filter-offcanvas';

describe('EmployeeFilterOffcanvas', () => {
  let component: EmployeeFilterOffcanvas;
  let fixture: ComponentFixture<EmployeeFilterOffcanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFilterOffcanvas],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFilterOffcanvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
