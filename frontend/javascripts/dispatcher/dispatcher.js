import Constants from '../constants/constants.js';
import Flux from 'flux';
import assign from 'object-assign';

var Dispatcher = Flux.Dispatcher;

export default assign(new Dispatcher(), {
  handleAction: function(action) {
    var payload = {
      action: action
    };
    this.dispatch(payload);
  }
});
