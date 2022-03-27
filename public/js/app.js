console.log("client loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://api.weatherstack.com/current?access_key=8a0bf7407372a5536a1908ce39dc46b8&query=' + search.value).then((response) => {
        response.json().then( (data) => {
            if(data.error) {
                console.log(data.error.info);
                messageOne.textContent = ''
                messageTwo.textContent = data.error.info                
            } else {
                messageOne.textContent = ''
                const forecast = 'It is currently ' + data.location.localtime.split(' ')[1] + ' in ' + data.location.name + ', ' + data.location.region + ', ' + data.location.country + '. Temperature is ' + data.current.temperature + ' degrees alongwith ' + data.current.weather_descriptions[0] + ' weather and ' + data.current.cloudcover + ' cloud cover.'
                messageTwo.textContent = forecast                
            }
        })
    })
    
    // console.log(search.value)
})
