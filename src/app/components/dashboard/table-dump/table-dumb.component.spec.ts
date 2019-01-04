import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDumpComponent } from './table-dumb.component';

describe('TableDumpComponent', () => {
  let component: TableDumpComponent;
  let fixture: ComponentFixture<TableDumpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
