import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFooterComponent } from './story-footer.component';

describe('StoryFooterComponent', () => {
  let component: StoryFooterComponent;
  let fixture: ComponentFixture<StoryFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
