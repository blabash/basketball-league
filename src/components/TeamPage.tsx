import React from 'react';
import { useParams, RouteComponentProps } from 'react-router';
import { getTeamsArticles, getTeamNames } from '../api';
import TeamLogo from './TeamLogo';
import Team from './Team';
import Loading from './Loading';
import slug from 'slug';
import { Link, Redirect } from 'react-router-dom';

interface TeamsArticle {
  date: Date;
  title: string;
  id: string;
}

interface Props {}

const TeamPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { teamId } = useParams();
  const [articles, setArticles] = React.useState<TeamsArticle[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isRealTeamName, setIsRealTeamName] = React.useState(true);

  React.useEffect(() => {
    if (isRealTeamName) {
      Promise.all([getTeamNames(), getTeamsArticles(teamId)]).then(
        ([teamNames, teamArticles]) => {
          if (!teamNames.includes(teamId)) {
            setIsRealTeamName(false);
          }
          setLoading(false);
          setArticles(teamArticles);
        }
      );
    }

    return () => setLoading(true);
  }, [teamId, isRealTeamName]);

  if (!isRealTeamName) {
    return <Redirect to='/' />;
  }

  if (loading === true) {
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
        <Loading />
      </div>
    );
  } else {
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
              <Loading />
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
                <h2>Articles</h2>
                {articles && (
                  <ul>
                    {articles.map(article => {
                      return (
                        <li key={article.id}>
                          <Link
                            to={`${match.url}/articles/${slug(article.title)}`}
                          >
                            <h4>{article.title}</h4>
                            <div>{article.date.toLocaleDateString()}</div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </React.Fragment>
            )
          }
        </Team>
      </div>
    );
  }
};

export default TeamPage;
