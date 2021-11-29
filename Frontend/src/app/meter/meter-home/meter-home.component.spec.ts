import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterHomeComponent } from './meter-home.component';

describe('MeterHomeComponent', () => {
  let component: MeterHomeComponent;
  let fixture: ComponentFixture<MeterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
