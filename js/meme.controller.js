'use strict'

const HOVER_PADDING = 7
const ALIGN = {
    Left: 0,
    Middle: 1,
    Right: 2
}
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
    elImg.src = meme.bgImage.path
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, width, height)
        meme.layers.forEach((layer, idx) => {
            onDrawText(layer, idx, layer.pos.x * width, layer.pos.y * height)
        })
    }
}

function onDrawText(layer, idx, x, y) {
    const layerData = layer.val

    // gCtx.textAlign = 'start'
    gCtx.lineWidth = 2
    gCtx.font = `${layerData.fontSettings.size}px ${layerData.fontSettings.name}`;
    gCtx.textAlign = layerData.fontSettings.align
    gCtx.textBaseline = 'middle'
    let layerSize = { width: gCtx.measureText(layerData.content).width, height: layerData.fontSettings.size }
    let bounds = setLayerBounds(idx, layerSize)

    if (layer.isHovered) {
        gCtx.beginPath()
        gCtx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        gCtx.roundRect(
            bounds.min.x - HOVER_PADDING,
            bounds.min.y - HOVER_PADDING * (layerSize.height / layerSize.width),
            bounds.max.x - bounds.min.x + HOVER_PADDING * 2,
            bounds.max.y - bounds.min.y + HOVER_PADDING * 2 * (layerSize.height / layerSize.width),
            50);

        gCtx.stroke()
        gCtx.fill()

    }
    
    gCtx.strokeStyle = layerData.fontSettings.borderColor
    gCtx.fillStyle = layerData.fontSettings.color

    gCtx.fillText(layerData.content, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(layerData.content, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function resizeCanvas(width) {
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


function onFontSizeChange(isIncrease = true) {
    let changeValue = isIncrease ? 2 : -2
    setFontSize(getFontSize() + changeValue)
    onRenderMeme()
}

function onColorChange(color) {
    setFontColor(color)
    onRenderMeme()
}

function onBorderColorChange(color) {
    setFontBorderColor(color)
    onRenderMeme()
}

function onLayerToggle() {
    setActiveLayer(getActiveLayer() + 1)
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onClick)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function onClick() {
    let activeLayerIdx = getActiveLayer()
    if (activeLayerIdx !== -1) {
        let meme = getMeme()
        const layer = meme.layers[activeLayerIdx]

        document.getElementById('text-box').value = layer.val.content
        setDraggedLayer(activeLayerIdx, false)
        onRenderMeme()
    }
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const activeLayerIdx = getHoveredLayerIndexByBounds(pos)
    if (activeLayerIdx !== -1) {
        setDraggedLayer(activeLayerIdx, true)
        setActiveLayer(activeLayerIdx)
    }
}
function onMove(ev) {
    // const { isDrag } = getCircle()

    // if (!isDrag) return

    const pos = getEvPos(ev)
    let layerIdx = getHoveredLayerIndexByBounds(pos)
    if (layerIdx !== -1) {
        const layer = getMeme().layers[layerIdx]
        if (layer.isDragged) {
            setLayerPosition(pos)
            onRenderMeme()
            
        }
    }
    setHoveredLayer(layerIdx)
    onRenderMeme()
    // return
    // setHoveredLayer(layer.idx, false)
    // onRenderMeme()
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

function onCreateNewLayer() {
    document.getElementById('text-box').value = ''
    let layerData = {
        content: '',
        fontSettings: {
            name: document.getElementById('fonts').value,
            size: 40,
            align: 'center',
            color: document.getElementById('fontColor').value,
            borderColor: document.getElementById('borderColor').value
        }
    }
    let layer = createMemeLayer(layerData, 'txt', { x: 0.5, y: 0.5 })
    addMemeLayer(layer)
    onRenderMeme()
}

function onDeleteActiveLayer() {
    deleteLayer(getActiveLayer())
    onRenderMeme()
}

function onMoveLayerY(isPositive) {
    moveLayerY(isPositive)
    onRenderMeme()
}

function onSetFont(val){
    setFont(val)
    onRenderMeme()
}
function onSetLayerAlignment(alignment) {
    let align = 'center'
    switch (alignment) {
        case ALIGN.Left:
            align = 'end'
            break;
        case ALIGN.Right:
            align = 'start'
            break;
    }

    setLayerAlignment(align)
    onRenderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev) {
    loadImageFromInput(ev)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, img.width, img.height)
        }
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

}