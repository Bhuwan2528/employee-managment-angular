import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLoaders } from './global-loaders';

describe('GlobalLoaders', () => {
  let component: GlobalLoaders;
  let fixture: ComponentFixture<GlobalLoaders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalLoaders],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalLoaders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
