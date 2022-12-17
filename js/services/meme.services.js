'use strict'

let gMeme = createMeme()


// Placeholders for testing purposes
// addMemeLayer(createMemeLayer({ content: 'Top Text', fontSettings: { size: 40, color: "#fff" } }, 'txt', { x: 0.5, y: 0.15 }))
// addMemeLayer(createMemeLayer({ content: 'Middle Text', fontSettings: { size: 40, color: "#fff" } }, 'txt', { x: 0.5, y: 0.5 }))
// addMemeLayer(createMemeLayer({ content: 'Bottom Text', fontSettings: { size: 40, color: "#fff" } }, 'txt', { x: 0.5, y: 0.85 }))


// CREATE
function createMeme() {
    return {
        size: { width: 100, height: 100 },
        layers: [],
        activeLayer: 0,
        bgImage: { path: 'images/1.jpg', keywords: [] }
    }
}

function createMemeLayer(layerInput, layerType = 'txt', layerPos = { x: 0, y: 0 }) {
    return {
        type: layerType,
        pos: layerPos,
        bounds: {
            min: { x: 0, y: 0 },
            max: { x: 0, y: 0 }
        },
        val: layerInput,
        isHovered: false,
        isDragged: false
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

function getHoveredLayerIndex() {
    return gMeme.layers.findIndex(layer => layer.isHovered)
}

function getHoveredLayerIndexByBounds(pos) {
    return gMeme.layers.findIndex(layer => {
        return (pos.x > layer.bounds.min.x &&
            pos.x < layer.bounds.max.x &&
            pos.y > layer.bounds.min.y &&
            pos.y < layer.bounds.max.y)
    })
}
// UPDATE

function setLayerAlignment(alignment) {
    const layerData = gMeme.layers[gMeme.activeLayer].val
    layerData.fontSettings.align = alignment
}
function setFontSize(size) {
    const layerData = gMeme.layers[gMeme.activeLayer].val
    layerData.fontSettings.size = size
}

function setFontColor(color) {
    const layerData = gMeme.layers[gMeme.activeLayer].val
    layerData.fontSettings.color = color
}

function setFontBorderColor(color) {
    const layerData = gMeme.layers[gMeme.activeLayer].val
    layerData.fontSettings.borderColor = color
}

function setFont(name) {
    const layerData = gMeme.layers[gMeme.activeLayer].val
    layerData.fontSettings.name = name
}
function setLayerBounds(idx, size) {
    const activeLayer = gMeme.layers[idx]
    let layerX = activeLayer.pos.x * gMeme.size.width
    let layerY = activeLayer.pos.y * gMeme.size.height
    let bounds = {
        min: { x: layerX - size.width, y: layerY - size.height / 2 },
        max: { x: layerX + size.width, y: layerY + size.height / 2 }
    }
    activeLayer.bounds = bounds

    return bounds
}

function setHoveredLayer(idx) {
    const prevHoveredLayerIdx = getHoveredLayerIndex()
    if (prevHoveredLayerIdx !== -1) {
        const layer = gMeme.layers[prevHoveredLayerIdx]
        layer.isHovered = false
    }
    if (idx === -1) return

    gMeme.layers[idx].isHovered = true
}
function setMemeSize(size) {
    gMeme.size = size
}
function setMemeImage(path) {
    console.log('getImageByPath()', getImageByPath(path));
    gMeme.bgImage = getImageByPath(path)
}

function setActiveLayer(idx) {
    if (idx === gMeme.layers.length) gMeme.activeLayer = 0
    else gMeme.activeLayer = idx
}

function setDraggedLayer(idx, isDragged) {
    gMeme.layers[idx].isDragged = isDragged
}
function addMemeLayer(layer) {
    gMeme.layers.push(layer)
    gMeme.activeLayer = gMeme.layers.length - 1
}

function setLayerPosition(pos) {
    const activeLayer = gMeme.layers[gMeme.activeLayer]
    activeLayer.pos.x = pos.x / gMeme.size.width
    activeLayer.pos.y = pos.y / gMeme.size.height
}
// DELETE

function deleteLayer(idx) {
    gMeme.layers.splice(idx, 1)
}