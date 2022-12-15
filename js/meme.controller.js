'use strict'

let gElCanvas = document.getElementById('meme-canvas')
let gCtx = gElCanvas.getContext('2d')


function onClearCanvas(){
    //Set the backgournd color to grey
    gCtx.fillStyle = '#fff'
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function onRenderMeme(width = gElCanvas.width, height = gElCanvas.height) {
    const elImg = new Image()
    const meme = getMeme()
    // Text added manually for testing purposes
    elImg.src = meme.bgImage
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, width, height)
        meme.layers.forEach(layer => {
            const {val, pos} = layer
            onDrawText(val, pos.x, pos.y, meme.fontSize, meme.fontColor)
        })
    }
}


function onDrawText(text, x, y, size, color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px impact`;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function resizeCanvas(width) {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = width
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight
}

function onUpdateActiveText() {
    const activeTextIdx = getActiveLayer();
    setTimeout(() => {
        const inputVal = document.querySelector('.text-box').value
        const meme = getMeme()
        meme.layers[activeTextIdx].val = inputVal
        onRenderMeme()
        // if (!inputVal) document.querySelector('.text-box').classList.add('w-25')
        // const filterBy = setBooksFilter(inputVal)
        // renderBooks()
        // document.querySelector('.text-box').value = inputVal

        // const queryStringParams = `?bookName=${filterBy.bookName}`
        // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        // window.history.pushState({ path: newUrl }, '', newUrl)
    }, 500);
}

function onImgSelect(val){
    setMemeImage(val)

    onRenderMeme()
}

function onFontChange(isIncrease = true){
    let changeValue = isIncrease ? 2 : -2
    setFontSize(getFontSize() + changeValue)
    onRenderMeme()
}

function onColorChange(color){
    setFontColor(color)
    onRenderMeme()
}

function onLayerToggle(){
    setActiveLayer(getActiveLayer() + 1)
}