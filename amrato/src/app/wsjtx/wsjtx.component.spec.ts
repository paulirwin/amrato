import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsjtxComponent } from './wsjtx.component';

describe('WsjtxComponent', () => {
  let component: WsjtxComponent;
  let fixture: ComponentFixture<WsjtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsjtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsjtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
