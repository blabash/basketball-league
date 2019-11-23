import React from 'react';
import Sidebar from './Sidebar';
import { getTeamNames } from '../api';
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import { Team } from './Team';

interface Props {}

interface Player {
  name: string;
  position: string;
  teamId: string;
  number: number;
  avatar: string;
  rpg: number;
  spg: number;
  apg: number;
  ppg: number;
}

interface Team {
  id: string;
  name: string;
  wins: number;
  losses: number;
  established: number;
  coach: string;
  manager: string;
  championships: number;
  players: Player[];
}

type TeamNameArray = string[];

const Teams: React.FC<RouteComponentProps> = ({ location, match }) => {
  const [teamNames, setTeamNames] = React.useState<TeamNameArray>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getTeamNames().then(teamNames => {
      setLoading(false);
      setTeamNames(teamNames);
    });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar loading={loading} title='Teams' list={teamNames} />

      {loading === false && location.pathname === '/teams' ? (
        <div
          style={{
            flex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Select a Team
        </div>
      ) : null}

      <Route
        path={`${match.url}/:teamId`}
        render={({ match }) => (
          <div style={{ flex: 1 }}>
            <Team id={match.params.teamId}>
              {(team: Team) =>
                team === null ? (
                  <h1>Loading...</h1>
                ) : (
                  <div>
                    <TeamLogo id={team.id} />
                  </div>
                )
              }
            </Team>
          </div>
        )}
      />
    </div>
  );
};

export default Teams;
