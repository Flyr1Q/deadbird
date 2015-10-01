import assign from 'object-assign';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';
import StorageUtils from '../utils/storage_utils.js';
import CloudUtils from '../utils/cloud_utils.js';
import NoteStore from '../stores/note_store.js';

export default {
  addNote: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.ADD_NOTE
    });
  },

  loadNotes: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_NOTES
    });

    StorageUtils.loadNotes();
  },

  changeNote: function(data) {
    Dispatcher.handleViewAction({
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
  },

  syncNotes: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.SYNC_NOTES
    });

    CloudUtils.syncIn();
  },

  diffNotes: function(cloudNotes) {
    let localNotes = NoteStore.getOnlySavedNotes();
    let _final = {};

    localNotes.forEach(function(_local){
      _final[_local.id] = _local;
    })

    cloudNotes.forEach(function(_cloud){
      if(!_final[_cloud.id] || (_final[_cloud.id].updatedAt < new Date(_cloud.updatedAt))) {
        _final[_cloud.id] = _cloud;
      }
    })

    StorageUtils.bulkUpdate(_final);
    CloudUtils.syncOut(_final);
  }
};
