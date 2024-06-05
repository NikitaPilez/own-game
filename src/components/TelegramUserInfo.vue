<template>
  <div>
    <h1>Telegram Mini App</h1>
    <button @click="getUserInfo">Get User Info</button>
    <div v-if="userInfo">
      <h2>User Info</h2>
      <p><strong>ID:</strong> {{ userInfo.id }}</p>
      <p><strong>First Name:</strong> {{ userInfo.first_name }}</p>
      <p><strong>Last Name:</strong> {{ userInfo.last_name }}</p>
      <p><strong>Username:</strong> {{ userInfo.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TelegramMiniApp',
  data() {
    return {
      userInfo: null
    };
  },
  inject: ['telegram'],
  methods: {
    getUserInfo() {
      console.log(this.telegram);
      this.userInfo = this.telegram.initDataUnsafe.user;
    }
  }
}
</script>

<style scoped>

</style>