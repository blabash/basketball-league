import React from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { getTeamsArticles } from '../api';
import TeamLogo from './TeamLogo';
import Team from './Team';
import slug from 'slug';
import { Link } from 'react-router-dom';

interface TeamsArticle {
  date: Date;
  title: string;
  id: string;
}

interface Props {}

const TeamPage: React.FC<Props> = props => {
  const { teamId } = useParams();
  const [articles, setArticles] = React.useState<TeamsArticle[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getTeamsArticles(teamId).then(articles => {
      setLoading(false);
      setArticles(articles);
    });
  }, [teamId]);

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Team id={teamId}>
        {team =>
          team === null ? (
            <h1>Loading...</h1>
          ) : (
            <React.Fragment>
              <TeamLogo id={teamId} />
              <h1>{team.name}</h1>
              <Link
                style={{
                  padding: '10px 20px',
                  border: '2px solid black',
                  borderRadius: '5px'
                }}
                to={{
                  pathname: '/players',
                  search: `?teamId=${teamId}`
                }}
              >
                View Roster
              </Link>
              <ul>
                {team.championships.map(championship => {
                  return <li key={championship}>{championship}</li>;
                })}
              </ul>
              <ul>
                <li>
                  Established<div>{team.established}</div>
                </li>
                <li>
                  Manager<div>{team.manager}</div>
                </li>
                <li>
                  Coach<div>{team.coach}</div>
                </li>
                <li>
                  Record
                  <div>
                    {team.wins}-{team.losses}
                  </div>
                </li>
              </ul>
            </React.Fragment>
          )
        }
      </Team>
    </div>
  );
};

export default TeamPage;
