import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, Observable } from 'rxjs';
import {
  Games,
  Team,
  TeamGamesWrapper,
} from 'src/app/shared/models/teams.model';
import { NbaTrackerService } from 'src/app/shared/services/nba-tracker.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-team-game-results',
  templateUrl: './team-game-results.component.html',
  styleUrls: ['./team-game-results.component.css'],
})
export class TeamGameResultsComponent implements OnInit {
  teamId?: string;
  getTeam$?: Observable<Team>;
  getGames$?: Observable<Games>;
  resultArrayNew?: TeamGamesWrapper;
  backButtonText: string = '<< Back to all team stats';;
  past12daysText: string = 'Scores of past 12 days';
  conferenceText: string = 'Conference';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private nbaTrackerService: NbaTrackerService,
    private location: Location
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.teamId = params.get('teamCode') || '';
      this.getTeam$ = this.nbaTrackerService.getTeam(this.teamId);

      const prevDates = this.getPrevDates();
      let formatedDate = prevDates.map((date) => {
        return moment(moment(date)).format('YYYY-MM-DD');
      });

      this.getGames$ = this.nbaTrackerService.getGames(
        this.teamId,
        formatedDate
      );

      const joinStream = combineLatest(this.getTeam$, this.getGames$);

      const subscribe = joinStream.subscribe(([teams, games]) => {
        let resultArray: TeamGamesWrapper = {
          teams,
          games,
          average_points_scored: '',
          average_points_conceded: '',
          stats: [],
          conference: this.getConference(teams),
        };
        if (resultArray) {
          this.resultArrayNew = resultArray;
          console.log(this.resultArrayNew);
        }
      });
    });
  }

  backToTeamStats() {
    localStorage.setItem('teamId', this.teamId || '');
    this.location.back();
  }

  getPrevDates() {
    let dates = [];
    return (dates = [...Array(12)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    }));
  }

  getConference(teams: Team) {
    return teams.conference === 'East' ? 'Eastern' : 'Western';
  }
}
