import React from 'react/addons';
import { delay } from 'lodash';
import NotificationStore from '../stores/notification_store.js';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Notification = React.createClass({
  getInitialState() {
    return {
      notification: NotificationStore.getNotification()
    };
  },

  componentDidMount: function() {
    NotificationStore.addChangeListener(this._onChange);
  },

  componentDidUpdate: function() {
    if (this.state.notification) {
      delay(function(_ctx){
        _ctx.setState({ notification: null });
      }, 3500, this);
    }
  },

  componentWillUnmount: function() {
    NotificationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      notification: NotificationStore.getNotification()
    })
  },

  render: function() {
    return (
      <ReactCSSTransitionGroup transitionName="notification">
        {
          this.state.notification ? (
            <div key="on" className={ `notification notification--${ this.state.notification.status }` }>
              { this.state.notification.message }
            </div>
          ) : (<div key="off"></div>)
        }
      </ReactCSSTransitionGroup>
    );
  }
});

export default Notification;
