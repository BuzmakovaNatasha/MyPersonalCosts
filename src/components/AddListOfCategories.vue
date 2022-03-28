<template>
  <div class="form__add-category">
    <input placeholder="Category" v-model="category" />
    <button class="btn__add-category" @click="onAdd">Add Category</button>
  </div>
</template>

<script>
export default {
  name: "AddListOfCategories",
  data() {
    return {
      category: "",
    };
  },
  methods: {
    onAdd() {
      this.$emit("addNewCategory", this.category);
    },
  },
};
</script>

<style lang='scss' scoped>
.form__add-category {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 120px;
  & input {
    padding: 7px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  & button {
    padding: 7px;
    box-sizing: border-box;
    color: #fff;
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
}
</style>