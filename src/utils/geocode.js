const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWRkc2tpbGxzIiwiYSI6ImNraXNwMG5yYzJodWgycXFqa2J3OW1ybTkifQ.O12djlXWsoDZ7J5UUuaVdA'

    request({ url, json: true }, (error, { body }) => {
        // console.log(body)
       if(body.message == 'Not Found'){
        callback('Try Another search', undefined)
       }
        else if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.',{message:"Not Found"})
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode