import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantprofileComponent } from './consultantprofile.component';

describe('ConsultantprofileComponent', () => {
  let component: ConsultantprofileComponent;
  let fixture: ComponentFixture<ConsultantprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
