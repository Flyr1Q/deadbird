import NoteActionCreators from '../actions/note_action_creators.js';
import db from './indexeddb_utils.js';
import { values } from 'lodash';

export default {
  loadNotes: function() {
    db.index('note', function(notes) {
      NoteActionCreators.receiveNotes(notes);
    })
  },

  updateNote: function(data) {
    data.isChanged = false;
    data.updatedAt = new Date();

    db.update('note', data, function(note) {
      NoteActionCreators.receiveUpdatedNote(note, null);
    })
  },

  deleteNote: function(data) {
    data.isDeleted = true;
    data.updatedAt = new Date();

    db.update('note', data, function(note) {
      NoteActionCreators.receiveDeletedNote(note, null);
    })
  },

  bulkUpdate: function(data) {
    db.bulkUpdate('note', values(data), function(){
      NoteActionCreators.receiveNotes(data);
    })
  }
}
