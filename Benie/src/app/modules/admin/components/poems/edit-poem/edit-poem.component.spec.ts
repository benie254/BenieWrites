import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoemComponent } from './edit-poem.component';

describe('EditPoemComponent', () => {
  let component: EditPoemComponent;
  let fixture: ComponentFixture<EditPoemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPoemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
