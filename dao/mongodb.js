/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-06-21 08:07:04
 * @version $Id$
 */
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost/27017'
const dbname = 'mydb'

exports.createCollection = createCollection
exports.drop = drop
exports.insertOne = insertOne
exports.insertMany = insertMany
exports.find = find
exports.updateOne = updateOne
exports.updateMany = updateMany
exports.deleteOne = deleteOne
exports.deleteMany = deleteMany
exports.sort = sort
exports.stats = stats


//创建集合
function createCollection(collectionName, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).createCollection(collectionName, (err, res) => {
            if (err) {
                callback(err, null)
                client.close()
                return
            }
            callback(null, res)
            client.close()
        })
    })
}

//删除集合
function drop(collectionName, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).collection(collectionName).drop((err, res) => {
            if (err) {
                callback(err, null)
                client.close()
                return
            }
            callback(null,res)
            client.close()
        })
    })
}

//查询集合状态
function stats(collectionName, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).collection(collectionName).stats((err,stats)=>{
        	callback(null,stats)
        	client.close()
        })
    })
}

//插入数据到集合,传入值为json代表插入一个
function insertOne(collectionName, json, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }

        client.db(dbname).collection(collectionName).insertOne(json, (err, res) => {
            if (err) {
                callback(err, null)
                client.close()
                return
            }
            callback(null, res)
            client.close()
        })
    })
}

//插入多条
function insertMany(collectionName, array, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }

        client.db(dbname).collection(collectionName).insertMany(array, (err, res) => {
            if (err) {
                callback(err, null)
                client.close()
                return
            }
            callback(null, res)
            client.close()
        })
    })
}

//根据条件查询,json传入查询条件,按页查询时传入：args:{'pagesize':num,'page':num}
function find(collectionName, json,args,callback) {
	var limit,skip
	if(arguments.length === 3){
		callback = args
		limit = skip = 0
	}else if(arguments.length === 4){
		limit = args.pagesize
		skip = args.page * args.pagesize
	}
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).collection(collectionName).find(json).skip(skip).limit(limit).toArray((err, docs) => {
            if (err) {
                callback(err, null)
                client.close()
                return
            }
            callback(null, docs)
            client.close()
        })
    })
}

//更新匹配到的第一条数据
function updateOne(collectionName, filter, json, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).collection(collectionName).updateOne(filter, {
            $set: json
        }, (err, res) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, res)
            client.close()
        })
    })
}

//更新匹配到的所有数据
function updateMany(collectionName, filter, json, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).collection(collectionName).updateMany(filter, {
            $set: json
        }, (err, res) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, res)
            client.close()
        })
    })
}

//删除匹配到的第一条数据
function deleteOne(collectionName, filter, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).collection(collectionName).deleteOne(filter, (err, res) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, res)
            client.close()
        })
    })
}

//删除匹配到的所有数据
function deleteMany(collectionName, filter, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).collection(collectionName).deleteMany(filter, (err, res) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, res)
            client.close()
        })
    })
}

//排序
function sort(collectionName, type, callback) {
    MongoClient.connect(url, { 'useNewUrlParser': true }, (err, client) => {
        if (err) {
            callback(err, null)
            client.close()
            return
        }
        client.db(dbname).collection(collectionName).find().sort(type).toArray((err, docs) => {
            if (err) {
                callback(err, null)
                client.close()
                return
            }
            callback(null, docs)
            client.close()
        })
    })
}

