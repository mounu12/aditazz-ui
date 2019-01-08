import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDumbComponent } from './graph-dumb.component';

describe('GraphDumbComponent', () => {
  let component: GraphDumbComponent;
  let fixture: ComponentFixture<GraphDumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
