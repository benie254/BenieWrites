import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPoemsComponent } from './all-poems.component';

describe('AllPoemsComponent', () => {
  let component: AllPoemsComponent;
  let fixture: ComponentFixture<AllPoemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPoemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPoemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
