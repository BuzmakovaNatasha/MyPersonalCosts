<template>
  <v-card class="text-left pa-8">
    <v-text-field v-model="category" label="Category" />
    <v-btn color="teal lighten-1" dark @click="onAdd">Add Category</v-btn>
  </v-card>
</template>

<script>
export default {
  name: "AddListOfCategories",
  data() {
    return {
      category: "",
    };
  },
  props: {
    dialog: {
      type: Boolean,
    },
  },
  methods: {
    onAdd() {
      this.$emit("addNewCategory", this.category);
    },
  },
  watch: {
    dialog() {
      // обнуление категории, если закрылось диалоговое окно с формой добавления платежа
      if (this.dialog == false) {
        this.category = "";
      }
    },
  },
};
</script>

<style lang='scss' scoped>
// .form__add-category {
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
//   width: 120px;
//   & input {
//     padding: 7px;
//     box-sizing: border-box;
//     margin-bottom: 10px;
//   }
//   & button {
//     padding: 7px;
//     box-sizing: border-box;
//     color: #fff;
//     background-color: #25a79a;
//     border: none;
//     border-radius: 3px;
//     &:hover {
//       background-color: #0a8375;
//     }
//     &:active {
//       background-color: #0a6255;
//     }
//   }
// }
</style>