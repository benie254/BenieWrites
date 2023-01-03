import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingStoriesComponent } from './ongoing-stories.component';

describe('OngoingStoriesComponent', () => {
  let component: OngoingStoriesComponent;
  let fixture: ComponentFixture<OngoingStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
