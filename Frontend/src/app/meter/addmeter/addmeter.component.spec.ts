import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmeterComponent } from './addmeter.component';

describe('AddmeterComponent', () => {
  let component: AddmeterComponent;
  let fixture: ComponentFixture<AddmeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
