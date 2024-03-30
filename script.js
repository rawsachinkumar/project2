
const balanceEl = document.getElementById('balance');
const incomeTransactionsEl = document.getElementById('income-transactions');
const expenseTransactionsEl = document.getElementById('expense-transactions');
const transactionForm = document.getElementById('transaction-form');
const transactionTypeInput = document.getElementById('transaction-type');
const transactionAmountInput = document.getElementById('transaction-amount');
const transactionDescriptionInput = document.getElementById('transaction-description');


let transactions = [];

function updateBalance() {
  let balance = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      balance += transaction.amount;
    } else if (transaction.type === 'expense') {
      balance -= transaction.amount;
    }
  });
  balanceEl.textContent = balance.toFixed(2);
}


function displayTransactions() {
  incomeTransactionsEl.innerHTML = '';
  expenseTransactionsEl.innerHTML = '';

  transactions.forEach((transaction) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${transaction.description} <span>${transaction.amount.toFixed(2)}</span>`;

    if (transaction.type === 'income') {
      listItem.classList.add('income');
      incomeTransactionsEl.appendChild(listItem);
    } else if (transaction.type === 'expense') {
      listItem.classList.add('expense');
      expenseTransactionsEl.appendChild(listItem);
    }
  });
}

function addTransaction(event) {
  event.preventDefault();

  const type = transactionTypeInput.value;
  const amount = Number(transactionAmountInput.value);
  const description = transactionDescriptionInput.value;

  // Validate inputs
  if (type === '' || isNaN(amount) || amount === 0 || description === '') {
    return;
  }


  const transaction = {
    type: type,
    amount: amount,
    description: description,
  };


  transactions.push(transaction);


  transactionTypeInput.value = '';
  transactionAmountInput.value = '';
  transactionDescriptionInput.value = '';

  
  updateBalance();
  displayTransactions();
}


transactionForm.addEventListener('submit', addTransaction);
