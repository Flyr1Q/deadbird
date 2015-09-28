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
    LOAD_NOTE: null,
    CREATE_NOTE: null,
    UPDATE_NOTE: null,
    DELETE_NOTE: null,

    RECEIVE_NOTES: null,
    RECEIVE_NOTE: null,
    RECEIVE_CREATED_NOTE: null,
    RECEIVE_UPDATED_NOTE: null,
    RECEIVE_DELETED_NOTE: null,
  })
}
