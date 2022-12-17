'use strict'

function onRenderGallery() {
    
    let elKeywords = document.querySelector('.keywords-box')
    let keywords = getGalleryKeywords()
    let keywordsHTML = keywords.map(keyword =>
        `<a style="font-size: ${getKeywordSize(keyword)}em">${keyword}</a>`
    )
    elKeywords.innerHTML = keywordsHTML.join('')

    let elGallery = document.querySelector('.gallery')
    let gallery = getGalleryFilter() ? getFilteredGallery() : getGallery()

    let galleryHTML = gallery.map(img =>
        `<img src="${img.path}" alt="" srcset="" onclick="onImgSelect('${img.path}', this)">`
    )

    elGallery.innerHTML = galleryHTML.join('')
    
}

function onSearchImage() {
    setTimeout(() => {
        const inputVal = document.getElementById('search-box').value
        setGalleryFilter(inputVal)
        // updateKeywords(inputVal)
        onRenderGallery()

       
    }, 500);
}

function onImgSelect(val, img) {
    let canvasHeight = img.height / img.width * gElCanvas.width
    setMemeImage(val)

    onRenderMeme(gElCanvas.width, canvasHeight)
}