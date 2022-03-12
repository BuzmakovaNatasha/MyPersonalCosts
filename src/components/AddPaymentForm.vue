<template>
  <div class="form">
    <input placeholder="Date" v-model="date" />
    <input placeholder="Category" v-model="category" />
    <input placeholder="Amount" v-model="value" />
    <button class="btn__save" @click="onSave">add +</button>
  </div>
</template>

<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      date: "",
      category: "",
      value: "",
    };
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      let d = today.getDate();
      if (d <= 9) {
        d = `0${d}`;
      }
      let m = today.getMonth() + 1;
      if (m <= 9) {
        m = `0${m}`;
      }
      const y = today.getFullYear();

      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    onSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      this.$emit("addNewPayment", data);
    },
  },
};
</script>

<style lang='scss' scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 200px;
}

input {
  padding: 7px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.btn__save {
  width: 120px;
  padding: 7px;
  box-sizing: border-box;
  color: #fff;
  text-transform: uppercase;
  background-color: #25a79a;
  border: none;
  border-radius: 3px;
}
</style>