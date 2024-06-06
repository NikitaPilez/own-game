<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TonBalance />
  <TelegramUserInfo />
  <BuyTest />
  <TonConnect />
</template>

<script>
import TonBalance from './components/TonBalance.vue';
import TelegramUserInfo from "@/components/TelegramUserInfo.vue";
import BuyTest from "@/components/BuyTest.vue";
import TonConnect from "@/components/TonConnect.vue";

export default {
  name: 'App',
  components: {
    TelegramUserInfo,
    TonBalance,
    BuyTest,
    TonConnect,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
