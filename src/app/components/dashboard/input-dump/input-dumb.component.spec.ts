import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDumpComponent } from './input-dumb.component';

describe('InputDumpComponent', () => {
  let component: InputDumpComponent;
  let fixture: ComponentFixture<InputDumpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
