const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()


    //array filter method
    // const duplicateNotes = notes.filter(function (note){
    //     return note.title === title
    // })

    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse("note added"))
    } else {
        console.log(chalk.red.inverse("no note added"))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = function (title) {
    const notes = loadNotes()

    const notesToKeep = notes.filter(function(note){
        return note.title !== title
    })

    if(notesToKeep.length < notes.length) {
        
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("note removed!"))

    } else {
        console.log(chalk.red.inverse("no note found!"))
    }

}

const listNotes = function () {
    const notesList = loadNotes()
    console.log(chalk.inverse("Your Notes:"))
    notesList.forEach(note => {
        console.log(note.title)
    });
}

const readNote = function (title) {
    const allNotes = loadNotes()
    const note = allNotes.find((note) => note.title === title)
    if(note) {
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red("No notes found!"))
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}