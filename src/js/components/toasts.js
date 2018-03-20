import $ from 'jquery'
let Toasts = class Toasts{
    constructor(text,time){
        this.text = text
        this.time = time || 3000
        this.$el = $('body')
        this.$toastNode = null
        this.creatToast()
        this.ToastActive()
    }

    creatToast(){
        let html = `<span id="toasts">${this.text}<span>`
        this.$toastNode = $(html)
        this.$el.append(this.$toastNode)
    }
    
    ToastActive(){
        this.$toastNode.fadeIn(300)
        setTimeout(() => {
            this.$toastNode.fadeOut(500, () => this.$toastNode.remove())
        }, this.time);
    }

}

export function showToast(text, time) {
    return new Toasts(text, time)
}


