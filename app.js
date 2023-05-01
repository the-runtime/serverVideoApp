const express = require('express')
var logger = require('morgan')
var passport = require('passport')
var session = require('express-session')

var logger = require('morgan')

var SQLiteStore = require('connect-sqlite3')(session)

const app = express()
const port = 8080


app.set('view engine','ejs')

var authRouter = require('./routes/auth')

// app.get('/', (req, res) => {
//     res.send('hello world')
// })

app.use('/', authRouter)

//app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'session.db', dir: './var/db'})
}))

app.use(passport.authenticate('session'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})