import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import theme from './theme'

import Category from './pages/category';
import Restaurant from './pages/restaurant';
import Serp from './pages/serp';
import Home from './pages/home';


const App = () => (
  <MuiThemeProvider theme={theme} >
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/categoria/:category" component={Category} />
        <Route path="/restaurante/:slug" component={Restaurant} />
        <Route path="/busca" component={Serp} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
