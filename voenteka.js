const puppeteer = require('puppeteer');
const URL_TEST = 'https://voenteka.ru/';

TestSearch(); 

async function TestSearch(){
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 100, defaultViewport: null, args: ['--start-maximized']});
    
    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();


    console.log('Переход по ссылке');
    await page.goto(URL_TEST);
   
    console.log('Ввод артикула');
    const searchField = await page.$('#title-search-input_fixed');
    await searchField.type ('3307155');

    console.log('Клик в кнопку "Найти"');
    const searchButton = await page.$('button[type="submit"]');
    await searchButton.click();

    console.log('Ожидание перехода в страницу поисковых результатов');
    await page.waitForNavigation();

    console.log('Получение элементов результата поиска');
    const result = await page.$('#bx_3966226736_102347');
        console.log('Сравнение ОР и ФР');
        if (result == null){
            console.log('Результаты поиска не найдены');
        } else {
            console.log('Результаты поиска отобразились');
        }

    console.log('Закрытие браузера');
    await browser.close();
}