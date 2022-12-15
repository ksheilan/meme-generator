'use strict'

let gGallery = []
_createGallery()

// CREATE
function _createGallery() {
    for (let i = 1; i <= 2; i++){
        gGallery.push(`images/${i}.jpg`)
    }
}
// READ

function getGallery(){
    return gGallery
}
// UPDATE

// DELETE