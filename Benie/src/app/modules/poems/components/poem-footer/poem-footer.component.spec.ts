import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemFooterComponent } from './poem-footer.component';

describe('PoemFooterComponent', () => {
  let component: PoemFooterComponent;
  let fixture: ComponentFixture<PoemFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoemFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoemFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
