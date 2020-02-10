import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandPlanComponent } from './band-plan.component';

describe('BandPlanComponent', () => {
  let component: BandPlanComponent;
  let fixture: ComponentFixture<BandPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
