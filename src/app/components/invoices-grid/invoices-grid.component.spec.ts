import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesGridComponent } from './invoices-grid.component';

describe('InvoicesGridComponent', () => {
  let component: InvoicesGridComponent;
  let fixture: ComponentFixture<InvoicesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
