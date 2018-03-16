const Sequelize = require('sequelize');
var path = require('path')
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: path.join(__dirname, '../database/database.sqlite')
});

// 数据库
// 测试
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
const Note = sequelize.define('note', {
    date: {
        type: Sequelize.FLOAT
    },
    text: {
        type: Sequelize.STRING   
    },
    done: {
        type: Sequelize.BOOLEAN 
    },
    uid: {
        type: Sequelize.STRING
    }
});

// 创建
Note.sync({force: true}).then(function () {
    let date = +new Date()
    Note.create({
        date,
        text: 'hello worldchen',
        done : false
    });
}).then(function () {
    Note.findAll({raw: true}).then(function (notes) {
    })
})

// Note.create({ text: 'id' }).then(function () {
//     Note.findAll({ raw: true }).then(function (notes) {
//         console.log(notes)
//     })
// })


module.exports = Note

