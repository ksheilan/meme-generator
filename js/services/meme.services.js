'use strict'

let gMeme = createMeme()

console.log('gMeme', gMeme);


// CREATE
function createMeme(content) {
    return {
        size: { width: 100, height: 100 },
        content,
    }
}
// READ
function getMeme() {
    return gMeme
}

// UPDATE
function setMeme(content, size = gMeme.size) {
    gMeme.content = content
    gMeme.size = size

    return gMeme
}

// DELETE