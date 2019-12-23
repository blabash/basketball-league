import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ProtectedRouteDemo from './components/ProtectedRouteDemo';
import PreventingTransitionsDemo from './components/PreventingTransitionsDemo';
import RecursiveRoutesDemo from './components/RecursiveRoutesDemo';

ReactDOM.render(<RecursiveRoutesDemo />, document.getElementById('root'));
