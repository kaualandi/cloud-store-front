import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSellersComponent } from './teams-sellers.component';

describe('TeamsSellersComponent', () => {
  let component: TeamsSellersComponent;
  let fixture: ComponentFixture<TeamsSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsSellersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
