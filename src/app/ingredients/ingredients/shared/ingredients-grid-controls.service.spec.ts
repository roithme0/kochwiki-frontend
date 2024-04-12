import { TestBed } from '@angular/core/testing';

import { IngredientsGridControlsService } from './ingredients-grid-controls.service';

describe('IngredientsGridControlsService', () => {
  let service: IngredientsGridControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsGridControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
