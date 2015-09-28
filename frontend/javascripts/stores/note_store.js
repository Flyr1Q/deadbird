import assign from 'object-assign';
import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';

var CHANGE_EVENT = 'change';

var _notes = [];
var _errors = [];
var _note = {
  id: ""
};

var _defaultNote = {};

var NoteStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllNotes: function() {
    return _notes;
  },

  getNote: function() {
    return _note;
  },

  getErrors: function() {
    return _errors;
  }
});

NoteStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_NOTES:
      _notes = action.data;
      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_UPDATED_NOTE:
      if (action.data) {
        _notes.unshift(assign(_defaultNote, action.data));
        _errors = [];
      }

      if (action.errors) {
        _errors = action.errors;
      }

      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_DELETED_NOTE:
      if (action.id) {
        // @TODO
        // remove note from _notes
      }

      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_NOTE:
      if (action.data) {
        _note = assign(_defaultNote, action.data);
        _errors = [];
      }

      if (action.errors) {
        _errors = action.errors;
      }

      NoteStore.emitChange();
      break;
  }

  return true;
});

export default NoteStore;
