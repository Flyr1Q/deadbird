import React from 'react';
import { RouteHandler } from 'react-router';

import Header from '../components/header.jsx';

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>

        <main>
          <RouteHandler/>
        </main>
      </div>
    );
  }
});

export default App;
