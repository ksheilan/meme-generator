'use strict'

function renderMeme(){
    onDrawImg()
}

function resizeCanvas(width) {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = width
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight
}

function drawNice() {
    var img = new Image();
    img.onload = function () {
        gCtx.drawImage(img, 0, 0);
    };
    img.src = 'images/1.jpg';
    console.log('gCtx-image', gCtx);
    // add text on top of the image
    gCtx.font = '24px Arial';
    gCtx.fillStyle = '#fff';
    gCtx.fillText('Hello, world!', 10, 30);
    console.log('gCtx-afterText', gCtx);
}