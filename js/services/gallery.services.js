'use strict'

let gGallery = []
_createGallery()

// CREATE
function _createGallery() {
    for (let i = 25; i >= 1; i--){
        gGallery.push(`images/${i}.jpg`)
    }
}
// READ

function getGallery(){
    return gGallery
}
// UPDATE

// DELETE