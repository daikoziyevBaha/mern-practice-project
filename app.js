const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/t', require('./routes/redirect.routes'))
app.use('/api/link', require('./routes/link.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }))
        app.listen(5000, () => console.log(`Server is running on port ${PORT}...`))
    } catch(e) {
        console.log("Server error", e.message)
        process.exit()
    }
}

start()
