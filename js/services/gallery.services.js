'use strict'

let gKeywordSearchCountMap = {
    'funny': 31,
    'cat': 22,
    'baby': 12,
    'happy': 15,
    'sad': 7
}
let gGalleryFilter
let gGallery = []
_createGallery()

// CREATE
function _createGallery() {
    for (let i = 25; i >= 1; i--) {

        gGallery.push(createGalleryImage(`images/${i}.jpg`))
    }
}

function createGalleryImage(path) {
    let keywords = []
    let keywordKeys = Object.keys(gKeywordSearchCountMap)
    for (let i = 0; i < 3; i++) {
        let keyword = keywordKeys[getRandomIntInclusive(0, keywordKeys.length - 1)]
        if (keywords.includes(keyword)) {
            i--
            continue
        }
        // gKeywordSearchCountMap[keyword]++
        keywords.push(keyword)

    }

    return {
        path,
        keywords
    }
}
// READ

function getKeywordSize(val){
    return gKeywordSearchCountMap[val] / 10
}
function getGalleryKeywords(){
    return Object.keys(gKeywordSearchCountMap)
}
function getGallery() {
    return gGallery
}

function getImageByPath(path) {
    return gGallery.find(img => img.path === path)
}

function getGalleryFilter() {
    return gGalleryFilter
}

function getFilteredGallery() {
    return gGallery.filter(img => {
        return img.keywords.includes(gGalleryFilter)
    })
}
// UPDATE

function setGalleryFilter(filter) {
    gGalleryFilter = filter
}

function updateKeywords(val){
    if (gKeywordSearchCountMap[val]) gKeywordSearchCountMap[val]++
}
// DELETE