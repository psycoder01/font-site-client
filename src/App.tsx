import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

import './App.css';
import { Routes } from './interfaces';

import { Home } from './pages/Home';
import { TopFonts } from './pages/TopFonts';

const routes: Array<Routes> = [
  {
    name: 'Home',
    path: '/',
    Component: Home,
    exact: true,
  },
  {
    name: 'Top Fonts',
    path: '/top',
    Component: TopFonts,
    exact: true,
  },
];

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          const { Component, path } = route;
          return (
            <Route key={path} path={path} component={Component} exact={true} />
          );
        })}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
