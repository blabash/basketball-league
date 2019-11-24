import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useLocation, useRouteMatch } from 'react-router';
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

// type typeAdd = (a: number, b: number) => number
// const fnAdd = (a: number, b: number) => a + b
// type typeAdd = typeof fnAdd

// type newNum = ReturnType<typeAdd>

interface SideBarProps {
  title: string;
  list: string[];
  loading: boolean;
}

const Sidebar: React.FC<SideBarProps> = ({ title, list, loading }) => {
  const location = useLocation();
  const match = useRouteMatch('/:slug');
  console.log(match);

  if (loading) return <h2>Loading...</h2>;
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
                  pathname: match ? `${match.url}/${slug(item)}` : 'fakePath', //without a ternary here on match here, typescript will not compile. Don't know why.
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
