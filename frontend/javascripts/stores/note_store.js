import assign from 'object-assign';
import { EventEmitter } from 'events';
import { isEmpty, values, sortBy, first, chain, value } from 'lodash';
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

function _addNote() {
  let id = uuid();

  _notes[id] = {
    id: id,
    title: '',
    description: '',
    isChanged: true,
    createdAt: new Date()
  };

  _activeId = id;
}

function _lastNoteId() {
  let _sorted = _sortedNotes();

  return first(_sorted) && first(_sorted).id;
}

function _sortedNotes() {
  return chain(_notes).values().sortBy('createdAt').value().reverse();
}

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
    return _sortedNotes();
  },

  getNote: function(id) {
    _activeId = id || _activeId || _lastNoteId();

    return _notes[_activeId];
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
        _addNote();
      }

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
        action.data.isChanged = true;
        _notes[action.data.id] = action.data;
      }

      NoteStore.emitChange();
      break;

    case ActionTypes.ADD_NOTE:
      _addNote();

      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_DELETED_NOTE:
      if (action.id) {
        delete _notes[action.id];
        _activeId = null;
      }

      NoteStore.emitChange();
      break;
  }

  return true;
});

export default NoteStore;
