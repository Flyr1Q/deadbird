import React from 'react';
import db from './utils/indexeddb_utils.js';
import App from './components/app.jsx';

window.React = React;

window.onload = function() {
  db.open('note', function() {
    React.render(<App/>, document.getElementById('content'));
  });
};
