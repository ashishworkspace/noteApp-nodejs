const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = loadNotes();
  let tmp = notes.filter((note) => {
    if (note.title === title) {
      return note;
    }
  });
  if (tmp.length == 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
  } else {
    console.log(chalk.red.inverse.bold("Duplicate found"));
  }
};
const removeNote = (title) => {
  const notes = loadNotes();
  const remaningNotes = notes.filter((note) => note.title !== title);
  if (remaningNotes.length < notes.length) {
    console.log(chalk.green.inverse.bold("Node remove Successfully"));
    saveNotes(remaningNotes);
  } else {
    console.log(chalk.red.inverse.bold("No note Found"));
  }
};

const listNote = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse.bold("Your Notes..."));
  notes.forEach((note) => {
    console.log(chalk.yellow.inverse.bold(note.title));
  });
};
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse.bold(note.body));
  } else {
    console.log(chalk.red.inverse.bold("Note not Found"));
  }
};

const saveNotes = (notes) => {
  const stringJson = JSON.stringify(notes); // convert javascript object to string or JSON
  fs.writeFileSync("note.json", stringJson);
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync("note.json");
    const buffer2String = buffer.toString();
    return JSON.parse(buffer2String); // convert JSON to javascript object
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes: addNotes,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote,
};
