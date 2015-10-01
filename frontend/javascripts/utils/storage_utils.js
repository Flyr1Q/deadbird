import ServerActionCreators from '../actions/server_action_creators.js';
import db from './indexeddb_utils.js';
import { values } from 'lodash';

export default {
  loadNotes: function() {
    db.index('note', function(notes) {
      ServerActionCreators.receiveNotes(notes);
    })
  },

  updateNote: function(data) {
    data.isChanged = false;
    data.updatedAt = new Date();

    db.update('note', data, function(note) {
      ServerActionCreators.receiveUpdatedNote(note, null);
    })
  },

  deleteNote: function(id) {
    db.destroy('note', id, function() {
      ServerActionCreators.receiveDeletedNote(id);
    })
  },

  bulkUpdate: function(data) {
    db.bulkUpdate('note', values(data), function(){
      ServerActionCreators.receiveNotes(data);
    })
  }
}
