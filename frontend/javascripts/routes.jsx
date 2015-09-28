import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './components/app.jsx';
import NotesPage from './components/notes/index_page.jsx';

export default (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={NotesPage} />

    <Route name="notes" path="/notes" handler={NotesPage}/>
  </Route>
);
