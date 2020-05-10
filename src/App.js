import React from 'react';
import AnyHotPass from './AnyHotPass';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

const App = () => (
  <Router>
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3>AHP</h3>
          <Route path="/">
            <AnyHotPass />
          </Route>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
