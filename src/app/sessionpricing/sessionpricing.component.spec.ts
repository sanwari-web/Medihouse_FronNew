import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionpricingComponent } from './sessionpricing.component';

describe('SessionpricingComponent', () => {
  let component: SessionpricingComponent;
  let fixture: ComponentFixture<SessionpricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionpricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionpricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
