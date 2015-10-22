import NoteActionCreators from '../actions/note_action_creators.js';
import NotificationActionCreators from '../actions/notification_action_creators.js';

let _statuses = chrome.syncFileSystem.ServiceStatus;

function _onError(e) {
  console.warn(e);
}

let _warn = NotificationActionCreators.addNotification.bind(null, 'warning');

function _sync(callback) {
  chrome.syncFileSystem.getServiceStatus(function(status) {
    switch (status) {
      case _statuses.INITIALIZING:
        _openFile(callback);
        break;

      case _statuses.AUTHENTICATION_REQUIRED:
        _warn('You are not authorized to Google Drive, please sign to it');
        NoteActionCreators.receiveSyncedStatus();
        break;

      case _statuses.TEMPORARY_UNAVAILABLE:
        _warn('Google Drive is unavailable at the moment, sync later please');
        NoteActionCreators.receiveSyncedStatus();
        break;

      case _statuses.RUNNING:
        _openFile(callback);
        break;

      case _statuses.DISABLED:
        _warn('Your Google Drive account is disabled, check it please');
        NoteActionCreators.receiveSyncedStatus();
        break;
    }
  })
}

function _openFile(callback) {
  chrome.syncFileSystem.requestFileSystem(function(fs) {
    fs.root.getFile('deadbird_notes.json', { create: true }, function(fileEntry) {
      callback(fileEntry);
    }, _onError);
  });
}

export default {
  syncIn() {
    _sync(function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
          NoteActionCreators.receiveSyncedNotes(JSON.parse(e.target.result || '[]'));
        };

        reader.readAsText(file);
      }, _onError);
    })
  },

  syncOut(data) {
    _sync(function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function(e) {
          NoteActionCreators.receiveSyncedStatus();
        };

        fileWriter.onerror = _onError;

        var blob = new Blob([JSON.stringify(data)], {type: 'application/plain'});

        fileWriter.write(blob);
      }, _onError);
    })
  }
}
