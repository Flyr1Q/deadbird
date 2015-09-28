import React from 'react';
// import {Link} from 'react-router';
import NoteActionCreators from '../../actions/note_action_creators.js';
import NoteStore from '../../stores/note_store.js';

var NoteItem = React.createClass({
  render: function() {
    return (
      <div className="note-item"></div>
    );
  }
});

var NoteList = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.notes.map(function(note, index){
          return <NoteItem note={note} key={"note-" + index}/>
        })}
      </div>
    );
  }
});

var IndexPage = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.getAllNotes()
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNotes();
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      notes: NoteStore.getAllNotes()
    });
  },

  render: function() {
    return (
      <div className="page">
        <NoteList notes={this.state.notes} />
      </div>
    );
  }
});

export default IndexPage;
