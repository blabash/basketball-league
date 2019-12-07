import React from 'react';
import Sidebar from './Sidebar';
import { getTeamNames } from '../api';
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import Loading from './Loading';
import TeamLogo from './TeamLogo';
import Team from './Team';

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

interface TeamData {
  id: string;
  name: string;
  wins: number;
  losses: number;
  established: number;
  coach: string;
  manager: string;
  championships: number[];
  players: Player[];
}

type TeamNameArray = string[];

const Teams: React.FC<RouteComponentProps> = ({ location, match, history }) => {
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
      <Sidebar
        loading={loading}
        title='Teams'
        list={teamNames}
        match={match}
        history={history}
        location={location}
      />

      {loading === false && location.pathname === '/teams' ? (
        <div
          style={{
            flex: 6,
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
          <div
            style={{
              flex: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '70vh'
            }}
          >
            <Team id={match.params.teamId}>
              {(team: TeamData) =>
                team === null ? (
                  <Loading />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <TeamLogo id={team.id} />
                    <h1>{team.name}</h1>
                    <ul style={{ listStyle: 'none', paddingInlineStart: 0 }}>
                      <li>
                        <b>Established</b>
                        <div>{team.established}</div>
                      </li>
                      <li>
                        <b>Manager</b>
                        <div>{team.manager}</div>
                      </li>
                      <li>
                        <b>Coach</b>
                        <div>{team.coach}</div>
                      </li>
                    </ul>
                    <Link
                      style={{
                        padding: '10px 20px',
                        border: '2px solid black',
                        borderRadius: '5px'
                      }}
                      to={`/${match.params.teamId}`}
                    >
                      {team.name} Team Page
                    </Link>
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
