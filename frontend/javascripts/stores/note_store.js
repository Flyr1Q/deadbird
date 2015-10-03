import assign from 'object-assign';
import { EventEmitter } from 'events';
import { isEmpty, reject } from 'lodash';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';
import utils from '../utils/note_utils.js';

var CHANGE_EVENT = 'change';

var _notes = [];

var NoteStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllNotes() {
    return reject(utils.sort(_notes), { isDeleted: true });
  },

  getPersistedNotes() {
    return utils.sort(_notes);
  },

  getErrors() {
    return _errors;
  }
});

NoteStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_NOTES:
      _notes = action.notes;

      if (isEmpty(_notes)) {
        let note = utils.newNote();

        _notes.push(note);
      }

      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_UPDATED_NOTE:
      if (action.note) {
        _notes.push(action.note);
      }

      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_DELETED_NOTE:
      if (action.note) {
        action.note.isDeleted = true;

        utils.replace(_notes, action.note);
      }

      NoteStore.emitChange();
      break;
  }

  return true;
});

export default NoteStore;
