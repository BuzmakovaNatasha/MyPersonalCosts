<template>
  <div class="home">
    <router-link
      :to="{
        name: 'AddPaymentList',
        params: { category: 'Food' },
        query: { value: 200 },
      }"
      >Food 200</router-link
    >
    |
    <router-link
      :to="{
        name: 'AddPaymentList',
        params: { category: 'Transport' },
        query: { value: 50 },
      }"
      >Transport 50</router-link
    >
    |
    <router-link
      :to="{
        name: 'AddPaymentList',
        params: { category: 'Entertainment' },
        query: { value: 2000 },
      }"
      >Entertainment 2000</router-link
    >
    |
    <router-link :to="{ name: 'AddPaymentList', params: { category: 'Sport' } }"
      >Sport
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",

  components: {},
};
</script>
