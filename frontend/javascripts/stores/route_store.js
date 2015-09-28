import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/constants.js';
import events from 'events';
import assign from 'object-assign';
import Router from 'react-router';
import routes from '../routes.jsx';

var EventEmitter = events.EventEmitter

var router = Router.create({
  routes: routes,
  location: null
});

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var RouteStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function() {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRouter: function() {
    return router;
  },

  redirectHome: function() {
    router.transitionTo('app');
  }
});

RouteStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      break;

    default:
  }

  return true;
});

export default RouteStore;
