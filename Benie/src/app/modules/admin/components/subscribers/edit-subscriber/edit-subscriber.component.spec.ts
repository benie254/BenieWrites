import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriberComponent } from './edit-subscriber.component';

describe('EditSubscriberComponent', () => {
  let component: EditSubscriberComponent;
  let fixture: ComponentFixture<EditSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscriberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
