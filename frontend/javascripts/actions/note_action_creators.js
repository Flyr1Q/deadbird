import assign from 'object-assign';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';
import StorageUtils from '../utils/storage_utils.js';

export default {
  loadNotes: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_NOTES
    });

    StorageUtils.loadNotes();
  },

  changeNote: function(data) {
    Dispatcher.handleServerAction({
      type: ActionTypes.CHANGE_NOTE,
      data: data
    });
  },

  updateNote: function(data) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_NOTE,
      data: data
    });

    StorageUtils.updateNote(data);
  },

  deleteNote: function(noteId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.DELETE_NOTE,
      noteId: noteId
    });

    StorageUtils.deleteNote(noteId);
  }
};
