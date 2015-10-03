import React from 'react';

import NoteActionCreators from '../actions/note_action_creators.js';
import SyncStore from '../stores/sync_store.js';

var Header = React.createClass({
  getInitialState() {
    return {
      synchronizing: SyncStore.isSynchronizing()
    };
  },

  componentDidMount() {
    SyncStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SyncStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    let _self = this;

    if (SyncStore.isSynchronizing()) {
      _self.setState({
        synchronizing: SyncStore.isSynchronizing()
      })
    } else {
      setTimeout(function() {
        _self.setState({
          synchronizing: SyncStore.isSynchronizing()
        })
      }, 1000)
    }
  },

  _addNote() {
    this.props.addNote()
  },

  _syncNotes() {
    NoteActionCreators.syncNotes();
  },

  render() {
    return (
      <header className="header">
        <div className="header__logo">Colibri</div>

        <div className="header__button-block">
          <button className={ `header__button ${ this.state.synchronizing ? 'header__button--rotating' : ''}`} onClick={ this._syncNotes }>
            <i className="material-icons">sync</i>
          </button>

          <button className="header__button" onClick={ this._addNote }>
            <i className="material-icons">add</i>
          </button>
        </div>
      </header>
    );
  }
});

export default Header;
