'use strict'

let gMeme = createMeme()
addMemeLayer(createMemeLayer('txt', { x: 200, y: 200 }, 'ff'))
addMemeLayer(createMemeLayer('txt', { x: 140, y: 200 }, 'dd'))
addMemeLayer(createMemeLayer('txt', { x: 120, y: 20 }, 'faa'))
addMemeLayer(createMemeLayer('txt', { x: 170, y: 140 }, 'w'))
console.log('gMeme', gMeme);


// CREATE
function createMeme() {
    return {
        size: { width: 100, height: 100 },
        layers: [],
        bgImage: 'images/1.jpg'
    }
}

function createMemeLayer(layerType = 'txt', layerPos = { x: 0, y: 0 }, layerInput) {
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

// UPDATE
function setMeme(layers, size = gMeme.size) {
    gMeme.layers = layers
    gMeme.size = size

    return gMeme
}

function addMemeLayer(layer) {
    gMeme.layers.push(layer)
}

// DELETE