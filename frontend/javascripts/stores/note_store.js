import assign from 'object-assign';
import { EventEmitter } from 'events';
import { sample, isEmpty } from 'lodash';
import uuid from 'node-uuid';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';

var CHANGE_EVENT = 'change';

var _notes = {};
var _errors = [];
var _activeId;
var _note = {
  id: ""
};

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

  getNote: function(id) {
    if (id) {
      _note = _notes[id];
      _activeId = id;
    }

    return _note;
  },

  getErrors: function() {
    return _errors;
  },

  getActiveId: function() {
    return _activeId;
  }
});

NoteStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_NOTES:
      _notes = action.data;

      if (isEmpty(_notes)) {
        _note = { id: uuid() };
        _notes[_note.id] = _note;
      } else {
        _note = sample(_notes);
      }

      _activeId = _note.id;

      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_UPDATED_NOTE:
      if (action.data) {
        _notes[action.data.id] = action.data;
      }

      NoteStore.emitChange();
      break;

    case ActionTypes.CHANGE_NOTE:
      if(action.data) {
        _notes[action.data.id] = action.data;
      }

      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_DELETED_NOTE:
      if (action.id) {
        _notes[action.id] = undefined;
      }

      NoteStore.emitChange();
      break;
  }

  return true;
});

export default NoteStore;
