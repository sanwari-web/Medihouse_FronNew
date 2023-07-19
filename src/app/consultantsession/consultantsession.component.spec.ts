import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsessionComponent } from './consultantsession.component';

describe('ConsultantsessionComponent', () => {
  let component: ConsultantsessionComponent;
  let fixture: ComponentFixture<ConsultantsessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantsessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
