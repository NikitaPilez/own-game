<template>
  <div>
    <input type="text" v-model="address" placeholder="Enter TON wallet address" />
    <button @click="getBalance">Get Balance</button>
    <p v-if="balance !== null">Balance: {{ balance }} TON</p>
  </div>
</template>

<script>
import TonWeb from 'tonweb';

export default {
  name: 'TonBalance',
  data() {
    return {
      address: '',
      balance: null
    };
  },
  methods: {
    async getBalance() {
      try {
        const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));
        this.balance = await tonweb.getBalance(this.address);
      } catch (error) {
        console.error('Failed to get balance:', error);
        this.balance = 'Error';
      }
    }
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
}
</style>