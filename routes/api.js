var express = require('express');
var router = express.Router();
var Note = require('../model/note.js')
/* GET users listing. */
router.get('/notes', function (req, res, next) {
    var opts = { raw: true }
    if (req.session && req.session.user) {
        opts.where = { uid: req.session.user.id }
    }
    Note.findAll(opts).then(function (notes) {
        res.send({status:200, data:notes})
    })
    // req.query.note
});

router.post('/note/create', function (req, res, next) {
    let note = req.body
    note.uid = req.session.user.id
    console.log(note)
    Note.create(note).then(function () {
        res.send({status: 200})
    }).catch(function (err) {
        res.send({status:204,errorMsg:'数据错误'})
    })
})

router.post('/note/edit', function (req, res, next) {
    Note.update({text: req.body.html, done: req.body.done || false}, {where:{date: req.body.id, uid:req.session.user.id}}).then(function () {
        res.send({status: 200})
    }).catch(function () {
        res.send({ status: 204, errorMsg: '数据错误' })
    })
});

router.post('/note/remove', function (req, res, next) {
    Note.destroy({ where: { date: req.body.id, uid: req.session.user.id}}).then(function () {
        res.send({status: 200})
    }).catch(function () {
        res.send({ status: 204, errorMsg: '数据错误' })
    })
});


module.exports = router;

// 1. 获取所有note GET: /api/notes
// 2. 添加一个note POST: /api/note / create
// req{ note: 'xxxx' }

// res{
//     status: 200,
//         data: [{}, {}, {}]
// }
//     else
// {
//     status: 204,
//         errorMsg: '失败的原因'
// }

// 3. 修改note POST: /api/note / edit
// req{
//     id: 100
//     note: 'new note'
// }
// 4. 删除note POST: /api/note / remove
// req{
//     id: 100
// }