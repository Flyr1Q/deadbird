var datastore = null;

function onerror(e) {
  console.log(e);
}

export default {
  open(tableName, callback) {
    var version = 1;
    var request = indexedDB.open('colibri', version);

    request.onupgradeneeded = function(e) {
      var db = e.target.result;

      e.target.transaction.onerror = onerror;

      if (db.objectStoreNames.contains(tableName)) {
        db.deleteObjectStore(tableName);
      }

      var store = db.createObjectStore(tableName, {
        keyPath: 'id'
      });

      store.createIndex('key', 'id', {unique: true})
    };

    request.onsuccess = function(e) {
      datastore = e.target.result;

      callback();
    };

    request.onerror = onerror;
  },

  index(tableName, callback) {
    var db = datastore;
    var transaction = db.transaction([tableName], 'readwrite');
    var objStore = transaction.objectStore(tableName);

    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);

    var _instances = [];

    transaction.oncomplete = function(e) {
      callback(_instances);
    };

    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;

      if (!!result == false) {
        return;
      }

      _instances.push(result.value)

      result.continue();
    };

    cursorRequest.onerror = onerror;
  },

  bulkUpdate(tableName, data, callback) {
    var db = datastore;
    var transaction = db.transaction([tableName], 'readwrite');
    var objStore = transaction.objectStore(tableName);

    var request = objStore.clear();

    request.onsuccess = function(e) {
      let counter = 0;

      putNext();

      function putNext() {
        if (counter < data.length) {
          objStore.put(data[counter]).onsuccess = putNext;
          counter++;
        } else {
          callback();
        }
      }
    };

    request.onerror = onerror;
  },

  update(tableName, data, callback) {
    var db = datastore;
    var transaction = db.transaction([tableName], 'readwrite');
    var objStore = transaction.objectStore(tableName);

    var _instance = data;

    var request = objStore.put(_instance);

    request.onsuccess = function(e) {
      callback(_instance);
    };

    request.onerror = onerror;
  },

  destroy(tableName, id, callback) {
    var db = datastore;
    var transaction = db.transaction([tableName], 'readwrite');
    var objStore = transaction.objectStore(tableName);

    var request = objStore.delete(id);

    request.onsuccess = function(e) {
      callback();
    }

    request.onerror = onerror;
  }
}
