import assign from 'object-assign';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';
import StorageUtils from '../utils/storage_utils.js';

export default {
  loadNotes: function(query) {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_NOTES
    });

    StorageUtils.loadNotes(query);
  },

  loadNote: function(noteId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_NOTE,
      noteId: noteId
    });

    StorageUtils.loadNote(noteId);
  },

  createNote: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.CREATE_NOTE
    });

    StorageUtils.createNote();
  },

  updateNote: function(noteId, data) {
    Dispatcher.handleViewAction(assign(data, {
      type: ActionTypes.UPDATE_NOTE,
      noteId: noteId
    }));

    StorageUtils.updateNote(noteId, data);
  },

  deleteNote: function(noteId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.DELETE_NOTE,
      noteId: noteId
    });

    StorageUtils.deleteNote(noteId);
  }
};
