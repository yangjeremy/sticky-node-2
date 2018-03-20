import { layout } from './layout.js'
import { showToast } from 'js/components/toasts.js'
class NoteManager {
    constructor(){
        this.$parent = $('#container')
        this.getNotes()
        this.data = null
        this.positive = true
    }
    
    noteSort(){
        if (this.positive) {
            this.$parent.html(' ')
            $.get('/api/notes').then((res) => {
                if (res.status === 200) {
                    this.data = res.data
                }
            this.data = this.data.sort(function (pre,cur) {
                return cur.date - pre.date
            })
            this.init()
            layout('#container')
            this.positive = false
            })
        }else{
            this.$parent.html(' ')
            $.get('/api/notes').then((res) => {
                if (res.status === 200) {
                    this.data = res.data
                }
                this.data = this.data.sort(function (pre, cur) {
                    return pre.date - cur.date
                })
                this.init()
                this.positive = true
                layout('#container')
            })
        }
    }

    getNotes(){
        $.get('/api/notes').then((res)=> {
            if (res.status === 200) {
                this.data = res.data
                this.init()
            }
        })
    }

    showDone(){
        $('.item').each(function(){
            if ($(this).find('.note-status > span').hasClass('node-btn')) {
                $(this).remove()
                layout('#container')
            }
        })
    }
    showAll(){
        let that = this
            that.$parent.html(' ')
            that.getNotes()
            layout('#container')
    }
    init(){
        let data = this.data
        data.forEach(item => {
            this.addFn(item)
        });
        
    }
    addFn(item){
        let nowTime = new Date(item.date)
        let nowDay = nowTime.getDate()
        let nowYear = nowTime.getFullYear()
        let nowMouth = nowTime.getMonth() + 1
        let noteStatus = item.done ? '<span class="node-done"></span>' : '<span class="node-btn"></span>'
        let html = $(` <div class="item">
                        <div class="note-item" >
                            <div class="note-date">
                                <p>${nowYear}年${nowMouth}月${nowDay}日</p>
                                <span><img src="./imgs/close.png" alt="close"></span>
                            </div>
                            <div class="note-text" contenteditable="true">
                                ${item.text}
                            </div>    
                            <ul class="note-score">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <div class="note-status">
                                ${noteStatus}
                            </div>
                            
                        </div>
                    </div>`)
        html.data('id', item.date)
        this.$parent.prepend(html)
        if ($('#container').length >0) {
            layout('#container')
        }
        
    }
    add(){
        let date = +new Date()
        let text = '初始化'
        let done = false
        let item = {date,text,done}
        $.post('/api/note/create',item).then((res)=> {
            if (res.status === 200) {
                    this.addFn(item)
            }
        })
        
    }
    remove($el){
        let $target = $el.parents('.item')
        let id = $target.data('id')
        $.post('/api/note/remove',{id}).then((res)=>{
            if (res.status === 200) {
                $target.remove()
                layout('#container')
                showToast('删除成功')
            }
            
        })
        
    }
    edit($el){
        let html = $el.html()
        let $target = $el.parents('.item')
        let id = $target.data('id')
        $.post('/api/note/edit', { id,html }).then((res) => {
            if (res.status === 200) {
                $el.html(html)
                layout('#container')
                showToast('修改成功')
            }

        })
        
        
    }
    done($el){
        if ($el.hasClass('node-done')) return showToast('已经完成啦')
        let id = $el.parents('.item').data('id')
        let done = true
        $.post('/api/note/edit', { id, done }).then((res) => {
            if (res.status === 200) {
                $el.removeClass('node-btn').addClass('node-done')
                showToast('完成')
            }
        })
       
        
    }
}

$('#container').on('focus', '.note-text', function () {
    let $parent = $(this).parent()
    $parent.addClass('zindex')
})
$('#container').on('blur', '.note-text', function () {
    let $parent = $(this).parent()
    $parent.removeClass('zindex')
    layout('#container')
})

export let noteManager = new NoteManager()