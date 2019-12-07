import React from 'react';
import { useParams, RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { getTeamsArticles } from '../api';
import Sidebar from './Sidebar';
import Article from './Article';
import Loading from './Loading';

interface Props {}

interface ArticleData {
  date: Date;
  title: string;
  id: string;
}

const Articles: React.FC<RouteComponentProps> = ({
  match,
  location,
  history
}) => {
  const [loading, setLoading] = React.useState(true);
  const [teamArticles, setTeamArticles] = React.useState([]);
  const params = useParams<{ teamId: string }>();

  React.useEffect(() => {
    getTeamsArticles(params.teamId).then(teamArticles => {
      setLoading(false);
      setTeamArticles(
        teamArticles.map((article: ArticleData) => article.title)
      );
    });
  }, [params.teamId]);

  if (loading === true) return <Loading />;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        loading={loading}
        title='Articles'
        list={teamArticles}
        match={match}
        location={location}
        history={history}
      />

      <Route
        path={`${match.url}/:articleId`}
        render={({ match }) => (
          <div style={{ flex: 2, padding: '10px', textAlign: 'center' }}>
            <Article articleId={match.params.articleId} teamId={params.teamId}>
              {article =>
                !article ? (
                  <Loading />
                ) : (
                  <div>
                    <article className='article' key={article.id}>
                      <h1>{article.title}</h1>
                      <p>{article.body}</p>
                    </article>
                  </div>
                )
              }
            </Article>
          </div>
        )}
      />
    </div>
  );
};

export default Articles;
