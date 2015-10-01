import assign from 'object-assign';
import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';

var CHANGE_EVENT = 'change';

var _synchronizing = false;

var SyncStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isSynchronizing: function() {
    return _synchronizing;
  }
});

SyncStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.SYNC_NOTES:
      _synchronizing = true;

      SyncStore.emitChange();
      break;

    case ActionTypes.RECEIVE_SYNCED_STATUS:
      _synchronizing = false;

      SyncStore.emitChange();
      break;
  }

  return true;
});

export default SyncStore;
