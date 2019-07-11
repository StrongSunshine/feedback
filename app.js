/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-06-21 20:05:09
 * @version $Id$
 */
const bodyParser = require('body-parser')
const express = require('express')
const router = require('./module')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('html',require('express-art-template'))
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
})

app.get('/',router.index)

app.post('/upload',router.upload)

app.use(express.static('public'))

app.use((req,res)=>{
	res.render('404.html')
})

app.listen(3000,'192.168.65.33',()=>console.log('node express server is running'))

