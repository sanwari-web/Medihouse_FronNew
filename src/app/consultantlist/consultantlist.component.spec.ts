import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantlistComponent } from './consultantlist.component';

describe('ConsultantlistComponent', () => {
  let component: ConsultantlistComponent;
  let fixture: ComponentFixture<ConsultantlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
