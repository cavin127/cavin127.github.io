import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGameResultsComponent } from './team-game-results.component';

describe('TeamGameResultsComponent', () => {
  let component: TeamGameResultsComponent;
  let fixture: ComponentFixture<TeamGameResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamGameResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamGameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
