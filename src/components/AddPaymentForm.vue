<template>
  <div class="form">
    <input placeholder="Date" v-model="date" />
    <div class="category-list" v-if="categoryList.length">
      <select v-model="category">
        <option v-for="(option, idx) in categoryList" :key="idx">
          {{ option }}
        </option>
      </select>
      <AddListOfCategories @addNewCategory="addCategory" />
    </div>
    <input placeholder="Amount" v-model="value" />
    <button class="btn__save" @click="onSave">add +</button>
  </div>
</template>

<script>
import AddListOfCategories from "./AddListOfCategories.vue";

export default {
  name: "AddPaymentForm",
  components: {
    AddListOfCategories,
  },
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
    categoryList() {
      return this.$store.getters.getCategoryList;
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
    addCategory(category) {
      this.categoryList.push(category);
    },
  },
  async mounted() {
    if (!this.categoryList.length) {
      await this.$store.dispatch("fetchCategoryList");
      this.category = this.categoryList[0];
    }
  },
};
</script>

<style lang='scss' scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.category-list {
  display: flex;
  & select {
    margin-right: 10px;
  }
}

input,
select {
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
  &:hover {
    background-color: #0a8375;
  }
  &:active {
    background-color: #0a6255;
  }
}
</style>