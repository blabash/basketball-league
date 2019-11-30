import React from 'react';
import { useRouteMatch } from 'react-router';
import { getTeamsArticles } from '../api';

interface Props {}

const Articles: React.FC<Props> = () => {
  const [loading, setLoading] = React.useState(true);
  const match = useRouteMatch();
  console.log(match);
  React.useEffect(() => {}, []);
  return <div></div>;
};

export default Articles;
