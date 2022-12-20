import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubscribersComponent } from './all-subscribers.component';

describe('AllSubscribersComponent', () => {
  let component: AllSubscribersComponent;
  let fixture: ComponentFixture<AllSubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSubscribersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
