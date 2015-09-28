import Constants from '../constants/constants.js';
import Flux from 'flux';
import assign from 'object-assign';

var Dispatcher = Flux.Dispatcher;
var PayloadSources = Constants.PayloadSources;

export default assign(new Dispatcher(), {
  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});
