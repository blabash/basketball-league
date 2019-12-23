import React, { Dispatch, SetStateAction } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  RouteComponentProps
} from 'react-router-dom';

interface IFakeAuth {
  isAuthenticated: boolean;
  authenticate: (cb: () => any) => void;
  signout: (cb: () => any) => void;
  authed: () => boolean;
}

const fakeAuth: IFakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
  authed() {
    return this.isAuthenticated;
  }
};

const Public = () => <h3>Public</h3>;
const Protected = () => {
  console.log(fakeAuth.isAuthenticated);
  return <h3>Protected</h3>;
};

type LoginProps = { setIsAuthed: Dispatch<SetStateAction<boolean>> };

const Login: React.FC<RouteComponentProps & LoginProps> = props => {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  console.log('beforehi ', props.location);
  const { from } = props.location.state || { from: { pathname: '/' } };
  console.log('hi ', from);
  const login = () => {
    fakeAuth.authenticate(() => setRedirectToReferrer(true));
    props.setIsAuthed(true);
  };

  if (redirectToReferrer) return <Redirect to={from} />;

  return (
    <div>
      <p>You must login to view this page at {from.pathname}</p>
      <button onClick={login}>Login</button>
    </div>
  );
};

interface Props {
  component: React.FC<RouteComponentProps>;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, path }) => (
  <Route
    path={path}
    render={props => {
      console.log('in priv route', props.location);
      return fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

type AuthButtonProps = {
  isAuthed: boolean;
  setIsAuthed: Dispatch<SetStateAction<boolean>>;
};

const AuthButton: React.FC<RouteComponentProps & AuthButtonProps> = ({
  isAuthed,
  history,
  setIsAuthed
}) => {
  return isAuthed === true ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push('/'));
          setIsAuthed(false);
        }}
      >
        Sign Out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
};

const ProtectedRouteDemo: React.FC = () => {
  const [isAuthed, setIsAuthed] = React.useState(false);
  return (
    <Router>
      <div>
        <Route
          render={props => (
            <AuthButton
              {...props}
              isAuthed={isAuthed}
              setIsAuthed={setIsAuthed}
            />
          )}
        />
        <ul>
          <li>
            <Link to='/public'>Public Page</Link>
          </li>
          <li>
            <Link to='/protected'>Protected Page</Link>
          </li>
        </ul>

        <Route path='/public' component={Public} />
        <Route
          path='/login'
          render={props => <Login {...props} setIsAuthed={setIsAuthed} />}
        />
        <PrivateRoute path='/protected' component={Protected} />
      </div>
    </Router>
  );
};

export default ProtectedRouteDemo;
