import React from 'react';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { getPlayers } from '../api';
import { parse } from 'query-string';
import Sidebar from './Sidebar';
import slug from 'slug';

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

type PlayerArray = Player[];

const Players: React.FC<RouteComponentProps> = ({
  match,
  location,
  history
}) => {
  const initialPlayers: PlayerArray = [];
  const [players, setPlayers] = React.useState(initialPlayers);
  const [loading, setLoading] = React.useState(true);

  const fetchPlayers = (teamId?: string) => {
    getPlayers(teamId).then((players: PlayerArray) => {
      setPlayers(players);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    let teamId;
    if (location.search) {
      teamId = parse(location.search).teamId as string;
    }
    teamId ? fetchPlayers(teamId) : fetchPlayers();
  }, [location.search]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        loading={loading}
        title='Players'
        list={players.map((player: Player) => player.name)}
        match={match}
        location={location}
        history={history}
      />

      {loading === false && location.pathname === '/players' ? (
        <div
          style={{
            flex: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Select a Player
        </div>
      ) : null}

      <Route
        path={`${match.url}/:playerId`}
        render={({ match }) => {
          if (loading === true) return null;

          const player = players.find(
            player => slug(player.name) === match.params.playerId
          );

          if (player) {
            const {
              name,
              position,
              teamId,
              number,
              avatar,
              rpg,
              spg,
              apg,
              ppg
            } = player;

            return (
              <TransitionGroup
                style={{
                  flex: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames='fade'
                >
                  <div>
                    <img
                      src={`${avatar}`}
                      alt={`${name}'s avatar`}
                      style={{ height: 300, width: 300, borderRadius: '50%' }}
                    />
                    <h1>{name}</h1>
                    <br />
                    <h3>#{number}</h3>
                    <br />
                    <div
                      style={{
                        width: '50%',
                        height: '300px',
                        fontSize: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        alignContent: 'space-evenly',
                        justifyContent: 'space-between'
                      }}
                    >
                      <h2>
                        Team
                        <div>
                          <Link to={`/${teamId}`} style={{ color: 'gray' }}>
                            <h3 style={{ textTransform: 'capitalize' }}>
                              {teamId}
                            </h3>
                          </Link>
                        </div>
                      </h2>
                      <h2>
                        Position
                        <div style={{ fontWeight: 'lighter' }}>{position}</div>
                      </h2>
                      <h2>
                        PPG<div>{ppg}</div>
                      </h2>
                      <h2>
                        APG<div>{apg}</div>
                      </h2>
                      <h2>
                        SPG<div>{spg}</div>
                      </h2>
                      <h2>
                        RPG<div>{rpg}</div>
                      </h2>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            );
          } else {
            return null;
          }
        }}
      />
    </div>
  );
};

export default Players;
