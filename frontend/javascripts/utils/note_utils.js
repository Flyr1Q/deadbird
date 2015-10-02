import { sortBy, find, get, first, findIndex } from 'lodash';
import uuid from 'node-uuid';

let newNote = function() {
  let id = uuid();

  return {
    id: id,
    title: '',
    description: '',
    isChanged: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

let lastNoteId = function(notes) {
  return get(first(sort(notes)), 'id');
}

let sort = function(notes) {
  return sortBy(notes, el => new Date(el.createdAt)).reverse();
}

let findById = function(notes, id) {
  return find(notes, 'id', id);
}

let set = function(notes, note) {
  let index = findIndex(notes, el => el.id == note.id);

  notes[index] = note;
}

let merge = function(localNotes, cloudNotes) {
  var result = [];

  cloudNotes.forEach(function(cloudNote){
    let localNote = findById(localNotes, cloudNote.id)

    if (!localNote || new Date(localNote.updatedAt) < new Date(cloudNote.updatedAt)) {
      result.push(cloudNote);
    } else {
      result.push(localNote);
    }
  });

  localNotes.forEach(function(localNote){
    let cloudNote = findById(cloudNotes, localNote.id)

    if (!cloudNote) {
      result.push(localNote);
    }
  });

  return result;
}

export default  {
  findById,
  newNote,
  lastNoteId,
  merge,
  set,
  sort,
}


