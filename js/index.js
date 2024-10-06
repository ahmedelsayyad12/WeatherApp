// all var
let forecastArray = []
let forecastDay = []
// all var

async function forecast(city) {
    let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=398201b25d9a49dfa6a163728240410&q=${city}&days=3`);
    let weatherData =  await weather.json();
    forecastArray = weatherData
    forecastDay =forecastArray.forecast.forecastday
    displayToday()
    displayAnother()
}

function displayToday (){
    let date =new  Date(forecastArray.current.last_updated)
       let displayData =`
        <div class="col-md-4 card position-relative overflow-hidden">
                    <div class="inner ">
                        <div class="day-date d-flex justify-content-between card-title mt-2">
                            <h6>${date.toLocaleDateString('en-us',{weekday:'long'})}</h6>
                            <h6>${date.toLocaleDateString('en-us',{day:'numeric'})}
                            ${date.toLocaleDateString('en-us',{month:'long'})}</h6>
                        </div>
                        <div class="image"><img src="" class="w-100" alt="" id="cWeatherImage"></div>
                        <div class="content ">
                            <img src="https:${forecastArray.current.condition.icon}" alt="" >
                            <h3>${forecastArray.location.name}</h3>
                            <h2>${forecastArray.current.temp_c}&deg;C</h2>
                            <h6>${forecastArray.current.condition.text}</h6>
                            <div class="weahter-deatils d-flex justify-content-between mt-3">
                                <div>
                                    <i class="fa-solid fa-cloud me-1 fs-4" style="color: #009ad8;"></i>
                                    <span>${forecastArray.current.cloud}%</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-wind me-1 fs-4" style="color: #009ad8;"></i>
                                    <span>${forecastArray.current.wind_kph}</span>
                                </div>
                                <div>
                                    <i class="fa-regular fa-compass fs-4 me-1" style="color: #009ad8;"></i>
                                    <span>${forecastArray.current.wind_dir}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
         `
    
    document.getElementById('forecast').innerHTML = displayData
    
    let  cImage = document.getElementById('cWeatherImage')
    let currentTemp =  forecastArray.current.temp_c
    // console.log(currentTemp);
    
    if (currentTemp <=10){
        cImage.src = `images/undraw_snowman_re_guxt.svg`
    }else if(currentTemp > 10 && currentTemp < 22) {
        cImage.src = 'images/undraw_walking_in_rain_vo9p.svg'
    }else{
        cImage.src = 'images/undraw_beach_day_cser.svg'
    }

    
}
function displayAnother(){
    let twoTemp=[];
    for (let i = 1; i < forecastDay.length; i++) {
        let date = new Date(forecastDay[i].date)
        let displayAnotherData = "";
        displayAnotherData += `<div class="col-md-4 card position-relative overflow-hidden">
                    <div class="inner">
                        <div class="day-date d-flex justify-content-between card-title mt-2">
                            <h6>${date.toLocaleDateString('en-us',{weekday:'long'})}</h6>
                            <h6>${date.toLocaleDateString('en-us',{day:'numeric'})}
                            ${date.toLocaleDateString('en-us',{month:'long'})}</h6>
                        </div>
                        <div class="image"><img src="" class="w-100 aWeatherImage" alt=""></div>
                        <div class="content ">
                            <img src="https:${forecastDay[i].day.condition.icon}" alt="">
                            <h2>${forecastDay[i].day.avgtemp_c}&deg;C</h2>
                            <h6>${forecastDay[i].day.condition.text}</h6>
                        </div>
                    </div>
                </div>`;
                document.getElementById("forecast").innerHTML += displayAnotherData
                let  image = document.querySelectorAll('.aWeatherImage')
                let temp = forecastDay[i].day.avgtemp_c
                twoTemp.push(temp)
                for(let  j = 0; j < image.length; j++){
                    if (twoTemp[j] <=10){
                        image[j].src = `images/undraw_snowman_re_guxt.svg`
                    }else if(  twoTemp[j] > 10 && twoTemp[j] < 22) {
                        image[j].src = 'images/undraw_walking_in_rain_vo9p.svg'
                    }else if (twoTemp[j] >= 22){
                        image[j].src = 'images/undraw_beach_day_cser.svg'
                    }
            }
}}
document.getElementById('search').addEventListener('input', function(e){
    if(e.target.value.length > 2){
        forecast(e.target.value)
    }
})
forecast('cairo')

document.querySelector('form').addEventListener("submit",function(e){
    e.preventDefault()
    let city = document.getElementById('search').value
    forecast(city)

})

let liveLocation;
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        liveLocation = position.coords.latitude + ',' + position.coords.longitude
        // console.log(liveLocation);
        forecast(liveLocation)
        })
}
