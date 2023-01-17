export interface Teams {
  data: Team[];
}

export interface Team {
  id: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface Games {
  data: Game[];
}

export interface Game {
  id: string;
  date: string;
  home_team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  visitor_team_score: number;
}

export interface TeamGamesWrapper {
  teams: Team;
  games: Games;
  average_points_scored: string;
  average_points_conceded: string;
  stats: string[];
  conference: string;
}
