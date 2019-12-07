import React from 'react';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { useLocation } from 'react-router';
import Loading from './Loading';
import slug from 'slug';

interface CustomLinkProps {
  to: { pathname: string; search: string };
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children }) => {
  return (
    <Route
      path={to.pathname}
      children={({ match }) => (
        <li
          style={{
            listStyleType: 'none',
            fontWeight: match ? 'bold' : 'normal'
          }}
        >
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  );
};

interface SideBarProps {
  title: string;
  list: string[];
  loading: boolean;
}

const Sidebar: React.FC<SideBarProps & RouteComponentProps> = ({
  title,
  list,
  loading,
  match
}) => {
  const location = useLocation();
  console.log('match', match);

  if (loading) return <Loading />;
  return (
    <div style={{ flex: 1 }}>
      <h3>{title}</h3>
      <ul style={{ paddingInlineStart: '1em' }}>
        {list.length ? (
          list.map((item: string) => {
            return (
              <CustomLink
                key={item}
                to={{
                  pathname: `${match.url}/${slug(item)}`,
                  search: location.search
                }}
              >
                {item.toUpperCase()}
              </CustomLink>
            );
          })
        ) : (
          <div>What team is this?</div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
