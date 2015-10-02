import React from 'react';
import copy from 'shallow-copy';
import Textarea from 'react-textarea-autosize';

var Noteitem = React.createClass({
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.note.id !== prevProps.note.id) {
      React.findDOMNode(this.refs.title).focus();
    }
  },

  _onFieldChange: function(field, event) {
    let dup = copy(this.props.note);

    dup[field] = event.target.value;

    this.props.onFieldChange(dup);
  },

  _onSave: function() {
    this.props.onSave(this.props.note);
  },

  _onDelete: function() {
    this.props.onDelete(this.props.note);
  },

  render: function() {
    return (
      <div>
        <div className="manage-block">
          <button className="manage-block__button" onClick={ this._onSave }>Save</button>
          <button className="manage-block__button manage-block__button--danger" onClick={ this._onDelete }>Delete</button>
        </div>

        <div className="note">
          <div className="note__title">
            <input autoFocus spellCheck="false" autoComplete="off" className="input input__title" type="text" name="title" ref="title" value={ this.props.note.title } onChange={ this._onFieldChange.bind(null, 'title') } />
          </div>

          <div className="note__description">
            <Textarea spellCheck="false" className="input input__description" type="text" name="description"  value={ this.props.note.description } onChange={ this._onFieldChange.bind(null, 'description') }></Textarea>
          </div>
        </div>
      </div>
    );
  }
});

export default Noteitem;
