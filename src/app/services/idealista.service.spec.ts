import { TestBed } from '@angular/core/testing';

import { IdealistaService } from './idealista.service';

describe('IdealistaService', () => {
  let service: IdealistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdealistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
