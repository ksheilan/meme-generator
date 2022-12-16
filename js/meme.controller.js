'use strict'

let gElCanvas = document.getElementById('meme-canvas')
let gCtx = gElCanvas.getContext('2d')


function onClearCanvas() {
    //Set the backgournd color to grey
    gCtx.fillStyle = '#fff'
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function onRenderMeme(width = gElCanvas.width, height = gElCanvas.height) {
    gElCanvas.width = width
    gElCanvas.height = height
    setMemeSize({ width, height })
    const elImg = new Image()
    const meme = getMeme()
    elImg.src = meme.bgImage
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, width, height)
        meme.layers.forEach(layer => {
            const { val, pos } = layer
            const { size, color } = val.fontSettings
            onDrawText(val, pos.x * width, pos.y * height)
        })
    }
}


function onDrawText(layerInfo, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = layerInfo.fontSettings.color
    gCtx.font = `${layerInfo.fontSettings.size}px impact`;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    setLayerBounds({ width: gCtx.measureText(layerInfo.content).width, height: layerInfo.fontSettings.size })
    gCtx.fillText(layerInfo.content, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(layerInfo.content, x, y) // Draws (strokes) a given text at the given (x, y) position.
    console.log(getMeme());
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
        const inputVal = document.getElementById('text-box').value
        const meme = getMeme()
        meme.layers[activeTextIdx].val.content = inputVal
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

function onImgSelect(val, test) {
    let canvasHeight = test.height / test.width * gElCanvas.width
    setMemeImage(val)

    onRenderMeme(gElCanvas.width, canvasHeight)
}

function onFontChange(isIncrease = true) {
    let changeValue = isIncrease ? 2 : -2
    setFontSize(getFontSize() + changeValue)
    onRenderMeme()
}

function onColorChange(color) {
    setFontColor(color)
    onRenderMeme()
}

function onLayerToggle() {
    setActiveLayer(getActiveLayer() + 1)
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function onMove(ev) {
    console.log('pos', getEvPos(ev));
    // const { isDrag } = getCircle()

    // if (!isDrag) return

    // const pos = getEvPos(ev)
    // // Calc the delta , the diff we moved
    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y
    // moveCircle(dx, dy)
    // // Save the last pos , we remember where we`ve been and move accordingly
    // gStartPos = pos
    // // The canvas is render again after every move
    // renderCanvas()
}

//Handle the listeners
function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    //Listen for resize ev
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()

    // })
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    // if (TOUCH_EVS.includes(ev.type)) {
    //     console.log('ev:', ev)
    //     //soo we will not trigger the mouse ev
    //     ev.preventDefault()
    //     //Gets the first touch point
    //     ev = ev.changedTouches[0]
    //     //Calc the right pos according to the touch screen
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    //     }
    // }
    return pos
}