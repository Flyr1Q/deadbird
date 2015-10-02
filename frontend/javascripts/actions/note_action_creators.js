import assign from 'object-assign';
import { reject } from 'lodash';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';
import StorageUtils from '../utils/storage_utils.js';
import CloudUtils from '../utils/cloud_utils.js';
import NoteStore from '../stores/note_store.js';

var NoteActionCreators = {
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
    let _data = {};

    if (data.length) {
      data.forEach(function(el){
        _data[el.id] = el;
      })
    } else {
      _data = data;
    }

    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_NOTES,
      data: _data
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

    CloudUtils.syncIn(function(cloudNotes) {
      NoteActionCreators.diffNotes(cloudNotes);
    });
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

    _final = reject(_final, { isDeleted: true });

    StorageUtils.bulkUpdate(_final);

    CloudUtils.syncOut(_final, function() {
      NoteActionCreators.receiveSyncedStatus(true)
    });
  },

  receiveSyncedStatus: function(result) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_SYNCED_STATUS,
      result: result
    });
  }
};

export default NoteActionCreators;
