import React from 'react';
import RouteStore from './stores/route_store.js';
import db from './utils/indexeddb_utils.js';

window.React = React;

window.onload = function() {
  db.open('note', function() {
    var router = RouteStore.getRouter();

    router.run(function (Handler, state) {
      React.render(<Handler/>, document.getElementById('content'));
    });
  });
};
