import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReactionsComponent } from './all-reactions.component';

describe('AllReactionsComponent', () => {
  let component: AllReactionsComponent;
  let fixture: ComponentFixture<AllReactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
