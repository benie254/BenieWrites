import { TestBed } from '@angular/core/testing';

import { MyStoryService } from './my-story.service';

describe('MyStoryService', () => {
  let service: MyStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
