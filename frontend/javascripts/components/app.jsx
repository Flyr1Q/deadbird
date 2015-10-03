import React from 'react';

import Header from './header.jsx';
import NoteList from './notes/note_list.jsx';
import NoteItem from './notes/note_item.jsx';
import Notification from './notification.jsx';

import NoteActionCreators from '../actions/note_action_creators.js';
import NoteStore from '../stores/note_store.js';
import NoteUtils from '../utils/note_utils.js';

let _activeId;

var App = React.createClass({
  getInitialState() {
    let notes = NoteStore.getAllNotes();
    _activeId = NoteUtils.lastNoteId(notes);
    let note = NoteUtils.findById(notes, _activeId);

    return { notes: notes, note: note };
  },

  componentDidMount() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNotes();
  },

  componentWillUnmount() {
    NoteStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    let notes = NoteStore.getAllNotes();
    let note = NoteUtils.findById(notes, _activeId || NoteUtils.lastNoteId(notes));

    this.setState({ notes: notes, note: note });
  },

  _onClick(noteId) {
    let notes = this.state.notes;
    let note = NoteUtils.findById(notes, noteId);

    this.setState({ notes: notes, note: note });
  },

  _onSave(note) {
    NoteActionCreators.updateNote(note);
  },

  _onDelete(note) {
    _activeId = null;
    NoteActionCreators.deleteNote(note);
  },

  _onFieldChange(note) {
    let notes = this.state.notes;

    note.isChanged = true;
    NoteUtils.replace(notes, note);

    this.setState({ notes: notes, note: note })
  },

  _addNote() {
    let notes = this.state.notes;

    let note = NoteUtils.newNote();
    _activeId = note.id;
    notes.unshift(note);

    this.setState({ notes: notes, note: note })
  },

  render() {
    return (
      <div>
        <Notification/>

        <sidebar className="sidebar">
          <Header addNote={ this._addNote }/>

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
