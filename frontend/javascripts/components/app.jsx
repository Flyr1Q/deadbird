import React from 'react';

import Header from './header.jsx';
import NoteList from './notes/note_list.jsx';
import NoteItem from './notes/note_item.jsx';

import NoteActionCreators from '../actions/note_action_creators.js';
import NoteStore from '../stores/note_store.js';

var App = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.getAllNotes(),
      note: NoteStore.getNote()
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
      note: NoteStore.getNote()
    });
  },

  _onClick: function(noteId) {
    this.setState({
      notes: NoteStore.getAllNotes(),
      note: NoteStore.getNote(noteId)
    });
  },

  _onFieldChange: function(note) {
    NoteActionCreators.changeNote(note);
  },

  _onSave: function(note) {
    NoteActionCreators.updateNote(note);
  },

  _onDelete: function(note) {
    NoteActionCreators.deleteNote(note);
  },

  render: function() {
    return (
      <div>
        <sidebar className="sidebar">
          <Header/>

          <NoteList notes={this.state.notes} onClick={ this._onClick } activeId={ this.state.note ? this.state.note.id : null }/>
        </sidebar>

        <main className="main">
          { this.state.note ? <NoteItem note={this.state.note} onFieldChange={ this._onFieldChange } onSave={ this._onSave } onDelete={ this._onDelete }/> : <div></div> }
        </main>
      </div>
    );
  }
});

export default App;
