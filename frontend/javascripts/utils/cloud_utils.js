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
  syncIn(callback) {
    _sync(function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
          callback(JSON.parse(e.target.result || '[]'));
        };

        reader.readAsText(file);
      }, _onError);
    })
  },

  syncOut(data, callback) {
    _sync(function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function(e) {
          callback();
        };

        fileWriter.onerror = _onError;

        var blob = new Blob([JSON.stringify(data)], {type: 'application/plain'});

        fileWriter.write(blob);
      }, _onError);
    })
  }
}
