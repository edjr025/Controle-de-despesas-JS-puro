const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const despesasDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const imputTransactionsName = document.querySelector('#text')
const inputTransationsAmount = document.querySelector('#amount')




const localStorageTransactions = JSON.parse(localStorage.getItem('transations'))
let transactions = localStorage.getItem('transations') !== null ? localStorageTransactions : []

const removeTransition = ID =>{
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onclick="removeTransition(${transaction.id})">
        x
        </button>

    `
    transactionsUl.append(li)
}

const updateBelanceValues = () => {
    const transactionAmounnts = transactions.map(transaction => transaction.amount)
    const total = transactionAmounnts.reduce((acc, transaction) => acc + transaction, 0)
    const income = transactionAmounnts
        .filter(value => value > 0)
        .reduce((acc, value) => acc + value,0).toFixed(2)
    const despesas = Math.abs(transactionAmounnts
    .filter(value => value < 0)
    .reduce((acc, value) => acc + value, 0).toFixed(2))
    // console.log(transactionAmounnts)
    // console.log(total)
    //console.log(income)
    //console.log(despesas)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    despesasDisplay.textContent = `R$ ${despesas}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBelanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transations', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = imputTransactionsName.value.trim()
    const transactionAmount = inputTransationsAmount.value.trim()

    if(transactionName === '' || transactionAmount === ''){
        alert('por favor, preencha o nome e o valor da transação')
        return
    }

    const transaction =  {id: generateID(), name: transactionName, amount: Number(transactionAmount)}
    
    transactions.push(transaction)
    init()
    updateLocalStorage()

    imputTransactionsName.value = ''
    inputTransationsAmount.value = ''
})