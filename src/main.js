import { createApp } from 'vue'
import App from './App.vue'
import { Buffer } from 'buffer';
import './styles.css';

const tg = window.Telegram.WebApp;

tg.ready();
window.Buffer = Buffer;

createApp(App).provide('telegram', tg).mount('#app')
