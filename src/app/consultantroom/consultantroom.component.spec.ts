import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantroomComponent } from './consultantroom.component';

describe('ConsultantroomComponent', () => {
  let component: ConsultantroomComponent;
  let fixture: ComponentFixture<ConsultantroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
