'use strict'

let gElCanvas = document.getElementById('meme-canvas')
let gCtx = gElCanvas.getContext('2d')

function onDrawImg(width = gElCanvas.width, height = gElCanvas.height) {
    const elImg = new Image() // Create a new html img element
    
    // Text added manually for testing purposes
    elImg.src = 'images/1.jpg'
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, width, height)
        onDrawText('Hello', width / 2, 50)
        onDrawText('World', width / 2, height - 50)
    }
}


function onDrawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = "40px impact";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}
