import { TestBed } from '@angular/core/testing';

import { MessagesToastrService } from './messages-toastr.service';

describe('MessagesToastrService', () => {
  let service: MessagesToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
