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

export default {
  name: "BuyTest",
  data() {
    return {
      tests: [
        { id: 1, name: 'First test', price: 1 },
        { id: 2, name: 'Second test', price: 2 },
      ],
      loading: false,
      success: false,
      error: null,
      recipientAddress: '0QDD5-7iLDPvJ_T_LKwlkXfyexl2iL7v9-BH-_a3vJ25Vjf0',
      selectedTest: null,
      testQrCode: '',
    };
  },
  methods: {
    async buyTest(test) {
      this.loading = true;
      this.error = null;
      this.success = false;
      try {
        // const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));
        // const amountInNano = test.price.toString();
        const toNano = TonWeb.utils.toNano;
        const amountInNano = toNano(test.price.toString());
        // console.log(tonweb);
        const paymentLink = `https://app.tonkeeper.com/transfer/${this.recipientAddress}?text=123&amount=${amountInNano}`;

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