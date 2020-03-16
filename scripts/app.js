const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//update UI
const updateUi = (data) => {
    const {cityDets, weather} = data;

    //new details template 
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
    `;

    //update images& weather icons
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);


    let timeSrc = null;

    if(weather.IsDayTime) {
        timeSrc= 'img/day.svg'
    } else {
        timeSrc= 'img/night.svg'
    }

    time.setAttribute('src', timeSrc);

    // hide and show card 
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
    .then(data => updateUi(data))
    .catch(error => console.log(error));

    //set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUi(data))
    .catch(error => console.log(error));
};