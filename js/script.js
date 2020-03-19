const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');

const citiesApi = 'database/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/',
    API_KEY = 'd2a30638d906c66ecbb5ab2dbc31375e',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload',
    queryIATA = 'https://www.travelpayouts.com/widgets_suggest_params?q=Из Екатеринбурга в Калининград'; // запрос для получения IATA кодов

let city = [];

const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', ()=>{
        if (request.readyState !== 4) return;

        if (request.status === 200){
            callback(request.response);
        } else {
            console.error(request.status);
        }

    });

    request.send();
};

//формирование списка выводимых городов
const showCity = (input, list) => {
    list.textContent = '';

    if (input.value == '') return;

    const filterCity = city.filter((item)=>{
            const fixItem = item.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());   
    });
    
    filterCity.forEach((item)=>{
        const li = document.createElement('li');
        li.classList.add('dropdown__city'); //добавить класс элементу
        li.textContent = item.name;
        list.append(li);
    });
};

const selectCity = (event, input, list) => {
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent='';
    }
}

//листенер для поля "откуда"
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});

//листенер для поля "куда"
inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo)
});

//листенер для клика по списку "откуда"
dropdownCitiesFrom.addEventListener('click', (event)=>{
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

//листенер для клика по списку "куда"
dropdownCitiesTo.addEventListener('click', (event)=>{
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

//вызовы функций

getData(citiesApi, (data)=>{
    city = JSON.parse(data).filter(item => item.name);
});
/*
(item) => {
    return item.name
}
*/


// через Live Server
getData(queryIATA, (data)=>{
    let jsonText = JSON.parse(data); 
    let origin = jsonText['origin']['iata']; // место вылета
    let destination = jsonText['destination']['iata']; // место назначения

    console.log('Код города отправления: ' + origin);
    console.log('Код города назначения: ' + destination);

    let params = ('?origin=' + origin + '&destination=' + destination + '&depart_date=2020-05-25'); 
    console.log('Сформированный запрос: ' + calendar+params);
    console.log('Ответ:');
    getData(calendar+params, (data)=>{
        let result = JSON.parse(data);
        console.log(result);
    });

});