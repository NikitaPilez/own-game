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
        { id: 1, name: 'First test', price: 100 },
        { id: 2, name: 'Second test', price: 200 },
      ],
      loading: false,
      success: false,
      error: null,
      recipientAddress: 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2',
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
        const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));
        // const amountInNano = test.price.toString();
        console.log(tonweb);
        // const paymentLink = `ton://transfer/${this.recipientAddress}?amount=${amountInNano}&text=PaymentForTest`;
        const paymentLink = `ton://transfer/EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2?amount=500000000&text=123`;

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