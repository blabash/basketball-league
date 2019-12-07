import React, { ReactElement } from 'react';
import { getArticle } from '../api';

interface Props {
  teamId: string;
  articleId: string;
  children(article: Article | null): ReactElement;
}

interface Article {
  id: string;
  body: string;
  title: string;
  date: Date;
}

const Article: React.FC<Props> = ({ articleId, teamId, children }) => {
  const [article, setArticle] = React.useState<Article | null>(null);

  React.useEffect(() => {
    setArticle(null);

    getArticle(teamId, articleId).then(article => setArticle(article));
  }, [articleId, teamId]);

  return children(article);
};

export default Article;
