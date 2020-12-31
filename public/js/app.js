// console.log('Client side javascript file is loaded');
const weatherForm = document.querySelector('form');
const searched = document.querySelector('input');
var messg1 = document.querySelector('#test_1');
var humidity = document.querySelector('#test_2');
var observationTime = document.querySelector('#test_3');
var temperature = document.querySelector('#test_4');
var visibility = document.querySelector('#test_5');
var img = document.querySelector('#test_6');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searched.value;

    messg1.textContent = 'Loding...'
    humidity.textContent = ''
    observationTime.textContent = ''
    temperature.textContent = ''
    visibility.textContent = ''
    img.innerHTML = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then( (data) =>{
        if(data.error){
            messg1.textContent = data.error;
            // console.log("Unable to get data");
        }
        else{

            messg1.textContent = data.location;
            humidity.textContent = 'Humidity : '+data.forecast.humidity;
            observationTime.textContent = 'Observation time : '+data.forecast.observation_time;
            temperature.textContent = 'Temperature : '+data.forecast.temperature;
            visibility.textContent =  'Visibility : '+data.forecast.visibility;

        }
        
    })
})

    
})








// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then( (data) =>{
//         console.log(data);
//     })
// })
