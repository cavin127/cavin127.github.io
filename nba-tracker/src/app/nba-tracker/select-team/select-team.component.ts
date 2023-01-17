import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Teams, Team } from 'src/app/shared/models/teams.model';
import { NbaTrackerService } from 'src/app/shared/services/nba-tracker.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.css'],
})
export class SelectTeamComponent implements OnInit {
  teams$?: Observable<Teams>;
  selectedTeam = '';
  getTeamById?: Team;
  resultArray: Team[] = [];
  teamId?: string | null;
  selectTeamButtonText: string = 'Pick a team';
  trackTeamButtonText: string = 'Track Team';

  constructor(private nbaTrackerService: NbaTrackerService) {}

  ngOnInit(): void {
    if (localStorage.getItem('teamId')) {
      this.teamId = localStorage.getItem('teamId');
      localStorage.removeItem('teamId');
    }

    this.teams$ = this.nbaTrackerService.getTeams();
  }

  onSelected(value: string): void {
    this.selectedTeam = value;
  }

  trackTeam(team: string) {
    if (team) {
      this.teamId = team;
    }
  }
}
