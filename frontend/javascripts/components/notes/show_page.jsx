import React from 'react';
import { State } from 'react-router';
import copy from 'shallow-copy';

import NoteActionCreators from '../../actions/note_action_creators.js';
import NoteStore from '../../stores/note_store.js';

var ShowPage = React.createClass({
  mixins: [ State ],

  getInitialState: function() {
    return {
      note: NoteStore.getNote(this.getParams().noteId)
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      note: NoteStore.getNote(this.getParams().noteId)
    });
  },

  _onFieldChange: function(field, event) {
    let dup = copy(this.state.note);

    dup[field] = event.target.value;

    NoteActionCreators.changeNote(dup);
  },

  _onSave: function() {
    NoteActionCreators.updateNote(this.state.note);
  },

  render: function() {
    if(!this.state.note) {
      return null;
    }

    return (
      <div>
        <div className="manage-block">
          <button className="manage-block__button" onClick={ this._onSave }>Save</button>
          <button disabled className="manage-block__button manage-block__button--disabled">Sync</button>
        </div>

        <div className="note">
          <div className="note__title">
            <input autoFocus autoComplete="off" className="input" type="text" name="title" ref="title" value={ this.state.note.title } onChange={ this._onFieldChange.bind(null, 'title') } />
          </div>

          <div className="note__description">
            <textarea rows="10" className="input" type="text" name="description" ref="description" value={ this.state.note.description } onChange={ this._onFieldChange.bind(null, 'description') } />
          </div>
        </div>
      </div>
    );
  }
});

export default ShowPage;
