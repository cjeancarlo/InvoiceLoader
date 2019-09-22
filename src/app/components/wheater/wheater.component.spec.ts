import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheaterComponent } from './wheater.component';

describe('WheaterComponent', () => {
  let component: WheaterComponent;
  let fixture: ComponentFixture<WheaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
