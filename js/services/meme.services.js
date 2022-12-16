'use strict'

let gMeme = createMeme()
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

// Placeholders for testing purposes
addMemeLayer(createMemeLayer({ content: 'Top Text', fontSettings: { size: 40, color: "#fff" } }, 'txt', { x: 0.5, y: 0.1 }))
// addMemeLayer(createMemeLayer({ content: 'Middle Text', fontSettings: { size: 40, color: "#fff" } }, 'txt', { x: 0.5, y: 0.5 }))
// addMemeLayer(createMemeLayer({ content: 'Bottom Text', fontSettings: { size: 40, color: "#fff" } }, 'txt', { x: 0.5, y: 0.9 }))


// CREATE
function createMeme() {
    return {
        size: { width: 100, height: 100 },
        layers: [],
        activeLayer: 0,
        bgImage: 'images/1.jpg'
    }
}

function createMemeLayer(layerInput, layerType = 'txt', layerPos = { x: 0, y: 0 }) {
    return {
        idx: 0,
        type: layerType,
        pos: layerPos,
        bounds: {
            min: { x: 0, y: 0 },
            max: { x: 0, y: 0 }
        },
        val: layerInput,
        isHovered: false
    }
}
// READ
function getMeme() {
    return gMeme
}

function getFontSize() {
    return gMeme.layers[gMeme.activeLayer].val.fontSettings.size
}

function getActiveLayer() {
    return gMeme.activeLayer
}

function isCursorOnLayer(pos){
    // console.log('cursor pos:', pos);
    return gMeme.layers.find(layer => {
        return (pos.x > layer.bounds.min.x &&
                pos.x < layer.bounds.max.x &&
                pos.y > layer.bounds.min.y &&
                pos.y < layer.bounds.max.y)
    })
}

function getHoveredLayer(){
    return gMeme.layers.find(layer => layer.isHovered)
}

// UPDATE
function setFontSize(size) {
    gMeme.layers[gMeme.activeLayer].val.fontSettings.size = size
}

function setFontColor(color) {
    let memeText = gMeme.layers[gMeme.activeLayer].val
    memeText.fontSettings.color = color
}

function setLayerBounds(size) {
    let activeLayer = gMeme.layers[getActiveLayer()]

    let layerX = activeLayer.pos.x * gMeme.size.width
    let layerY = activeLayer.pos.y * gMeme.size.height
    let bounds = {
        min: { x: layerX - size.width / 2, y: layerY - size.height / 2 },
        max: { x: layerX + size.width / 2, y: layerY + size.height / 2 }
    }
    gMeme.layers[gMeme.activeLayer].bounds = bounds

    return bounds
}

function setHoveredLayer(idx, isHovered){
    gMeme.layers[idx].isHovered = isHovered
}
function setMemeSize(size) {
    gMeme.size = size
}
function setMemeImage(path) {
    gMeme.bgImage = path
}

function setActiveLayer(idx) {
    if (idx === gMeme.layers.length) gMeme.activeLayer = 0
    else gMeme.activeLayer = idx
}
function addMemeLayer(layer) {
    gMeme.layers.push(layer)
}

// DELETE