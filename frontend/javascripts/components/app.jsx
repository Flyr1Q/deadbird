import React from 'react';
import { RouteHandler } from 'react-router';

import Header from '../components/header.jsx';
import NoteList from './notes/_list.jsx';

var App = React.createClass({
  render: function() {
    return (
      <div>

        <sidebar className="sidebar">
          <Header/>

          <NoteList/>
        </sidebar>

        <main className="main">
          <RouteHandler/>
        </main>
      </div>
    );
  }
});

export default App;
