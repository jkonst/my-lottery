import { TestBed } from '@angular/core/testing';

import { LotteryFormsService } from './lottery-forms.service';

describe('LotteryFormsService', () => {
  let service: LotteryFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotteryFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
