import { TestBed } from '@angular/core/testing';
import { AuthGaurdService } from './auth-gaurd.service';



describe('AuthGaurd.ServiceService', () => {
  let service: AuthGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
