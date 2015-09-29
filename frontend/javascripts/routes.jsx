import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './components/app.jsx';
import NotePage from './components/notes/show_page.jsx';

export default (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={NotePage} />

    <Route name="note" path="/notes/:noteId" handler={NotePage}/>
  </Route>
);
