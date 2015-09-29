import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';

export default {
  receiveNotes: function(data) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_NOTES,
      data: data
    });
  },

  receiveUpdatedNote: function(data, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_UPDATED_NOTE,
      data: data,
      errors: errors
    });
  },

  receiveDeletedNote: function(id) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DELETED_NOTE,
      id: id
    });
  }
}
