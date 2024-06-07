<template>
  <div>
    <h1>Tests</h1>
    <div class="tests-grid">
      <div v-for="test in tests" :key="test.id" class="test">
        <h2>{{ test.title }}</h2>
        <p>Price: {{ test.price }} USDT</p>
        <button
            :class="test.is_active ? 'btn-green' : 'btn-blue'"
            @click="test.is_active ? playTest(test) : buyTest(test)"
        >
          {{ test.is_active ? 'Play' : 'Buy' }}
        </button>
        <div v-if="selectedTest && selectedTest.id === test.id">
          <img :src="testQrCode" alt="QR Code">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import TonWeb from 'tonweb';
import axios from 'axios';
import { API_BASE_URL, TELEGRAM_ID, RECIPIENT_ADDRESS } from '@/config';
import { inject } from 'vue';

export default {
  name: "BuyTest",
  data() {
    return {
      tests: [],
      recipientAddress: RECIPIENT_ADDRESS,
      selectedTest: null,
      testQrCode: '',
      interval: null,
      telegramUserId: null,
    };
  },
  mounted() {
    this.getTelegramUserId();
    this.fetchTests();
    this.interval = setInterval(this.fetchTests, 3000);
  },
  methods: {
    getTelegramUserId() {
      const tg = inject('telegram');

      if (tg && tg.initDataUnsafe.user) {
        this.telegramUserId = tg.initDataUnsafe.user.id;
      } else {
        this.telegramUserId = TELEGRAM_ID;
      }
    },
    fetchTests() {
      axios.get(`${API_BASE_URL}/api/packages`, {
        params: {
          telegramUserId: this.telegramUserId,
        }
      }).then(response => {
        this.tests = response.data;
      }).catch(error => {
        console.error(error);
      });
    },
    async playTest(test) {
      console.log(test);
    },
    async buyTest(test) {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/orders`, {
          packageId: test.id,
          telegramUserId: this.telegramUserId,
        });

        const order = response.data;

        const toNano = TonWeb.utils.toNano;
        const amountInNano = toNano(test.price.toString());
        const paymentLink = `https://app.tonkeeper.com/transfer/${this.recipientAddress}?text=Order%20ID%20${order.uid}&amount=${amountInNano}`;

        this.testQrCode = await QRCode.toDataURL(paymentLink);
        this.selectedTest = test;
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}
</script>

<style scoped>
.tests-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.test {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.btn-blue {
  background-color: blue;
  color: white;
}

.btn-green {
  background-color: green;
  color: white;
}
</style>