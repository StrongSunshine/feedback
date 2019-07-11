/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-06-22 03:30:16
 * @version $Id$
 */

const mongo = require('../dao/mongodb.js')
const collection = 'feedback'

exports.index = index
exports.upload = upload

function index(req, res, next) {
    mongo.sort(collection, {'_id':-1} , (err, docs) => {
        if (err) {
            next()
            return
        }
        res.render('index.html', {
            feedback: docs.slice(-20)
        })
    })
}

function upload(req, res) {
    mongo.insertOne(collection, req.body, (err, res) => {
        if (err) {
            console.log(req.ip + '插入内容' + JSON.stringify(req.body) + '失败')
            return
        }
        console.log(req.ip + '插入内容' + JSON.stringify(req.body))
    })
}