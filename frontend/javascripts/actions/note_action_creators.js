import { reject, values } from 'lodash';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';
import StorageUtils from '../utils/storage_utils.js';
import CloudUtils from '../utils/cloud_utils.js';
import NoteStore from '../stores/note_store.js';
import NoteUtils from '../utils/note_utils.js';

var NoteActionCreators = {
  loadNotes() {
    StorageUtils.loadNotes();
  },

  updateNote(note) {
    StorageUtils.updateNote(note);
  },

  deleteNote(note) {
    StorageUtils.deleteNote(note);
  },

  receiveNotes(notes) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_NOTES,
      notes: notes
    });
  },

  receiveUpdatedNote(note) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_UPDATED_NOTE,
      note: note
    });
  },

  receiveDeletedNote(note) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_DELETED_NOTE,
      note: note
    });
  },

  syncNotes() {
    Dispatcher.handleAction({
      type: ActionTypes.SYNC_NOTES
    });

    CloudUtils.syncIn();
  },

  receiveSyncedNotes(cloudNotes) {
    let result = NoteUtils.merge(NoteStore.getPersistedNotes(), cloudNotes);

    StorageUtils.bulkUpdate(result);

    CloudUtils.syncOut(result);
  },

  receiveSyncedStatus() {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_SYNCED_STATUS
    });
  }
};

export default NoteActionCreators;
