const yargs = require("yargs");
const notes = require("./notes.js");

// Setting up the yargs version
yargs.version("1.0.2");

const yargsFunc = (
  commandTitle,
  commandDescription,
  commandBuilder,
  commandHandler
) => {
  return yargs.command({
    command: commandTitle,
    describe: commandDescription,
    builder: commandBuilder,
    handler: commandHandler,
  });
};

const addBuilder = {
  title: {
    describe: "add a note",
    demandOption: true,
    type: "string",
  },
  body: {
    describe: "add a note body",
    demandOption: true,
    type: "string",
  },
};

const addHandler = (argv) => {
  return notes.addNotes(argv.title, argv.body);
};

const removeBuilder = {
  title: {
    describe: "remove a note",
    demandOption: true,
    type: "string",
  },
};

const removeHandler = (argv) => {
  return notes.removeNote(argv.title);
};

const listHandler = () => {
  return notes.listNote();
};

const readBuilder = {
  title: {
    describe: "read a note",
    demandOption: true,
    type: "string",
  },
};

const readHandler = (argv) => {
  return notes.readNote(argv.title);
};

yargsFunc("add", "command to add a note", addBuilder, addHandler);
yargsFunc("remove", "command to remove a note", removeBuilder, removeHandler);
yargsFunc("list", "command to list all the note", undefined, listHandler);
yargsFunc(
  "read",
  "command to read a particular note",
  readBuilder,
  readHandler
);

yargs.parse();
