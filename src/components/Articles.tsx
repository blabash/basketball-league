import React from 'react';
import { useParams, RouteComponentProps } from 'react-router';
import { getTeamsArticles } from '../api';
import Sidebar from './Sidebar';

interface Props {}

interface Article {
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
  // console.log(match);

  React.useEffect(() => {
    getTeamsArticles(params.teamId).then(teamArticles => {
      setLoading(false);
      setTeamArticles(teamArticles.map((article: Article) => article.title));
    });
  }, [params.teamId]);

  if (loading === true) return <h1>Loading...</h1>;

  return (
    <div>
      <Sidebar
        loading={loading}
        title='Articles'
        list={teamArticles}
        match={match}
        location={location}
        history={history}
      />
    </div>
  );
};

export default Articles;
