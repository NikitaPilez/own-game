<template>
  <div>
    <h1>Tests</h1>
    <div v-for="test in tests" :key="test.id" class="test">
      <h2>{{ test.name }}</h2>
      <p>Price: {{ test.price }} USDT</p>
      <button @click="buyTest(test)">Buy</button>
      <div v-if="selectedTest && selectedTest.id === test.id">
        <img :src="testQrCode" alt="QR Code">
      </div>
    </div>
    <div v-if="loading">Processing payment...</div>
    <div v-if="success">Payment successful! You now have access to the test.</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import TonWeb from 'tonweb';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: "BuyTest",
  data() {
    return {
      tests: [],
      loading: false,
      success: false,
      error: null,
      recipientAddress: '0QDD5-7iLDPvJ_T_LKwlkXfyexl2iL7v9-BH-_a3vJ25Vjf0',
      selectedTest: null,
      testQrCode: '',
    };
  },
  created() {
    this.fetchTests();
  },
  methods: {
    async fetchTests() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/packages`);
        this.tests = response.data;
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    },
    async buyTest(test) {
      this.loading = true;
      this.error = null;
      this.success = false;
      try {

        const response = await axios.post(`${API_BASE_URL}/api/orders`, {
          packageId: test.id,
          telegramUserId: 621085735,
        });

        const order = response.data;

        const toNano = TonWeb.utils.toNano;
        const amountInNano = toNano(test.price.toString());
        const paymentLink = `https://app.tonkeeper.com/transfer/${this.recipientAddress}?text=Order%20ID%20${order.uid}&amount=${amountInNano}`;

        this.testQrCode = await QRCode.toDataURL(paymentLink);
        this.selectedTest = test;

        window.open(paymentLink, '_blank');

        this.success = true;
      } catch (error) {
        this.error = `Payment error: ${error.message}`;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.test {
  margin-bottom: 20px;
}
</style>