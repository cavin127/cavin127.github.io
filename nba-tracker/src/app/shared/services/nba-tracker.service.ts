import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teams, Team, Games } from 'src/app/shared/models/teams.model';

@Injectable({
  providedIn: 'root',
})
export class NbaTrackerService {
  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get<Teams>('https://free-nba.p.rapidapi.com/teams');
  }

  getTeam(team: string) {
    return this.http.get<Team>(`https://free-nba.p.rapidapi.com/teams/${team}`);
  }

  getGames(team: string, formatedDate: string[]) {
    let formattedDateString = formatedDate.join('&dates[]=');
    return this.http
      .get<Games>(`https://free-nba.p.rapidapi.com/games?&dates[]=${formattedDateString}&team_ids[]=${team}
`);
  }
}
