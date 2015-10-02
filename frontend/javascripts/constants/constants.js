import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    // Routes
    REDIRECT: null,

    // Notes
    LOAD_NOTES: null,
    UPDATE_NOTE: null,
    DELETE_NOTE: null,
    CHANGE_NOTE: null,
    ADD_NOTE: null,
    SYNC_NOTES: null,

    RECEIVE_NOTES: null,
    RECEIVE_UPDATED_NOTE: null,
    RECEIVE_DELETED_NOTE: null,

    RECEIVE_SYNCED_STATUS: null
  })
}
