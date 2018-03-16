var Masonry = require('masonry-layout')
export function layout(container) {
    return new Masonry(container, {
        itemSelector: '.item',
        columnWidth: 0
    })
}
