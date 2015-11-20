import React from 'react';
import {render} from 'react-dom'

import {Router, Route} from 'react-router'

import {Styleguide} from "./docs/includes/Styleguide";
import {Button} from './docs/pages/Button';

render((
  <Router>
    <Route path="/" component={Styleguide}>
      <Route path="/buttons" component={Button} />
    </Route>
  </Router>
), document.getElementById('container'));
