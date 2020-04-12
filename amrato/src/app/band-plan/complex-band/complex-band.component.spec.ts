import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexBandComponent } from './complex-band.component';

describe('ComplexBandComponent', () => {
  let component: ComplexBandComponent;
  let fixture: ComponentFixture<ComplexBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
