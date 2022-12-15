'use strict'

function onRenderGallery(){
    let elGallery = document.querySelector('.gallery')
    let gallery = getGallery()
    let strHtmls = gallery.map(imgPath => 
        `<img src="${imgPath}" alt="" srcset="" onclick="onImgSelect('${imgPath}', this)">`
    )

    elGallery.innerHTML = strHtmls.join('')
}

