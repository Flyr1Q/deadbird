import uuid from 'node-uuid';
import ServerActionCreators from '../actions/server_action_creators.js';
import db from './indexeddb_utils.js';

export default {
  loadNotes: function() {
    db.index('note', function(notes) {
      ServerActionCreators.receiveNotes(notes);
    })
  },

  loadNote: function(id) {
    db.get('note', id, function(note) {
      ServerActionCreators.receiveNote(note);
    })
  },

  createNote: function(data) {
    data.id = uuid();

    db.create('note', data, function(note) {
      ServerActionCreators.receiveCreatedNote(note, null);
    })
  },

  updateNote: function(id, data) {
    // implement this later
  },

  deleteNote: function(id) {
    db.destroy('note', id, function() {
      ServerActionCreators.receiveDeletedNote(id);
    })
  }
}
