<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpense :income="+income" :expense="-expense" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpense from './components/IncomeExpense.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { ref } from 'vue';  //use ref when you want your app to reactive in vue
import { computed } from 'vue'  // use computed when you want to create reactive and cached values and it can depend on one or more reactive properties
import { useToast } from 'vue-toastification';
import { onMounted } from 'vue';

const toast = useToast();

const transactions = ref([]);

onMounted(()=>{
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

  if(savedTransactions){
    transactions.value =  savedTransactions;
  }
});

//Get total balance 
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0)
})

//Get income
const income = computed(() => {
  return transactions.
    value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2)
})


///Get expenses
const expense = computed(() => {
  return transactions.
    value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2)
})

//get new transaction
const handleTransactionSubmitted = (transactionData) => {

  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
  });

  handleSaveToLocalStorage();

  toast.success('Transaction added successfully');
  
}

//generate unique ID

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000);
}

//delete transaction

const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction)=> transaction.id !== id)

  handleSaveToLocalStorage();
  
  toast.success('transaction removed');
  
};

//save to local storage

const handleSaveToLocalStorage = ()=>{
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
}
</script>