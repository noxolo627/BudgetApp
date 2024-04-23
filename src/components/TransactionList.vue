<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li v-for="transaction in transactions" v-bind:key="transaction.id" v-bind:class="transaction.amount < 0 ? 'minus': 'plus' ">
            {{ transaction.text }} <span>-${{ transaction.amount }}</span><button @click="deleteTransaction(transaction.id)" class="delete-btn">X</button>
        </li>
    </ul>
</template>

<!--When you want to consume data globally in a component and using a composition api, you need to define props-->
<script setup>
  import { defineProps } from 'vue';

  const emit = defineEmits(['transactionDeleted']);
  
  const props = defineProps({
    transactions: {
        type: Array,
        required:true,
    }
  })

  const deleteTransaction =(id)=>{
    emit('transactionDeleted', id)
  }
</script>