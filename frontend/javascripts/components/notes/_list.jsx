import React from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import NoteActionCreators from '../../actions/note_action_creators.js';
import NoteStore from '../../stores/note_store.js';

var NoteItem = React.createClass({
  render: function() {
    return (
      <Link to='note' params={ {noteId: this.props.note.id} } className={ `note-item__link ${ this.props.isActive ? 'note-item__link--active' : '' }` }>
        <div className="note-item__title">{ this.props.note.title || 'Untitled' }</div>
      </Link>
    );
  }
});

var NoteList = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.getAllNotes(),
      activeId: NoteStore.getActiveId()
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNotes();
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      notes: NoteStore.getAllNotes(),
      activeId: NoteStore.getActiveId()
    });
  },

  render: function() {
    let activeId = this.state.activeId;

    return (
      <div>
        {
          map(this.state.notes, function(note){
            return <NoteItem note={note} key={note.id} isActive={ note.id === activeId }/>
          })
        }
      </div>
    );
  }
});

export default NoteList;
