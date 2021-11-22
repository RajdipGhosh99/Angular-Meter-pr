import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterMainComponent } from './meter-main.component';

describe('MeterMainComponent', () => {
  let component: MeterMainComponent;
  let fixture: ComponentFixture<MeterMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
