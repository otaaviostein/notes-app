// const add = require('./utils.js')

// const sum = add(4, 9)

// console.log(sum)

//require('fs') - require node modules
//require('validator') - require npm modules
//require('./notes') - require our own files

const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//Customize yargs version
yargs.version('1.1.0')



//create add command 
yargs.command ({
    command: 'add',
    describe: 'add a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'This is the note body',
            demandOption: true, //default is false
            type: 'string'
        }
    },
    handler:(argv) => notes.addNote(argv.title, argv.body)
    
})



//create remove command 
yargs.command ({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler:(argv) => notes.removeNote(argv.title)
})

//create list command 
yargs.command ({
    command: 'list',
    describe: 'list a note',
    handler: () => notes.listNotes()
})


//create read command
yargs.command ({
    command: 'read',
    describe: 'read a new note',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNote(argv.title)
})

console.log(yargs.argv)
//yargs.parse() //mostra o resultado assim como o console log