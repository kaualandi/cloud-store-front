import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProductComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutProductComponent;
  let fixture: ComponentFixture<AboutProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
