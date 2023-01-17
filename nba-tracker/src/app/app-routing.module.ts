import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectTeamComponent } from './nba-tracker/select-team/select-team.component';
import { TeamGameResultsComponent } from './nba-tracker/team-game-results/team-game-results.component';

const routes: Routes = [
  {
    path: '',
    component: SelectTeamComponent,
    title: 'NBA TRACKER',
  },
  {
    path: 'results/:teamCode',
    component: TeamGameResultsComponent,
    title: 'NBA TRACKER- GAME RESULTS',
  },
  { path: '**', component: SelectTeamComponent, title: 'NBA TRACKER' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
