const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');

const citiesApi = 'database/cities.json',
    API_KEY = 'd2a30638d906c66ecbb5ab2dbc31375e',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload';

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

const cheapTicketDay = (cheapTicket) =>{
    console.log(cheapTicket);
};

const cheapTicketYear = (cheapTickets) =>{
    console.log(cheapTickets);
};

const selectCity = (event, input, list) => {
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent='';
    }
}

const renderCheap = (data, date) => {
    const cheapTicketYear = JSON.parse(data).best_prices;

    const cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    });

    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);
}

const renderCheapDay = (cheapTicket) => {
    console.log('cheapTicket: ', cheapTicket)
    };

const renderCheapYear = (cheapTickets) => {
	console.log('cheapTickets: ', cheapTickets);
    };

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

// обработка кнопки
formSearch.addEventListener('submit', (event) => {
    event.preventDefault();

	const cityFrom = city.find(item => inputCitiesFrom.value === item.name);
	const cityTo = city.find(item => inputCitiesTo.value === item.name);

    const formData = {
        from: cityFrom.code,
        to: cityTo.code,
        when: inputDateDepart.value
    };
    
    //для формирования запроса используем обратные кавычки
    const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true&token=${API_KEY}`;

   getData(calendar + requestData, (response) => {
       renderCheap(response, formData.when)
   });

});

getData(citiesApi, (data)=>{
    city = JSON.parse(data).filter(item => item.name);
});
/*
(item) => {
    return item.name
}
*/

