import * as moment from 'moment';
import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import {
  Games,
  Team,
  TeamGamesWrapper,
} from 'src/app/shared/models/teams.model';
import { NbaTrackerService } from 'src/app/shared/services/nba-tracker.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.css'],
})
export class ListTeamsComponent implements OnChanges {
  resultArrayNew: TeamGamesWrapper[] = [];
  average_points_scored?: string;
  average_points_conceded?: string;
  getTeam$?: Observable<Team>;
  getGames$?: Observable<Games>;
  @Input() team?: string;
  seeGameResultsText: string = 'See game results >>';
  avgPointsScoredText: string = 'Avg Pts Scored :';
  avgPointsConcededText: string = 'Avg Pts Conceded :';
  past12daysText: string = 'Result of past 12 days';
  conferenceText: string = 'Conference';

  constructor(
    private nbaTrackerService: NbaTrackerService,
    private router: Router
  ) {}

  ngOnChanges(): void {
    if (this.team) {
      this.getTeam$ = this.nbaTrackerService.getTeam(this.team);

      const prevDates = this.getPrevDates();
      let formatedDate = prevDates.map((date) => {
        return moment(moment(date)).format('YYYY-MM-DD');
      });

      this.getGames$ = this.nbaTrackerService.getGames(this.team, formatedDate);
      const joinStream = combineLatest(this.getTeam$, this.getGames$);

      const subscribe = joinStream.subscribe(([teams, games]) => {
        let resultArray: TeamGamesWrapper = {
          teams,
          games,
          average_points_scored: this.getAveragePointsScored(games),
          average_points_conceded: this.getAveragePointsConceded(games),
          stats: this.getStats(games),
          conference: this.getConference(teams),
        };

        this.resultArrayNew.push(resultArray);
      });
    }
  }

  getConference(teams: Team) {
    return teams.conference === 'East' ? 'Eastern' : 'Western';
  }

  getAveragePointsScored(res: Games) {
    const average_points_scored =
      res.data.reduce((acc, elem) => acc + elem.visitor_team_score, 0) /
      res.data.length;
    return average_points_scored.toFixed(2);
  }

  getStats(res: Games) {
    let array: string[] = [];
    res.data.map((data) => {
      if (data.visitor_team_score > data.home_team_score) {
        array.push('W');
      } else {
        array.push('L');
      }
    });
    return array;
  }

  getAveragePointsConceded(res: Games) {
    const average_points_conceded =
      res.data.reduce((acc, elem) => acc + elem.home_team_score, 0) /
      res.data.length;
    return average_points_conceded.toFixed(2);
  }

  deleteTeam(teamid: string, result: TeamGamesWrapper[]) {
    const requiredIndex = result.findIndex((el) => {
      return el.teams.id === teamid;
    });
    return result.splice(requiredIndex, 1);
  }

  getPrevDates() {
    let dates = [];
    return (dates = [...Array(12)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    }));
  }
}
