import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import Navbar from './Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Route component={Navbar} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/teams' component={Teams} />
          <Route path='/players' component={Players} />
          <Route render={() => <h1 className='text-center pt-4'>404.</h1>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
