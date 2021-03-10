document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // Устанавливаем курс валют
    let exchanger = {'RUB':0,'USD':0,'EUR':0};
    function MoneyExchange(rub, usd, eur){
        exchanger['RUB']=rub;
        exchanger['USD']=usd;
        exchanger['EUR']=eur;
        console.log(exchanger);
    }
    const getExchangeRates = () => fetch('https://api.exchangeratesapi.io/latest?base=RUB');
    
    getExchangeRates()
    .then(request => request.json())
    .then(request => {
        MoneyExchange(1, request.rates.USD, request.rates.EUR);
    });
    const val = document.getElementById('val1'),
        currency1 = document.getElementById('cur1'),
        currency2 = document.getElementById('cur2'),
        result = document.getElementById('val2');
    const change = () =>{
        let torub = 0;
        if(currency1.value === currency2.value){ // Если оба значения в селектах равны
            result.value = val.value; // То просто вписываем данные из поля ввода
        } else {
            if(currency1.value != 'RUB'){ // Если не равны рублю, то
                torub = val.value/exchanger[currency1.value]; // Переводим сумму в рубли
                result.value = Math.ceil((torub*exchanger[currency2.value])*100)/100;
            } else { // Если не равны
                result.value = Math.ceil((val.value*exchanger[currency2.value])*100)/100;
            }
        }
    };
    val.addEventListener('input', change);
    currency1.addEventListener('change', change);    
    currency2.addEventListener('change', change);

});