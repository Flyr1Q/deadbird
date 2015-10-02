import NoteActionCreators from '../actions/note_action_creators.js';
import NotificationActionCreators from '../actions/notification_action_creators.js';
import { values } from 'lodash';

let _statuses = chrome.syncFileSystem.ServiceStatus;

function _onError(e) {
  console.warn(e);
}

let _warn = NotificationActionCreators.addNotification.bind(null, 'warning');

function _sync(callback) {
  chrome.syncFileSystem.getServiceStatus(function(status) {
    switch (status) {
      case _statuses.INITIALIZING:
        _warn('Google Drive is not answering, try again');
        break;

      case _statuses.AUTHENTICATION_REQUIRED:
        _warn('You are not authorized to Google Drive, please sign to it');
        break;

      case _statuses.TEMPORARY_UNAVAILABLE:
        _warn('Google Drive is unavailable at the moment, sync later please');
        break;

      case _statuses.RUNNING:
        _openFile(callback);
        break;

      case _statuses.DISABLED:
        _warn('Your Google Drive account is disabled, check it please');
        break;
    }
  })
}

function _openFile(callback) {
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
          NoteActionCreators.receiveSyncedStatus(true);
        };

        fileWriter.onerror = _onError;

        var blob = new Blob([JSON.stringify(values(notes))], {type: 'text/plain'});

        fileWriter.write(blob);
      }, _onError);
    })
  }
}
