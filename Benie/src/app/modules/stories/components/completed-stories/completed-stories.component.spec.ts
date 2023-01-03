import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedStoriesComponent } from './completed-stories.component';

describe('CompletedStoriesComponent', () => {
  let component: CompletedStoriesComponent;
  let fixture: ComponentFixture<CompletedStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
