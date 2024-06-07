import { createApp } from 'vue'
import App from './App.vue'
import { Buffer } from 'buffer';
import './styles.css';

const tg = window.Telegram.WebApp;

tg.expand();
tg.initDataUnsafe.request_write_access = false;
tg.ready();

window.Buffer = Buffer;

createApp(App).provide('telegram', tg).mount('#app')
