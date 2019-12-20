import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Loading from './Loading';

const LazyHome = React.lazy(() => import('./Home'));
const LazyTeams = React.lazy(() => import('./Teams'));
const LazyPlayers = React.lazy(() => import('./Players'));
const LazyTeamPage = React.lazy(() => import('./TeamPage'));
const LazyArticles = React.lazy(() => import('./Articles'));

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Route component={Navbar} />
        <React.Suspense fallback={null}>
          <Switch>
            <Route path='/' exact component={LazyHome} />
            <Route path='/teams' component={LazyTeams} />
            <Route path='/players' component={LazyPlayers} />
            <Route path='/:teamId' exact component={LazyTeamPage} />
            <Route path='/:teamId/articles' component={LazyArticles} />
            <Route render={() => <h1 className='text-center pt-4'>404.</h1>} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
};

export default App;
