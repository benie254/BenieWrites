import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryPagesComponent } from './story-pages.component';

describe('StoryPagesComponent', () => {
  let component: StoryPagesComponent;
  let fixture: ComponentFixture<StoryPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
