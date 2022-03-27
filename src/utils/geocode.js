const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGl2eWFuc2h1c2luZ2g0NDQiLCJhIjoiY2t6eWdwamduMDAzazNqbXdjOTZ0YjZlMCJ9._RUB9JsLa1uP4nGPWNOR3Q&limit=1' 
    request({url, json:true}, (error, {body}) =>{
        if(error) {
            callback('Could not connect to Services', undefined)
        } else if(body.features.length === 0) {
            callback("Could not find location", undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode