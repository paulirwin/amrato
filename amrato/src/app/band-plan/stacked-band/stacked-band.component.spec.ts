import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBandComponent } from './stacked-band.component';

describe('StackedBandComponent', () => {
  let component: StackedBandComponent;
  let fixture: ComponentFixture<StackedBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
