import React from 'react';

import NoteActionCreators from '../actions/note_action_creators.js';

var Header = React.createClass({
  _addNote: function() {
    NoteActionCreators.addNote();
  },

  _syncNotes: function() {
    NoteActionCreators.syncNotes();
  },

  render: function() {
    return (
      <header className="header">
        <div className="header__logo">Colubrine</div>

        <div className="header__button-block">
          <button className="header__button" onClick={ this._syncNotes }>
            <i className="material-icons">sync</i>
          </button>

          <button className="header__button" onClick={ this._addNote }>
            <i className="material-icons">add</i>
          </button>
        </div>
      </header>
    );
  }
});

export default Header;
