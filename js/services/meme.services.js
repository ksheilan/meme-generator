'use strict'

let gMeme = createMeme()

// Placeholders for testing purposes
addMemeLayer(createMemeLayer('Top Text', 'txt', { x: 0.5, y: 0.1 }))
addMemeLayer(createMemeLayer('Middle Text', 'txt', { x: 0.5, y: 0.5 }))
addMemeLayer(createMemeLayer('Bottom Text', 'txt', { x: 0.5, y: 0.9 }))
console.log('gMeme', gMeme);


// CREATE
function createMeme() {
    return {
        size: { width: 100, height: 100 },
        layers: [],
        activeLayer: 0,
        fontSize: 40,
        fontColor: '#fff',
        bgImage: 'images/1.jpg'
    }
}

function createMemeLayer(layerInput, layerType = 'txt', layerPos = { x: 0, y: 0 }) {
    return {
        type: layerType,
        pos: layerPos,
        val: layerInput
    }
}
// READ
function getMeme() {
    return gMeme
}

function getFontSize(){
    return gMeme.fontSize
}

function getActiveLayer(){
    return gMeme.activeLayer
}

// UPDATE
function setFontSize(size){
    gMeme.fontSize = size
}

function setFontColor(color){
    gMeme.fontColor = color
}

function setMemeImage(path){
    gMeme.bgImage = path
}

function setActiveLayer(idx){
    if (idx === gMeme.layers.length) gMeme.activeLayer = 0
    else gMeme.activeLayer = idx
}
function addMemeLayer(layer) {
    gMeme.layers.push(layer)
}

// DELETE