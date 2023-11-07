

const currencyEl_one = document.getElementById('currency_one');
const amountEl_one = document.getElementById('amount_one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount_two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// Fetch exhance rates and updates the DOM
function calculate(callingName) {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    console.log(callingName);
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(res => res.json()).then(data => {

        const rate = data.rates[currency_two];
        rateEl.innerText=`1 ${currency_one} = ${rate} ${currency_two}`

        amountEl_two.value = (amountEl_one.value*rate).toFixed(2);
    });

}


// Event Listeners
currencyEl_one.addEventListener('change',() => calculate('CurrencyOneChange'));
amountEl_one.addEventListener('input',() => calculate('amountOneInput'));
currencyEl_two.addEventListener('change',() => calculate('CurrencyTwoChange'));
amountEl_two.addEventListener('input',() => calculate('amountTwoInput'));


swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    console.log('addEventListener');
    calculate('swap'); 
    });
    

calculate('initial'); 