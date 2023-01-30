(() => {
    const card = document.getElementById('card');
    const cityInput = document.getElementById('city_input');

    const renderData = (data) => {
        const temp = Math.round(data.main.temp);
        const tempMax = Math.round(data.main.temp_max);
        const tempMin = Math.round(data.main.temp_min);
        const iconSrcLink = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';

        card.innerHTML = `
            <div class="column">
                 <h1>${temp}°C</h1>
                 <h3 class="italic">${data.name}, ${data.sys.country}</h3>
                 <h2>Max: ${tempMax} // Min: ${tempMin}</h2>
                 <h3 class="italic">humidity: ${data.main.humidity}%</h3>
            </div>
            <div class="column column2">
                <div>
                    <img src="${iconSrcLink}" alt="icon" class="icon">
                </div>
                <h2 class="italic">${data.weather[0].main}</h2>
            </div>`;
    };

    document.getElementById('send_btn').addEventListener('click', () => {
        const url = 'https://api.openweathermap.org/data/2.5/' +
            'weather?&appid=8e2394541a5182d2c1aa64972ba1ff15&units=metric&q=' + cityInput.value

        fetch(url)
            .then((response) => {
                if (response.ok) return response.json();
                else alert(`HTTP Code: ${response.status}, details: ${response.statusText}`);
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                    renderData(data);
                }
            })
            .catch(error => console.log(error));

        cityInput.value = '';
    });
})();