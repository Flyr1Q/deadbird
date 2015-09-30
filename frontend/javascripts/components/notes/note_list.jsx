import React from 'react/addons';
import { map } from 'lodash';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var NoteElement = React.createClass({
  _onClick: function(event) {
    event.stopPropagation();
    event.preventDefault();

    this.props.onClick(this.props.note.id);
  },

  render: function() {
    return (
      <a href='#' onClick={ this._onClick } className={ `note-el__link ${ this.props.isActive ? 'note-el__link--active' : '' }` }>
        <div className="note-el__title">{ this.props.note.title || 'Untitled' }</div>
        { this.props.note.isChanged ? <span className='note-el__label'>o</span> : '' }
      </a>
    );
  }
});

var NoteList = React.createClass({
  render: function() {
    let _props = this.props;

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="note-list">
          {
            map(this.props.notes, function(note){
              return <NoteElement note={note} key={note.id} onClick={ _props.onClick } isActive={ note.id === _props.activeId }/>
            })
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

export default NoteList;
