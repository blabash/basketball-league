import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt,
  RouteComponentProps
} from 'react-router-dom';

const Form: React.FC<RouteComponentProps> = ({ location }) => {
  const [isBlocking, setIsBlocking] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (inputRef.current) inputRef.current.value = '';
        setIsBlocking(false);
      }}
    >
      <Prompt
        when={isBlocking}
        message={location =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />

      <p>
        Blocking?{' '}
        {isBlocking === true
          ? 'Yes, click a link or the back button.'
          : 'Nope.'}
      </p>

      <p>
        <input
          ref={inputRef}
          type='text'
          size={50}
          placeholder='type something to block transition...'
          onChange={e => {
            const isBlocking = e.target.value.length > 0;
            setIsBlocking(isBlocking);
          }}
        />
      </p>

      <p>
        <button>Submit to stop blocking</button>
      </p>
    </form>
  );
};

const PreventingTransitionsDemo: React.FC = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Form</Link>
          </li>
          <li>
            <Link to='/one'>One</Link>
          </li>
          <li>
            <Link to='/two'>Two</Link>
          </li>
        </ul>

        <Route path='/' exact component={Form} />
        <Route path='/one' render={() => <h3>One</h3>} />
        <Route path='/two' render={() => <h3>Two</h3>} />
      </div>
    </Router>
  );
};

export default PreventingTransitionsDemo;
