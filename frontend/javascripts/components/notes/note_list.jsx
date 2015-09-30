import React from 'react';
import { map } from 'lodash';

var NoteItem = React.createClass({
  _onClick: function(event) {
    event.stopPropagation();
    event.preventDefault();

    this.props.onClick(this.props.note.id);
  },

  render: function() {
    return (
      <a href='#' onClick={ this._onClick } className={ `note-item__link ${ this.props.isActive ? 'note-item__link--active' : '' }` }>
        <div className="note-item__title">{ this.props.note.title || 'Untitled' }</div>
      </a>
    );
  }
});

var NoteList = React.createClass({
  render: function() {
    let _props = this.props;

    return (
      <div>
        {
          map(this.props.notes, function(note){
            return <NoteItem note={note} key={note.id} onClick={ _props.onClick } isActive={ note.id === _props.activeId }/>
          })
        }
      </div>
    );
  }
});

export default NoteList;
