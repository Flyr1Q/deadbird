import NoteActionCreators from '../actions/note_action_creators.js';
import db from './indexeddb_utils.js';
import { reject } from 'lodash';

export default {
  loadNotes() {
    db.index('note', function(notes) {
      NoteActionCreators.receiveNotes(notes);
    })
  },

  updateNote(data) {
    data.isChanged = false;
    data.updatedAt = new Date();

    db.update('note', data, function(note) {
      NoteActionCreators.receiveUpdatedNote(note, null);
    })
  },

  deleteNote(data) {
    data.isDeleted = true;
    data.updatedAt = new Date();

    db.update('note', data, function(note) {
      NoteActionCreators.receiveDeletedNote(note);
    })
  },

  bulkUpdate(data) {
    data = reject(data, { isDeleted: true })

    db.bulkUpdate('note', data, function(){
      NoteActionCreators.receiveNotes(data);
    })
  }
}
