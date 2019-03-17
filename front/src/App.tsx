import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Category from './pages/category';
import Restaurant from './pages/restaurant';
import Serp from './pages/serp';
import Home from './pages/home';

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/categoria/:category" component={Category} />
      <Route path="/restaurante/:slug" component={Restaurant} />
      <Route path="/busca" component={Serp} />
    </div>
  </Router>
);

export default App;
