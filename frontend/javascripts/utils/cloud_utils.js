import ServerActionCreators from '../actions/server_action_creators.js';
import NoteActionCreators from '../actions/note_action_creators.js';
import { values } from 'lodash';

function _onError(e) {
  console.error(e);
}

function _sync(callback) {
  chrome.syncFileSystem.requestFileSystem(function(fs) {
    fs.root.getFile('colubrine_notes.json', { create: true }, function(fileEntry) {
      callback(fileEntry);
    }, _onError);
  });
}

export default {
  syncIn: function() {
    _sync(function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
          NoteActionCreators.diffNotes(JSON.parse(e.target.result || '[]'));
        };

        reader.readAsText(file);
      }, _onError);
    })
  },

  syncOut: function(notes) {
    _sync(function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function(e) {
          ServerActionCreators.receiveSyncedStatus(true);
        };

        fileWriter.onerror = _onError;

        var blob = new Blob([JSON.stringify(values(notes))], {type: 'text/plain'});

        fileWriter.write(blob);
      }, _onError);
    })
  }
}
