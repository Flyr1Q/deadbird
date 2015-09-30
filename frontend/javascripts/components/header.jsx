import React from 'react';

import NoteActionCreators from '../actions/note_action_creators.js';

var Header = React.createClass({
  _addNote: function() {
    NoteActionCreators.addNote();
  },

  render: function() {
    return (
      <header className="header">
        <div className="header__logo">Colubrine</div>

        <button className="manage-block__button" onClick={ this._addNote }>+</button>
      </header>
    );
  }
});

export default Header;
