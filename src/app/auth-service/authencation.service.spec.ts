import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthencationService } from './authencation.service';

describe('AuthencationService', () => {
  let service: AuthencationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthencationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
