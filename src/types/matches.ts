export type TMatch = {
  time: string;
  title: string;
  homeTeam: TTeam;
  awayTeam: TTeam;
  status: 'Scheduled' | 'Ongoing' | 'Completed';
  homeScore: number;
  awayScore: number;
};

type TPlayer = {
  username: string;
  kills: number;
};

export type TTeam = {
  name: string;
  players: TPlayer[];
  points: number;
  place: number;
  total_kills: number;
};
