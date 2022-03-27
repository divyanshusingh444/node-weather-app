const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8a0bf7407372a5536a1908ce39dc46b8&query=' + longitude + ',' + latitude
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Could not connect to weather services', undefined)
        } else if (body.error) {
            callback('Could not fetch weather', undefined)
        } else {
            let currentTemperature = body.current.temperature;
            let apparentTemperature = body.current.feelslike
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + currentTemperature + " degrees out but it feels like its " + apparentTemperature + " degrees")
        }
    })
}

module.exports = forecast
