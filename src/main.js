import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'
import './assets/styles.css';
import App from './App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', component: Header },
        {path: '/balance', component: Balance },
        {path: '/NewTransaction', component: AddTransaction },
        {path: '/income-and-expense', component: IncomeExpense},
        {path: '/history', component: TransactionList },
    ],
});


const app = createApp(App);
app.mount('#app');
app.use(router);
app.use(Toast);
