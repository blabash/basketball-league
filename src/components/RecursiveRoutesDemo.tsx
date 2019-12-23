import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  RouteComponentProps,
  useParams
} from 'react-router-dom';

const users = [
  { id: 0, name: 'Michelle', friends: [1, 2, 3] },
  { id: 1, name: 'Sean', friends: [0, 3] },
  { id: 2, name: 'Kim', friends: [0, 1, 3] },
  { id: 3, name: 'David', friends: [1, 2] }
];

type User = { id: number; name: string; friends: number[] };

const findUser = (id: number): User | undefined =>
  users.find(user => user.id === id);

// interface IPerson {
//   match: { params: { id: number; url: string } };
// }

const Person: React.FC<RouteComponentProps> = ({ match }) => {
  const { id } = useParams();

  const person = findUser(Number(id))!;

  return (
    <div>
      <h3>{person.name}'s Friends</h3>
      <ul>
        {person.friends.map(id => (
          <li key={id}>
            <Link to={`${match.url}/${Number(id)}`}>{findUser(id)!.name}</Link>
          </li>
        ))}
      </ul>
      <Route path={`${match.url}/:id`} component={Person} />
    </div>
  );
};

const RecursiveRoutesDemo: React.FC = () => {
  return (
    <Router>
      <Route path='/' exact render={() => <Link to='/0'>First User</Link>} />
      <Route path='/:id' component={Person} />
    </Router>
  );
};

export default RecursiveRoutesDemo;
