'use strict'

function onRenderGallery(){
    let elGallery = document.querySelector('.gallery')
    let gallery = getGallery()
    let strHtmls = gallery.map(imgPath => 
        `<img src="${imgPath}" alt="" srcset="" onclick="onImgSelect('${imgPath}', this)">`
    )

    elGallery.innerHTML = strHtmls.join('')
}

function onSearchImage() {
    const activeTextIdx = getActiveLayer();
    setTimeout(() => {
        const inputVal = document.getElementById('search-box').value
        // if (!inputVal) document.querySelector('.text-box').classList.add('w-25')
        // const filterBy = setBooksFilter(inputVal)
        // renderBooks()
        // document.querySelector('.text-box').value = inputVal

        // const queryStringParams = `?bookName=${filterBy.bookName}`
        // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        // window.history.pushState({ path: newUrl }, '', newUrl)
    }, 500);
}