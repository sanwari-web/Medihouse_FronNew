import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsessionsComponent } from './viewsessions.component';

describe('ViewsessionsComponent', () => {
  let component: ViewsessionsComponent;
  let fixture: ComponentFixture<ViewsessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
