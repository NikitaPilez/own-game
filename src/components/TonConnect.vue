<template>
<!--  <div id="ton-connect"></div>-->
  <div>
    <h1>Ton Connect Demo</h1>
    <button @click="connectWallet">Connect Wallet</button>
  </div>
</template>

<script>
import { TonConnectUI } from '@/tonConnect';

export default {
  name: 'TonConnect',
  setup() {
    const connectWallet = async () => {
      try {
        await TonConnectUI.getWallets();
        console.log('Wallet connected:', TonConnectUI.wallet.account);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    };

    return {
      connectWallet
    };
  }
};
</script>

<style scoped>

</style>