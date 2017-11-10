/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConnectDbService } from './connect-db.service';

describe('ConnectDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectDbService]
    });
  });

  it('should ...', inject([ConnectDbService], (service: ConnectDbService) => {
    expect(service).toBeTruthy();
  }));
});
