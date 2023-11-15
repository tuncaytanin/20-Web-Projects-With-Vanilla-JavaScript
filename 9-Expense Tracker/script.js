const balance =document.getElementById('balance');
const money_plus =document.getElementById('money-plus');
const money_minus =document.getElementById('money-minus');
const list =document.getElementById('list');
const form =document.getElementById('form');
const text =document.getElementById('text');
const amount =document.getElementById('amount');

/* const dummyTransactions= [
    {id:1,text:'Flower',amount:-20},
    {id:2,text:'Salary',amount:300},
    {id:3,text:'Book',amount:-10},
    {id:4,text:'Camera',amount:150},
]
 */

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !=null ? localStorageTransactions : [];


// add transaction

function addTransaction(e){

    e.preventDefault();

    console.log(text);
    console.log(amount);
    if(text.value.trim() =='' || amount.value ==''){
        alert('Please add a taxt and amount');
    } else {
        const transacation = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transacation);
        addTransactionDOM(transacation);
        updateValues();
        updateLocalStorage();
        text.value='';
        amount.value ='';
    }
}



function generateId() {
    return Math.floor(Math.random()*100000000);
}

// Add transacation to DOM
function addTransactionDOM(transaction) {

    const sign = transaction.amount < 0 ? "-" : "+";

    const item  = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? 'minus' :'plus' )

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}$</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `;
    list.appendChild(item);
}


//update the balance , income and expense

function updateValues(){

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item)=> (acc+=item),0).toFixed(2);
    balance.innerText= "$"+total;




    const incomes = amounts.filter(item => item >0)
    const totalIncome = incomes.reduce((acc,item)=> (acc+=item),0).toFixed(2);
    money_plus.innerText = "$"+totalIncome;



    money_minus.innerText ="$"+ (amounts.filter(item => item<0).reduce((acc,item) => (acc+=item),0)*-1).toFixed(2);

}



// remove transaction by Id 

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !==id);
    updateLocalStorage();
    init();
}

//update local stroge transactions

function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



// init app

function init(){
    list.innerHTML='';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit',addTransaction);