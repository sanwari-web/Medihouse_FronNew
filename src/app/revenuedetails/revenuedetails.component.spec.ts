import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuedetailsComponent } from './revenuedetails.component';

describe('RevenuedetailsComponent', () => {
  let component: RevenuedetailsComponent;
  let fixture: ComponentFixture<RevenuedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
