import ServerActionCreators from '../actions/server_action_creators.js';
import db from './indexeddb_utils.js';

export default {
  loadNotes: function() {
    db.index('note', function(notes) {
      ServerActionCreators.receiveNotes(notes);
    })
  },

  updateNote: function(data) {
    data.isChanged = false;

    db.update('note', data, function(note) {
      ServerActionCreators.receiveUpdatedNote(note, null);
    })
  },

  deleteNote: function(id) {
    db.destroy('note', id, function() {
      ServerActionCreators.receiveDeletedNote(id);
    })
  }
}
