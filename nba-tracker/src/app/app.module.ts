import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectTeamComponent } from './nba-tracker/select-team/select-team.component';
import { ListTeamsComponent } from './nba-tracker/list-teams/list-teams.component';
import { TeamGameResultsComponent } from './nba-tracker/team-game-results/team-game-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NbaInterceptor } from './nba-tracker/nba.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    SelectTeamComponent,
    ListTeamsComponent,
    TeamGameResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbaInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
