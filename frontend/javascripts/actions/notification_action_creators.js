import assign from 'object-assign';

import Dispatcher from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../constants/constants.js';
import NotificationStore from '../stores/notification_store.js';

export default {
  addNotification(status, message) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_NOTIFICATION,
      status: status,
      message: message
    });
  }
};
