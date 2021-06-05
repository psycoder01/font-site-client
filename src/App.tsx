import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

import './App.css';
import { Routes } from './interfaces';

import { Home } from './pages/Home';
import { Font } from './pages/Font';
import NavBar from './components/NavBar';
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
      <NavBar routes={routes} logo="Fonts" />
      <Switch>
        {routes.map((route) => {
          const { Component, path } = route;
          return (
            <Route key={path} path={path} component={Component} exact={true} />
          );
        })}
        <Route path="/font/:fontName" component={Font} exact={true} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
