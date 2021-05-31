import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import './App.css';
import { Routes } from './interfaces';

import { Home } from './pages/Home';
import { TopFonts } from './pages/TopFonts';
import NavBar from './components/NavBar';

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
    <Box>
      <Router>
        <NavBar routes={routes} logo="Fonts" />
        <Switch>
          {routes.map((route) => {
            const { Component, path } = route;
            return (
              <Route
                key={path}
                path={path}
                component={Component}
                exact={true}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
