<template>
  <v-container>
    <v-btn
      :ripple="false"
      :to="{
        name: 'AddPaymentList',
        params: { category: 'Food' },
        query: { value: 200 },
      }"
      >Food 200</v-btn
    >
    <v-btn
      :ripple="false"
      :to="{
        name: 'AddPaymentList',
        params: { category: 'Transport' },
        query: { value: 50 },
      }"
      >Transport 50</v-btn
    >
    <v-btn
      :ripple="false"
      :to="{
        name: 'AddPaymentList',
        params: { category: 'Entertainment' },
        query: { value: 2000 },
      }"
      >Entertainment 2000</v-btn
    >
    <v-btn
      :ripple="false"
      :to="{ name: 'AddPaymentList', params: { category: 'Sport' } }"
      >Sport</v-btn
    >
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
