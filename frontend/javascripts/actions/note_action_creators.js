import assign from 'object-assign';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';
import StorageUtils from '../utils/storage_utils.js';
import CloudUtils from '../utils/cloud_utils.js';
import NoteStore from '../stores/note_store.js';

export default {
  addNote: function() {
    Dispatcher.handleAction({
      type: ActionTypes.ADD_NOTE
    });
  },

  loadNotes: function() {
    StorageUtils.loadNotes();
  },

  changeNote: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.CHANGE_NOTE,
      data: data
    });
  },

  updateNote: function(data) {
    StorageUtils.updateNote(data);
  },

  deleteNote: function(note) {
    StorageUtils.deleteNote(note);
  },

  receiveNotes: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_NOTES,
      data: data
    });
  },

  receiveUpdatedNote: function(data, errors) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_UPDATED_NOTE,
      data: data,
      errors: errors
    });
  },

  receiveDeletedNote: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_DELETED_NOTE,
      data: data
    });
  },

  syncNotes: function() {
    Dispatcher.handleAction({
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
  },

  receiveSyncedStatus: function(result) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_SYNCED_STATUS,
      result: result
    });
  }
};
