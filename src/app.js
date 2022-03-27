const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000


//define Directory
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set hanndlebar directory
app.set('views', viewsDirectory)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Div'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Div"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText:'This is a help section.',
        title:'Help',
        name:'Div'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:'No address added'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    } )

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'Help Page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'Page'
    })
})

app.listen(port, () => {
    console.log('Started listening on port ' + port)
})