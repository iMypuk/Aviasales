const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');

const city = ['Москва', 'Волгоград', 'Минск', 'Калининград', 'Челябинск',
'Караганда', 'Ростов-на-Дону', 'Одесса'];

//формирование списка выводимых городов
const showCity = (input, list) => {
    list.textContent = '';

    if (input.value == '') return;

    const filterCity = city.filter((item)=>{
        const fixItem = item.toLowerCase();
        return fixItem.includes(input.value.toLowerCase())        
    });
    
    filterCity.forEach((item)=>{
        const li = document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent = item;
        list.append(li);
    });
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
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        inputCitiesFrom.value = target.textContent;
        dropdownCitiesFrom.textContent='';
    }
});

//листенер для клика по списку "куда"
dropdownCitiesTo.addEventListener('click', (event)=>{
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        inputCitiesTo.value = target.textContent;
        dropdownCitiesTo.textContent='';
    }
});