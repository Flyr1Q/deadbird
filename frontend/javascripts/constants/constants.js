import keyMirror from 'keymirror';

export default {
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Routes
    REDIRECT: null,

    // Startups
    LOAD_NOTES: null,
    UPDATE_NOTE: null,
    DELETE_NOTE: null,

    RECEIVE_NOTES: null,
    RECEIVE_UPDATED_NOTE: null,
    RECEIVE_DELETED_NOTE: null,
  })
}