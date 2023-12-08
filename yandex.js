const puppeteer = require('puppeteer');
const URL_TEST = 'https://ya.ru/';

TestSearchYa(); 

async function TestSearchYa() {
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 100});
    
    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Ввод текста "Автоматизация тестирования" в поисковую строку');
    const searchField = await page.$('#text');
    await searchField.type ('Автоматизация тестирования');

    console.log('Клик в кнопку "Найти"');
    const searchButton = await page.$('button[type="submit"]');
    await searchButton.click();
    
    console.log('Ожидание перехода в страницу поисковых результатов');
    await page.waitForNavigation();

    console.log('Получение элементов результата поиска');
    const result = await page.$('.serp-item');
        console.log('Сравнение ОР и ФР');
        if (result == null){
            console.log('Результаты поиска не найдены');
        } else {
            console.log('Результаты поиска отобразились');
        }
    
    console.log('Закрытие браузера');
    await browser.close();
}