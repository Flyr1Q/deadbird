import assign from 'object-assign';
import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';

var CHANGE_EVENT = 'change';

var _notification;

var NotificationStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getNotification() {
    return _notification;
  }
});

NotificationStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_NOTIFICATION:
      _notification = {
        message: action.message,
        status: action.status
      }

      NotificationStore.emitChange();
      break;
  }

  return true;
});

export default NotificationStore;
