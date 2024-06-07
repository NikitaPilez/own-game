<template>
  <div>
    <h1>Ton Connect Demo</h1>
    <div v-if="isAuthenticated">
      <p>Вы успешно авторизованы через TON Keeper!</p>
    </div>
    <button @click="connectWallet">Connect Wallet</button>
    <button @click="checkConnection">Check connection</button>
    <button @click="sendTransaction">Send 0.1 TON</button>
  </div>
</template>

<script>
import { connector } from '@/tonConnect';

export default {
  name: 'TonConnect',
  data() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    checkConnection() {
      console.log(connector.connected);
    },
    async sendTransaction() {
      if (!connector.connected) {
        alert('Please connect wallet to send the transaction!');
      }

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
            amount: "20000000",
            // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
          },
          {
            address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
            amount: "60000000",
            // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
          }
        ]
      }

      try {
        const result = await connector.sendTransaction(transaction);

        // you can use signed boc to find the transaction
        // const someTxData = await myAppExplorerService.getTransaction(result.boc);
        console.log(result);
      } catch (e) {
        console.log(e.messages);
        // if (e instanceof UserRejectedError) {
        //   alert('You rejected the transaction. Please confirm it to send to the blockchain');
        // } else {
        //   alert('Unknown error happened', e);
        // }
      }
    },
    async connectWallet() {

      console.log(connector.connected);


      try {
        // const walletList = await connector.getWallets();
        // console.log(walletList);

        const walletConnectionSource = {
          universalLink: 'https://app.tonkeeper.com/ton-connect',
          bridgeUrl: 'https://bridge.tonapi.io/bridge'
        }

        connector.onStatusChange((walletInfo) => {
          console.log(walletInfo);

          this.isAuthenticated = true;
        });

        const universalLink = connector.connect(walletConnectionSource);

        console.log(universalLink);
        window.open(universalLink, '_blank');
      } catch (error) {
        console.log('Error', error);
      }
    }
  },
};
</script>

<style scoped>

</style>