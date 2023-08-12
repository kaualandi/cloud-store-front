import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCardButtonComponent } from './add-to-card-button.component';

describe('AddToCardButtonComponent', () => {
  let component: AddToCardButtonComponent;
  let fixture: ComponentFixture<AddToCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCardButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
