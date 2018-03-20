import { noteManager } from 'js/components/note.js'

export class Navbar {
    constructor($el){
        this.$el = $el
        this.bindEvent()
    }
    bindEvent(){
        this.$el.children('li').on('click',(e)=>{
            let $target = $(e.target)
            
            switch ($target.index()) {
                case 0:
                    noteManager.showAll()
                    break;
                case 1:
                    noteManager.showDone()
                    break;
                case 2:
                    let span = $target.children().eq(0)
                    span.toggleClass('reverse')
                    noteManager.noteSort()
                    return;
                default:
                    break;
            }
            $target.siblings().removeClass('active') 
            $target.addClass('active') 
        })
    }
}